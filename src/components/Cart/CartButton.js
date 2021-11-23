import classes from "./CartButton.module.css";
import { uiActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQ = useSelector((state) => state.cart.totalQ);
  const toogleCartHandler = () => {
    dispatch(uiActions.toogle());
  };
  return (
    <button className={classes.button} onClick={toogleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQ}</span>
    </button>
  );
};

export default CartButton;
