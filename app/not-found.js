import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-4">
            <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-4">404</h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link
                href="/"
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition duration-300"
            >
                Go Back Home
            </Link>
        </div>
    );
}
