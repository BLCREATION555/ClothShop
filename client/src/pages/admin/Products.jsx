import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiPlus,
  FiSearch,
  FiRefreshCw,
} from "react-icons/fi";

import AdminLayout from "../../components/admin/AdminLayout";

import ProductTable from "../../components/admin/ProductTable";

import {
  getAllProducts,
  deleteProduct,
} from "../../services/adminProduct.service";


function Products() {


  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");




  useEffect(() => {

    fetchProducts();

  }, []);





  const fetchProducts = async () => {

    try {

      setLoading(true);


      const res = await getAllProducts();


      setProducts(
        res.data || []
      );


    } catch(err){

      console.error(err);

      alert(
        "Failed to load products."
      );

    }
    finally{

      setLoading(false);

    }

  };







  const handleDelete = async(id)=>{


    if(
      !window.confirm(
        "Delete this product permanently?"
      )
    )
    return;



    try{


      await deleteProduct(id);



      setProducts((prev)=>

        prev.filter(
          (item)=>item.id !== id
        )

      );



      alert(
        "Product deleted successfully."
      );


    }
    catch(err){

      console.error(err);

      alert(
        "Failed to delete product."
      );

    }


  };







  const filteredProducts = useMemo(()=>{


    return products.filter((product)=>{


      const productName =
        product.name?.toLowerCase() || "";



      const categoryName =
        product.category?.name?.toLowerCase() || "";



      return (

        productName.includes(
          search.toLowerCase()
        )

        ||

        categoryName.includes(
          search.toLowerCase()
        )

      );


    });



  },[products,search]);







  return (

    <AdminLayout>


      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">


        <div>


          <h1 className="text-4xl font-bold">

            Products

          </h1>



          <p className="text-gray-500 mt-2">

            Manage your store products.

          </p>


        </div>





        <Link

          to="/admin/products/add"

          className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-900"

        >

          <FiPlus/>

          Add Product


        </Link>



      </div>







      <div className="bg-white rounded-2xl shadow-sm border p-5 mb-6 flex flex-col lg:flex-row gap-4">



        <div className="relative flex-1">


          <FiSearch className="absolute left-4 top-4 text-gray-400"/>



          <input

            type="text"

            placeholder="Search products..."

            value={search}

            onChange={(e)=>
              setSearch(e.target.value)
            }

            className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-black"

          />


        </div>






        <button

          onClick={fetchProducts}

          className="border rounded-xl px-5 flex items-center justify-center gap-2 hover:bg-gray-100"

        >

          <FiRefreshCw/>

          Refresh


        </button>



      </div>







      {
        loading ? (

          <div className="bg-white rounded-2xl p-16 text-center text-xl font-semibold shadow-sm">

            Loading Products...

          </div>


        )


        : filteredProducts.length === 0 ? (


          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">


            <h2 className="text-2xl font-bold">

              No Products Found

            </h2>



            <p className="text-gray-500 mt-3">

              Add your first product to get started.

            </p>



          </div>


        )


        : (


          <ProductTable

            products={filteredProducts}

            onDelete={handleDelete}

          />


        )

      }




    </AdminLayout>

  );

}



export default Products;