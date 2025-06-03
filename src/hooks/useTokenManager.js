// src/hooks/useTokenManager.js
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

const useTokenManager = () => {
  const { user } = useUser();
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  const headers = {
    apikey: SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  const getTokens = async () => {
    if (!user?.id) return;

    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/user_tokens?select=tokens&user_id=eq.${user.id}&limit=1`,
        { headers }
      );
      const data = await res.json();
      if (data?.length > 0) {
        setTokens(data[0].tokens);
      } else {
        console.warn("User has no token row.");
        setTokens(0);
      }
    } catch (err) {
      console.error("Error fetching tokens:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateTokens = async (delta) => {
    if (!user?.id) return;

    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/user_tokens?user_id=eq.${user.id}`,
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
      }
    } catch (err) {
      console.error("Error updating tokens:", err);
    }
  };

  useEffect(() => {
    if (user?.id) getTokens();
  }, [user]);

  return { tokens, updateTokens, loading };
};

export default useTokenManager;
