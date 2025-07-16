"use client"
import React, { useEffect, useState } from 'react'
import Loading from '../loading';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import Link from 'next/link'
import Image from 'next/image';
import { Rating } from 'react-simple-star-rating'

export default function AllColleges() {
  const axiosPublic = useAxiosPublic();

  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axiosPublic.get('/colleges');
      setColleges(response.data);
    };

    fetchBlogs();
  }, []);

  console.log(colleges);

  if (!colleges) {
    return (
      <Loading></Loading>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-center mb-8">All Colleges</h1>

      {colleges.length === 0 ? (
        <p className="text-center text-gray-600">No colleges found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {colleges.map((college) => (
            <div
              key={college._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              {/* College Image */}
              <div className="w-full h-48 relative">
                {/* <Image
                  src={college.photo || "https://via.placeholder.com/400x200"}
                  alt={college.college_name}
                  fill
                  className="object-cover rounded-t-xl"
                /> */}
              </div>

              {/* College Info */}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{college.college_name}</h2>

                {/* Rating with star icon */}
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

                {/* Admission Date */}
                <p className="text-sm text-gray-500 mb-1">
                  📅 Admission Date: {college.admission_date}
                </p>

                {/* Research Number */}
                <p className="text-sm text-gray-500 mb-2">
                  🧪 Research Works: {college.research_number}
                </p>

                {/* Details Button */}
                <div className="mt-4 text-right">
                  <Link href={`/colleges/${college._id}`}>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
