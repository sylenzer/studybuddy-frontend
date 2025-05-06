const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const useTokenManager = (userId, accessToken) => {
  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  const getTokens = async () => {
    if (!userId || !accessToken) return 0;

    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/profiles?select=tokens&user_id=eq.${userId}&limit=1`,
        { headers }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Get tokens failed: ${res.status} — ${text}`);
      }

      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data[0].tokens : 0;
    } catch (err) {
      console.error("❌ getTokens error:", err);
      return 0;
    }
  };

  const updateTokens = async (delta) => {
    if (!userId || !accessToken || typeof delta !== "number") return false;

    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/profiles?user_id=eq.${userId}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            tokens: { increment: delta },
          }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Token update failed: ${res.status} — ${text}`);
      }

      const data = await res.json();
      return data?.[0]?.tokens ?? true;
    } catch (err) {
      console.error("❌ updateTokens error:", err);
      return false;
    }
  };

  const spendTokens = async (amount = 1) => updateTokens(-Math.abs(amount));
  const addTokens = async (amount = 1) => updateTokens(Math.abs(amount));

  return {
    getTokens,
    spendTokens,
    addTokens,
  };
};
