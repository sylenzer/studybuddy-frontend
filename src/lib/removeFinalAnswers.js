// lib/utils.js
export function removeFinalAnswers(text) {
    // Basic patterns to match typical answer reveals
    const patterns = [
      /(?:The\s+)?final\s+answer\s+is\s+.*?(\n|$)/gi,
      /(?:Answer\s*[:=])\s+.*?(\n|$)/gi,
      /Therefore,\s+.*?is\s+the\s+answer(\n|$)/gi,
      /Thus,\s+.*?is\s+the\s+solution(\n|$)/gi,
      /So,\s+.*?equals\s+.*?(\n|$)/gi,
      /✅.*?(\n|$)/g,
    ];
  
    let cleaned = text;
    for (const pattern of patterns) {
      cleaned = cleaned.replace(pattern, '');
    }
  
    return cleaned.trim();
  }
  