import React from "react";
import { useParams } from "react-router-dom";

import CollectionItem from "../../components/collection-item/collection-item.component";

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer,
} from "./collection.styles";

import SHOP_DATA from "../shop/shop.data";

const Collection = () => {
  const { title } = useParams();
  const routeItems = SHOP_DATA.filter((item) => item.routeName === title);
  return (
    <CollectionPageContainer>
      <CollectionTitle>{title.toUpperCase()}</CollectionTitle>

      <CollectionItemsContainer>
        {routeItems[0].items.map((product) => (
          <CollectionItem key={product.id} item={product} />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};
export default Collection;
