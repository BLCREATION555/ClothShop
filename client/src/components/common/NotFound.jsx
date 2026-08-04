import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6">

      <h1 className="text-8xl font-black">
        404
      </h1>

      <h2 className="text-3xl font-bold mt-6">
        Page Not Found
      </h2>

      <p className="text-gray-500 mt-4 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-8 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800"
      >
        Go Home
      </Link>

    </div>
  );
}

export default NotFound;