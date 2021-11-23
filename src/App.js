import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { uiActions } from "./store/ui-slice";
import React from "react";
import Notification from "./components/UI/Notification";
import { cartActions } from "./store/cart-slice";

let isInitial = true;

function App() {
  const [downCart, setDownCart] = useState({ items: [], totalQ: 0 });
  const dispatch = useDispatch();
  const toogleCart = useSelector((state) => state.ui.cartVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const getCartData = async () => {
      const response = await fetch(
        "https://pragmatic-star-317122-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Showing cart data failed.");
      }

      const data = await response.json();
      setDownCart(data);
    };
    getCartData();
  }, []);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data in progress",
        })
      );
      const response = await fetch(
        "https://pragmatic-star-317122-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Successfully sent!",
          message: "Cart data is on backend server.",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed.",
        })
      );
    });
  }, [cart, dispatch]);
  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {toogleCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
