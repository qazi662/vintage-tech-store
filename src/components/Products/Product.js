import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import img from "../../assets/mainBcg.jpeg";

function Product({ image: { url }, title, id, price }) {
  return (
    <article className="product">
      <div className="img-container">
        <img src={url || img} alt={title || "default title"} />
        <Link to={`products/${id}`} className="btn btn=primary product-link">
          details
        </Link>
      </div>
      <div className="product-footer">
        <p className="product-title">{title || "default title"}</p>
        <p className="product-price">${price || 0}</p>
      </div>
    </article>
  );
}
Product.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};
export default Product;
