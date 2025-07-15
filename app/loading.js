export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center p-4">
      <div className="w-12 h-12 border-4 border-dashed border-orange-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-orange-600 font-medium">Loading, please wait...</p>
    </div>
  );
}