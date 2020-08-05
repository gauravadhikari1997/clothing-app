import React from "react";
import { useDispatch } from "react-redux";

import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer,
} from "./collection-item.styles";

const CollectionItem = ({ item }) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = item;

  return (
    <CollectionItemContainer>
      <BackgroundImage className="image" imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton
        onClick={() => dispatch({ type: "ADD_ITEM", payload: item })}
        inverted
      >
        Add to cart
      </AddButton>
    </CollectionItemContainer>
  );
};

export default CollectionItem;
