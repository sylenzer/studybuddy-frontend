// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import studybuddyLogo from "@/assets/studybuddy-logo.png";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      // Insert welcome tokens
      await supabase.from("user_tokens").upsert([
        {
          user_id: user.id,
          tokens: 50,
        },
      ]);
    }

    navigate("/solver");
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <img src={studybuddyLogo} width={150} className="mx-auto" alt="StudyBuddy Logo" />
          <div className="mt-5">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Create your StudyBuddy account
            </h3>
          </div>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Sign up
          </button>
        </form>

        {error && <p className="text-center text-sm text-red-500 font-medium pt-2">{error}</p>}

        <p className="text-center pt-2">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
};

export default SignupPage;
