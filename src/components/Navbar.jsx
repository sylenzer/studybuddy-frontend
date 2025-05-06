import { Link } from "react-router-dom";
import { useTokenManager } from "@/hooks/useTokenManager";
import { useUser } from "../context/UserContext";
import TokenBadge from "@/components/TokenBadge";

const Navbar = () => {
  const { user } = useUser();
  const { tokens } = useTokenManager(user?.id, user?.access_token); // ✅ Correct hook

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-300 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between">
        
        {/* Brand */}
        <Link
          to="/"
          className="text-xl font-extrabold text-purple-600 hover:text-purple-700 transition"
        >
          StudyBuddy+
        </Link>

        {/* Nav Links aligned right */}
        <div className="flex flex-wrap gap-6 justify-end w-full sm:w-auto items-center text-sm sm:text-base font-semibold text-gray-800 dark:text-white">
          <Link to="/">Home</Link>
          <Link to="/solver">Solver</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/login">Login</Link>
          {tokens !== null && (
            <div className="ml-4 bg-yellow-100 text-yellow-800 p-2 rounded-full text-sm">
              Tokens: {tokens}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
