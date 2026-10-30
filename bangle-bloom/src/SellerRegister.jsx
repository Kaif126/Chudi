import { useState } from "react";
import "./SellerRegister.css";

function SellerRegister({ onRegister }) {
  const [shopName, setShopName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const sellerDetails = {
      shopName: shopName.trim(),
      fullName: fullName.trim(),
      email: email.trim(),
    };

    onRegister(sellerDetails);
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <a className="register-logo" href="/">
          chudi<span>.</span>
        </a>

        <p className="register-eyebrow">YOUR JOURNEY STARTS HERE</p>

        <h1>Open your little corner.</h1>

        <p className="register-description">
          Create your shop and share your beautiful bangle
          collection with the world.
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="shopName">Shop name</label>
          <input
            id="shopName"
            type="text"
            placeholder="e.g. Noor Bangles"
            value={shopName}
            onChange={(event) => setShopName(event.target.value)}
            required
          />

          <label htmlFor="fullName">Your full name</label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
          />

          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button type="submit" className="register-button">
            Create my shop ↗
          </button>
        </form>

        <p className="register-footer">
          Every bangle tells a story.
        </p>
      </div>
    </div>
  );
}

export default SellerRegister;