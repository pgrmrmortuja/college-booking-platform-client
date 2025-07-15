'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-gray-700 mb-4">We’re sorry, but an unexpected error has occurred.</p>
      <button
        onClick={() => reset()}
        className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
      >
        Try Again
      </button>
    </div>
  );
}
