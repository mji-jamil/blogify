import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Field from "../common/Field.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import axios from "axios";

const LoginForm = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const submitForm = async (formData) => {
        try {
            // Make an API call
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
                formData,
            );

            if (response.status === 200) {
                const { token, user } = response.data;
                if (token) {
                    const authToken = token.accessToken;
                    const refreshToken = token.refreshToken;
                    setAuth({ user, authToken, refreshToken });
                    navigate("/");
                }
            }
        } catch (error) {
            setError("root.random", {
                type: "random",
                message: `User not found. Please register`,
            });
        }
    };
    return (
        <>
            <form action="" onSubmit={handleSubmit(submitForm)}>
                <div className="mb-6">
                    <Field label="Email" error={errors.email}>
                        <input
                            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                            type="email"
                            name="email"
                            id="email"
                            {...register("email", {
                                required: "Email ID is required",
                            })}
                        />
                    </Field>
                </div>
                <div className="mb-6">
                    <Field label="Password" error={errors.password}>
                        <input
                            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                            type="password"
                            name="password"
                            id="password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                    </Field>
                </div>
                <p>{errors?.root?.random?.message}</p>
                <br />
                <div className="mb-6">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                    >
                        Login
                    </button>
                </div>
                <p className="text-center">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-indigo-600 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </>
    );
};

export default LoginForm;