import { useState } from "react";
import toast from "react-hot-toast";

import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
} from "react-icons/fi";

import { sendMessage } from "../services/contact.service";

function Contact() {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("✅ BUTTON CLICKED");
  console.log(form);

  try {
    setLoading(true);

    console.log("Calling API...");

    const result = await sendMessage(form);

    console.log("API Response:", result);

    toast.success("Message sent successfully.");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  } catch (err) {

    console.log("FULL ERROR:", err);
    console.log("STATUS:", err.response?.status);
    console.log("DATA:", err.response?.data);

    toast.error(
      err?.response?.data?.message ||
      "Failed to send message."
    );

  } finally {

    setLoading(false);

  }
};
  return (

    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}

      <section className="bg-black text-white py-24">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold">
            Contact Us
          </h1>

          <p className="mt-6 text-xl text-gray-300">
            We'd love to hear from you.
          </p>

        </div>

      </section>

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12">

        {/* Contact Form */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-8">
            Send us a Message
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
                      <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-xl p-4"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-xl p-4"
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border rounded-xl p-4"
              required
            />

            <textarea
              rows="6"
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="w-full border rounded-xl p-4"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 disabled:opacity-50"
            >
              {loading
                ? "Sending..."
                : "Send Message"}
            </button>

          </form>

        </div>

        {/* Contact Info */}

        <div className="space-y-8">

          <div className="bg-white p-6 rounded-2xl shadow flex gap-5">

            <FiMapPin size={28} />

            <div>

              <h3 className="font-bold text-xl">
                Address
              </h3>

              <p className="text-gray-600 mt-2">
                Jaipur, Rajasthan, India
              </p>

            </div>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow flex gap-5">

            <FiPhone size={28} />

            <div>

              <h3 className="font-bold text-xl">
                Phone
              </h3>

              <p className="text-gray-600 mt-2">
                +91 XXXXX XXXXX
              </p>

            </div>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow flex gap-5">

            <FiMail size={28} />

            <div>

              <h3 className="font-bold text-xl">
                Email
              </h3>

              <p className="text-gray-600 mt-2">
                support@blcreation.com
              </p>

            </div>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow flex gap-5">

            <FiClock size={28} />

            <div>

              <h3 className="font-bold text-xl">
                Business Hours
              </h3>

              <p className="text-gray-600 mt-2">
                Monday - Saturday
              </p>

              <p className="text-gray-600">
                9:00 AM - 7:00 PM
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Contact; 
