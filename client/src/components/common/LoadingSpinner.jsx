function LoadingSpinner({
  size = "h-12 w-12",
  text = "Loading...",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10">

      <div
        className={`${size} rounded-full border-4 border-gray-200 border-t-black animate-spin`}
      />

      <p className="mt-4 text-gray-500 font-medium">
        {text}
      </p>

    </div>
  );
}

export default LoadingSpinner;