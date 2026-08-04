import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FiShoppingBag,
  FiHeart,
  FiMapPin,
  FiShoppingCart,
  FiUser,
  FiLock,
} from "react-icons/fi";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../services/auth.service";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";


function Profile() {

  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();


  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });


  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });


  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);



  useEffect(() => {
    fetchProfile();
  }, []);



  const fetchProfile = async () => {

    try {

      const res = await getProfile();

      setProfile({
        name: res.data.name,
        email: res.data.email,
      });


    } catch(err){

      toast.error("Failed to load profile.");

    }
    finally{

      setLoading(false);

    }

  };



  const handleProfileChange = (e)=>{

    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

  };



  const handlePasswordChange=(e)=>{

    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });

  };



  const handleUpdateProfile=async(e)=>{

    e.preventDefault();

    try{

      setSavingProfile(true);

      await updateProfile(profile);

      toast.success(
        "Profile updated successfully."
      );

    }
    catch(err){

      toast.error(
        err.response?.data?.message ||
        "Failed to update profile."
      );

    }
    finally{

      setSavingProfile(false);

    }

  };



  const handleChangePassword=async(e)=>{

    e.preventDefault();

    try{

      setSavingPassword(true);

      await changePassword(passwordData);


      toast.success(
        "Password changed successfully."
      );


      setPasswordData({
        currentPassword:"",
        newPassword:"",
      });


    }
    catch(err){

      toast.error(
        err.response?.data?.message ||
        "Failed to change password."
      );

    }
    finally{

      setSavingPassword(false);

    }

  };



  if(loading){

    return(

      <div className="h-96 flex justify-center items-center">

        <h1 className="text-2xl font-bold">
          Loading Profile...
        </h1>

      </div>

    );

  }



  return (

    <div className="max-w-6xl mx-auto px-6 py-10">


      {/* Header */}

      <div className="bg-black text-white rounded-3xl p-8 mb-10 flex items-center gap-6">


        <div className="bg-white text-black rounded-full p-5">

          <FiUser size={40}/>

        </div>


        <div>

          <h1 className="text-4xl font-bold">
            {profile.name}
          </h1>

          <p className="text-gray-300 mt-2">
            {profile.email}
          </p>

        </div>


      </div>



      {/* Quick Actions */}


      <div className="grid md:grid-cols-4 gap-6 mb-10">


        <Link
          to="/orders"
          className="bg-white shadow rounded-xl p-6 hover:shadow-xl transition"
        >

          <FiShoppingBag size={30}/>

          <h3 className="font-bold mt-4">
            Orders
          </h3>

        </Link>



        <Link
          to="/wishlist"
          className="bg-white shadow rounded-xl p-6 hover:shadow-xl transition"
        >

          <FiHeart size={30}/>

          <h3 className="font-bold mt-4">
            Wishlist ({wishlistItems.length})
          </h3>

        </Link>



        <Link
          to="/addresses"
          className="bg-white shadow rounded-xl p-6 hover:shadow-xl transition"
        >

          <FiMapPin size={30}/>

          <h3 className="font-bold mt-4">
            Addresses
          </h3>

        </Link>



        <Link
          to="/cart"
          className="bg-white shadow rounded-xl p-6 hover:shadow-xl transition"
        >

          <FiShoppingCart size={30}/>

          <h3 className="font-bold mt-4">
            Cart ({cartItems.length})
          </h3>

        </Link>


      </div>





      <div className="grid md:grid-cols-2 gap-8">



        {/* Profile Update */}


        <form
          onSubmit={handleUpdateProfile}
          className="bg-white shadow rounded-xl p-6"
        >

          <h2 className="text-2xl font-bold mb-6 flex gap-2 items-center">

            <FiUser/>

            Profile Information

          </h2>



          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            className="w-full border rounded-lg p-3 mb-5"
          />



          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            className="w-full border rounded-lg p-3 mb-5"
          />



          <button
            disabled={savingProfile}
            className="w-full bg-black text-white py-3 rounded-lg"
          >

            {
              savingProfile
              ?"Saving..."
              :"Update Profile"
            }

          </button>


        </form>





        {/* Password */}


        <form
          onSubmit={handleChangePassword}
          className="bg-white shadow rounded-xl p-6"
        >


          <h2 className="text-2xl font-bold mb-6 flex gap-2 items-center">

            <FiLock/>

            Change Password

          </h2>



          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            className="w-full border rounded-lg p-3 mb-5"
          />



          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="w-full border rounded-lg p-3 mb-5"
          />



          <button
            disabled={savingPassword}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >

            {
              savingPassword
              ?"Updating..."
              :"Change Password"
            }

          </button>


        </form>


      </div>


    </div>

  );

}


export default Profile;