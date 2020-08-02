import React from "react";

import { connect } from "react-redux";
import { selectCartItemsCount } from "../../redux/selectors/cart.selectors";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = ({ dispatch, itemsCount }) => (
  <div
    className="cart-icon"
    onClick={() => dispatch({ type: "TOGGLE_CART_HIDDEN" })}
  >
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemsCount}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({ dispatch });

const mapStateToProps = (state) => ({
  itemsCount: selectCartItemsCount(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
