"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { AuthContext } from "@/providers/AuthProvider";

const Login = () => {
    const { userLogin, setUser, signInWithGoogle } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const result = await userLogin(email, password);
            setUser(result.user);
            router.push("/");
            Swal.fire({
                icon: "success",
                title: "Login Successful!",
                text: "Welcome back!",
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (err) {
            console.error("Login error:", err.message);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: err.message || "Please try again",
            });
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            setUser(result.user);
            router.push("/");
            Swal.fire({
                icon: "success",
                title: "Login Successful!",
                text: "Signed in with Google",
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Google Sign-in error:", error.message);
            Swal.fire({
                icon: "error",
                title: "Sign-in Failed",
                text: error.message || "Please try again",
            });
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center px-4 py-10 bg-orange-50">
            <div className="bg-orange-100 w-full max-w-md p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl text-black font-semibold text-center mb-6">
                    Login Your Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium text-black">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block mb-1 font-medium text-black">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-600 hover:text-gray-900"
                            aria-label="Toggle Password Visibility"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-700 text-black font-semibold py-2 rounded-md transition-colors"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <div className="my-6 flex items-center">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-3 text-black font-semibold">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <div className="flex flex-col items-center justify-center mb-4">
                    <p className="text-center font-semibold mb-3 text-black">
                        Continue with Google
                    </p>
                    <button
                        onClick={handleGoogleSignIn}
                        className="text-4xl focus:outline-none focus:ring-2 focus:ring-orange-400 rounded"
                        aria-label="Sign in with Google"
                    >
                        <FcGoogle />
                    </button>
                </div>

                <p className="text-center font-semibold text-black">
                    Do not Have An Account?{" "}
                    <Link href="/register">
                        <span className="text-red-500 cursor-pointer hover:underline">Register</span>
                    </Link>
                </p>
            </div>
        </div>

    );
};

export default Login;