"use client"
import React, { useEffect, useState } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic"; 
import { Rating } from "react-simple-star-rating";
import Loading from "../loading";
import Error from "../error";

export default function CollegeReviews() {
    const axiosPublic = useAxiosPublic();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axiosPublic.get("/reviews"); 
                setReviews(res.data);
            } catch (err) {
                setError("Failed to load reviews.");
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    if (loading) return <Loading></Loading>
    if (error) return <Error></Error>

    return (
        <section className="py-10 px-4 sm:px-8 lg:px-16 bg-white">
            <h2 className="text-3xl font-bold text-center mb-8">Student Reviews</h2>

            <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review) => (
                    <div key={review._id} className="border rounded-lg p-6 shadow hover:shadow-lg transition">
                        {/* College Name */}
                        <h3 className="text-xl font-semibold mb-2">{review.college_name}</h3>

                        {/* Rating */}
                        <div className="flex items-center mb-3">
                            <Rating
                                readonly
                                initialValue={review.rating}
                                size={20}
                                fillColor="#facc15"
                                SVGstyle={{ display: "inline-block" }}
                                allowFraction
                            />
                            <span className="ml-2 text-sm text-gray-700">{review.rating}</span>
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-700 mb-4">"{review.college_review}"</p>

                        {/* Reviewer Info */}
                        <div className="text-sm text-gray-500 italic">- {review.name}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
