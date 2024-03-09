import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import "./App.css";
import ProfilePage from "./pages/ProfilePage.jsx";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";

const App = () => {
    return (
        <>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/me" element={<ProfilePage />} />
                </Route>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
};

export default App;