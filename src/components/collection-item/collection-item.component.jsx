import React from "react";
import { useDispatch } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";

import "./collection-item.styles.scss";

const CollectionItem = ({ item }) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = item;

  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton
        onClick={() => dispatch({ type: "ADD_ITEM", payload: item })}
        inverted
      >
        Add to cart
      </CustomButton>
    </div>
  );
};

export default CollectionItem;
