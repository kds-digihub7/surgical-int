// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Globe, Truck } from "lucide-react";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.title = "Subhan International | Premium Surgical Instruments";

    // Load products from localStorage (if any)
    try {
      const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
      setProducts(savedProducts);
    } catch (err) {
      setProducts([]);
      // optional: console.warn("Failed to parse products from localStorage", err);
    }
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-title"
          >
            Precision Surgical Instruments for Medical Excellence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hero-sub"
          >
            Subhan International provides the highest quality surgical instruments to medical
            professionals worldwide, ensuring precision, reliability, and exceptional performance in
            every procedure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hero-actions"
          >
            <Link to="/catalogue" className="btn btn-primary explore-btn">
              <span className="explore-text">Explore Products</span>
              <ArrowRight size={20} className="explore-arrow" />
            </Link>

            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose Subhan International</h2>
          <p className="section-subtitle">We are committed to excellence in every instrument we produce</p>

          <div className="features">
            {[
              {
                icon: <Check size={36} />,
                title: "Premium Quality",
                desc: "Finest medical-grade materials for unparalleled performance and durability."
              },
              {
                icon: <Globe size={36} />,
                title: "Global Reach",
                desc: "Trusted by medical professionals across the globe with reliable shipping."
              },
              {
                icon: <Truck size={36} />,
                title: "Fast Delivery",
                desc: "Efficient logistics network ensures timely delivery of orders worldwide."
              }
            ].map((item, i) => (
              <motion.div
                className="feature-card"
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="feature-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section light-bg">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Explore our range of premium surgical instruments</p>

          <div className="products">
            {products && products.length > 0 ? (
              products.slice(0, 3).map((item, i) => (
                <motion.div
                  className="product-card"
                  key={item.id ?? i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.12, duration: 0.45 }}
                  viewport={{ once: true }}
                >
                  <div className="product-image">
                    <img src={item.image} alt={item.name} />
                    <div className="product-overlay">
                      <Link to={`/product/${item.id}`} className="view-details-btn">
                        View Details
                      </Link>
                    </div>
                  </div>

                  <div className="product-info">
                    <span className="product-category">{item.category}</span>
                    <h3 className="product-name">{item.name}</h3>
                    <p className="product-description">{item.description}</p>
                    <div className="product-actions">
                      <button className="btn btn-outline">Request Quote</button>
                      <Link to={`/product/${item.id}`} className="btn btn-small">
                        Learn More
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="no-products">
                <p>No featured products found. Add items to <code>localStorage["products"]</code> or
                visit the catalogue.</p>
                <Link to="/catalogue" className="btn">View Catalogue</Link>
              </div>
            )}
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link to="/catalogue" className="btn btn-primary-outline">View Full Catalogue</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", maxWidth: 900, margin: "0 auto" }}
          >
            <h2 className="cta-title">Ready to Elevate Your Surgical Practice?</h2>
            <p className="cta-sub">Contact us today to discuss your instrument needs or request a custom quote.</p>
            <div className="cta-button-group">
              <Link to="/contact" className="btn-cta-primary">Get in Touch</Link>
              <Link to="/catalogue" className="btn-cta-secondary">Browse Products</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Component styles */}
      <style>{`
        :root {
          --primary: #2563eb;
          --primary-dark: #1e40af;
          --muted: #6b7280;
          --card-border: #e6edf6;
        }

        .container {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .hero {
          padding: 60px 0 36px;
          text-align: center;
        }
        .hero-title {
          font-size: 2.25rem;
          line-height: 1.05;
          margin: 0 0 18px;
          color: var(--primary-dark);
        }
        .hero-sub {
          max-width: 900px;
          margin: 0 auto 24px;
          color: var(--muted);
          font-size: 1.05rem;
        }

        .hero-actions {
          display: flex;
          gap: 18px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        /* Explore button with arrow aligned to right-center */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 18px;
          border-radius: 10px;
          text-decoration: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
        }
        .btn-primary {
          background: linear-gradient(90deg, var(--primary), var(--primary-dark));
          color: white;
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.12);
          border: none;
        }
        .btn-outline {
          background: transparent;
          color: var(--primary-dark);
          border: 2px solid rgba(37,99,235,0.12);
        }

        .explore-btn {
          position: relative;
          padding-right: 54px; /* space for arrow */
          padding-left: 22px;
          min-width: 220px;
          gap: 0;
          overflow: visible;
        }
        .explore-text {
          display: inline-block;
          text-align: left;
          width: 100%;
        }
        .explore-arrow {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: white;
        }

        .btn-small {
          padding: 8px 12px;
          border-radius: 8px;
        }

        /* features */
        .features {
          margin-top: 28px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .feature-card {
          background: white;
          border-radius: 12px;
          padding: 18px;
          text-align: left;
          box-shadow: 0 8px 20px rgba(14,22,34,0.04);
          border: 1px solid var(--card-border);
        }
        .feature-icon { color: var(--primary); margin-bottom: 10px; }

        /* products grid */
        .light-bg { background: #fafafa; padding: 40px 0; }
        .products { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px; }
        .product-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--card-border);
          box-shadow: 0 8px 22px rgba(14,22,34,0.04);
          display: grid;
          grid-template-rows: auto 1fr;
        }
        .product-image { position: relative; height: 180px; overflow: hidden; }
        .product-image img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .product-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity .18s ease;
          background: linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.16));
        }
        .product-image:hover .product-overlay { opacity: 1; }
        .view-details-btn {
          background: rgba(255,255,255,0.95);
          padding: 8px 12px;
          border-radius: 8px;
          color: var(--primary-dark);
          text-decoration: none;
          font-weight: 600;
        }
        .product-info { padding: 14px; display:flex; flex-direction:column; gap:12px; }
        .product-category { font-size: 12px; color: var(--muted); font-weight:600; }
        .product-name { margin: 0; font-size: 18px; color: #0f1724; }
        .product-description { margin:0; color: var(--muted); font-size: 14px; line-height:1.4; }
        .product-actions { display:flex; gap:10px; margin-top:auto; }

        .no-products { text-align:center; padding: 24px; color: var(--muted); }

        /* CTA */
        .cta {
          padding: 48px 0;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
        }
        .cta-title { font-size: 2rem; margin-bottom: 8px; }
        .cta-sub { font-size: 1.05rem; margin-bottom: 20px; opacity: 0.95; }
        .cta-button-group {
          display:flex; gap:18px; justify-content:center; flex-wrap:wrap;
        }
        .btn-cta-primary {
          background: white; color: var(--primary); padding: 14px 28px; border-radius: 999px; font-weight:700; text-decoration:none;
          box-shadow: 0 10px 40px rgba(1, 67, 180, 0.12);
        }
        .btn-cta-secondary {
          background: transparent; color: white; padding: 14px 28px; border-radius: 999px; font-weight:700; text-decoration:none;
          border: 2px solid rgba(255,255,255,0.18);
        }

        /* responsive */
        @media (max-width: 980px) {
          .features { grid-template-columns: 1fr; }
          .products { grid-template-columns: 1fr; }
          .explore-btn { min-width: 180px; padding-right: 48px; }
        }
      `}</style>
    </div>
  );
}

export default Home;
