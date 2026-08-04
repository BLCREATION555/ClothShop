import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { getAddresses } from "../services/addressService";
import { placeOrder } from "../services/orderService";

import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../services/payment.service";

import { useCart } from "../context/CartContext";


function Checkout() {

  const navigate = useNavigate();


  const {
    cartItems,
    loading,
  } = useCart();



  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [placingOrder, setPlacingOrder] =
    useState(false);



  useEffect(() => {

    fetchAddresses();

  }, []);




  const fetchAddresses = async () => {

    try {

      const res = await getAddresses();

      const data = res.data || [];

      setAddresses(data);


      if(data.length > 0){

        setSelectedAddress(data[0].id);

      }


    } catch(err){

      console.error(err);

    }

  };





  const total = useMemo(() => {

    return cartItems.reduce(

      (sum,item)=>

        sum +

        item.quantity *

        (
          item.product.discountPrice ||
          item.product.price
        ),

      0

    );

  },[cartItems]);






  const handlePlaceOrder = async () => {


    if(!selectedAddress){

      alert(
        "Please select an address."
      );

      return;

    }



    try{


      setPlacingOrder(true);




      // COD PAYMENT

      if(paymentMethod === "COD"){


        await placeOrder(
          selectedAddress
        );


        alert(
          "Order placed successfully!"
        );


        navigate("/orders");


        return;

      }






      // RAZORPAY PAYMENT


      const razorpayResponse =
        await createRazorpayOrder(total);



      const razorpayOrder =
        razorpayResponse.data;



      const options = {


        key:
          import.meta.env
          .VITE_RAZORPAY_KEY_ID,



        amount:
          razorpayOrder.amount,



        currency:
          razorpayOrder.currency,



        name:
          "BL CREATION",



        description:
          "Fashion Purchase",



        order_id:
          razorpayOrder.id,



        handler:
          async function(response){



            const verifyResponse =
              await verifyRazorpayPayment({

                razorpay_order_id:
                  response.razorpay_order_id,


                razorpay_payment_id:
                  response.razorpay_payment_id,


                razorpay_signature:
                  response.razorpay_signature,


              });





            if(
              verifyResponse.data.verified
            ){


              await placeOrder(
                selectedAddress
              );



              alert(
                "Payment successful! Order placed."
              );



              navigate("/orders");



            }
            else{


              alert(
                "Payment verification failed."
              );


            }


          },



        prefill: {

          name:
            "BL CREATION",

        },



        theme: {

          color:
            "#000000",

        },


      };




      const razorpay =
        new window.Razorpay(options);



      razorpay.open();




    }
    catch(err){


      console.error(err);



      alert(

        err?.response?.data?.message ||

        "Payment failed."

      );


    }
    finally{


      setPlacingOrder(false);


    }


  };






  if(loading){

    return (

      <div className="flex justify-center items-center h-96">

        <h1 className="text-2xl font-bold">
          Loading Checkout...
        </h1>

      </div>

    );

  }





  if(cartItems.length === 0){

    return (

      <div className="max-w-5xl mx-auto py-20 text-center">


        <h1 className="text-4xl font-bold">

          Your Cart is Empty

        </h1>



        <Link

          to="/"

          className="inline-block mt-8 bg-black text-white px-8 py-3 rounded-lg"

        >

          Continue Shopping

        </Link>



      </div>

    );

  }






  return (

    <div className="max-w-7xl mx-auto px-6 py-10">


      <h1 className="text-4xl font-bold mb-10">

        Checkout

      </h1>





      <div className="grid lg:grid-cols-3 gap-8">



        <div className="lg:col-span-2 space-y-8">





          <div className="bg-white shadow rounded-xl p-6">


            <h2 className="text-2xl font-bold mb-5">

              Delivery Address

            </h2>




            {addresses.map(address=>(


              <label

                key={address.id}

                className="border rounded-lg p-4 flex gap-4 mb-4 cursor-pointer"

              >


                <input

                  type="radio"

                  checked={
                    selectedAddress === address.id
                  }

                  onChange={()=>setSelectedAddress(address.id)}

                />



                <div>

                  <h3 className="font-bold">

                    {address.fullName}

                  </h3>


                  <p>
                    {address.phone}
                  </p>


                  <p>

                    {address.address},
                    {address.city},
                    {address.state}

                  </p>


                </div>


              </label>


            ))}


          </div>






          <div className="bg-white shadow rounded-xl p-6">


            <h2 className="text-2xl font-bold mb-5">

              Payment Method

            </h2>




            <label className="flex gap-3 mb-4">


              <input

                type="radio"

                checked={paymentMethod==="COD"}

                onChange={()=>setPaymentMethod("COD")}

              />

              Cash on Delivery


            </label>





            <label className="flex gap-3">


              <input

                type="radio"

                checked={paymentMethod==="RAZORPAY"}

                onChange={()=>setPaymentMethod("RAZORPAY")}

              />

              Razorpay


            </label>



          </div>




        </div>







        <div>


          <div className="bg-white shadow rounded-xl p-6 sticky top-24">


            <h2 className="text-2xl font-bold mb-5">

              Order Summary

            </h2>



            <div className="text-2xl font-bold flex justify-between">

              <span>Total</span>


              <span>

                ₹{total.toFixed(2)}

              </span>


            </div>




            <button

              onClick={handlePlaceOrder}

              disabled={placingOrder}

              className="w-full mt-8 bg-black text-white py-4 rounded-xl"

            >

              {placingOrder
                ? "Processing..."
                : "Place Order"}

            </button>



          </div>


        </div>



      </div>


    </div>

  );

}



export default Checkout;