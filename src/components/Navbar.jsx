import { Link } from "react-router-dom";
import { useTokenManager } from "@/hooks/useTokenManager";
import { useUser } from "../context/UserContext";
import TokenBadge from "@/components/TokenBadge";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const { user } = useUser();
  const { tokens } = useTokenManager(user?.id, user?.access_token);

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border-b border-gray-300 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-y-4">
        {/* Brand */}
        <Link
          to="/"
          className="text-xl font-extrabold text-purple-600 hover:text-purple-700 transition"
        >
          StudyBuddy+
        </Link>

        {/* Nav Links centered with spacing */}
        <div className="flex flex-wrap justify-center gap-6 items-center text-sm sm:text-base font-semibold text-gray-800 dark:text-white">
          <Link to="/solver" className="hover:text-purple-500 transition">
            Problem Solver
          </Link>
          <Link to="/pricing" className="hover:text-purple-500 transition">
            Pricing
          </Link>
          <Link to="/faq" className="hover:text-purple-500 transition">
            FAQ
          </Link>
          {user ? (
            <span className="text-xs sm:text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
              {user.email}
            </span>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1 rounded-full border border-purple-600 text-purple-600 hover:bg-purple-50 transition"
            >
              Login
            </Link>
          )}
          {user && <TokenBadge tokens={tokens} />}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
