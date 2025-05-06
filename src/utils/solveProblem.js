// src/utils/solveProblem.js

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export async function solveProblem({ problem, hintMode, strategy }) {
  if (!problem) throw new Error("Problem is required.");

  const userPrompt = `
${hintMode ? 'Hint Mode is ON.\n\n' : ''}
Problem: ${problem}
Strategy: ${strategy || 'best fit'}

Provide guidance using this structure:
1. Start with a Socratic question to prompt the learner.
2. Offer a multiple-choice hint (A–D) for the first step.
3. Provide a roadmap overview of the solving process.
4. Then explain the problem step-by-step in **Markdown with LaTeX** for math.
5. If visuals are needed, include:

[VISUAL_RENDER]
type: graph or geometry
data: { ...coordinates or shapes... }

Do NOT give the final answer.
Use LaTeX for all math like \\frac{a}{b}, \\sqrt{...}, and exponents.
`;

  const messages = [
    {
      role: 'system',
      content: `You are a helpful math tutor. Always format math using LaTeX inside Markdown. Do NOT reveal the final answer.`
    },
    { role: 'user', content: userPrompt }
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages,
    temperature: 0.4
  });

  const full = completion.choices[0]?.message?.content || '';
  const [markdownResult, visualBlock] = full.split('[VISUAL_RENDER]');
  return {
    result: markdownResult?.trim() || 'No explanation provided.',
    visual: visualBlock?.trim() || null
  };
}
