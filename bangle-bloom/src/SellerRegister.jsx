
import "./SellerRegister.css";

function SellerRegister() {
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

        <form className="register-form">
          <label htmlFor="shopName">Shop name</label>
          <input
            id="shopName"
            type="text"
            placeholder="e.g. Noor Bangles"
            required
          />

          <label htmlFor="fullName">Your full name</label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
            minLength="8"
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
