// src/components/ProductCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product, index }) {
  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-overlay">
          <Link to={`/product/${product.id}`} className="view-details-btn">
            View Details
          </Link>
        </div>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <button className="btn btn-outline">Request Quote</button>
          <Link to={`/product/${product.id}`} className="btn">
            Learn More
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;