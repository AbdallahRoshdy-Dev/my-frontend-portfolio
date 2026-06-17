import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "./../../context/authContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { isUserLoggedIn, clearUserTkn } = useContext(authContext);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("userTkn");
    clearUserTkn();
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-gray-100 shadow-sm ">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link to="#" className="text-xl font-bold text-gray-800">
              <span className="text-red-600">E</span>-Store
            </Link>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-600"></span>
            </button>

            {/* Links - Desktop */}
            <div className="hidden lg:flex items-center gap-6">
              {isUserLoggedIn ? (
                <ul className="flex gap-6">
                  <li>
                    <Link
                      to={"/"}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"products"}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Products
                    </Link>
                  </li>

                  <li>
                    <span
                      onClick={handleLogout}
                      className="text-red-500 hover:text-red-700 hover:underline transition-colors duration-200 font-medium cursor-pointer"
                    >
                      LogOut
                    </span>
                  </li>
                </ul>
              ) : (
                <ul className="flex gap-6">
                  <li>
                    <Link
                      to={"/register"}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Register
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"/login"}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Links - Mobile */}
          {isOpen && (
            <div className="lg:hidden pb-4">
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to="#"
                    className="block text-gray-600 hover:text-blue-600 py-1"
                  >
                    Link
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
