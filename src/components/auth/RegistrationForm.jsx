import Field from "../common/Field.jsx";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const submitForm = async (formData) => {
        console.log(formData);
        try {
            let response = await axios.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
                formData,
            );
            if (response.status === 201) {
                navigate("/login");
            }
        } catch (error) {
            setError("root.random", {
                type: "random",
                message: `Something went wrong: ${error.message}`,
            });
        }
    };
    return (
        <>
            <form
                action=""
                autoComplete="off"
                onSubmit={handleSubmit(submitForm)}
            >
                <div className="mb-6">
                    <Field label="First Name" error={errors.firstName}>
                        <input
                            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text"
                            name="firstName"
                            id="firstName"
                            {...register("firstName", {
                                required: "First Name is required",
                            })}
                        />
                    </Field>
                </div>
                <div className="mb-6">
                    <Field label="Last Name" error={errors.lastName}>
                        <input
                            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text"
                            name="lastName"
                            id="lastName"
                            {...register("lastName", {
                                required: "Last Name is required",
                            })}
                        />
                    </Field>
                </div>
                <div className="mb-6">
                    <Field label="Email" error={errors.email}>
                        <input
                            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                            type="email"
                            name="email"
                            id="email"
                            {...register("email", {
                                required: "Email is required",
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
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password should be at least 8 characters",
                                },
                            })}
                        />
                    </Field>
                </div>
                <div className="mb-6">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                    >
                        Create Account
                    </button>
                </div>
                <p className="text-center">
                    Already have account?{" "}
                    <Link
                        to="/login"
                        className="text-indigo-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </>
    );
};

export default RegistrationForm;