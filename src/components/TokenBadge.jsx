import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import useTokenManager from "@/hooks/useTokenManager";
import { Coins } from "lucide-react";

const TokenBadge = () => {
  const { user } = useUser();
  const tokenManager = useTokenManager(user?.id, user?.access_token);
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const t = await tokenManager.getTokens();
      setTokens(t);
    };

    if (user?.id && user?.access_token) {
      fetch();
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-300 text-yellow-900 rounded-full text-sm font-medium shadow-sm">
      <Coins size={16} className="text-yellow-600" />
      {tokens !== null ? `${tokens} Tokens` : "Loading..."}
    </div>
  );
};

export default TokenBadge;
