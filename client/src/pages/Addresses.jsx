import React, { useEffect, useState } from "react";
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../services/addressService";

const initialForm = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
};

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(initialForm);

  const fetchAddresses = async () => {
    try {
      const res = await getAddresses();
      setAddresses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const openEditModal = (address) => {
    setEditingId(address.id);

    setFormData({
      fullName: address.fullName,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      country: address.country,
      pincode: address.pincode,
    });

    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateAddress(editingId, formData);
      } else {
        await createAddress(formData);
      }

      setShowModal(false);
      setFormData(initialForm);
      setEditingId(null);

      fetchAddresses();
    } catch (err) {
      console.error(err);
      alert("Failed to save address.");
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Delete this address?"
    );

    if (!ok) return;

    try {
      await deleteAddress(id);
      fetchAddresses();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }
    return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              My Addresses
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your saved delivery addresses.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            + Add Address
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="bg-white border rounded-xl p-12 text-center shadow">

            <h2 className="text-2xl font-semibold">
              No Addresses Found
            </h2>

            <p className="text-gray-500 mt-3">
              Add your first delivery address.
            </p>

            <button
              onClick={openAddModal}
              className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
            >
              Add Address
            </button>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {addresses.map((item) => (

              <div
                key={item.id}
                className="border rounded-xl p-6 shadow-sm bg-white"
              >

                <h2 className="text-xl font-bold">
                  {item.fullName}
                </h2>

                <p className="mt-2">
                  {item.phone}
                </p>

                <p className="mt-2">
                  {item.address}
                </p>

                <p>
                  {item.city}, {item.state}
                </p>

                <p>
                  {item.country} - {item.pincode}
                </p>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() => openEditModal(item)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white rounded-xl w-full max-w-xl p-8">

            <h2 className="text-2xl font-bold mb-6">

              {editingId
                ? "Edit Address"
                : "Add Address"}

            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />

              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />

              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                rows="3"
                required
              />

              <div className="grid grid-cols-2 gap-4">

                <input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                  required
                />

                <input
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                  required
                />

                <input
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                  required
                />

                <input
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="border rounded-lg p-3"
                  required
                />
                               </div>

              <div className="flex justify-end gap-3 pt-4">

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                    setFormData(initialForm);
                  }}
                  className="px-5 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  {editingId ? "Update Address" : "Save Address"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </>
  );
};

export default Addresses;