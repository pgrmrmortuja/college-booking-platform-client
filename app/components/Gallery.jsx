import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
    {
        original: "/graduates1.jpeg",
        thumbnail: "/graduates1.jpeg",
        description: "Dhaka College Graduates 2024",
    },
    {
        original: "/graduates2.jpeg",
        thumbnail: "/graduates2.jpeg",
        description: "Rajshahi College Graduates 2024",
    },
    {
        original: "/graduates3.jpeg",
        thumbnail: "/graduates3.jpeg",
        description: "Notre Dame College Graduates 2024",
    },
];

export default function CollegeGallery() {
    return (
        <div className="py-10 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-6">
                College Image Gallery
            </h2>

            <div className="max-w-4xl mx-auto">
                <ImageGallery
                    items={images}
                    autoPlay
                    slideInterval={3000}
                    showFullscreenButton
                    showPlayButton={false}
                />
            </div>
        </div>
    );
}
