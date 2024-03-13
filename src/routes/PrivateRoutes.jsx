import { useAuth } from "../hooks/useAuth.js";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header.jsx";
import ProfileProvider from "../providers/ProfileProvider.jsx";
import PostProvider from "../providers/PostProvider.jsx";
import Footer from "../components/common/Footer.jsx";

export default function PrivateRoutes() {
    const { auth } = useAuth();
    // console.log(auth);
    return (
        <>
            {auth.authToken ? (
                <>
                    <ProfileProvider>
                        <Outlet />
                    </ProfileProvider>
                </>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
}