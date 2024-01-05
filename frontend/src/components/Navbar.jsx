import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, userLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const toggleNav = () => {
    setShow(!show);
  };
  return (
    <>
      <header>
        <nav className="flex flex-wrap items-center justify-between w-full px-4 py-4 text-lg md:py-0">
          <div>
            <Link to="/">
              <span className="site-logo" style={{ fontSize: "2rem" }}>
                <span className="text-primary"> B</span>log
                <span className="text-primary">H</span>ub
              </span>
            </Link>
          </div>
          <button
            className="block p-2 border rounded-lg md:hidden border-primary focus:outline-none"
            type="button"
            onClick={toggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="menu-button"
              className="block w-6 h-6 cursor-pointer md:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div
            className={`${
              show ? "block" : "hidden"
            } md:block w-full md:w-auto md:ml-auto align-middle`}
          >
            <ul className="pt-4 text-base text-gray-500 md:flex md:justify-between md:pt-0">
              <li className="block py-2 font-bold md:p-4 hover:text-black">
                <Link to="/technology">Technology</Link>
              </li>
              <li className="block py-2 font-bold md:p-4 hover:text-black">
                <Link to="/education">Education</Link>
              </li>
              <li className="block py-2 font-bold md:p-4 hover:text-black">
                <Link to="/music">Music</Link>
              </li>

              {user ? (
                <li className="block py-2 md:p-4 hover:text-black ">
                  <Link to="/profile">
                    <p className="font-bold text-primary">{user.username}</p>
                  </Link>
                </li>
              ) : null}

              {user ? (
                <li className="block py-2 font-bold md:p-4 hover:text-primary">
                  <button
                    className="px-4 py-1 font-bold text-white bg-blue-800 rounded hover:bg-blue-900"
                    onClick={() => {
                      userLogout();
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="block py-2 font-bold md:p-4 hover:text-black">
                    <Link to="/signup">Sign Up</Link>
                  </li>

                  <li className="block py-2 font-bold md:p-4 hover:text-primary">
                    <Link
                      className="px-4 py-1 font-bold text-white bg-blue-800 rounded hover:bg-blue-900"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
