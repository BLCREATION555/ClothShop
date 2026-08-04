import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiStar,
} from "react-icons/fi";


function WhyChooseUs() {

  const features = [
    {
      icon: <FiTruck size={35} />,
      title: "Fast Delivery",
      description:
        "Quick and reliable delivery to your doorstep.",
    },

    {
      icon: <FiShield size={35} />,
      title: "Premium Quality",
      description:
        "High quality fabrics and stylish designs.",
    },

    {
      icon: <FiRefreshCw size={35} />,
      title: "Easy Returns",
      description:
        "7 days easy return and exchange policy.",
    },

    {
      icon: <FiStar size={35} />,
      title: "Customer Satisfaction",
      description:
        "Loved by customers for style and comfort.",
    },
  ];


  return (

    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">


        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose BL CREATION?
        </h2>


        <div className="grid md:grid-cols-4 gap-8">


          {features.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow hover:shadow-xl transition"
            >

              <div className="flex justify-center mb-5 text-black">
                {item.icon}
              </div>


              <h3 className="text-xl font-bold mb-3">
                {item.title}
              </h3>


              <p className="text-gray-600">
                {item.description}
              </p>


            </div>

          ))}


        </div>


      </div>


    </section>

  );
}


export default WhyChooseUs;