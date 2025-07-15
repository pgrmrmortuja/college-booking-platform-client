"use client";

import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Register = () => {
    const { createNewUser, setUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);

    const router = useRouter();

    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Password',
                text: 'Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.'
            });
            return;
        }

        createNewUser(email, password)
            .then((result) => {
                setUser(result.user);

                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration Successful!',
                            text: 'Welcome!',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        navigate("/");
                    })
                    .catch((err) => {
                        console.log("Error", err.message);
                    });
            })
            .catch((error) => {
                console.log("Error ", error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: 'Something went wrong. Please try again.'
                });
            });
    };


    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    icon: 'success',
                    title: 'Google Sign-In Successful!',
                    text: 'Welcome!',
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/');
            })
            .catch(error => {
                console.log('ERROR', error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Google Sign-In Failed',
                    text: 'Something went wrong. Please try again.'
                });
            });
    };


    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-orange-50">
            <div className="w-full max-w-md bg-orange-100 p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-black mb-6">Register Your Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-black">Name</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        {error.name && (
                            <p className="text-xs text-red-600 mt-1">{error.name}</p>
                        )}
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-black">Photo URL</label>
                        <input
                            name="photo"
                            type="text"
                            placeholder="Photo URL"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-black">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block mb-1 text-sm font-medium text-black">Password</label>
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-9 text-gray-600 text-lg"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-black py-2 rounded-md transition duration-200 font-medium"
                        >
                            Register
                        </button>
                    </div>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center justify-center">
                    <span className="text-black text-sm font-semibold">OR</span>
                </div>

                {/* Google Sign In */}
                <div className="flex flex-col items-center mb-3">
                    <p className="text-center font-semibold mb-2 text-black">Continue with Google</p>
                    <button onClick={handleGoogleSignIn} className="text-4xl">
                        <FcGoogle />
                    </button>
                </div>

                {/* Login link */}
                <p className="text-center font-semibold text-black">
                    Already Have An Account?{" "}
                    <Link href="/login" className="text-red-500 underline hover:text-red-600">
                        Login
                    </Link>
                </p>
            </div>
        </div>

    );
};

export default Register;