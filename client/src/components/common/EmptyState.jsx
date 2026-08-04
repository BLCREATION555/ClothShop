import { FiInbox } from "react-icons/fi";

function EmptyState({
  title = "Nothing Found",
  description = "There is nothing to display.",
}) {
  return (
    <div className="flex flex-col justify-center items-center py-20">

      <FiInbox
        size={70}
        className="text-gray-300"
      />

      <h2 className="text-2xl font-bold mt-6">
        {title}
      </h2>

      <p className="text-gray-500 mt-3">
        {description}
      </p>

    </div>
  );
}

export default EmptyState;