import LogoIcon from "../../assets/logo.svg";
import SearchIcon from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { useProfile } from "../../hooks/useProfile.js";
import Logout from "../auth/Logout.jsx";

const Header = () => {
    const { auth } = useAuth();
    const { state } = useProfile() || {};

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
                                    <img src={SearchIcon} alt="Search" />
                                    <span>Search</span>
                                </Link>
                            </li>

                            {auth?.user ? (
                                <>
                                    <li className="flex items-center">
                                        <div className="avater-img bg-orange-600 text-white">
                                            {user?.avatar ? (
                                                <img
                                                    className="max-w-full rounded-full"
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_SERVER_BASE_URL
                                                    }/uploads/avatar/${
                                                        user?.avatar
                                                    }?${Date.now()}`}
                                                    alt={user?.firstName}
                                                />
                                            ) : (
                                                <div className="avater-img bg-indigo-600 text-white">
                                                    <span>
                                                        {user?.firstName.charAt(
                                                            0,
                                                        )}
                                                    </span>
                                                </div>
                                            )}
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
                            ) : (
                                <li>
                                    <Link
                                        to="/login"
                                        className="text-white/50 hover:text-white transition-all duration-200 pr-4"
                                    >
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;