
import { useState } from "react";

function SellerPractice() {
  const [shopName, setShopName] = useState("");

  return (
    <div>
      <h1>Create your Chudi shop</h1>

      <label htmlFor="shopName">Shop name:</label>

      <input
        id="shopName"
        type="text"
        placeholder="Enter your shop name"
        value={shopName}
        onChange={(event) => setShopName(event.target.value)}
      />

      {shopName === "" ? (
  <p>Please enter your shop name to continue.</p>
) : (
  <h2>Welcome to {shopName}!</h2>
)}
    </div>
  );
}

export default SellerPractice;
