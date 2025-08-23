// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { motion } from "framer-motion";
import { ArrowRight, Quote, Scissors, Activity, Heart, Phone, Star, Shield, Truck, Award, Users, Globe } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Added for programmatic navigation

  // load products (images) from localStorage if present; fallback to logo placeholders
  useEffect(() => {
    document.title = "Subhan International | Premium Surgical Instruments";
    try {
      const saved = JSON.parse(localStorage.getItem("products")) || [];
      const prepared = saved.map((p) => ({
        id: p.id ?? Math.random(),
        image: p.image || "/logo.png",
        name: p.name || "Product",
      }));
      setProducts(prepared.length ? prepared : [{ id: 1, image: "/logo.png" }, { id: 2, image: "/logo.png" }, { id: 3, image: "/logo.png" }]);
    } catch {
      setProducts([{ id: 1, image: "/logo.png" }, { id: 2, image: "/logo.png" }, { id: 3, image: "/logo.png" }]);
    }
  }, []);

  // Added click handlers for buttons as fallback
  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleCatalogueClick = () => {
    navigate("/catalogue");
  };

  const featuredImages = products.length ? products.map((p) => p.image) : ["/logo.png", "/logo.png", "/logo.png"];
  const duplicatedImages = [...featuredImages, ...featuredImages];

  const testimonials = [
    {
      name: "Dr. Ahmed",
      role: "Chief Surgeon",
      text: "Excellent instruments, fast delivery and superb support. The precision tools have improved our surgical outcomes significantly.",
      avatar: "/logo.png",
      rating: 5
    },
    {
      name: "MediCare Clinic",
      role: "Medical Director",
      text: "Top quality, precise tools we rely on for surgeries. Their instruments have never failed us in critical procedures.",
      avatar: "/logo.png",
      rating: 5
    },
    {
      name: "Surgical House",
      role: "Procurement Manager",
      text: "Highly recommended — consistent, reliable instruments. Their customer service is as exceptional as their products.",
      avatar: "/logo.png",
      rating: 4
    },
  ];

  const features = [
    { icon: <Shield size={24} />, title: "Quality Certified", description: "ISO 9001 certified manufacturing process" },
    { icon: <Globe size={24} />, title: "Global Delivery", description: "Fast shipping to medical facilities worldwide" },
    { icon: <Award size={24} />, title: "Premium Materials", description: "Medical-grade stainless steel instruments" },
    { icon: <Users size={24} />, title: "Expert Support", description: "Technical assistance from medical professionals" },
  ];

  return (
    <div className="home-page">
      {/* sticky CTA */}
      <motion.a
        href="/contact"
        className="sticky-cta"
        aria-label="Contact us"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleContactClick} // Added onClick as fallback
      >
        <div className="pulse-dot"></div>
        <Phone size={18} />
        <span>Get Quote</span>
      </motion.a>

      {/* HERO */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-bg-pattern"></div>
        </div>

        <div className="container hero-container">
          <div className="hero-content">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-title"
            >
              <span className="base-text">Precision Surgical Instruments</span>{" "}
              <span className="gradient-text">for Medical Excellence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="hero-sub"
            >
              Subhan International provides the highest quality surgical instruments to medical professionals worldwide,
              ensuring precision, reliability, and exceptional performance in every procedure.
            </motion.p>

            <div className="hero-ctas">
              <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0 }}>
                <Link to="/catalogue" className="btn btn-primary" onClick={handleCatalogueClick}>
                  Explore Products <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0 }}>
                <Link to="/contact" className="btn btn-outline" onClick={handleContactClick}>
                  Contact Us
                </Link>
              </motion.div>
            </div>

            <div className="trust-indicators" aria-hidden>
              <div className="trust-item">
                <div className="trust-icon"><Activity size={14} /></div>
                <span>ISO 9001 Certified</span>
              </div>
              <div className="trust-item">
                <div className="trust-icon"><Heart size={14} /></div>
                <span>Patient Safety First</span>
              </div>
              <div className="trust-item">
                <div className="trust-icon"><Truck size={14} /></div>
                <span>Worldwide Delivery</span>
              </div>
            </div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="logo-container">
              <div className="logo-glow"></div>
              <img src="/logo.png" alt="Subhan International" className="hero-logo" />
            </div>
          </motion.div>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line"></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose Subhan International
          </motion.h2>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products -> image-only auto-scrolling carousel */}
      <section className="section featured-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured Products
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Swipe or hover to pause — images auto-scroll
          </motion.p>

          <div className="featured-carousel-wrapper">
            <div className="featured-carousel" aria-hidden>
              <div className="carousel-track">
                {duplicatedImages.map((src, idx) => (
                  <div className="carousel-item" key={`${src}-${idx}`}>
                    <div className="carousel-item-inner">
                      <img src={src} alt={`Featured ${idx}`} loading="lazy" />
                      <div className="carousel-overlay">
                        <button className="quick-view-btn">Quick View</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="carousel-gradient-left"></div>
            <div className="carousel-gradient-right"></div>
          </div>

          <motion.div
            style={{ textAlign: "center", marginTop: 40 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/catalogue" className="btn btn-primary btn-large" onClick={handleCatalogueClick}>
              View Full Catalogue
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Trusted by Medical Professionals
          </motion.h3>

          <div className="testi-wrap">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="testi-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="testi-rating">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      size={14}
                      fill={starIdx < t.rating ? "#F59E0B" : "none"}
                      color="#F59E0B"
                    />
                  ))}
                </div>
                <div className="testi-icon"><Quote size={18} /></div>
                <p>"{t.text}"</p>
                <div className="testi-author">
                  <img src={t.avatar} alt={t.name} className="testi-avatar" />
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-background"></div>
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Elevate Your Surgical Practice?</h2>
            <p>Contact us today to discuss your instrument needs or request a customized quote</p>
            <div className="cta-buttons">
              <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0 }}>
                <Link to="/contact" className="btn btn-primary btn-large" onClick={handleContactClick}>
                  Request a Quote
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0 }}>
                <Link to="/catalogue" className="btn btn-outline btn-large" onClick={handleCatalogueClick}>
                  Browse Catalogue
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inline styles */}
      <style>{`
        :root {
          --text: #0F172A;
          --accent: #2563EB;
          --accent-dark: #1E40AF;
          --accent-light: #DBEAFE;
          --bg: #FFFFFF;
          --muted: #64748B;
          --nav-height: 80px;
          --border-radius: 16px;
          --shadow: 0 8px 30px rgba(2,6,23,0.06);
          --shadow-hover: 0 20px 50px rgba(2,6,23,0.1);
          --transition: all 0.3s ease;
        }
        * { box-sizing: border-box; }
        body { 
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; 
          color:var(--text); 
          background:var(--bg); 
          line-height:1.6; 
          scroll-behavior: smooth;
        }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        .sticky-cta {
          position: fixed; 
          right: 20px; 
          bottom: 20px; 
          background: var(--accent); 
          color: #fff; 
          padding: 12px 20px; 
          border-radius: 50px;
          font-weight: 700; 
          text-decoration: none; 
          display:flex; 
          align-items:center; 
          gap:8px; 
          z-index: 999; 
          box-shadow: var(--shadow-hover);
          transition: var(--transition);
          cursor: pointer;
        }
        .sticky-cta:hover {
          background: var(--accent-dark);
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
        }
        .pulse-dot {
          position: absolute;
          top: -5px;
          right: -5px;
          width: 12px;
          height: 12px;
          background: #EF4444;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        /* HERO */
        .hero { 
          padding: calc(var(--nav-height) + 20px) 0 60px; 
          background: linear-gradient(135deg,#F8FAFC 0%,#F1F5F9 100%);
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        .hero-bg-pattern {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
          opacity: 0.5;
        }
        .hero-container { 
          display:flex; 
          align-items:center; 
          gap: 36px; 
          position: relative;
          z-index: 2;
        }
        @media (max-width: 1024px) { 
          .hero-container { 
            flex-direction: column; 
            text-align: center; 
          } 
        }

        .hero-content { flex: 1; max-width: 640px; }
        .hero-title { 
          font-size: 3rem; 
          font-weight: 800; 
          margin-bottom: 16px; 
          line-height: 1.1; 
        }
        .hero-title .base-text { color: var(--text); font-weight: 800; }
        .gradient-text { 
          background: linear-gradient(135deg, var(--accent), var(--accent-dark)); 
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent; 
          background-clip: text; 
        }
        .hero-sub { 
          color: var(--muted); 
          margin-bottom: 28px; 
          font-size: 1.1rem; 
          max-width: 90%;
        }

        .hero-ctas { 
          display:flex; 
          gap: 16px; 
          margin-bottom: 28px; 
          flex-wrap: wrap; 
        }
        .btn { 
          display:inline-flex; 
          align-items:center; 
          justify-content:center; 
          padding:12px 24px; 
          border-radius:12px; 
          text-decoration:none; 
          font-weight:700; 
          border: 2px solid transparent; 
          gap:8px; 
          transition: var(--transition);
          cursor: pointer;
        }
        .btn-primary { 
          background: linear-gradient(135deg, var(--accent), var(--accent-dark)); 
          color: white; 
          box-shadow: var(--shadow); 
        }
        .btn-primary:hover { 
          transform: translateY(-3px); 
          box-shadow: var(--shadow-hover); 
        }
        .btn-outline { 
          background: transparent; 
          color: var(--accent); 
          border-color: var(--accent); 
        }
        .btn-outline:hover { 
          background: var(--accent); 
          color: white; 
        }
        .btn-large {
          padding: 16px 32px;
          font-size: 1.05rem;
        }

        .trust-indicators { 
          display:flex; 
          gap:20px; 
          margin-top:20px; 
          color: var(--muted);
          flex-wrap: wrap;
        }
        .trust-item { 
          display:flex; 
          align-items:center; 
          gap:8px; 
        }
        .trust-icon { 
          width:32px; 
          height:32px; 
          border-radius:50%; 
          display:inline-flex; 
          align-items:center; 
          justify-content:center; 
          background: var(--accent-light); 
          color: var(--accent); 
        }

        .hero-visual { 
          flex: 1; 
          display:flex; 
          align-items:center; 
          justify-content:center; 
          position: relative;
        }
        .logo-container { 
          width: 280px; 
          height: 280px; 
          background: white; 
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; 
          display:flex; 
          align-items:center; 
          justify-content:center; 
          box-shadow: var(--shadow);
          position: relative;
          animation: morphing 10s ease-in-out infinite;
        }
        .logo-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          box-shadow: 0 0 40px rgba(37, 99, 235, 0.2);
          animation: pulse 3s ease-in-out infinite alternate;
        }
        .hero-logo { 
          max-width: 60%; 
          max-height: 60%; 
          object-fit: contain; 
          z-index: 2;
        }
        
        .hero-scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--muted);
          font-size: 0.8rem;
        }
        .scroll-line {
          width: 2px;
          height: 40px;
          background: var(--accent);
          margin-bottom: 8px;
          animation: scrollLine 2s infinite;
        }

        /* Features Section */
        .features-section {
          padding: 80px 0;
          background: #fff;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-top: 40px;
        }
        .feature-card {
          background: #F8FAFC;
          padding: 32px 24px;
          border-radius: var(--border-radius);
          text-align: center;
          transition: var(--transition);
        }
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow);
        }
        .feature-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--accent-light);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }
        .feature-card h3 {
          margin-bottom: 12px;
          font-weight: 700;
        }
        .feature-card p {
          color: var(--muted);
        }

        /* Featured carousel */
        .featured-section { 
          padding: 80px 0; 
          background: #F8FAFC;
        }
        .section-title { 
          text-align:center; 
          font-size:2.2rem; 
          margin-bottom:12px; 
          font-weight: 800;
        }
        .section-subtitle { 
          text-align:center; 
          color: var(--muted); 
          margin-bottom: 40px; 
          font-size: 1.1rem;
        }
        
        .featured-carousel-wrapper {
          position: relative;
          margin: 0 auto;
          max-width: 100%;
          overflow: hidden;
          border-radius: var(--border-radius);
        }
        .featured-carousel { 
          overflow: hidden; 
          padding: 16px 0; 
          position: relative;
        }
        .carousel-track { 
          display:flex; 
          gap: 20px; 
          align-items:center; 
          animation: scroll-left 22s linear infinite; 
        }
        .carousel-track:hover { 
          animation-play-state: paused; 
        }
        .carousel-item { 
          flex: 0 0 auto; 
          width: 320px; 
  height: 220px; 
          border-radius: var(--border-radius); 
          overflow: hidden; 
          box-shadow: var(--shadow); 
          background: #fff;
          position: relative;
        }
        .carousel-item-inner {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .carousel-item img { 
          width:100%; 
          height:100%; 
          object-fit: cover; 
          display:block; 
          transition: transform .35s ease; 
        }
        .carousel-item:hover img { 
          transform: scale(1.05); 
        }
        .carousel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition);
        }
        .carousel-item:hover .carousel-overlay {
          opacity: 1;
        }
        .quick-view-btn {
          background: white;
          color: var(--text);
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }
        .quick-view-btn:hover {
          background: var(--accent);
          color: white;
        }
        .carousel-gradient-left, .carousel-gradient-right {
          position: absolute;
          top: 0;
          width: 100px;
          height: 100%;
          z-index: 2;
        }
        .carousel-gradient-left {
          left: 0;
          background: linear-gradient(90deg, #F8FAFC 0%, transparent 100%);
        }
        .carousel-gradient-right {
          right: 0;
          background: linear-gradient(270deg, #F8FAFC 0%, transparent 100%);
        }

        /* Testimonials */
        .testimonials { 
          padding: 80px 0; 
          background: linear-gradient(135deg,#F8FAFC 0%,#F1F5F9 100%); 
          position: relative;
          overflow: hidden;
        }
        .testi-wrap { 
          display:grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 24px; 
          margin-top: 40px; 
        }
        .testi-card { 
          background: white; 
          padding: 32px; 
          border-radius: var(--border-radius); 
          box-shadow: var(--shadow); 
          position: relative;
          transition: var(--transition);
        }
        .testi-card:hover {
          box-shadow: 0 15px 40px rgba(2,6,23,0.1);
        }
        .testi-rating {
          display: flex;
          gap: 4px;
          margin-bottom: 16px;
        }
        .testi-icon { 
          position: absolute; 
          top: -14px; 
          right: 16px; 
          background: var(--accent); 
          color: white; 
          width:36px; 
          height:36px; 
          border-radius:50%; 
          display:flex; 
          align-items:center; 
          justify-content:center; 
        }
        .testi-card p { 
          font-style: italic; 
          margin-bottom: 20px; 
          color: var(--text); 
          font-size: 1.05rem;
          line-height: 1.6;
        }
        .testi-author { 
          display:flex; 
          align-items:center; 
          gap:12px; 
        }
        .testi-avatar { 
          width:48px; 
          height:48px; 
          border-radius:50%; 
          object-fit:cover; 
        }
        .testi-name { 
          font-weight:700; 
        }
        .testi-role { 
          color: var(--muted); 
          font-size:0.9rem; 
        }

        /* CTA */
        .cta-section { 
          padding: 80px 0; 
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%); 
          color: white; 
          text-align:center; 
          position: relative;
          overflow: hidden;
        }
        .cta-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.3;
          z-index: -1;              /* push background behind content */
          pointer-events: none;     /* prevent blocking clicks */
        }
        .cta-content h2 { 
          font-size: 2.2rem; 
          margin-bottom:16px; 
          font-weight:800; 
        }
        .cta-content p { 
          opacity: 0.9; 
          margin-bottom: 28px; 
          font-size: 1.1rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .cta-buttons { 
          display:flex; 
          gap:16px; 
          justify-content:center; 
          flex-wrap:wrap; 
        }

        /* Animations */
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* duplicated content */
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes morphing {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
          50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
          75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
          100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        }
        
        @keyframes scrollLine {
          0% { height: 0; opacity: 0; }
          50% { height: 40px; opacity: 1; }
          100% { height: 0; opacity: 0; transform: translateY(20px); }
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .hero-title { font-size: 2.5rem; }
          .testi-wrap { grid-template-columns: repeat(2, 1fr); }
          .carousel-item { width: 280px; height: 200px; }
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 2rem; }
          .hero-sub { max-width: 100%; }
          .carousel-item { width: 240px; height: 180px; }
          .testi-wrap { grid-template-columns: 1fr; }
          .hero-container { min-height: auto; }
          .features-grid { grid-template-columns: 1fr; }
          .hero-ctas, .cta-buttons { justify-content: center; }
          .trust-indicators { justify-content: center; }
          .logo-container { width: 220px; height: 220px; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 1.8rem; }
          .section-title { font-size: 1.8rem; }
          .hero-ctas, .cta-buttons { flex-direction: column; width: 100%; }
          .btn { width: 100%; justify-content: center; }
          .carousel-item { width: 200px; height: 160px; }
        }
      `}</style>
    </div>
  );
}