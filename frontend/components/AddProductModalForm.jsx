import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function AddProductModal({ onClose, fetchTableData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const productData = { title, condition, price: Number(price), image };
      await addProduct(productData);
      toast.success("Your product has been added");
      onClose();
    } catch (err) {
      console.error("Error add product", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = async (newProductData) => {
    <span className="loading loading-spinner loading-lg"></span>;

    try {
      const response = await axios.post(
        "https://flea-market-crud.onrender.com/api/products",
        newProductData
      );
      console.log("Product added:", response.data);
      fetchTableData();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* <button className="btn" onClick={()=>document.getElementById('add_product_modal').showModal()}>open modal</button> */}
      <dialog id="add_product_modal" className="modal modal-open ">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add item to sell</h3>
          <form method="dialog" onSubmit={handleSubmit}>
            <label className="input input-bordered my-4 flex items-center gap-2">
              Title
              <input
                type="text"
                className="grow"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="input input-bordered my-4 flex items-center gap-2">
              Condition
              <input
                type="text"
                className="grow"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
            </label>
            <label className="input input-bordered my-4 flex items-center gap-2">
              Price
              <input
                type="number"
                className="grow"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Add an image</legend>
              <input
                type="file"
                className="file-input"
                onChange={handleImageChange}
              />
              <img src={image} alt="" />
            </fieldset>

            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>

            <button
              type="submit"
              className="btn btn-success mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Add Product"
              )}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
