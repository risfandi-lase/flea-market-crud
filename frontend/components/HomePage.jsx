import React, { useState, useEffect } from "react";
import axios from "axios";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import AddProductModal from "./AddProductModalForm";
import EditProductModal from "./EditProductModal";
import toast from "react-hot-toast";

function HomePage() {
  const [tableData, setTableData] = useState([]);
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [isShowingEditModal, setIsShowingEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setTableData(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   const products = [
  //     { id: 1, title: "Fan", price: 12, condition: "Good" },
  //     { id: 2, title: "Book", price: 2, condition: "Very good" },
  //     { id: 3, title: "Scissors", price: 12, condition: "Bad" },
  //     { id: 4, title: "Lamp", price: 8, condition: "Excellent" },
  //     { id: 5, title: "Mug", price: 5, condition: "Fair" },
  //     { id: 6, title: "Mouse", price: 20, condition: "Good" },
  //   ];

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`http://localhost:3000/api/products/${productId}`);
      fetchData();
      toast.error("Your item has been removed");
    } catch (err) {
      console.error(err.message);
      alert("Failed to delete product.");
    }
  };

  return (
    <main className="mx-auto px-4 py-8 max-w-6xl">
      {isShowingModal && (
        <AddProductModal
          onClose={() => setIsShowingModal(false)}
          fetchTableData={fetchData}
        />
      )}

      {isShowingEditModal && (
        <EditProductModal
          onClose={() => setIsShowingEditModal(false)}
          product={editProduct}
          fetchTableData={fetchData}
        />
      )}

      <div className="flex justify-between items-center mb-8">
        <button
          className="btn btn-primary"
          onClick={() => setIsShowingModal(true)}
        >
          <PlusCircleIcon className="size-5 mr-2" />
          Add Product
        </button>
      </div>

      {tableData.length === 0 && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold ">No products found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding your first product to the inventory
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tableData.map((product) => (
          <div
            key={product.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <figure>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title text-lg font-semibold">
                {product.title}
              </h2>
              <p>Condition: {product.condition}</p>
              <p className="text-2xl font-bold text-primary">
                ${product.price}
              </p>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditProduct(product);
                    setIsShowingEditModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default HomePage;
