// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import studybuddyLogo from "@/assets/FullLogo_Transparent hero.png";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [is18Confirmed, setIs18Confirmed] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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

    // ✅ Supabase SQL trigger will handle all user_tokens/profiles inserts
    navigate("/solver");
  };

  const isDisabled = !email || !password || !is18Confirmed || !agreedToTerms;

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <img src={studybuddyLogo} width={150} className="mx-auto" alt="StudyBuddy Logo" />
          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl mt-5">
            Create your StudyBuddy account
          </h3>
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

          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={is18Confirmed}
                onChange={() => setIs18Confirmed(!is18Confirmed)}
              />
              I confirm that I am at least 18 years old.
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
              />
              I agree to the <a href="/terms" className="text-indigo-600 hover:underline">Terms</a> and <a href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</a>.
            </label>
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full px-4 py-2 text-white font-medium rounded-lg duration-150 ${
              isDisabled ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            Sign up
          </button>
        </form>

        {error && (
          <p className="text-center text-sm text-red-500 font-medium pt-2">{error}</p>
        )}

        <p className="text-center pt-2 text-sm">
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
