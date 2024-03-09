import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm.jsx";
import Footer from "../components/common/Footer.jsx";
import Header from "../components/common/Header.jsx";

const LoginPage = () => {
    return (
        <div>
            <Header />
            <main>
                <section className="container">
                    <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
                        <h2 className="text-2xl font-bold mb-6">Login</h2>
                        <LoginForm />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default LoginPage;