import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import "./App.css";
import ProfilePage from "./pages/ProfilePage.jsx";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";
import BlogEntry from "./components/posts/BlogEntry.jsx";
import HomePage from "./pages/HomePage.jsx";
import SingleBlog from "./components/posts/SingleBlog.jsx";
import Search from "./pages/Search.jsx";
import EditBlog from "./components/posts/EditBlog.jsx";
import AuthorProfile from "./components/profile/AuthorProfile.jsx";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route element={<PrivateRoutes />}>
                    <Route path="/me" element={<ProfilePage />} />
                    <Route path="/createBlog" element={<BlogEntry />} />
                    <Route path="/blog/edit/:id" element={<EditBlog />} />
                </Route>
                <Route path="/blog/:id" element={<SingleBlog />} />
                <Route path="/search" element={<Search />} />
                <Route path="/author/:id" element={<AuthorProfile />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;