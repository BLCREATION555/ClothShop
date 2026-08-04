import {
  FiAward,
  FiTruck,
  FiShield,
  FiUsers,
} from "react-icons/fi";

function About() {
  return (
    <div className="bg-gray-50">

      {/* Hero */}

      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl lg:text-6xl font-bold">
            About BL CREATION
          </h1>

          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto leading-8">
            We create premium fashion that combines
            quality, comfort, and modern style.
            Every product is designed to help you
            look confident every day.
          </p>

        </div>
      </section>

      {/* Story */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
            alt="Our Store"
            className="rounded-3xl shadow-xl"
          />

          <div>

            <h2 className="text-4xl font-bold mb-6">
              Our Story
            </h2>

            <p className="text-gray-600 leading-8 mb-5">
              BL CREATION was founded with one mission:
              to provide stylish, high-quality clothing
              at affordable prices.
            </p>

            <p className="text-gray-600 leading-8">
              We carefully select premium fabrics and
              modern designs so every customer receives
              fashion that looks great and feels
              comfortable.
            </p>

          </div>

        </div>

      </section>

      {/* Why Choose Us */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose BL CREATION?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-gray-50 p-8 rounded-2xl text-center shadow">

              <FiAward
                className="mx-auto text-yellow-500"
                size={42}
              />

              <h3 className="font-bold text-xl mt-5">
                Premium Quality
              </h3>

              <p className="text-gray-500 mt-4">
                Carefully selected fabrics with
                excellent finishing.
              </p>

            </div>

            <div className="bg-gray-50 p-8 rounded-2xl text-center shadow">

              <FiTruck
                className="mx-auto text-green-600"
                size={42}
              />

              <h3 className="font-bold text-xl mt-5">
                Fast Delivery
              </h3>

              <p className="text-gray-500 mt-4">
                Quick and secure shipping across India.
              </p>

            </div>

            <div className="bg-gray-50 p-8 rounded-2xl text-center shadow">

              <FiShield
                className="mx-auto text-blue-600"
                size={42}
              />

              <h3 className="font-bold text-xl mt-5">
                Secure Shopping
              </h3>

              <p className="text-gray-500 mt-4">
                Safe checkout with trusted payment methods.
              </p>

            </div>

            <div className="bg-gray-50 p-8 rounded-2xl text-center shadow">

              <FiUsers
                className="mx-auto text-purple-600"
                size={42}
              />

              <h3 className="font-bold text-xl mt-5">
                Happy Customers
              </h3>

              <p className="text-gray-500 mt-4">
                Thousands of satisfied customers trust us.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-black text-white py-20">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-5xl font-bold">
            Join the BL CREATION Family
          </h2>

          <p className="mt-6 text-gray-300 text-lg">
            Discover premium fashion crafted with
            passion and designed for everyday confidence.
          </p>

        </div>

      </section>

    </div>
  );
}

export default About;