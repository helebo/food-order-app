import React, { useContext, useEffect, useState } from "react";

import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-content";

const HeaderCartButton = (props) => {
  const [buttonHighlighted, setButtonHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((currentNum, item) => {
    return currentNum + item.amount; // cart objects have amount field that stores number of items per item type
  }, 0);

  const btnClasses = `${classes.button} ${buttonHighlighted ? classes.bump : ''}`;

    useEffect(() => {
      if (items.length  === 0){
        return;
      }
      setButtonHighlighted(true);
     const timer = setTimeout( () => {
        setButtonHighlighted(false);
      }, 300)

      return () =>{
        clearTimeout(timer);
      };
    }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
