import LoadingSpinner from "./LoadingSpinner";

function PageLoader() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <LoadingSpinner text="Loading page..." />
    </div>
  );
}

export default PageLoader;