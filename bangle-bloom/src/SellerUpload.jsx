
import React, { useState } from "react";
import "./SellerUpload.css";

function SellerUpload({ onAddProduct, onBack }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [seller, setSeller] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      category: category.trim(),
      price: Number(price),
      seller: seller.trim(),
      image: image.trim(),
    };

    onAddProduct(newProduct);
    onBack();
  }

  return (
    <div className="seller-upload-page">
      <button
        type="button"
        className="seller-back-button"
        onClick={onBack}
      >
        ← Back to Chudi
      </button>

      <div className="seller-upload-card">
        <h1>List Your Bangles</h1>
        <p>Add your product to the Chudi marketplace.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="productName">Product Name</label>
          <input
            id="productName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Rose Gold Kada Set"
            required
          />

          <label htmlFor="productCategory">Category</label>
          <input
            id="productCategory"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder="e.g. Festive Collection"
            required
          />

          <label htmlFor="productPrice">Price (₹)</label>
          <input
            id="productPrice"
            type="number"
            min="1"
            step="1"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="799"
            required
          />

          <label htmlFor="sellerName">Seller / Shop Name</label>
          <input
            id="sellerName"
            value={seller}
            onChange={(event) => setSeller(event.target.value)}
            placeholder="Your shop name"
            required
          />

          <label htmlFor="productImage">Product Image URL</label>
          <input
            id="productImage"
            type="url"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="https://example.com/bangles.jpg"
            required
          />

          <button type="submit" className="seller-submit-button">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default SellerUpload;
