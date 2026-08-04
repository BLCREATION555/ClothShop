import { useState } from "react";
import toast from "react-hot-toast";


function Newsletter() {

  const [email, setEmail] = useState("");


  const handleSubmit = (e) => {

    e.preventDefault();


    if (!email) {
      toast.error("Please enter your email");
      return;
    }


    toast.success("Subscribed successfully!");

    setEmail("");

  };


  return (

    <section className="py-20 bg-black text-white">


      <div className="max-w-5xl mx-auto px-6 text-center">


        <h2 className="text-4xl font-bold mb-4">
          Subscribe To Our Newsletter
        </h2>


        <p className="text-gray-300 mb-8">
          Get updates about new collections,
          offers and exclusive discounts.
        </p>



        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >


          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="px-5 py-3 rounded-lg text-black w-full md:w-96 outline-none"
          />


          <button
            className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200"
          >
            Subscribe
          </button>


        </form>


      </div>


    </section>

  );
}


export default Newsletter;