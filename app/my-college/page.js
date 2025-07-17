"use client"

import useAxiosPublic from '@/hooks/useAxiosPublic';
import { AuthContext } from '@/providers/AuthProvider';
import React, { useContext, useEffect, useState } from 'react'
import Loading from '../loading';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { Rating } from 'react-simple-star-rating';

export default function MyCollege() {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const [admission, setAdmission] = useState(null);
    const [college, setCollege] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0); // ⭐ New state

    // Fetch admission & college data
    useEffect(() => {
        const fetchData = async () => {
            if (!user?.email) return;

            try {
                const admissionRes = await axiosPublic.get(`/my-college/${user.email}`);
                setAdmission(admissionRes.data);

                if (admissionRes.data?.length > 0) {
                    const collegeId = admissionRes.data[0].collegeId;
                    const collegeRes = await axiosPublic.get(`/college/${collegeId}`);
                    setCollege(collegeRes.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.email]);

    if (loading) return <Loading />;

    console.log("Admission Data:", admission);
    console.log("student name", admission[0]?.name);
    console.log("College Data:", college);

    // ⭐ Rating input change
    // const handleRating = (rate) => {
    //     setRating(rate / 20); // Convert from 0–100 scale to 0–5
    // };

    const handleRating = (rate, e) => {
        e?.preventDefault?.(); 
        setRating(rate / 20);
    };

    // ⭐ Review Submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const college_review = form.college_review.value;

        const review = {
            collegeId: college._id,
            college_name: college.college_name,
            college_image: college.college_image,
            name: admission[0]?.name,
            email: admission[0]?.email,
            image: admission[0]?.image,
            college_review: college_review,
            rating: rating,
        };

        try {
            const response = await axiosPublic.post('/review', review);
            if (response.data.insertedId) {
                form.reset();
                setRating(0); // Reset after submit
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: `Review Submitted Successfully.`,
                    showConfirmButton: false,
                    timer: 1500
                });

                // Optional: Reload college data to show updated rating
                const res = await axiosPublic.get(`/college/${college._id}`);
                setCollege(res.data);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-indigo-600 text-center mb-8">
                🎓 My College Details
            </h1>

            {/* College Image */}
            <div className="flex justify-center mb-10">
                <Image
                    src={college?.college_image}
                    alt={college?.college_name}
                    width={400}
                    height={250}
                    className="rounded-lg object-cover"
                    // fill
                    priority
                />
            </div>

            {/* Info Section */}
            <div className="flex flex-col md:flex-row md:space-x-10 gap-10 mb-12">
                {/* College Info */}
                <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{college?.college_name}</h2>
                    <p className="mb-2"><strong>Admission Date:</strong> {college?.admission_date}</p>
                    <p className="mb-2 flex items-center gap-2">
                        <strong>Rating:</strong>
                        <Rating
                            initialValue={parseFloat(college?.rating)}
                            readonly
                            allowFraction
                            SVGstyle={{ display: "inline-block" }}
                            size={20}
                        />
                        ({college?.rating})
                        {/* ({college?.rating_count || 0} ratings) */}
                    </p>
                    <p className="mb-2"><strong>Research Papers Published:</strong> {college?.research_number}</p>
                    <p className="mb-2"><strong>Research Focus:</strong> {college?.research_history}</p>
                    <p className="mb-2"><strong>Sports Info:</strong> {college?.sports_info}</p>
                    <p><strong>Events:</strong> {college?.events}</p>
                </div>

                {/* Student Info */}
                <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">👤 Student Information</h2>
                    <p className="mb-2"><strong>Name:</strong> {admission[0]?.name}</p>
                    <p className="mb-2"><strong>Email:</strong> {admission[0]?.email}</p>
                    <p className="mb-2"><strong>Subject:</strong> {admission[0]?.subject}</p>
                    <p className="mb-2"><strong>Phone:</strong> {admission[0]?.phone}</p>
                    <p className="mb-2"><strong>Address:</strong> {admission[0]?.address}</p>
                    <p><strong>Date of Birth:</strong> {admission[0]?.dob}</p>
                </div>
            </div>

            {/* Review Form */}
            <div className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">📝 Give Review</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* ⭐ Rating Input */}
                    <div className="text-center">
                        <Rating
                            onClick={handleRating}
                            initialValue={rating}
                            allowFraction
                            transition={true}
                            SVGstyle={{ display: 'inline' }}
                        />
                    </div>

                    <textarea
                        placeholder="Write your review here..."
                        name='college_review'
                        required
                        className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-indigo-500"
                        rows={5}
                    ></textarea>

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-6 py-2 rounded-md w-full hover:bg-indigo-700 transition"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    )
}