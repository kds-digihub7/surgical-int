// src/pages/Catalogue.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

function Catalogue() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.title = "Subhan International | Catalogue";
    
    // Load products from localStorage
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  return (
    <div className="section">
      <div className="container">
        <motion.h1
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Product Catalogue
        </motion.h1>
        <p className="section-subtitle">Browse our comprehensive range of surgical instruments</p>
        
        {products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <p>No products available yet.</p>
            <a href="/admin" className="btn" style={{ marginTop: "1rem" }}>
              Add Products in Admin Panel
            </a>
          </div>
        ) : (
          <>
            <div className="products">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            <motion.div
              style={{ textAlign: "center", marginTop: "50px" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p>Can't find what you're looking for? Contact us for custom requests.</p>
              <a href="/contact" className="btn" style={{ marginTop: "15px" }}>
                Contact Us
              </a>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

export default Catalogue;