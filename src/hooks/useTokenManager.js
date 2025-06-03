// src/hooks/useTokenManager.js
import { useEffect, useState } from "react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

const useTokenManager = (userId, accessToken) => {
  const [tokens, setTokens] = useState(null);

  const headers = {
    apikey: SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  const getTokens = async () => {
    if (!userId) return;

    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/user_tokens?select=tokens&user_id=eq.${userId}&limit=1`,
        { headers }
      );
      const data = await res.json();
      if (data?.length > 0) {
        setTokens(data[0].tokens);
        return data[0].tokens;
      } else {
        setTokens(0);
        return 0;
      }
    } catch (err) {
      console.error("❌ getTokens failed:", err);
      return null;
    }
  };

  const updateTokens = async (delta) => {
    if (!userId) return;

    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/user_tokens?user_id=eq.${userId}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            tokens: { increment: delta },
          }),
        }
      );
      const data = await res.json();
      if (data?.length > 0) {
        setTokens(data[0].tokens);
        return data[0].tokens;
      }
    } catch (err) {
      console.error("❌ updateTokens failed:", err);
    }
  };

  // Optionally load tokens on mount
  useEffect(() => {
    if (userId) getTokens();
  }, [userId]);

  return { tokens, getTokens, updateTokens };
};

export default useTokenManager;
