import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

function FAQ() {

  const [open, setOpen] = useState(null);


  const questions = [
    {
      question: "How can I place an order?",
      answer:
        "Select your favourite product, add it to your cart, choose your delivery address, and complete checkout."
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "Currently we support Cash on Delivery. Online payment options will be available soon."
    },
    {
      question: "How long does delivery take?",
      answer:
        "Orders are usually delivered within 5-7 working days depending on your location."
    },
    {
      question: "Can I return my order?",
      answer:
        "Yes, we offer easy returns according to our return policy."
    },
    {
      question: "How can I track my order?",
      answer:
        "You can check your order status from the My Orders section in your account."
    },
    {
      question: "Do you provide original products?",
      answer:
        "Yes, all BL CREATION products are quality checked before shipping."
    },
  ];


  return (

    <div className="bg-gray-50 min-h-screen">


      <section className="bg-black text-white py-24">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold">
            Frequently Asked Questions
          </h1>

          <p className="mt-6 text-gray-300 text-lg">
            Find answers to common questions about BL CREATION.
          </p>

        </div>

      </section>



      <section className="max-w-4xl mx-auto px-6 py-20">


        <div className="space-y-5">


          {questions.map((item,index)=>(

            <div
              key={index}
              className="bg-white rounded-xl shadow"
            >

              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="w-full flex justify-between items-center p-6 text-left"
              >

                <h3 className="font-bold text-lg">
                  {item.question}
                </h3>


                <FiChevronDown
                  className={`transition ${
                    open === index
                    ? "rotate-180"
                    : ""
                  }`}
                  size={24}
                />

              </button>



              {open === index && (

                <div className="px-6 pb-6 text-gray-600 leading-7">

                  {item.answer}

                </div>

              )}


            </div>

          ))}


        </div>


      </section>


    </div>

  );

}

export default FAQ;