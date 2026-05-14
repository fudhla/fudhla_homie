export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-pink-500 text-lg font-medium">Glow Care Loading...</p>
    </div>
  );
}