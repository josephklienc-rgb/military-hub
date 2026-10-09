import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { products } from "./data/products";
import type { Product } from "./data/products";

interface CartItem {
  product: Product;
  quantity: number;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface OrderInfo {
  orderNumber: string;
  name: string;
  address: string;
  phone: string;
  payment: string;
  total: number;
  items: OrderItem[];
  date: string;
}

 function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("militaryHubLoggedIn") === "true";
  });

  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem("militaryHubUserEmail") || "";
  });
  const getUserName = () => {
  try {
    const savedUsers = localStorage.getItem("militaryHubUsers");
    const users: { name: string; email: string; password: string }[] =
      savedUsers ? JSON.parse(savedUsers) : [];

    return users.find((user) => user.email === userEmail)?.name || "";
  } catch {
    return "";
  }
};
  const [accountOpen, setAccountOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("militaryHubLoggedIn");
    localStorage.removeItem("militaryHubUserEmail");

    setIsLoggedIn(false);
    setUserEmail("");
  };

  useEffect(() => {
    localStorage.setItem(
      "militaryHubLoggedIn",
      isLoggedIn.toString()
    );

    localStorage.setItem(
      "militaryHubUserEmail",
      userEmail
    );
  });
  // ==============================
  // SEARCH
  // ==============================

  const [search, setSearch] = useState("");

  // ==============================
// CART
// ==============================

const [cart, setCart] = useState<CartItem[]>(() => {
  const savedCart = localStorage.getItem("militaryHubCart");

  try {
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem("militaryHubCart", JSON.stringify(cart));
}, [cart]);
  // ==============================
// INVENTORY
// ==============================

const [inventory, setInventory] = useState<Record<number, number>>(() => {
  const savedInventory = localStorage.getItem("militaryHubInventory");

  try {
    if (savedInventory) {
      return JSON.parse(savedInventory);
    }

    return Object.fromEntries(
      products.map((product) => [
        product.id,
        product.stock,
      ])
    );
  } catch {
    return Object.fromEntries(
      products.map((product) => [
        product.id,
        product.stock,
      ])
    );
  }
});

  const [cartOpen, setCartOpen] = useState(false);

  // ==============================
  // PRODUCT DETAILS
  // ==============================

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  // ==============================
  // WISHLIST
  // ==============================

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const savedWishlist =
      localStorage.getItem("militaryHubWishlist");

    try {
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch {
      return [];
    }
  });

  const [wishlistOpen, setWishlistOpen] = useState(false);

  // ==============================
  // CHECKOUT
  // ==============================

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [customerName, setCustomerName] = useState("");

  const [customerAddress, setCustomerAddress] =
    useState("");

  const [customerPhone, setCustomerPhone] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("");

  // ==============================
  // ORDER CONFIRMATION
  // ==============================

  const [orderConfirmed, setOrderConfirmed] =
    useState(false);

  const [orderInfo, setOrderInfo] =
    useState<OrderInfo | null>(null);

  // ==============================
  // ORDER HISTORY
  // ==============================

  const [orders, setOrders] = useState<OrderInfo[]>(() => {
    const savedOrders =
      localStorage.getItem("militaryHubOrders");

    try {
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch {
      return [];
    }
  });

  const [ordersOpen, setOrdersOpen] =
    useState(false);

  const [selectedOrder, setSelectedOrder] =
    useState<OrderInfo | null>(null);


  // ==============================
// SAVE INVENTORY
// ==============================

useEffect(() => {
  localStorage.setItem(
    "militaryHubInventory",
    JSON.stringify(inventory)
  );
}, [inventory]);

  // ==============================
  // SAVE WISHLIST
  // ==============================

  useEffect(() => {
    localStorage.setItem(
      "militaryHubWishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // ==============================
  // SAVE ORDER HISTORY
  // ==============================

  useEffect(() => {
    localStorage.setItem(
      "militaryHubOrders",
      JSON.stringify(orders)
    );
  }, [orders]);

  // ==============================
  // ADD TO CART
  // ==============================

  const addToCart = (product: Product) => {
  const availableStock = inventory[product.id] ?? product.stock;

  if (availableStock <= 0) {
    alert(`${product.name} is out of stock.`);
    return;
  }

  setCart((currentCart) => {
    const existingProduct = currentCart.find(
      (item) => item.product.id === product.id
    );

    const currentQuantity = existingProduct
      ? existingProduct.quantity
      : 0;

    // Don't allow cart quantity to exceed available stock
    if (currentQuantity >= availableStock) {
      alert(
        `Only ${availableStock} units of ${product.name} are available.`
      );
      return currentCart;
    }

    if (existingProduct) {
      return currentCart.map((item) =>
        item.product.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    }

    return [
      ...currentCart,
      {
        product,
        quantity: 1,
      },
    ];
  });

  // Reduce inventory by 1
  setInventory((currentInventory) => ({
    ...currentInventory,
    [product.id]: availableStock - 1,
  }));
};
  // ==============================
  // WISHLIST
  // ==============================

  const toggleWishlist = (product: Product) => {
    setWishlist((currentWishlist) => {
      const alreadyExists =
        currentWishlist.some(
          (item) =>
            item.id === product.id
        );

      if (alreadyExists) {
        return currentWishlist.filter(
          (item) =>
            item.id !== product.id
        );
      }

      return [
        ...currentWishlist,
        product,
      ];
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(
      (item) =>
        item.id === productId
    );
  };

  // ==============================
  // CART QUANTITY
  // ==============================

 const increaseQuantity = (productId: number) => {
  const availableStock =
    inventory[productId] ?? 0;

  if (availableStock <= 0) {
    alert("No more stock available.");
    return;
  }

  setCart((currentCart) =>
    currentCart.map((item) =>
      item.product.id === productId
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    )
  );

  setInventory((currentInventory) => ({
    ...currentInventory,
    [productId]:
      (currentInventory[productId] ?? 0) - 1,
  }));
};

 const decreaseQuantity = (productId: number) => {
  const item = cart.find(
    (item) => item.product.id === productId
  );

  if (!item) {
    return;
  }

  setCart((currentCart) =>
    currentCart
      .map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0)
  );

  setInventory((currentInventory) => ({
    ...currentInventory,
    [productId]:
      (currentInventory[productId] ?? 0) + 1,
  }));
};

  const removeFromCart = (productId: number) => {
  const itemToRemove = cart.find(
    (item) => item.product.id === productId
  );

  if (!itemToRemove) {
    return;
  }

  setCart((currentCart) =>
    currentCart.filter(
      (item) => item.product.id !== productId
    )
  );

  setInventory((currentInventory) => ({
    ...currentInventory,
    [productId]:
      (currentInventory[productId] ?? 0) +
      itemToRemove.quantity,
  }));
};

  // ==============================
  // CART TOTAL
  // ==============================

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      item.product.price *
        item.quantity,
    0
  );

  // ==============================
  // SEARCH
  // ==============================

  const filteredProducts =
    products.filter((product) => {
      const searchText =
        search.toLowerCase();

      return (
        product.name
          .toLowerCase()
          .includes(searchText) ||
        product.category
          .toLowerCase()
          .includes(searchText)
      );
    });

  // ==============================
  // SCROLL
  // ==============================

  const scrollToCategory = (id: string) => {
    const section =
      document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // ==============================
  // PRODUCTS
  // ==============================

  const renderProducts = (category: string) => {
    const categoryProducts =
      filteredProducts.filter(
        (product) =>
          product.category === category
      );

    if (categoryProducts.length === 0) {
      return (
        <p className="no-products">
          No products found.
        </p>
      );
    }

    return (
      <div className="product-grid">
        {categoryProducts.map(
          (product) => (
            <div
              className="product-card"
              key={product.id}
            >
              {/* IMAGE */}

              <div
                className="product-image-container"
                onClick={() =>
                  setSelectedProduct(
                    product
                  )
                }
                style={{
                  cursor:
                    "pointer",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>

              {/* INFORMATION */}

              <div className="product-info">
                <h3>
                  {product.name}
                </h3>

                <p className="product-category">
                  {product.category}
                </p>

                <p className="product-description">
                  {product.description}
                </p>

                <div className="product-price">
                  $
                  {product.price.toLocaleString(
                    "en-US"
                  )}
                </div>
<div
  style={{
    marginTop: "8px",
    marginBottom: "10px",
    fontWeight: "700",
    color:
      product.stock === 0
        ? "#ef4444"
        : product.stock <= 5
        ? "#f59e0b"
        : "#22c55e",
  }}
>
  {(() => {
  const currentStock =
    inventory[product.id] ?? product.stock;

  if (currentStock === 0) {
    return "OUT OF STOCK";
  }

  if (currentStock <= 5) {
    return `LOW STOCK — ${currentStock} left`;
  }

  return `${currentStock} units in stock`;
})()}
</div>
                <div className="product-rating">
                  ⭐{" "}
                  {product.rating}
                </div>

                {/* SMALL BUTTONS */}

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginTop: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
  className="small-product-button"
  onClick={() => addToCart(product)}
  disabled={(inventory[product.id] ?? product.stock) === 0}
>
  🛒 Add
</button>

                  <button
                    className="small-product-button"
                    onClick={() =>
                      setSelectedProduct(
                        product
                      )
                    }
                  >
                    View Details
                  </button>

                  <button
                    className={`small-product-button ${
                      isInWishlist(
                        product.id
                      )
                        ? "favorite-active"
                        : ""
                    }`}
                    onClick={() =>
                      toggleWishlist(
                        product
                      )
                    }
                  >
                    {isInWishlist(
                      product.id
                    )
                      ? "❤️"
                      : "♡"}{" "}
                    Favorite
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  };

  // ==============================
  // CHECKOUT
  // ==============================

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setCartOpen(false);
    setCheckoutOpen(true);
  };

  // ==============================
  // PLACE ORDER
  // ==============================

  const placeOrder = () => {
    if (
      customerName.trim() === "" ||
      customerAddress.trim() === "" ||
      customerPhone.trim() === "" ||
      paymentMethod === ""
    ) {
      alert(
        "Please complete all checkout information."
      );

      return;
    }

    const newOrder: OrderInfo = {
      orderNumber:
        "MH-" +
        Date.now()
          .toString()
          .slice(-6),

      name: customerName,

      address: customerAddress,

      phone: customerPhone,

      payment: paymentMethod,

      total: cartTotal,

      items: cart.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      })),

      date: new Date().toLocaleString(),
    };

    // SAVE ORDER

    setOrders((currentOrders) => [
      newOrder,
      ...currentOrders,
    ]);

    // SAVE CURRENT ORDER

    setOrderInfo(newOrder);

    // CLOSE CHECKOUT

    setCheckoutOpen(false);

    // SHOW CONFIRMATION

    setOrderConfirmed(true);

    // CLEAR CART

    setCart([]);

    // CLEAR FORM

    setCustomerName("");
    setCustomerAddress("");
    setCustomerPhone("");
    setPaymentMethod("");
  };

  // ==============================
  // PAGE
  // ==============================

  if (!isLoggedIn) {
  return (
    <Login
      onLogin={(email) => {
        setUserEmail(email);
        setIsLoggedIn(true);
      }}
      onSignup={(email) => {
        setUserEmail(email);
        setIsLoggedIn(true);
      }}
    />
  );
}

  return (
    <div className="app">

      {/* =========================
          NAVBAR
          ========================= */}

<Navbar
userEmail={userEmail}
cartCount={cartCount}
wishlistCount={wishlist.length}
onCartClick={() => setCartOpen(true)}
onWishlistClick={() => setWishlistOpen(true)}
onOrdersClick={() => setOrdersOpen(true)}
onAccountClick={() => setAccountOpen(true)}
onLogout={handleLogout}
/>

      {/* =========================
          HERO
      ========================= */}

      <section
        id="home"
        className="hero"
      >
        <div className="hero-content">

          <p className="hero-small">
            WELCOME TO
          </p>

          <h1>
            MILITARY{" "}
            <span>HUB</span>
          </h1>

          <p>
            Your destination for
            detailed military display
            models, collectibles, and
            historical vehicles.
          </p>

          <button
            className="shop-now-button"
            onClick={() =>
              scrollToCategory("tanks")
            }
          >
            EXPLORE COLLECTION
          </button>

        </div>
      </section>

      {/* =========================
          SHOP
      ========================= */}

      <section className="shop-section">

        {/* SEARCH */}

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search military models..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />
        </div>

        {/* CATEGORY BUTTONS */}

        <div className="category-buttons">

          <button
            onClick={() =>
              scrollToCategory("tanks")
            }
          >
            🛡️ Tanks
          </button>

          <button
            onClick={() =>
              scrollToCategory(
                "helicopters"
              )
            }
          >
            🚁 Helicopters
          </button>

          <button
            onClick={() =>
              scrollToCategory(
                "fighter-jets"
              )
            }
          >
            ✈️ Fighter Jets
          </button>

          <button
            onClick={() =>
              scrollToCategory(
                "vehicles"
              )
            }
          >
            🚙 Vehicles
          </button>

        </div>

        {/* TANKS */}

        <section
          id="tanks"
          className="category-section"
        >
          <div className="category-title">
            <p>
              OUR COLLECTION
            </p>

            <h2>
              Military Tanks
            </h2>
          </div>

          {renderProducts("Tanks")}
        </section>

        {/* HELICOPTERS */}

        <section
          id="helicopters"
          className="category-section"
        >
          <div className="category-title">
            <p>
              OUR COLLECTION
            </p>

            <h2>
              Military Helicopters
            </h2>
          </div>

          {renderProducts(
            "Helicopters"
          )}
        </section>

        {/* FIGHTER JETS */}

        <section
          id="fighter-jets"
          className="category-section"
        >
          <div className="category-title">
            <p>
              OUR COLLECTION
            </p>

            <h2>
              Fighter Jets
            </h2>
          </div>

          {renderProducts(
            "Fighter Jets"
          )}
        </section>

        {/* VEHICLES */}

        <section
          id="vehicles"
          className="category-section"
        >
          <div className="category-title">
            <p>
              OUR COLLECTION
            </p>

            <h2>
              Military Vehicles
            </h2>
          </div>

          {renderProducts(
            "Vehicles"
          )}
        </section>

      </section>

      {/* =========================
          PRODUCT DETAILS
      ========================= */}

      {selectedProduct && (
        <div
          onClick={() =>
            setSelectedProduct(null)
          }
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.75)",
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 5000,
          }}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              position: "relative",
              width: "900px",
              maxWidth: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#182117",
              color: "#ffffff",
              border:
                "1px solid #526344",
              borderRadius: "16px",
              padding: "30px",
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: "30px",
            }}
          >
            <button
              onClick={() =>
                setSelectedProduct(null)
              }
              style={{
                position:
                  "absolute",
                right: "15px",
                top: "15px",
                width: "40px",
                height: "40px",
                border: "none",
                borderRadius: "50%",
                background:
                  "#526344",
                color: "white",
                fontSize: "20px",
                cursor:
                  "pointer",
              }}
            >
              ✕
            </button>

            <img
              src={
                selectedProduct.image
              }
              alt={
                selectedProduct.name
              }
              style={{
                width: "100%",
                height: "400px",
                objectFit: "contain",
                background:
                  "#10160f",
                borderRadius: "12px",
              }}
            />

            <div>
              <p
                style={{
                  color: "#b8c875",
                  fontWeight: "700",
                  letterSpacing:
                    "2px",
                }}
              >
                {
                  selectedProduct.category
                }
              </p>

              <h2
                style={{
                  fontSize: "34px",
                }}
              >
                {
                  selectedProduct.name
                }
              </h2>

              <p>
                ⭐{" "}
                {
                  selectedProduct.rating
                }{" "}
                / 5
              </p>

              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: "1.7",
                }}
              >
                {
                  selectedProduct.description
                }
              </p>

              <div
                style={{
                  fontSize: "30px",
                  fontWeight: "800",
                  color: "#d8e58b",
                  margin: "20px 0",
                }}
              >
                $
                {selectedProduct.price.toLocaleString(
                  "en-US"
                )}{" "}
                USD
              </div>

              <button
                onClick={() =>
                  toggleWishlist(
                    selectedProduct
                  )
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  border:
                    "1px solid #657957",
                  borderRadius:
                    "8px",
                  background:
                    "transparent",
                  color: "white",
                  cursor: "pointer",
                  marginBottom:
                    "10px",
                }}
              >
                {isInWishlist(
                  selectedProduct.id
                )
                  ? "❤️ SAVED TO WISHLIST"
                  : "♡ ADD TO WISHLIST"}
              </button>

              <button
                onClick={() => {
                  addToCart(
                    selectedProduct
                  );

                  setSelectedProduct(
                    null
                  );

                  setCartOpen(true);
                }}
                style={{
                  width: "100%",
                  padding: "13px",
                  border: "none",
                  borderRadius:
                    "8px",
                  background:
                    "#657957",
                  color: "white",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                🛒 ADD TO CART
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================
          WISHLIST
      ========================= */}

      {wishlistOpen && (
        <div
          className="cart-overlay"
          onClick={() =>
            setWishlistOpen(false)
          }
        >
          <div
            className="cart-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="cart-header">
              <h2>
                ❤️ Wishlist
              </h2>

              <button
                onClick={() =>
                  setWishlistOpen(
                    false
                  )
                }
              >
                ✕
              </button>
            </div>

            {wishlist.length === 0 ? (
              <div className="empty-cart">
                <div>
                  ❤️
                </div>

                <p>
                  Your wishlist
                  is empty.
                </p>
              </div>
            ) : (
              wishlist.map(
                (product) => (
                  <div
                    key={product.id}
                    style={{
                      display: "flex",
                      gap: "15px",
                      padding:
                        "20px 0",
                      borderBottom:
                        "1px solid #35432e",
                    }}
                  >
                    <img
                      src={
                        product.image
                      }
                      alt={
                        product.name
                      }
                      style={{
                        width: "90px",
                        height: "75px",
                        objectFit:
                          "cover",
                        borderRadius:
                          "8px",
                      }}
                    />

                    <div>
                      <h3>
                        {
                          product.name
                        }
                      </h3>

                      <p>
                        $
                        {product.price.toLocaleString(
                          "en-US"
                        )}
                      </p>

                      <button
                        onClick={() =>
                          addToCart(
                            product
                          )
                        }
                        style={{
                          padding:
                            "8px 12px",
                          background:
                            "#657957",
                          color: "white",
                          border:
                            "none",
                          borderRadius:
                            "6px",
                          cursor:
                            "pointer",
                        }}
                      >
                        🛒 Add
                      </button>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      )}

      {/* =========================
          CART
      ========================= */}

      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={() =>
            setCartOpen(false)
          }
        >
          <div
            className="cart-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="cart-header">
              <h2>
                🛒 Your Cart
              </h2>

              <button
                onClick={() =>
                  setCartOpen(false)
                }
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <div>
                  🛒
                </div>

                <p>
                  Your cart is
                  empty.
                </p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(
                    (item) => (
                      <div
                        className="cart-item"
                        key={
                          item.product
                            .id
                        }
                      >
                        <img
                          src={
                            item.product
                              .image
                          }
                          alt={
                            item.product
                              .name
                          }
                        />

                        <div className="cart-item-info">
                          <h3>
                            {
                              item
                                .product
                                .name
                            }
                          </h3>

                          <p>
                            $
                            {item.product.price.toLocaleString(
                              "en-US"
                            )}
                          </p>

                          
                          <div className="quantity-controls">
  <button
    onClick={() =>
      decreaseQuantity(
        item.product.id
      )
    }
  >
    −
  </button>

  <span>
    {item.quantity}
  </span>

  <button
    onClick={() =>
      increaseQuantity(
        item.product.id
      )
    }
    disabled={
      (inventory[item.product.id] ?? 0) === 0
    }
  >
    +
  </button>
</div>
                          <button
                            className="remove-button"
                            onClick={() =>
                              removeFromCart(
                                item
                                  .product
                                  .id
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <span>
                      Total
                    </span>

                    <strong>
                      $
                      {cartTotal.toLocaleString(
                        "en-US"
                      )}
                    </strong>
                  </div>

                  <button
                    className="checkout-button"
                    onClick={
                      handleCheckout
                    }
                  >
                    CHECKOUT
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* =========================
          CHECKOUT
      ========================= */}

      {checkoutOpen && (
        <div className="checkout-overlay">
          <div className="checkout-panel">
            <div className="checkout-header">
              <h2>
                Checkout
              </h2>

              <button
                onClick={() =>
                  setCheckoutOpen(
                    false
                  )
                }
              >
                ✕
              </button>
            </div>

            <div className="checkout-content">
              <h3>
                Customer Information
              </h3>

              <input
                className="checkout-input"
                type="text"
                placeholder="Full Name"
                value={customerName}
                onChange={(event) =>
                  setCustomerName(
                    event.target.value
                  )
                }
              />

              <input
                className="checkout-input"
                type="text"
                placeholder="Complete Address"
                value={
                  customerAddress
                }
                onChange={(event) =>
                  setCustomerAddress(
                    event.target.value
                  )
                }
              />

              <input
                className="checkout-input"
                type="text"
                placeholder="Phone Number"
                value={
                  customerPhone
                }
                onChange={(event) =>
                  setCustomerPhone(
                    event.target.value
                  )
                }
              />

              <h3>
                Payment Method
              </h3>

              <select
                className="checkout-input"
                value={
                  paymentMethod
                }
                onChange={(event) =>
                  setPaymentMethod(
                    event.target.value
                  )
                }
              >
                <option value="">
                  Select Payment Method
                </option>

                <option value="Cash on Delivery">
                  Cash on Delivery
                </option>

                <option value="GCash">
                  GCash
                </option>
              </select>

              <div className="checkout-summary">
                <span>
                  Order Total
                </span>

                <strong>
                  $
                  {cartTotal.toLocaleString(
                    "en-US"
                  )}{" "}
                  USD
                </strong>
              </div>

              <button
                className="place-order-button"
                onClick={
                  placeOrder
                }
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================
          ORDER CONFIRMATION
      ========================= */}

      {orderConfirmed &&
        orderInfo && (
          <div className="checkout-overlay">
            <div className="checkout-panel">
              <div className="checkout-header">
                <h2>
                  ✅ Order Confirmed!
                </h2>

                <button
                  onClick={() =>
                    setOrderConfirmed(
                      false
                    )
                  }
                >
                  ✕
                </button>
              </div>

              <div className="checkout-content">
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "60px",
                  }}
                >
                  🎉
                </div>

                <h3
                  style={{
                    textAlign:
                      "center",
                  }}
                >
                  Thank you for
                  your order!
                </h3>

                <div className="order-details">
                  <p>
                    <strong>
                      Order Number:
                    </strong>{" "}
                    {
                      orderInfo.orderNumber
                    }
                  </p>

                  <p>
                    <strong>
                      Date:
                    </strong>{" "}
                    {
                      orderInfo.date
                    }
                  </p>

                  <p>
                    <strong>
                      Name:
                    </strong>{" "}
                    {
                      orderInfo.name
                    }
                  </p>

                  <p>
                    <strong>
                      Address:
                    </strong>{" "}
                    {
                      orderInfo.address
                    }
                  </p>

                  <p>
                    <strong>
                      Payment:
                    </strong>{" "}
                    {
                      orderInfo.payment
                    }
                  </p>

                  <p>
                    <strong>
                      Total:
                    </strong>{" "}
                    $
                    {orderInfo.total.toLocaleString(
                      "en-US"
                    )}{" "}
                    USD
                  </p>
                </div>

                <button
                  className="place-order-button"
                  onClick={() =>
                    setOrderConfirmed(
                      false
                    )
                  }
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
          </div>
        )}

      {/* =========================
          ORDER HISTORY
      ========================= */}

      {ordersOpen && (
        <div
          className="checkout-overlay"
          onClick={() =>
            setOrdersOpen(false)
          }
        >
          <div
            className="checkout-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              maxWidth: "800px",
            }}
          >
            <div className="checkout-header">
              <h2>
                📦 My Orders
              </h2>

              <button
                onClick={() =>
                  setOrdersOpen(
                    false
                  )
                }
              >
                ✕
              </button>
            </div>

            <div className="checkout-content">
              {orders.length === 0 ? (
                <div
                  style={{
                    textAlign:
                      "center",
                    padding:
                      "50px 20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "60px",
                    }}
                  >
                    📦
                  </div>

                  <h3>
                    No orders yet
                  </h3>

                  <p
                    style={{
                      color:
                        "#aeb8a7",
                    }}
                  >
                    Your completed
                    orders will
                    appear here.
                  </p>
                </div>
              ) : (
                <div>
                  {orders.map(
                    (order) => (
                      <div
                        key={
                          order.orderNumber
                        }
                        style={{
                          border:
                            "1px solid #526344",
                          borderRadius:
                            "10px",
                          padding:
                            "20px",
                          marginBottom:
                            "15px",
                          background:
                            "#11180f",
                        }}
                      >
                        <div
                          style={{
                            display:
                              "flex",
                            justifyContent:
                              "space-between",
                            alignItems:
                              "center",
                            gap: "10px",
                            flexWrap:
                              "wrap",
                          }}
                        >
                          <div>
                            <h3
                              style={{
                                margin:
                                  "0 0 8px",
                              }}
                            >
                              {
                                order.orderNumber
                              }
                            </h3>

                            <p
                              style={{
                                margin:
                                  "4px 0",
                                color:
                                  "#aeb8a7",
                              }}
                            >
                              {
                                order.date
                              }
                            </p>
                          </div>

                          <span
                            style={{
                              background:
                                "#657957",
                              padding:
                                "6px 12px",
                              borderRadius:
                                "20px",
                              fontSize:
                                "13px",
                              fontWeight:
                                "700",
                            }}
                          >
                            CONFIRMED
                          </span>
                        </div>

                        <div
                          style={{
                            marginTop:
                              "15px",
                            borderTop:
                              "1px solid #35432e",
                            paddingTop:
                              "15px",
                          }}
                        >
                          {order.items.map(
                            (item) => (
                              <div
                                key={
                                  item
                                    .product
                                    .id
                                }
                                style={{
                                  display:
                                    "flex",
                                  justifyContent:
                                    "space-between",
                                  padding:
                                    "5px 0",
                                  color:
                                    "#cbd5e1",
                                }}
                              >
                                <span>
                                  {
                                    item
                                      .product
                                      .name
                                  }{" "}
                                  ×{" "}
                                  {
                                    item.quantity
                                  }
                                </span>

                                <span>
                                  $
                                  {(
                                    item
                                      .product
                                      .price *
                                    item.quantity
                                  ).toLocaleString(
                                    "en-US"
                                  )}
                                </span>
                              </div>
                            )
                          )}
                        </div>

                        <div
                          style={{
                            display:
                              "flex",
                            justifyContent:
                              "space-between",
                            alignItems:
                              "center",
                            marginTop:
                              "15px",
                            paddingTop:
                              "15px",
                            borderTop:
                              "1px solid #35432e",
                          }}
                        >
                          <strong>
                            Total
                          </strong>

                          <strong
                            style={{
                              color:
                                "#dbe68f",
                              fontSize:
                                "20px",
                            }}
                          >
                            $
                            {order.total.toLocaleString(
                              "en-US"
                            )}
                          </strong>
                        </div>

                        <button
                          onClick={() =>
                            setSelectedOrder(
                              order
                            )
                          }
                          style={{
                            marginTop:
                              "15px",
                            width: "100%",
                            padding:
                              "9px",
                            border:
                              "1px solid #657957",
                            borderRadius:
                              "7px",
                            background:
                              "transparent",
                            color:
                              "#dbe68f",
                            cursor:
                              "pointer",
                            fontWeight:
                              "700",
                          }}
                        >
                          VIEW ORDER
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================
          SELECTED ORDER DETAILS
      ========================= */}

      {selectedOrder && (
        <div
          className="checkout-overlay"
          onClick={() =>
            setSelectedOrder(null)
          }
          style={{
            zIndex: 7000,
          }}
        >
          <div
            className="checkout-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="checkout-header">
              <h2>
                📦 Order Details
              </h2>

              <button
                onClick={() =>
                  setSelectedOrder(
                    null
                  )
                }
              >
                ✕
              </button>
            </div>

            <div className="checkout-content">
              <h3>
                {
                  selectedOrder.orderNumber
                }
              </h3>

              <p>
                <strong>
                  Date:
                </strong>{" "}
                {
                  selectedOrder.date
                }
              </p>

              <p>
                <strong>
                  Customer:
                </strong>{" "}
                {
                  selectedOrder.name
                }
              </p>

              <p>
                <strong>
                  Address:
                </strong>{" "}
                {
                  selectedOrder.address
                }
              </p>

              <p>
                <strong>
                  Phone:
                </strong>{" "}
                {
                  selectedOrder.phone
                }
              </p>

              <p>
                <strong>
                  Payment:
                </strong>{" "}
                {
                  selectedOrder.payment
                }
              </p>

              <hr />

              <h3>
                Products
              </h3>

              {selectedOrder.items.map(
                (item) => (
                  <div
                    key={
                      item.product.id
                    }
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      padding:
                        "10px 0",
                      borderBottom:
                        "1px solid #35432e",
                    }}
                  >
                    <span>
                      {
                        item.product
                          .name
                      }{" "}
                      ×{" "}
                      {
                        item.quantity
                      }
                    </span>

                    <span>
                      $
                      {(
                        item.product
                          .price *
                        item.quantity
                      ).toLocaleString(
                        "en-US"
                      )}
                    </span>
                  </div>
                )
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  marginTop: "20px",
                  fontSize: "22px",
                  fontWeight: "800",
                }}
              >
                <span>
                  Total
                </span>

                <span
                  style={{
                    color: "#dbe68f",
                  }}
                >
                  $
                  {selectedOrder.total.toLocaleString(
                    "en-US"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* =========================
    CONTACT US
========================= */}

<section id="contact" className="contact-section">
  <h2>Contact Us</h2>

  <p>Have questions or need assistance? Contact us through:</p>

  <div className="contact-links">

    {/* GitHub */}
    <a
      href="https://github.com/josephklienc-rgb"
  target="_blank"
  rel="noreferrer"
    >
      💻 GitHub
    </a>

    {/* Gmail */}
    <a href="mailto:your-military-hub@gmail.com">
      📧 Gmail
    </a>

     {/* Phone */}
    <a href="tel:+639124442500">
      📞 Phone
    </a>

  </div>
</section>
{/* =========================
    MY ACCOUNT PANEL
========================= */}

{accountOpen && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: "#17231b",
        color: "#ffffff",
        padding: "30px",
        borderRadius: "16px",
        width: "90%",
        maxWidth: "400px",
        border: "1px solid #526344",
      }}
    >
      <h2>👤 My Account</h2>

      <p> <strong>Name:</strong> {getUserName()} </p>

<p> <strong>Email:</strong> {userEmail} </p>

<p>Welcome to your Military Hub account!</p>

      <button
        type="button"
        onClick={() => setAccountOpen(false)}
        style={{
          background: "#526344",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 16px",
          cursor: "pointer",
          fontWeight: "700",
        }}
      >
        Close
      </button>
    </div>
  </div>
)}
{/* =========================
    FOOTER
========================= */}

<footer className="military-footer">
  <p>
    © 2026 Military Hub. All Rights Reserved.
  </p>

  <p>
    Built with ❤️ for Military Enthusiasts
  </p>
</footer>
<button
  className="back-to-top"
  onClick={() =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
>
  ↑ Back to Top
</button>
    </div>
  );
}

export default App;