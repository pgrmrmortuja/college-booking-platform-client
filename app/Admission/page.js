"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useAxiosPublic from "@/hooks/useAxiosPublic";

export default function AdmissionPage() {
  const axiosPublic = useAxiosPublic();
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    axiosPublic.get("/colleges").then((res) => {
      setColleges(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Apply for Admission</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {colleges.map((college) => (
          <Link
            key={college._id}
            href={`/Admission/${college._id}`}
            className="block bg-white shadow p-4 rounded-lg hover:bg-gray-100"
          >
            <h2 className="text-xl font-semibold">{college.college_name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}