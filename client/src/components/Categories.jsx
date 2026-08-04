import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import SectionTitle from "./SectionTitle";

const categories = [
  {
    name: "Men",
    path: "/men",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000",
    description: "Premium shirts, t-shirts, jeans & more",
  },
  {
    name: "Kids",
    path: "/kids",
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1000",
    description: "Comfortable & stylish outfits for kids",
  },
];

function Categories() {
  return (
    <section className="max-w-7xl mx-auto py-24 px-6">

      <SectionTitle
        title="Shop by Category"
        subtitle="Choose your favourite collection and discover premium fashion."
      />

      <div className="grid lg:grid-cols-2 gap-8 mt-12">

        {categories.map((category) => (

          <Link
            key={category.name}
            to={category.path}
            className="group relative overflow-hidden rounded-3xl h-[500px] shadow-xl"
          >

            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-10 text-white">

              <h2 className="text-5xl font-black">
                {category.name}
              </h2>

              <p className="mt-4 text-lg text-gray-200">
                {category.description}
              </p>

              <div className="inline-flex items-center gap-3 mt-8 bg-white text-black px-6 py-3 rounded-xl font-semibold group-hover:bg-yellow-400 transition">

                Shop Now

                <FiArrowRight />

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default Categories;