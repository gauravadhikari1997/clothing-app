import React from "react";
import { useParams } from "react-router-dom";

import CollectionItem from "../../components/collection-item/collection-item.component";

import "./collection.styles.scss";

import SHOP_DATA from "../shop/shop.data";

const Collection = () => {
  const { title } = useParams();
  const routeItems = SHOP_DATA.filter((item) => item.routeName === title);
  console.log(routeItems[0].items);
  return (
    <div className="collection-page">
      <h2 className="title">{title.toUpperCase()}</h2>

      <div className="items">
        {routeItems[0].items.map((product) => (
          <CollectionItem key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};
export default Collection;
