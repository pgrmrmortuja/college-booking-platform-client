"use client";
import React from "react";
import Link from "next/link";

export default function ResearchPapers() {
  const papers = [
    {
      id: 1,
      title: "AI in Healthcare",
      authors: "John Doe, Jane Smith",
      college: "Dhaka College",
      date: "June 2024",
      description:
        "This research explores how Artificial Intelligence is revolutionizing the healthcare industry.",
      link: "https://example.com/ai-healthcare.pdf",
    },
    {
      id: 2,
      title: "Renewable Energy Solutions",
      authors: "Michael Lee, Sarah Khan",
      college: "Notre Dame College",
      date: "May 2024",
      description:
        "An in-depth study on sustainable renewable energy systems for future cities.",
      link: "https://example.com/renewable-energy.pdf",
    },
    {
      id: 3,
      title: "Blockchain in Education",
      authors: "Alice Brown, David Wilson",
      college: "Rajshahi College",
      date: "March 2024",
      description:
        "How blockchain technology can improve data security in education systems.",
      link: "https://example.com/blockchain-education.pdf",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <h2 className="text-3xl font-bold text-center mb-10">
          Research Papers by Our Students
        </h2>

        {/* Research Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {papers.map((paper) => (
            <div
              key={paper.id}
              className="bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between"
            >
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {paper.title}
              </h3>

              {/* College */}
              <p className="text-sm text-blue-700 font-medium mb-1">
                🎓 {paper.college}
              </p>

              {/* Authors */}
              <p className="text-sm text-gray-500 mb-1">
                👨‍🎓 <span className="font-medium">{paper.authors}</span>
              </p>

              {/* Date */}
              <p className="text-xs text-gray-400 mb-3">📅 {paper.date}</p>

              {/* Description */}
              <p className="text-gray-600 text-sm flex-grow">
                {paper.description}
              </p>

              {/* View Button */}
              <div className="mt-4">
                <Link href={paper.link} target="_blank">
                  <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition">
                    View Paper
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}