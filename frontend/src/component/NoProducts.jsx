import React from "react";
import "../componentStyles/NoProducts.css";

const NoProducts = ({ keyword }) => {
  return (
    <div className="no-products-content">
      {/*  */}
      <div className="no-products-icon">⚠️</div>
      <h2 className="no-products-title">No Products Found</h2>
      <p className="no-products-message">
        {keyword
          ? `we could not find products matching "${keyword}". Try using a different keyword browse our complete collection`
          : "No products are available. Please try again later."}
      </p>
    </div>
  );
};

export default NoProducts;
