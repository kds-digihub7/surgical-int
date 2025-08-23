// src/pages/Home.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Globe, Truck, ChevronLeft, ChevronRight, Users, Award, Heart } from "lucide-react";

function Home() {
  const [products, setProducts] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const autoplayRef = useRef(null);

  // Enhanced slider slides with more details and visual elements
  const slides = [
    {
      id: 1,
      title: "Precision Instruments",
      subtitle: "Designed for accuracy and longevity in critical procedures.",
      description: "Crafted with attention to detail for optimal surgical outcomes.",
      color: "#E8F6FF",
      textColor: "#0F1724",
      icon: <Check size={32} />,
      cta: "Browse Instruments",
      link: "/catalogue"
    },
    {
      id: 2,
      title: "Sterile & Reliable",
      subtitle: "Manufactured under strict quality control standards.",
      description: "Each instrument undergoes rigorous testing and sterilization.",
      color: "#EFFCF6",
      textColor: "#064E3B",
      icon: <Truck size={32} />,
      cta: "Quality Standards",
      link: "/catalogue"
    },
    {
      id: 3,
      title: "Global Delivery",
      subtitle: "Trusted by clinics and hospitals worldwide.",
      description: "Fast, reliable shipping to medical facilities across the globe.",
      color: "#FFF7ED",
      textColor: "#7C2D12",
      icon: <Globe size={32} />,
      cta: "Shipping Info",
      link: "/catalogue"
    },
  ];

  useEffect(() => {
    document.title = "Subhan International | Premium Surgical Instruments";

    // Load products from localStorage (if any)
    try {
      const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
      setProducts(savedProducts);
    } catch (err) {
      setProducts([]);
    }
  }, []);

  // autoplay with cleanup
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideIndex, isHovering]);

  const startAutoplay = () => {
    stopAutoplay();
    if (!isHovering) {
      autoplayRef.current = setInterval(() => {
        setSlideIndex((s) => (s + 1) % slides.length);
      }, 5000);
    }
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const goPrev = () => setSlideIndex((s) => (s - 1 + slides.length) % slides.length);
  const goNext = () => setSlideIndex((s) => (s + 1) % slides.length);
  const goTo = (i) => setSlideIndex(i);

  // Progress bar component
  const ProgressBar = ({ index, active }) => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      if (active) {
        setProgress(0);
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 100 / (5000 / 50); // 5000ms divided by 50ms intervals
          });
        }, 50);
        
        return () => clearInterval(interval);
      } else {
        setProgress(0);
      }
    }, [active, index]);
    
    return (
      <div className="progress-bar">
        <motion.div 
          className="progress-fill"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    );
  };

  return (
    <div className="home-page">
      {/* HERO SECTION WITH SLIDER */}
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
              <ArrowRight size={23} className="explore-arrow" />
            </Link>

            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </motion.div>

          {/* --- ENHANCED SLIDER START --- */}
          <div
            className="hero-slider"
            onMouseEnter={() => {
              setIsHovering(true);
              stopAutoplay();
            }}
            onMouseLeave={() => {
              setIsHovering(false);
              startAutoplay();
            }}
          >
            {/* slides area */}
            <div className="slider-viewport" role="region" aria-roledescription="carousel" aria-label="Highlights">
              <AnimatePresence initial={false} mode="wait">
                {slides.map((slide, idx) =>
                  idx === slideIndex ? (
                    <motion.div
                      key={slide.id}
                      className="slide"
                      initial={{ opacity: 0, x: 100, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -100, scale: 1.05 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      style={{ background: slide.color }}
                      aria-live="polite"
                    >
                      <div className="slide-content" style={{ color: slide.textColor }}>
                        <motion.div 
                          className="slide-icon"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                        >
                          {slide.icon}
                        </motion.div>
                        <div className="slide-text-content">
                          <motion.h3 
                            className="slide-title"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            {slide.title}
                          </motion.h3>
                          <motion.p 
                            className="slide-sub"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            {slide.subtitle}
                          </motion.p>
                          <motion.p 
                            className="slide-desc"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            {slide.description}
                          </motion.p>
                          <motion.div 
                            className="slide-cta"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            <Link to={slide.link} className="btn btn-small">{slide.cta}</Link>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ) : null
                )}
              </AnimatePresence>

              {/* controls */}
              <motion.button 
                className="slider-btn prev" 
                onClick={goPrev} 
                aria-label="Previous slide"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button 
                className="slider-btn next" 
                onClick={goNext} 
                aria-label="Next slide"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={24} />
              </motion.button>
              
              {/* Progress indicator for current slide */}
              <div className="slide-progress">
                <ProgressBar index={slideIndex} active={!isHovering} />
              </div>
            </div>

            {/* dots with numbers */}
            <div className="slider-dots" role="tablist" aria-label="Slide navigation">
              {slides.map((slide, i) => (
                <button
                  key={i}
                  className={`dot ${i === slideIndex ? "active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}: ${slide.title}`}
                  role="tab"
                  aria-selected={i === slideIndex}
                >
                  <span className="dot-number">{i + 1}</span>
                  <span className="dot-title">{slide.title}</span>
                </button>
              ))}
            </div>
          </div>
          {/* --- ENHANCED SLIDER END --- */}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Subhan International</h2>
              <p>
                With over two decades of experience, Subhan International has established itself as a 
                trusted provider of high-quality surgical instruments to medical professionals worldwide. 
                Our commitment to excellence, precision, and reliability has made us a preferred partner 
                for hospitals, clinics, and healthcare institutions.
              </p>
              <div className="about-features">
                <div className="feature">
                  <Award size={32} className="feature-icon" />
                  <h3>Quality Certified</h3>
                  <p>All our products meet international quality standards and certifications.</p>
                </div>
                <div className="feature">
                  <Users size={32} className="feature-icon" />
                  <h3>Expert Team</h3>
                  <p>Our team includes experienced professionals with medical and engineering backgrounds.</p>
                </div>
                <div className="feature">
                  <Heart size={32} className="feature-icon" />
                  <h3>Patient Safety</h3>
                  <p>We prioritize instruments that ensure patient safety and surgical success.</p>
                </div>
              </div>
              <Link to="/about" className="btn btn-primary">Learn More About Us</Link>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <span>Surgical Instruments Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* Reset and base styles */
        .home-page {
          position: relative;
          width: 100%;
          overflow-x: hidden;
        }
        
        :root {
          --text: #0F1724;
          --accent: #3B82F6;
          --accent-dark: #2563EB;
          --bg: #FFFFFF;
          --card: #F1F5F9;
          --muted: #64748B;
          --card-border: #E6EEF8;
          --nav-height: 70px;
        }

        .container {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .hero {
          padding: calc(var(--nav-height) + 40px) 0 28px;
          text-align: center;
          background: var(--bg);
          position: relative;
          z-index: 1;
        }
        .hero-title { 
          font-size: 2.5rem; 
          line-height: 1.1; 
          margin: 0 0 12px; 
          color: var(--text); 
          font-weight: 800; 
          letter-spacing: -0.5px;
        }
        .hero-sub { 
          max-width: 900px; 
          margin: 0 auto 18px; 
          color: var(--muted); 
          font-size: 1.05rem; 
          line-height:1.6; 
        }

        .hero-actions { 
          display:flex; 
          gap:18px; 
          justify-content:center; 
          margin-bottom: 22px; 
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          border: 2px solid transparent;
        }

        .btn-primary {
          background: var(--accent);
          color: white;
        }

        .btn-primary:hover {
          background: var(--accent-dark);
          transform: translateY(-2px);
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

        .explore-btn {
          gap: 8px;
        }

        /* --- ENHANCED SLIDER STYLES --- */
        .hero-slider { 
          margin: 18px auto 6px; 
          max-width: 980px; 
          width: 100%; 
          position: relative;
          z-index: 2;
        }
        .slider-viewport { 
          position: relative; 
          overflow: hidden; 
          border-radius: 16px; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          height: 220px; /* Reduced height */
        }
        .slide {
          border-radius: 16px;
          padding: 24px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
        }
        .slide-content {
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          gap: 20px;
        }
        .slide-icon {
          margin-bottom: 0;
          background: rgba(255,255,255,0.7);
          padding: 12px;
          border-radius: 12px;
          display: inline-flex;
          flex-shrink: 0;
          z-index: 5; /* Ensure icon is above other elements */
        }
        .slide-text-content {
          flex: 1;
          text-align: left;
        }
        .slide-title { 
          margin: 0 0 8px; 
          font-size: 1.4rem; 
          font-weight: 700; 
          line-height: 1.2;
        }
        .slide-sub { 
          margin: 0 0 8px; 
          font-size: 1rem;
          font-weight: 500;
          opacity: 0.9;
          line-height: 1.4;
        }
        .slide-desc {
          margin: 0 0 16px;
          opacity: 0.8;
          max-width: 600px;
          line-height: 1.5;
          font-size: 0.9rem;
        }

        .slide-cta { 
          margin-top: 8px; 
        }
        .btn-small {
          display:inline-flex; 
          padding: 8px 16px; 
          border-radius: 6px; 
          background: rgba(255,255,255,0.9);
          color: var(--text); 
          font-weight:600; 
          text-decoration:none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.2s ease;
          border: 1px solid rgba(255,255,255,0.5);
          font-size: 0.9rem;
        }
        .btn-small:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          background: white;
        }

        /* arrow buttons */
        .slider-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.9);
          color: var(--text);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          z-index: 10;
        }
        .slider-btn:hover { 
          background: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .slider-btn.prev { left: 15px; }
        .slider-btn.next { right: 15px; }

        /* Progress bar */
        .slide-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(0,0,0,0.1);
          border-radius: 0 0 16px 16px;
          overflow: hidden;
        }
        .progress-bar {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .progress-fill {
          height: 100%;
          background: var(--accent);
          border-radius: 0 0 16px 16px;
        }

        /* Enhanced dots with numbers and titles */
        .slider-dots { 
          display:flex; 
          gap: 16px; 
          justify-content:center; 
          margin-top: 20px; 
        }
        .dot { 
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 50px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          position: relative;
        }
        .dot-number {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15,23,36,0.1);
          color: var(--text);
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 0.8rem;
        }
        .dot-title {
          font-size: 0;
          opacity: 0;
          position: absolute;
          top: 100%;
          margin-top: 8px;
          background: var(--text);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          white-space: nowrap;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        .dot:hover .dot-title {
          font-size: 0.7rem;
          opacity: 1;
        }
        .dot.active .dot-number {
          background: var(--accent);
          color: white;
          transform: scale(1.1);
        }

        /* About Section */
        .about-section {
          padding: 60px 0;
          background: #f8fafc;
        }
        .about-content {
          display: flex;
          gap: 40px;
          align-items: center;
        }
        .about-text {
          flex: 1;
        }
        .about-text h2 {
          font-size: 2rem;
          margin-bottom: 20px;
          color: var(--text);
        }
        .about-text > p {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 30px;
          color: var(--muted);
        }
        .about-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }
        .feature {
          text-align: center;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .feature-icon {
          color: var(--accent);
          margin-bottom: 12px;
        }
        .feature h3 {
          font-size: 1.1rem;
          margin-bottom: 8px;
          color: var(--text);
        }
        .feature p {
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.5;
        }
        .about-image {
          flex: 1;
        }
        .image-placeholder {
          height: 300px;
          background: #e2e8f0;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted);
        }

        /* responsive */
        @media (max-width: 980px) {
          .slide { 
            padding: 20px; 
            height: 200px;
          }
          .slide-content {
            gap: 15px;
          }
          .slider-btn { 
            width:36px; 
            height:36px; 
          }
          .slide-title { 
            font-size: 1.2rem; 
          }
          .slide-sub, .slide-desc {
            font-size: 0.9rem;
          }
          .about-content {
            flex-direction: column;
          }
          .about-features {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .hero-title { 
            font-size: 2rem; 
          }
          .hero {
            padding: calc(var(--nav-height) + 20px) 0 20px;
          }
          .slide { 
            padding: 18px; 
            height: 180px;
          }
          .slider-viewport {
            height: 180px;
          }
          .slider-btn { 
            width:32px; 
            height:32px; 
          }
          .slider-btn.prev { left: 10px; }
          .slider-btn.next { right: 10px; }
          .slide-icon {
            padding: 10px;
          }
          .slide-title { 
            font-size: 1.1rem; 
          }
          .slide-sub {
            font-size: 0.9rem;
          }
          .slide-desc {
            font-size: 0.8rem;
            display: none;
          }
          .about-section {
            padding: 40px 0;
          }
          .about-text h2 {
            font-size: 1.8rem;
          }
        }
        @media (max-width: 640px) {
          .hero-title { 
            font-size: 1.75rem; 
          }
          .slide { 
            padding: 16px; 
            height: 160px;
            border-radius:12px; 
          }
          .slider-viewport {
            border-radius: 12px;
            height: 160px;
          }
          .slider-btn { 
            width:30px; 
            height:30px; 
          }
          .slider-dots {
            gap: 12px;
          }
          .dot {
            width: 40px;
          }
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }
          .slide-title {
            font-size: 1rem;
          }
          .slide-sub {
            font-size: 0.85rem;
          }
          .about-text h2 {
            font-size: 1.5rem;
          }
          .about-text > p {
            font-size: 1rem;
          }
        }
        @media (max-width: 480px) {
          .slide {
            height: 180px;
          }
          .slider-viewport {
            height: 180px;
          }
          .slide-title {
            font-size: 0.95rem;
          }
          .slide-sub {
            font-size: 0.8rem;
          }
          .slide-content {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
          .slide-text-content {
            text-align: center;
          }
          .slide-icon {
            margin-bottom: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;