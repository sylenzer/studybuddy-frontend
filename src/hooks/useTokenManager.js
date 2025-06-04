const getTokens = async () => {
  if (!userId) return;

  try {
    const res = await fetch(`/api/get-token-balance?userId=${userId}`);
    const data = await res.json();
    if (data?.token_balance !== undefined) {
      setTokens(data.token_balance);
      return data.token_balance;
    } else {
      setTokens(0);
      return 0;
    }
  } catch (err) {
    console.error("❌ getTokens failed:", err);
    return null;
  }
};
