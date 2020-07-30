import React, { Component } from "react";

import SHOP_DATA from "./shop.data.js";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";

import "./shop.styles.scss";

class ShopPage extends Component {
  state = {
    collections: SHOP_DATA,
  };

  render() {
    return (
      <div className="shop-page">
        {this.state.collections.map(({ id, ...otherprops }) => (
          <CollectionPreview key={id} {...otherprops} />
        ))}
      </div>
    );
  }
}

export default ShopPage;
