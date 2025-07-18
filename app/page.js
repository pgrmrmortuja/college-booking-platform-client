"use client";
import Cards from "./components/Cards";
import CollegeGallery from "./components/Gallery";
import SearchComponent from "./components/Search";


export default function HomePage() {
  return (
    <div className="px-4 sm:px-8 lg:px-16 py-10">
      {/* Search Section */}
      <SearchComponent />

      <Cards></Cards>

      <CollegeGallery></CollegeGallery>

      
    </div>
  );
}
