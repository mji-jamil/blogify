import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";
import RegistrationForm from "../components/auth/RegistrationForm.jsx";

const RegistrationPage = () => {
    return (
        <>
            <main>
                <section className="container">
                    <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
                        <h2 className="text-2xl font-bold mb-6">Register</h2>
                        <RegistrationForm />
                    </div>
                </section>
            </main>
        </>
    );
};

export default RegistrationPage;