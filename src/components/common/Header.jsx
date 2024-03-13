import LogoIcon from "../../assets/logo.svg";
import SearchIcon from "../../assets/icons/search.svg";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { useProfile } from "../../hooks/useProfile.js";
import { useContext } from "react";
import { ProfileContext } from "../../context/index.js";
import Logout from "../auth/Logout.jsx";

const Header = () => {
    const { auth } = useAuth();
    const { state } = useProfile() || {};
    const location = useLocation();
    const currentPath = location.pathname;

    const user = state?.user ?? auth?.user;
    return (
        <>
            <header className="p-1">
                <nav className="container">
                    <div>
                        <Link to="/">
                            <img className="w-32" src={LogoIcon} alt="lws" />
                        </Link>
                    </div>

                    <div>
                        <ul className="flex items-center space-x-5">
                            {auth?.user && (
                                <>
                                    <li>
                                        <Link
                                            to="/createBlog"
                                            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                                        >
                                            Write
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="search"
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <img
                                                src={SearchIcon}
                                                alt="Search"
                                            />
                                            <span>Search</span>
                                        </Link>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="avater-img bg-orange-600 text-white">
                                            <img
                                                className="max-w-full rounded-full"
                                                src={`${
                                                    import.meta.env
                                                        .VITE_SERVER_BASE_URL
                                                }/uploads/avatar/${
                                                    user?.avatar
                                                }`}
                                                alt={state?.user?.firstName}
                                            />
                                        </div>

                                        <Link to="/me">
                                            <span className="text-white ml-2">
                                                {user?.firstName}{" "}
                                                {user?.lastName}
                                            </span>
                                        </Link>
                                    </li>
                                    <Logout />
                                </>
                            )}

                            {!auth.user && (
                                <>
                                    {currentPath === "/login" && (
                                        <li>
                                            <Link
                                                to="/register"
                                                className="text-white/50 hover:text-white transition-all duration-200 pr-4"
                                            >
                                                Register
                                            </Link>
                                        </li>
                                    )}
                                    {currentPath === "/register" && (
                                        <li>
                                            <Link
                                                to="/login"
                                                className="text-white/50 hover:text-white transition-all duration-200 pr-4"
                                            >
                                                Login
                                            </Link>
                                        </li>
                                    )}
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;