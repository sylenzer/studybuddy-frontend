const handleSignup = async (e) => {
  e.preventDefault();
  setError("");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    setError(error.message);
    return;
  }

  const user = data?.user;
  if (user) {
    // 🎉 Add 50 tokens
    await supabase.from("user_tokens").upsert([
      {
        user_id: user.id,
        tokens: 50,
      },
    ]);
  }

  navigate("/solver");
};
