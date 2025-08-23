// src/pages/About.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, Users, Heart, ArrowRight, Shield, Globe, Target } from "lucide-react";

export default function About() {
  useEffect(() => {
    document.title = "Subhan International | About";
  }, []);

  // Small reusable variants
  const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const fade = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
  };

  const sections = [
    {
      title: "Our Story",
      desc:
        "Founded with a vision to provide healthcare professionals with the finest surgical instruments, Subhan International has been serving the medical community for over two decades. Our journey began with a simple mission: to enhance surgical outcomes through precision-crafted tools.",
    },
    {
      title: "Our Mission",
      desc:
        "We strive to enhance surgical outcomes with high-precision instruments that meet the exacting standards of modern medical practice. Our commitment to quality ensures that every instrument performs flawlessly when it matters most.",
    },
    {
      title: "Quality Assurance",
      desc:
        "Every instrument undergoes rigorous quality checks and meets international standards. Our multi-point inspection process guarantees that only the finest products reach our customers.",
    },
    {
      title: "Global Presence",
      desc:
        "With clients in over 30 countries, we're a trusted global supplier to hospitals, clinics, and healthcare institutions worldwide. Our logistics network ensures timely delivery anywhere in the world.",
    },
  ];

  const stats = [
    { value: "20+", label: "Years Experience", icon: <Award size={24} /> },
    { value: "30+", label: "Countries Served", icon: <Globe size={24} /> },
    { value: "5000+", label: "Products", icon: <Target size={24} /> },
    { value: "100%", label: "Quality Assurance", icon: <Shield size={24} /> },
  ];

  return (
    <div className="about-page">

      {/* ABOUT MAIN: text + features + illustrative image */}
      <main className="about-main" gap-5>
        <div className="container">
          <motion.div
            className="about-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.section className="about-text" variants={fadeUp}>
              <motion.h2 variants={fadeUp}>About Subhan International</motion.h2>
              <motion.p variants={fade} className="lead-paragraph">
                With over two decades of experience, Subhan International has established itself as a
                trusted provider of high-quality surgical instruments to medical professionals worldwide.
                Our commitment to excellence, precision, and reliability has made us a preferred partner
                for hospitals, clinics, and healthcare institutions.
              </motion.p>

              <motion.div className="about-features" variants={staggerContainer}>
                <motion.article className="feature" variants={fadeUp}>
                  <div className="feature-icon-container" aria-hidden>
                    <Award size={28} className="feature-icon" />
                  </div>
                  <h3>Quality Certified</h3>
                  <p>All our products meet international quality standards and certifications.</p>
                </motion.article>

                <motion.article className="feature" variants={fadeUp}>
                  <div className="feature-icon-container" aria-hidden>
                    <Users size={28} className="feature-icon" />
                  </div>
                  <h3>Expert Team</h3>
                  <p>Our team includes experienced professionals with medical and engineering backgrounds.</p>
                </motion.article>

                <motion.article className="feature" variants={fadeUp}>
                  <div className="feature-icon-container" aria-hidden>
                    <Heart size={28} className="feature-icon" />
                  </div>
                  <h3>Patient Safety</h3>
                  <p>We prioritize instruments that ensure patient safety and surgical success.</p>
                </motion.article>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Link to="/catalogue" className="btn btn-primary cta-explore" aria-label="Explore our products">
                  Explore Our Products <ArrowRight size={18} className="btn-arrow" />
                </Link>
              </motion.div>
            </motion.section>

            <motion.aside
              className="about-image"
              variants={fadeUp}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {/* Replace with real public image if available (e.g. /hero-product.jpg) */}
              <img src="/logo.png" alt="Subhan International" className="about-hero-image" />
            </motion.aside>
          </motion.div>
        </div>
      </main>

      {/* STATS / IMPACT - visually prominent */}
      <section className="stats-section" aria-labelledby="impact-heading">
        <div className="container">
          <motion.h3 id="impact-heading" className="stats-title" initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
            Our Impact in Numbers
          </motion.h3>

          <motion.div
            className="stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {stats.map((s, i) => (
              <motion.div key={i} className="stat-item" variants={fadeUp} whileHover={{ y: -8 }}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DETAILED SECTIONS: Our Story, Mission, Quality, Global Presence */}
      {/* <section className="detailed-sections" aria-labelledby="sections-heading">
        <div className="container">
          <h3 id="sections-heading" className="sections-title">What We Do</h3>
          <div className="sections-grid">
            {sections.map((sec, idx) => (
              <motion.article key={idx} className="section-card" initial="hidden" whileInView="visible" variants={fade} viewport={{ once: true }}>
                <h4>{sec.title}</h4>
                <p>{sec.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section> */}

      {/* small CTA band */}
      <section className="about-cta">
        <div className="container cta-inner">
          <div>
            <h4>Ready to discuss your instrument needs?</h4>
            <p className="muted">Contact our team for a custom quote or product consultation.</p>
          </div>
          <div>
            <Link to="/contact" className="btn btn-primary" aria-label="Contact us for quote">
              Get a Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Styles */}
      <style>{`
        /* Base & container */
        :root{
          --accent: #2563eb;
          --accent-strong: #1e40af;
          --bg: #ffffff;
          --muted: #64748b;
          --card-border: #e6eef8;
        }
        .container{ max-width:1160px; margin:0 auto; padding:0 20px; }
        .about-page{ font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;  color: #0f1724; background: var(--bg); }

        /* HERO */
        .about-hero{ background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); color: white; padding:72px 0 48px; text-align:center; }
        .hero-inner{ display:flex; align-items:center; justify-content:center; flex-direction:column; gap:8px; }
        .hero-title{ font-size:2.4rem; margin:0; font-weight:800; letter-spacing:-0.4px; }
        .hero-subtitle{ margin:0; color: rgba(255,255,255,0.95); font-weight:500; max-width:800px; }

        /* ABOUT MAIN */
        .about-main{ margin-top: calc(var(--nav-height) + 16px); padding:56px 0;}
        .about-content{ display:flex; gap:48px; align-items:start; justify-content:space-between; }
        @media (max-width: 1024px){ .about-content{ flex-direction:column-reverse; gap:26px; } }

        .about-text{ flex:1; }
        .about-text h2{ font-size:1.9rem; margin:0 0 12px; color:#0f1724; }
        .lead-paragraph{ color:var(--muted); font-size:1.05rem; line-height:1.7; margin-bottom:18px; }

        .about-features{ display:grid; grid-template-columns: repeat(3, 1fr); gap:18px; margin:18px 0 20px; }
        @media (max-width: 980px){ .about-features{ grid-template-columns:1fr; } }

        .feature{ background:white; border-radius:12px; padding:18px; text-align:center; box-shadow:0 8px 26px rgba(2,6,23,0.04); }
        .feature-icon-container{ display:inline-flex; background:#eff6ff; padding:12px; border-radius:10px; margin-bottom:12px; color:#2563eb; }
        .feature h3{ margin:8px 0 8px; font-size:1.05rem; }
        .feature p{ margin:0; color:var(--muted); font-size:0.95rem; line-height:1.5; }

        .about-image{ width:420px; display:flex; align-items:center; justify-content:center; }
        @media (max-width:1024px){ .about-image{ width:100%; } }
        .about-hero-image{ width:100%; max-width:420px; border-radius:12px; box-shadow: 0 10px 30px rgba(2,6,23,0.06); }

        /* Buttons */
        .btn{ display:inline-flex; gap:8px; align-items:center; padding:12px 18px; border-radius:10px; text-decoration:none; font-weight:700; }
        .btn-primary{ background: linear-gradient(90deg, var(--accent), var(--accent-strong)); color:white; border:2px solid transparent; box-shadow:0 8px 30px rgba(37,99,235,0.12); }
        .btn-primary:hover{ transform:translateY(-3px); }
        .cta-explore{ margin-top:12px; display:inline-block; }

        /* STATS */
        .stats-section{ background:#f8fafc; padding:48px 0; }
        .stats-title{ text-align:center; font-size:1.75rem; margin-bottom:22px; color:#0f1724; }
        .stats-grid{ display:grid; grid-template-columns: repeat(4, 1fr); gap:18px; }
        @media (max-width: 980px){ .stats-grid{ grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 540px){ .stats-grid{ grid-template-columns: 1fr; } }

        .stat-item{ background:white; padding:22px; border-radius:12px; text-align:center; box-shadow:0 8px 26px rgba(2,6,23,0.04); }
        .stat-icon{ display:inline-flex; background:#eff6ff; padding:10px; border-radius:8px; margin-bottom:12px; color:var(--accent); }
        .stat-value{ font-size:1.6rem; font-weight:800; color:var(--accent); margin-bottom:6px; }
        .stat-label{ color:var(--muted); font-weight:600; }

        /* DETAILED SECTIONS */
        .detailed-sections{ padding:56px 0; }
        .sections-title{ text-align:center; font-size:1.75rem; margin-bottom:20px; color:#0f1724; }
        .sections-grid{ display:grid; grid-template-columns: repeat(2, 1fr); gap:18px; }
        @media (max-width: 980px){ .sections-grid{ grid-template-columns:1fr; } }

        .section-card{ background:white; padding:20px; border-radius:12px; box-shadow:0 8px 26px rgba(2,6,23,0.04); }
        .section-card h4{ color:var(--accent); margin:0 0 10px; font-size:1.1rem; }
        .section-card p{ color:var(--muted); line-height:1.6; }

        /* CTA band */
        .about-cta{ background: linear-gradient(90deg,#eef6ff,#f8fbff); padding:28px 0; border-top:1px solid rgba(0,0,0,0.03); margin-top:18px; }
        .cta-inner{ display:flex; align-items:center; justify-content:space-between; gap:12px; }
        @media (max-width: 780px){ .cta-inner{ flex-direction:column; align-items:flex-start; } }

        .muted{ color:var(--muted); }

        /* small utilities */
        h2,h3,h4{ margin:0 0 10px 0; }
        p{ margin:0 0 12px 0; }

      `}</style>
    </div>
  );
}
