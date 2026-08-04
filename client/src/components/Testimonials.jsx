import SectionTitle from "./SectionTitle";
import { FiStar } from "react-icons/fi";

const reviews = [
  {
    name: "Rahul Sharma",
    city: "Jaipur",
    review:
      "Amazing quality and perfect fitting. Definitely buying again.",
  },
  {
    name: "Priya Singh",
    city: "Delhi",
    review:
      "Premium fabric and fast delivery. Loved BL CREATION.",
  },
  {
    name: "Amit Verma",
    city: "Mumbai",
    review:
      "Excellent customer support and stylish collection.",
  },
];

function Testimonials() {
  return (
    <section className="py-20 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          title="What Our Customers Say"
          subtitle="Thousands of happy customers."
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {reviews.map((item) => (

            <div
              key={item.name}
              className="bg-white rounded-2xl shadow-lg p-8"
            >

              <div className="flex text-yellow-500 mb-4">

                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    fill="currentColor"
                  />
                ))}

              </div>

              <p className="text-gray-600 leading-7">
                "{item.review}"
              </p>

              <div className="mt-6">

                <h3 className="font-bold">
                  {item.name}
                </h3>

                <p className="text-gray-500">
                  {item.city}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;