// solveProblem.js

export async function solveProblem({ problem, hintMode, strategy, userId }) {
  if (!problem) throw new Error("Problem is required.");
  if (!userId) throw new Error("User ID is required.");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const response = await fetch(`${backendUrl}/api/solve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ problem, hintMode, strategy, userId })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error || "Failed to solve problem.");
  }

  const result = await response.json();
  return result;
}
