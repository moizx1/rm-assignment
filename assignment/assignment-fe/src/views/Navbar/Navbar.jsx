import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export default function Navbar() {
  const { isAdmin, logout } = useAuth();
  const { isDarkMode } = useTheme();

  const handleLogout = () => {
    logout();
  };


  return (
    <nav className={`hidden md:block w-64 p-4 rounded-r-md shadow-md border border-[#313131] bg-[#342155] ${isDarkMode ? 'bg-opacity-50' : 'bg-opacity-90'}`}>
        <ul className={'space-y-6 text-gray-400 text-xl mt-4'}>
          <h2 className="text-3xl font-bold text-white mb-8">FinNest</h2>
          {!isAdmin && (
            <>
              <li>
                <Link to="/" className="text-white hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/account-details"
                  className="text-white hover:underline"
                >
                  Account Details
                </Link>
              </li>
            </>
          )}
          <li>
            <Link
              onClick={handleLogout}
              to="/login"
              className="text-white hover:underline"
            >
              Logout
            </Link>
          </li>
        </ul>
    </nav>
  );
}