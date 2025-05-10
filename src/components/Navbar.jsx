import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/FullLogo_Transparent.png';

const Navbar = () => {
  return (
    <nav className="w-full bg-transparent shadow-md py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="StudyBuddy Logo" className="h-10 w-auto" />
        <span className="text-xl font-bold text-white hidden sm:inline">StudyBuddy+</span>
      </div>
      <div className="flex space-x-6 text-white text-lg">
        <Link to="/" className="hover:text-blue-300 transition">Home</Link>
        <Link to="/solver" className="hover:text-blue-300 transition">Problem Solver</Link>
        <Link to="/pricing" className="hover:text-blue-300 transition">Pricing</Link>
        <Link to="/faq" className="hover:text-blue-300 transition">FAQ</Link>
        <Link to="/login" className="hover:text-blue-300 transition">Login</Link>
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;