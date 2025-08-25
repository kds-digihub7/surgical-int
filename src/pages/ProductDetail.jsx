// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Phone, Mail } from "lucide-react";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    document.title = "Product Details | Subhan International";

    // Load products from localStorage
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const foundProduct = savedProducts.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);

    // Set related products (excluding current product)
    setRelatedProducts(savedProducts.filter((p) => p.id !== parseInt(id)).slice(0, 3));
  }, [id]);

  if (!product) {
    return (
      <div className="section product-detail-page">
        <div className="container">Product not found</div>
      </div>
    );
  }

  return (
    <div className="section product-detail-page">
      {/* Styles */}
      <style>{`
        :root {
          --container-width: 1160px;
          --accent: #2563eb;
          --accent-2: #1e40af;
          --muted: #64748b;
          --text: #0f1724;
          --bg: #ffffff;
          --card-bg: #fff;
          --border: #e6eef8;
          --shadow: 0 10px 30px rgba(2,6,23,0.06);
          --nav-height: 80px; /* set in your Navbar.css if you prefer; used for offset */
        }

        /* page spacing to account for fixed navbar plus 56px extra space */
        .product-detail-page {
          padding-top: calc(var(--nav-height) + 56px);
          padding-bottom: 48px;
          background: linear-gradient(180deg,#fbfdff 0%, #f8fafc 100%);
          min-height: 100vh;
          color: var(--text);
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial;
        }

        .container {
          max-width: var(--container-width);
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Back button */
        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text);
          text-decoration: none;
          font-weight: 700;
          transition: transform .15s ease, box-shadow .15s ease;
        }
        .btn-outline:hover { transform: translateY(-3px); box-shadow: var(--shadow); }

        /* Main layout */
        .product-detail {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
          margin-bottom: 36px;
        }

        /* Image column */
        .product-detail-image {
          background: linear-gradient(180deg, #fff, #fbfcff);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
        }
        .product-detail-image img {
          width: 100%;
          max-width: 520px;
          height: auto;
          object-fit: contain;
          border-radius: 8px;
        }

        /* Info column */
        .product-detail-info {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .product-category {
          display:inline-block;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(37,99,235,0.08);
          color: var(--accent);
          font-weight: 700;
          font-size: 13px;
          margin-bottom: 6px;
        }
        .product-detail-info h1 {
          margin: 0;
          font-size: 1.9rem;
          font-weight: 800;
          letter-spacing: -0.3px;
        }
        .product-description {
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.6;
        }

        .product-features {
          margin-top: 6px;
        }
        .product-features h3 {
          margin: 0 0 10px 0;
          font-size: 1.05rem;
        }
        .product-features ul {
          margin: 0;
          padding-left: 1.2rem;
          color: var(--muted);
        }
        .product-features li {
          margin-bottom: 8px;
          line-height: 1.5;
        }

        /* Actions area */
        .product-actions {
          display:flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 8px;
        }
        .product-actions .btn {
          padding: 12px 18px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(90deg,var(--accent),var(--accent-2));
          color: white;
          font-weight: 800;
          display:inline-flex;
          align-items:center;
          gap:10px;
          cursor:pointer;
          transition: transform .12s ease, box-shadow .12s ease;
        }
        .product-actions .btn:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(37,99,235,0.12); }

        .contact-options {
          margin-left: auto;
          display:flex;
          gap:12px;
          align-items:center;
          flex-wrap:wrap;
        }
        .contact-options p { margin: 0; color: var(--muted); font-weight:600; font-size: 0.95rem; }

        .contact-options a.btn-outline {
          display:inline-flex;
          gap:8px;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: #fff;
          color: var(--text);
        }

        /* Detailed content sections */
        .product-detail-content {
          margin-top: 28px;
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 28px;
          align-items: start;
        }
        .detailed-description, .specifications {
          background: var(--card-bg);
          padding: 18px;
          border-radius: 12px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
        }
        .detailed-description h2, .specifications h2 { margin: 0 0 12px 0; }
        .detailed-description p { color: var(--muted); line-height: 1.7; }

        .specs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        .spec-item {
          display:flex;
          justify-content: space-between;
          gap:12px;
          padding: 8px 10px;
          border-radius: 8px;
          background: linear-gradient(180deg,#fff,#fbfcff);
          border: 1px solid rgba(0,0,0,0.03);
        }
        .spec-item strong { color: var(--text); font-weight:700; }

        /* Related products */
        .related-products {
          margin-top: 38px;
        }
        .related-products h2 { margin-bottom: 12px; }
        .products {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .product-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 8px 26px rgba(2,6,23,0.04);
          display:flex;
          flex-direction: column;
        }
        .product-image {
          position: relative;
          height: 160px;
          overflow: hidden;
        }
        .product-image img { width:100%; height:100%; object-fit: cover; display:block; }
        .product-overlay {
          position: absolute;
          inset: 0;
          display:flex;
          align-items:flex-end;
          justify-content:center;
          padding: 12px;
          background: linear-gradient(180deg, transparent, rgba(0,0,0,0.35));
          opacity: 0;
          transition: opacity .18s ease;
        }
        .product-card:hover .product-overlay { opacity: 1; }
        .view-details-btn {
          background: var(--accent);
          color: #fff;
          padding: 8px 12px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 700;
        }
        .product-info { padding: 14px; display:flex; flex-direction:column; gap:8px; flex:1; }
        .product-name { margin:0; font-size: 1.05rem; font-weight: 800; }
        .product-info .product-description { color: var(--muted); font-size: 0.95rem; }

        /* small screens */
        @media (max-width: 980px) {
          .product-detail { grid-template-columns: 1fr; }
          .product-detail-image img { max-width: 480px; }
          .product-detail-content { grid-template-columns: 1fr; }
          .products { grid-template-columns: repeat(2, 1fr); }
          .contact-options { margin-left: 0; }
        }
        @media (max-width: 560px) {
          .container { padding: 0 14px; }
          .product-detail-image img { max-width: 100%; }
          .products { grid-template-columns: 1fr; }
          .product-actions { flex-direction: column; align-items: stretch; }
          .contact-options { width: 100%; justify-content: space-between; }
          .product-detail-content { gap: 16px; }
        }
      `}</style>

      <div className="container">
        <Link to="/catalogue" className="btn-outline" style={{ marginBottom: "1.5rem", display: "inline-flex", alignItems: "center" }}>
          <ArrowLeft size={18} style={{ marginRight: "0.5rem" }} /> Back to Catalogue
        </Link>

        <div className="product-detail">
          <motion.div
            className="product-detail-image"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={product.image} alt={product.name} />
          </motion.div>

          <motion.div
            className="product-detail-info"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="product-category">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="product-description">{product.description}</p>

            <div className="product-features">
              <h3>Key Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="product-actions">
              <button className="btn" style={{ display: "inline-flex", alignItems: "center" }}>
                <ShoppingCart size={18} style={{ marginRight: "0.5rem" }} /> Request Quote
              </button>

              <div className="contact-options" aria-hidden={false}>
                <p>Prefer to talk directly?</p>
                <div style={{ display: "flex", gap: 10 }}>
                  <a href="tel:+92123456789" className="btn-outline" style={{ display: "inline-flex", alignItems: "center" }}>
                    <Phone size={16} style={{ marginRight: "0.5rem" }} /> Call Us
                  </a>
                  <a href="mailto:info@subhanint.com" className="btn-outline" style={{ display: "inline-flex", alignItems: "center" }}>
                    <Mail size={16} style={{ marginRight: "0.5rem" }} /> Email Us
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="product-detail-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="detailed-description">
            <h2>Detailed Description</h2>
            <p>{product.longDescription}</p>
          </div>

          <div className="specifications">
            <h2>Specifications</h2>
            <div className="specs-grid">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="spec-item">
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {relatedProducts.length > 0 && (
          <motion.div
            className="related-products"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2>Related Products</h2>
            <div className="products">
              {relatedProducts.map((relatedProduct, i) => (
                <motion.div
                  className="product-card"
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="product-image">
                    <img src={relatedProduct.image} alt={relatedProduct.name} />
                    <div className="product-overlay">
                      <Link to={`/product/${relatedProduct.id}`} className="view-details-btn">
                        View Details
                      </Link>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="product-category">{relatedProduct.category}</span>
                    <h3 className="product-name">{relatedProduct.name}</h3>
                    <p className="product-description">{relatedProduct.description}</p>
                    <div className="product-actions" style={{ marginTop: "auto" }}>
                      <button className="btn-outline">Request Quote</button>
                      <Link to={`/product/${relatedProduct.id}`} className="btn" style={{ textDecoration: "none", textAlign: "center" }}>
                        Learn More
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
