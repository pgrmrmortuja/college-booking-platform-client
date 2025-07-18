"use client";

import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import useUser from "@/hooks/useUser";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Loading from "../loading";

export default function MyProfilePage() {
    const { dbUser } = useUser();
    const axiosPublic = useAxiosPublic();

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        college_name: "",
        address: "",
    });

    useEffect(() => {
        if (dbUser) {
            setFormData({
                name: dbUser.name || "",
                email: dbUser.email || "",
                college_name: dbUser.college_name || "",
                address: dbUser.address || "",
            });
        }
    }, [dbUser]);

    console.log("form er data", formData);
    console.log("user er data", dbUser);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const res = await axiosPublic.patch(`/users/${dbUser._id}`, formData);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Profile Updated!",
                    text: "Your profile has been successfully updated.",
                    timer: 2000,
                    showConfirmButton: false,
                });
                setEditMode(false);
            }
        } catch (err) {
            console.error("Failed to update user:", err);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "Something went wrong!",
            });
        }
    };

    if (!dbUser) {
        return <Loading></Loading> ;
    }

    console.log("user image",dbUser.image)


    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10">
            <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>

            <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 grid md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center justify-center">

                    <Image
                        src={dbUser?.image}
                        alt="User"
                        width={400}
                        height={250}
                        className="rounded-lg object-cover"
                        // fill
                        priority
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">User Details</h3>
                        <button
                            onClick={() => setEditMode(!editMode)}
                            className="text-indigo-600 hover:text-indigo-800 text-xl"
                            title="Edit"
                        >
                            <FaEdit />
                        </button>
                    </div>

                    <div>
                        <label className="font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            disabled={!editMode}
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            disabled={!editMode}
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label className="font-medium">College Name</label>
                        <input
                            type="text"
                            name="college_name"
                            disabled={!editMode}
                            value={formData.college_name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Address</label>
                        <input
                            type="text"
                            name="address"
                            disabled={!editMode}
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
                        />
                    </div>

                    {editMode && (
                        <button
                            onClick={handleSave}
                            className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                        >
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}