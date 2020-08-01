import React from "react";

import { connect } from "react-redux";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = ({ dispatch }) => (
  <div
    className="cart-icon"
    onClick={() => dispatch({ type: "TOGGLE_CART_HIDDEN" })}
  >
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">0</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(null, mapDispatchToProps)(CartIcon);
