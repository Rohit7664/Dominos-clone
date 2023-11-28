import React, { useContext } from "react";
import "./style/cart.css";
import { navContext } from "../../Context/NavbarContext";
import Cartcard from "./Cartcard";
import Flip_cart_card from "./Flip_cart_card";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../../Redux/action";
import EmptyCart from "../../Cart/EmptyCart";

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  const calculateAmount = cartData.reduce((acc, e) => {
    return e.quantity * e.price + acc;
  }, 0);

  let token = localStorage.getItem("token");

  const { showcart } = useContext(navContext);
  const { handleCart } = useContext(navContext);

  // ...

  const fetchData = () => {
    fetch("https://domino-backend.onrender.com/api/cart", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Process data
        if (data.products && Array.isArray(data.products)) {
          setCartData([...data.products]);
        } else {
          console.error("Invalid response structure or empty products array.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  

  return (
    <div
      className="navbar_cart"
      style={showcart ? { marginRight: "0px" } : { marginRight: "-400px" }}
    >
      <div className="cart_div_scroll">
        {cartData.length > 0 ? (
          cartData.map((el, index) => {
            return <Flip_cart_card props={el} index={index} func={fetchData} />;
          })
        ) : (
          <EmptyCart />
        )}
      </div>

      <div
        className="cart_subtotal_price"
        style={cartData.length > 0 ? { display: "block" } : { display: "none" }}
      >
        <div>
          <div>Subtotal</div>
          <div>₹ {calculateAmount}</div>
        </div>
        <div onClick={() => handleCart(false)}>
          <Link to="/cart">
            <button>Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
