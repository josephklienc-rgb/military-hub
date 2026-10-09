import { useEffect, useState } from "react";

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  userEmail: string;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onOrdersClick: () => void;
  onAccountClick: () => void;
  onLogout: () => void;
}

function Navbar({
  cartCount,
  wishlistCount,
  userEmail,
  onCartClick,
  onWishlistClick,
  onOrdersClick,
  onAccountClick,
  onLogout,
}: NavbarProps) {
  const [active, setActive] = useState("home");

  const menuItems = [
    {
      name: "Home",
      id: "home",
    },
    {
      name: "Tanks",
      id: "tanks",
    },
    {
      name: "Helicopters",
      id: "helicopters",
    },
    {
      name: "Fighter Jets",
      id: "fighter-jets",
    },
    {
      name: "Vehicles",
      id: "vehicles",
    },
  ];

  const handleClick = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setActive(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      let currentSection = "home";

      menuItems.forEach((item) => {
        const section = document.getElementById(item.id);

        if (
          section &&
          scrollPosition >= section.offsetTop
        ) {
          currentSection = item.id;
        }
      });

      setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <nav className="navbar">

      {/* LOGO */}

      <div className="logo">
        🪖
        <span>MILITARY HUB</span>
      </div>

      {/* NAVIGATION */}

      <div className="nav-links">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={
              active === item.id
                ? "active"
                : ""
            }
            onClick={() =>
              handleClick(item.id)
            }
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* NAVIGATION ACTIONS */}

      <div
        className="nav-actions"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >

        {/* USER EMAIL */}

        <span
          style={{
            color: "#dbe68f",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          👤 {userEmail}
        </span>

        {/* FAVORITES */}

        <button
          type="button"
          onClick={onWishlistClick}
          style={{
            background: "transparent",
            border: "1px solid #526344",
            color: "#ffffff",
            borderRadius: "8px",
            padding: "10px 12px",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          ❤️

          {wishlistCount > 0 && (
            <span
              style={{
                marginLeft: "5px",
                color: "#dbe68f",
              }}
            >
              {wishlistCount}
            </span>
          )}
        </button>
      {/* MY ACCOUNT */}

<button
  type="button"
  onClick={onAccountClick}
  style={{
    background: "transparent",
    border: "1px solid #526344",
    color: "#ffffff",
    borderRadius: "8px",
    padding: "10px 12px",
    cursor: "pointer",
    fontWeight: "700",
  }}
>
  👤 My Account
</button>
        {/* ORDERS */}

        <button
          type="button"
          onClick={onOrdersClick}
          style={{
            background: "transparent",
            border: "1px solid #526344",
            color: "#ffffff",
            borderRadius: "8px",
            padding: "10px 12px",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          📦 Orders
        </button>

        {/* LOGOUT */}

        <button
          type="button"
          onClick={onLogout}
          style={{
            background: "transparent",
            border: "1px solid #526344",
            color: "#ffffff",
            borderRadius: "8px",
            padding: "10px 12px",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          🚪 Logout
        </button>

        {/* CART */}

        <button
          type="button"
          className="cart-button"
          onClick={onCartClick}
        >
          🛒 Cart

          <span className="cart-count">
            {cartCount}
          </span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;