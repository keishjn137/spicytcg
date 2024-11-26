import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";
import { product } from "../../assets/data/product";
import { Navigation } from "../Home/home";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/slices/cartSlice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [productChoose, setProductChoose] = useState(null);
  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const foundProduct = product.find((p) => p.id.toString() === id);
    setProductChoose(foundProduct);
  }, [id]);

  if (!productChoose) {
    return <p>Loading product details...</p>;
  }

  const handleAddToCart = () => {
    dispatch(addItem(productChoose));
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className="home">
      <Navigation />

      <button onClick={() => navigate(-1)} className="back-button">Go Back</button>

      <div className="product-detail">

        <img
          src={`/assets/${productChoose.image}`}
          alt={productChoose.name}
          className="product-image"
        />


        <div className="product-info">
          <h1 className="product-name">{productChoose.name}</h1>
          <p className="product-category">Category: {productChoose.category}</p>
          <p className="product-price">Price: {productChoose.price} VND</p>
          <p className="product-description">
            Description: {productChoose.description || "No description available."}
          </p>

          <div className="product-actions">
            <button onClick={handleAddToCart} className="add-to-cart">Add to Cart</button>
          </div>

          {showMessage && (
            <div className="cart-message">
              <p>Added to cart successfully!</p>
            </div>
          )}
        </div>
      </div>

      <div className="footer">
      </div>
    </div>
  );
};

export default ProductDetail;
