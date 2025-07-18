"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { Rating } from 'react-simple-star-rating';
import Image from "next/image";
import useAxiosPublic from "@/hooks/useAxiosPublic";

export default function SearchComponent() {
    const [searchTerm, setSearchTerm] = useState("");
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(false);

    const axiosPublic = useAxiosPublic();

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;
        setLoading(true);
        try {
            const { data } = await axiosPublic.get(`/search-colleges?search=${searchTerm}`);
            setColleges(data);
        } catch (error) {
            console.error("Error fetching colleges:", error);
            setColleges([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Search Box */}
            <div className="max-w-2xl mx-auto relative">
                <input
                    type="text"
                    placeholder="Search for a college..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full border border-pink-400 rounded-full py-3 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-700"
                />
                <button
                    onClick={handleSearch}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-pink-600 hover:text-pink-800"
                >
                    <FiSearch size={24} />
                </button>
            </div>

            {/* Loader */}
            {loading && (
                <div className="text-center mt-6 text-pink-500 font-semibold">Searching...</div>
            )}

            {/* Results */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {!loading && searchTerm && colleges.length === 0 && (
                    <p className="text-center text-red-500 font-medium col-span-full">
                        No college found for "{searchTerm}"
                    </p>
                )}

                {colleges.map((college) => (
                    <div
                        key={college._id}
                        className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition duration-300"
                    >
                        <div className="w-full h-48 relative">
                            <Image
                                src={college?.college_image}
                                alt={college.college_name}
                                fill
                                className="object-cover rounded-t-xl"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{college.college_name}</h2>
                            <div className="flex items-center mb-2">
                                <Rating
                                    readonly
                                    initialValue={college.rating}
                                    size={20}
                                    SVGstyle={{ display: "inline-block" }}
                                    allowFraction
                                    fillColor="#facc15"
                                />
                                <span className="ml-2 text-sm text-gray-700">{college.rating}</span>
                            </div>
                            <p className="text-sm text-gray-500 mb-1">📅 Admission Date: {college.admission_date}</p>
                            <p className="text-sm text-gray-500 mb-2">🧪 Research Works: {college.research_number}</p>
                            <div className="mt-4 text-right">
                                <Link href={`/College-Details/${college._id}`}>
                                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition">
                                        Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
