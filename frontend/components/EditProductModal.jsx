import React from "react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function EditProductModal({ onClose, product, fetchTableData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [condition, setCondition] = useState(product.condition);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:3000/api/products/${product.id}`, {
        title,
        condition,
        price,
        image,
      });
      <span className="loading loading-spinner loading-md"></span>;
      toast.success("Your item has been edited");
      fetchTableData();
      onClose();
    } catch (error) {
      alert("Error updating product", error);
    } finally {
      setIsLoading(false);
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
    <div>
      {/* <button className="btn" onClick={()=>document.getElementById('add_product_modal').showModal()}>open modal</button> */}
      <dialog id="add_product_modal" className="modal modal-open ">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Your Item</h3>
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
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </label>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Edit image</legend>
              <input
                type="file"
                className="file-input"
                onChange={handleImageChange}
              />
              {image && (
                <img
                  src={image}
                  alt=""
                  style={{ maxWidth: "100%", marginTop: 8 }}
                />
              )}
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
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default EditProductModal;
