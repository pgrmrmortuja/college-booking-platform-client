"use client"
//rfc 
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { Rating } from 'react-simple-star-rating'
import useAxiosPublic from '@/hooks/useAxiosPublic';
import Loading from '@/app/loading';

export default function CollegeDetails({ params }) {
    const { id } = params;

    const axiosPublic = useAxiosPublic();

    const [college, setCollege] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await axiosPublic.get(`/college/${id}`);
            setCollege(response.data);
        };

        fetchBlogs();
    }, [id]);

    console.log(college);

    if (!college) {
        return (
            <Loading></Loading>
        );
    }
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
            {/* Title */}
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
                {college.college_name}
            </h1>

            {/* Grid layout: Image Left, Info Right */}
            <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                {/* Left: Image */}
                <div className="w-full h-64 relative rounded-xl overflow-hidden">
                    <Image
                        src={college.college_image || "https://via.placeholder.com/400x200"}
                        alt={college.college_name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Right: College Info */}
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">🎓 Admission Date</h2>
                        <p className="text-gray-600">{college.admission_date}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">⭐ Rating</h2>
                        <div className="flex items-center mb-2">
                            <Rating
                                readonly
                                initialValue={college.rating}
                                size={20}
                                SVGstyle={{ display: "inline-block" }}
                                allowFraction
                                fillColor="#facc15"
                            />
                            <span className="ml-2 text-sm text-gray-700">{college.rating?.toFixed(1)}</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">📚 Research</h2>
                        <p className="text-gray-600">
                            <strong>Number:</strong> {college.research_number}
                        </p>
                        <p className="text-gray-600">{college.research_history}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">🏅 Sports</h2>
                        <p className="text-gray-600">{college.sports_info}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">🎉 Events</h2>
                        <ul className="list-disc list-inside text-gray-600">
                            {(college.events?.split(',') || []).map((event, index) => (
                                <li key={index}>{event.trim()}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
