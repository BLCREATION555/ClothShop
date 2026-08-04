import {
  FiAward,
  FiTruck,
  FiRefreshCw,
  FiShield,
} from "react-icons/fi";

function HeroFeatures() {
  return (
    <div
     className="
  mt-10

  grid
  grid-cols-2
  sm:grid-cols-4

  w-full

  gap-6

  justify-items-center
"
    >
      <div className="flex flex-col items-center text-center">
        <FiAward className="text-[#D89B00] mb-3" size={28} />

        <p className="font-semibold text-lg">
          Premium
        </p>

        <p className="text-gray-500">
          Quality
        </p>
      </div>

      <div className="flex flex-col items-center text-center">
        <FiTruck className="text-[#D89B00] mb-3" size={28} />

        <p className="font-semibold text-lg">
          Free
        </p>

        <p className="text-gray-500">
          Shipping
        </p>
      </div>

      <div className="flex flex-col items-center text-center">
        <FiRefreshCw className="text-[#D89B00] mb-3" size={28} />

        <p className="font-semibold text-lg">
          Easy
        </p>

        <p className="text-gray-500">
          Returns
        </p>
      </div>

      <div className="flex flex-col items-center text-center">
        <FiShield className="text-[#D89B00] mb-3" size={28} />

        <p className="font-semibold text-lg">
          Secure
        </p>

        <p className="text-gray-500">
          Payments
        </p>
      </div>
    </div>
  );
}

export default HeroFeatures;