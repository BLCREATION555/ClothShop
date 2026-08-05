import { Link } from "react-router-dom";

import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiPackage,
} from "react-icons/fi";


function ProductTable({ products, onDelete }) {

  return (

    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">


      <div className="overflow-x-auto">


        <table className="min-w-full">


          <thead className="bg-gray-100">

            <tr className="text-left">


              <th className="px-6 py-4 font-semibold">
                Product
              </th>


              <th className="px-6 py-4 font-semibold">
                Category
              </th>


              <th className="px-6 py-4 font-semibold">
                Brand
              </th>


              <th className="px-6 py-4 font-semibold">
                Price
              </th>


              <th className="px-6 py-4 font-semibold">
                Stock
              </th>


              <th className="px-6 py-4 font-semibold text-center">
                Actions
              </th>


            </tr>

          </thead>




          <tbody>


            {products.map((product)=>(


              <tr
                key={product.id}
                className="border-t hover:bg-gray-50 transition"
              >



                {/* Product */}

                <td className="px-6 py-5">


                  <div className="flex items-center gap-4">


                    <img

                     src={
  product.images?.length
    ? product.images[0].imageUrl
    : "/placeholder.png"
}

                      alt={product.name}

                      className="w-16 h-16 rounded-xl object-cover border"

                    />



                    <div>


                      <h3 className="font-semibold text-gray-900">

                        {product.name}

                      </h3>



                      <p className="text-sm text-gray-500">

                        {product.fit}

                      </p>


                    </div>


                  </div>


                </td>





                {/* Category FIXED */}

                <td className="px-6 py-5">

                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">

                    {product.category?.name || "No Category"}

                  </span>

                </td>






                {/* Brand */}

                <td className="px-6 py-5">

                  {product.brand}

                </td>






                {/* Price */}

                <td className="px-6 py-5 font-bold text-green-600">

                  ₹
                  {(
                    product.discountPrice ||
                    product.price
                  ).toFixed(2)}

                </td>







                {/* Stock */}

                <td className="px-6 py-5">


                  {
                    product.stock > 10 ? (


                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                        {product.stock} In Stock

                      </span>



                    ) : product.stock > 0 ? (



                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">

                        {product.stock} Low

                      </span>




                    ) : (



                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">

                        Out of Stock

                      </span>


                    )
                  }


                </td>








                {/* Actions */}

                <td className="px-6 py-5">


                  <div className="flex justify-center gap-2">


                    <Link

                      to={`/product/${product.id}`}

                      className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-gray-100"

                    >

                      <FiEye />

                    </Link>




                    <Link

                      to={`/admin/products/edit/${product.id}`}

                      className="w-10 h-10 rounded-lg bg-yellow-500 text-white flex items-center justify-center hover:bg-yellow-600"

                    >

                      <FiEdit />

                    </Link>




                    <button

                      onClick={() => onDelete(product.id)}

                      className="w-10 h-10 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600"

                    >

                      <FiTrash2 />

                    </button>



                  </div>


                </td>




              </tr>


            ))}






            {products.length === 0 && (


              <tr>


                <td

                  colSpan="6"

                  className="text-center py-20"

                >


                  <FiPackage

                    size={50}

                    className="mx-auto text-gray-300 mb-4"

                  />



                  <h2 className="text-2xl font-bold">

                    No Products Found

                  </h2>



                  <p className="text-gray-500 mt-2">

                    Add your first product to start selling.

                  </p>



                </td>


              </tr>


            )}



          </tbody>


        </table>


      </div>


    </div>

  );

}


export default ProductTable;