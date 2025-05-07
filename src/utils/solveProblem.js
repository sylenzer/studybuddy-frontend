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

  let resultData;
  try {
    resultData = await response.json();
  } catch (err) {
    throw new Error("Invalid JSON response from server.");
  }

  if (!response.ok) {
    throw new Error(resultData?.error || "Failed to solve problem.");
  }

  return resultData;
}
