import React from "react";
import "./App.css";
import SellerRegister from "./SellerRegister";
import { useEffect, useState } from "react";
import SellerUpload from "./SellerUpload";


const initialProducts = [
  {
    id: 1,
    name: "Rose Gold Kada Set",
    category: "Everyday Elegance",
    price: 799,
    seller: "Aarohi Jewellery",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "Classic Golden Bangles",
    category: "Timeless Classics",
    price: 1199,
    seller: "The Bangle Studio",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    name: "Pearl Charm Bracelet",
    category: "Modern Collection",
    price: 649,
    seller: "Noor Collections",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    name: "Festive Gold Set",
    category: "Festive Favourites",
    price: 1499,
    seller: "Meher Boutique",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=80",
  },
];

function App() {
  const [products, setProducts] = useState(() => {
  try {
    const savedProducts = localStorage.getItem("chudi-products");

    return savedProducts
      ? JSON.parse(savedProducts)
      : initialProducts;
  } catch (error) {
    return initialProducts;
  }
});

  function handleAddProduct(newProduct) {
  setProducts((previousProducts) => [
    ...previousProducts,
    newProduct,
  ]);
}

function handleSellerRegister(sellerDetails) {
  setRegisteredSeller(sellerDetails);
  setShowSellerRegister(false);
  setShowSellerUpload(true);
}

  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orders, setOrders] = useState(() => {
  try {
    const savedOrders = localStorage.getItem("chudi-orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  } catch (error) {
    return [];
  }
});

const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [customerName, setCustomerName] = useState("");
const [customerPhone, setCustomerPhone] = useState("");
const [customerAddress, setCustomerAddress] = useState("");
  const [showSellerRegister, setShowSellerRegister] = React.useState(false);
  const [registeredSeller, setRegisteredSeller] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showSellerUpload, setShowSellerUpload] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [cart, setCart] = useState(() => {
  try {
    const savedCart = localStorage.getItem("chudi-cart");

    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (error) {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem("chudi-cart", JSON.stringify(cart));
}, [cart]);

useEffect(() => {
  localStorage.setItem("chudi-products", JSON.stringify(products));
}, [products]);

useEffect(() => {
  localStorage.setItem("chudi-orders", JSON.stringify(orders));
}, [orders]);
  const totalQuantity = cart.reduce(
  (sum, item) => sum + item.quantity,
  0
);


const subtotal = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);


  function addToCart(product) {
  setCart((previousCart) => {
    const existingProduct = previousCart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      return previousCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...previousCart, { ...product, quantity: 1 }];
  });
}


function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) {
    return;
  }

  setCart((previousCart) =>
    previousCart.map((item) =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    )
  );
}


function removeFromCart(productId) {
  setCart((previousCart) =>
    previousCart.filter((item) => item.id !== productId)
  );
}

if (showCheckout && orderPlaced) {
  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="success-icon">✓</div>

        <h1>Order placed successfully!</h1>
        <p>Thank you for shopping with Chudi.</p>

        <div className="confirmation-details">
          <p>
            Customer: <strong>{confirmedOrder?.name}</strong>
          </p>
          <p>
            Order Total:{" "}
            <strong>
              ₹{confirmedOrder?.total.toLocaleString("en-IN")}
            </strong>
          </p>
        </div>

        <button
          className="checkout-button"
          onClick={() => {
            setOrderPlaced(false);
            setConfirmedOrder(null);
            setShowCheckout(false);
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

if (showCheckout) {
  return (
    <div className="checkout-page">
      <button onClick={() => setShowCheckout(false)}>
        ← Back to Shopping Bag
      </button>

      <h1>Checkout</h1>
      <p>Enter your delivery details to place your order.</p>

      <form
        className="checkout-form"
        onSubmit={(event) => {
          event.preventDefault();

const newOrder = {
  id: Date.now(),
  name: customerName,
  phone: customerPhone,
  address: customerAddress,
  items: cart,
  total: subtotal,
  date: new Date().toLocaleString("en-IN"),
};

setOrders((previousOrders) => [...previousOrders, newOrder]);
setConfirmedOrder(newOrder);
setCart([]);
setOrderPlaced(true);
        }}
      >
        <label htmlFor="customerName">Full Name</label>
        <input
          id="customerName"
          type="text"
          value={customerName}
          onChange={(event) => setCustomerName(event.target.value)}
          required
        />

        <label htmlFor="customerPhone">Phone Number</label>
        <input
          id="customerPhone"
          type="tel"
          value={customerPhone}
          onChange={(event) => setCustomerPhone(event.target.value)}
          pattern="[0-9]{10}"
          title="Enter a 10-digit phone number"
          required
        />

        <label htmlFor="customerAddress">Delivery Address</label>
        <textarea
          id="customerAddress"
          value={customerAddress}
          onChange={(event) => setCustomerAddress(event.target.value)}
          rows="4"
          required
        />

        <div className="checkout-total">
          <span>Order Total</span>
          <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
        </div>

        <button type="submit" className="checkout-button">
          Place Demo Order
        </button>
      </form>
    </div>
  );
}

if (showOrderHistory) {
  return (
    <div className="cart-page">
      <button onClick={() => setShowOrderHistory(false)}>
        ← Back to Shopping
      </button>

      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        [...orders].reverse().map((order) => (
          <div className="order-history-card" key={order.id}>
            <h3>Order #{order.id}</h3>
            <p>{order.date}</p>

            {order.items.map((item) => (
              <p key={item.id}>
                {item.name} × {item.quantity}
              </p>
            ))}

            <strong>
              Total: ₹{order.total.toLocaleString("en-IN")}
            </strong>
          </div>
        ))
      )}
    </div>
  );
}

if (showSellerUpload) {
  return (
    <SellerUpload
      onAddProduct={handleAddProduct}
      onBack={() => setShowSellerUpload(false)}
    />
  );
}

 if (showSellerRegister) {
  return <SellerRegister onRegister={handleSellerRegister} />;
}
if (showCart) {
  return (
    <div className="cart-page">
      <div className="cart-page-header">
  <button onClick={() => setShowCart(false)}>
    ← Continue shopping
  </button>
  <h1>Your Shopping Bag</h1>
</div>

      {cart.length === 0 ? (
        <p>Your bag is empty.</p>
      ) : (
        <>
        <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
              />

              <div>
                <h3>{item.name}</h3>

                <p>
                  ₹{item.price.toLocaleString("en-IN")}
                </p>

                
<div className="quantity-controls">
  <button
    onClick={() =>
      updateQuantity(item.id, item.quantity - 1)
    }
    disabled={item.quantity === 1}
  >
    −
  </button>

  <span>{item.quantity}</span>

  <button
    onClick={() =>
      updateQuantity(item.id, item.quantity + 1)
    }
  >
    +
  </button>
</div>


<button
  className="remove-button"
  onClick={() => removeFromCart(item.id)}
>
  Remove
</button>


              </div>
            </div>
          ))}
        </div>
       

<div className="cart-summary">
  <h2>Order Summary</h2>

  {cart.map((item) => (
    <div className="bill-item" key={item.id}>
      <div>
        <strong>{item.name}</strong>
        <p>
          ₹{item.price.toLocaleString("en-IN")} × {item.quantity}
        </p>
      </div>

      <strong>
        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
      </strong>
    </div>
  ))}

  <div className="subtotal-row">
    <span>Subtotal</span>
    <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
  </div>

  <div className="subtotal-row">
    <span>Total</span>
    <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
    <button
  className="checkout-button"
  onClick={() => setShowCheckout(true)}
  disabled={cart.length === 0}
>
  Proceed to Checkout
</button>
  </div>

  <p>Shipping and applicable taxes are calculated separately.</p>
</div>


    </div>
    
  </>
)}
        
      
    </div>
  );
}
  return (
    <div className="app">
      <div className="announcement">A little sparkle, delivered with love.</div>

      <header className="navbar">
        <a
       className="logo"
      href="#"
      style={{ fontFamily: "Georgia, serif", color: "#9c7058" }}
>
      chudi<span style={{ color: "#302820" }}></span>
         </a>

        <nav className="nav-links">
          <a href="#shop">Shop all</a>
          <a href="#categories">Collections</a>
          <a href="#sellers">Our sellers</a>
        </nav>

        <div className="nav-actions">
          <button aria-label="Search">⌕</button>
          <button aria-label="Account">♙</button>
          <button
  aria-label="Shopping bag"
  onClick={() => setShowCart(true)}
>
  Bag ({totalQuantity})
</button>

<button onClick={() => setShowOrderHistory(true)}>
  My Orders
</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">THE ART OF ADORNING</p>
            <h1>
              Little things.
              <br />
              <span>Lasting sparkle.</span>
            </h1>
            <p className="hero-description">
              Discover beautiful bangles from independent jewellery makers, each
              with a story of its own.
            </p>
            <a className="primary-button" href="#shop">
              Explore the collection <span>↗</span>
            </a>
            <p className="hero-note">Thoughtfully chosen. Beautifully yours.</p>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=85"
              alt="Elegant jewellery collection"
            />
            <div className="image-caption">
              <span>MADE TO BE YOURS</span>
              <span>01 / COLLECTION</span>
            </div>
          </div>
        </section>

        <section className="categories" id="categories">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FIND YOUR FAVOURITE</p>
              <h2>Something for every you.</h2>
            </div>
            <a href="#shop" className="text-link">
              View all collections ↗
            </a>
          </div>

          <div className="category-list">
            <a href="#shop">
              Everyday wear <span>↗</span>
            </a>
            <a href="#shop">
              Festive sparkle <span>↗</span>
            </a>
            <a href="#shop">
              Bridal edit <span>↗</span>
            </a>
            <a href="#shop">
              Modern classics <span>↗</span>
            </a>
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A LITTLE SOMETHING SPECIAL</p>
              <h2>Made to catch your eye.</h2>
              <p className="section-description">
                Beautiful finds from our independent sellers.
              </p>
            </div>
            <a href="#shop" className="text-link">
              Explore all ↗
            </a>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <button
                    className="wishlist"
                    aria-label={`Add ${product.name} to wishlist`}
                  >
                    ♡
                  </button>
                  <button
                 className="quick-add"
                   onClick={() => addToCart(product)}
                     >
                     Add to Bag +
                  </button>
                </div>

                <div className="product-info">
                  <p className="product-category">{product.category}</p>
                  <h3>{product.name}</h3>
                  <p className="seller-name">Sold by {product.seller}</p>
                  <p className="product-price">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="seller-banner" id="sellers">
          <div>
            <p className="eyebrow">YOUR CRAFT DESERVES TO SHINE</p>
            <h2>Have a beautiful collection?</h2>
            <p>
              Bring your creations to a community that loves jewellery as much
              as you do.
            </p>
          </div>
          <a className="primary-button" href="#seller-info">
            Become a seller <span>↗</span>
          </a>
        </section>

        <section className="seller-info" id="seller-info">
          <p className="eyebrow">A MARKETPLACE FOR MAKERS</p>
          <h2>Your shop. Your story.</h2>
          <p>
            Create your own shop, showcase your bangles, and connect with
            customers who appreciate your work.
          </p>
          
        <div className="seller-buttons">
  <button
    className="outline-button"
    onClick={() => setShowSellerRegister(true)}
  >
    Start Selling
  </button>

  <button
    className="outline-button"
    onClick={() => setShowSellerUpload(true)}
  >
    Upload Products
  </button>
</div>

        </section>
      </main>

      <footer className="footer">
        <a className="logo" href="#">
          <span>chudi</span>
        </a>
        <p>Every bangle tells a story.</p>
        <p>© 2026 CHUDI</p>
      </footer>
    </div>
  );
}

export default App;
