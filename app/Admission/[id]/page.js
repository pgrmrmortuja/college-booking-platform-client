"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Swal from "sweetalert2";
import Loading from "@/app/loading";
import { AuthContext } from "@/providers/AuthProvider";

export default function AdmissionForm({ params }) {
    const { id } = params;
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const [college, setCollege] = useState([]);

    // 🔹 Fetch College Info
    useEffect(() => {
        const fetchCollege = async () => {
            const res = await axiosPublic.get(`/college/${id}`);
            setCollege(res.data);
        };
        fetchCollege();
    }, [id, axiosPublic]);

    if (!college) {
        return (
            <Loading></Loading>
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        const collegeId = id;
        const college_name = form.college_name.value;
        const name = form.name.value;
        const email = form.email.value;
        const subject = form.subject.value;
        const phone = form.phone.value;
        const address = form.address.value;
        const dob = form.dob.value;
        const image = form.image.value;

        const admission = {
            collegeId,
            college_name,
            name,
            email,
            subject,
            phone,
            address,
            dob,
            image
        };

        console.log("admission data", admission)

        const response = await axiosPublic.post('/admission', admission);

        console.log(response.data);

        if (response.data.insertedId) {
            //show success popup
            form.reset();
            Swal.fire({
                position: "top",
                icon: "success",
                title: `Form Submitted Successfully.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Admission Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block mb-1 font-medium">College Name</label>
                    <input
                        name="college_name"
                        type="text"
                        value={college.college_name}
                        disabled
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Candidate Name</label>
                    <input name="name" type="text" defaultValue={user?.displayName || ""} required placeholder="Enter your name" className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Candidate Email</label>
                    <input name="email" type="email" defaultValue={user?.email || ""} required placeholder="Your email address" className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Subject</label>
                    <input name="subject" type="text" required placeholder="Subject you want to study" className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Phone Number</label>
                    <input name="phone" type="tel" required placeholder="Your phone number" className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Address</label>
                    <input name="address" type="text" required placeholder="Your current address" className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Date of Birth</label>
                    <input name="dob" type="date" required className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Your Image</label>
                    <input name="image" type="text" accept="image/*" defaultValue={user?.photoURL} required className="file-input w-full" />
                </div>

                <button type="submit" className="btn btn-primary w-full">Submit</button>
            </form>
        </div>
    );
}