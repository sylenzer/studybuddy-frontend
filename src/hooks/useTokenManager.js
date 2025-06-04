// src/hooks/useTokenManager.js
import { useEffect, useState } from "react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

const useTokenManager = (userId) => {
  const [tokens, setTokens] = useState(null);

  const headers = {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    "Content-Type": "application/json",
  };

  const getTokens = async () => {
    if (!userId) return;

    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/user_tokens?select=token_balance&id=eq.${userId}&limit=1`,
        { headers }
      );
      const data = await res.json();
      if (data?.length > 0) {
        setTokens(data[0].token_balance);
        return data[0].token_balance;
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
        `${SUPABASE_URL}/rest/v1/user_tokens?id=eq.${userId}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({ token_balance: delta }),
        }
      );
      const data = await res.json();
      if (data?.length > 0) {
        setTokens(data[0].token_balance);
        return data[0].token_balance;
      }
    } catch (err) {
      console.error("❌ updateTokens failed:", err);
    }
  };

  useEffect(() => {
    if (userId) getTokens();
  }, [userId]);

  return { tokens, getTokens, updateTokens };
};

export default useTokenManager;
