// src/pages/About.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";

function About() {
  useEffect(() => {
    document.title = "Subhan International | About";
  }, []);

  const sections = [
    { title: "Our Story", desc: "Founded with a vision to provide healthcare professionals..." },
    { title: "Our Mission", desc: "We strive to enhance surgical outcomes with high-precision instruments." },
    { title: "Quality Assurance", desc: "Every instrument undergoes rigorous quality checks to meet standards." },
    { title: "Global Presence", desc: "With clients in over 30 countries, we’re a trusted global supplier." }
  ];

  return (
    <div className="section">
      <div className="container">
        <motion.h1
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Subhan International
        </motion.h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "30px", maxWidth: "900px", margin: "0 auto" }}>
          {sections.map((sec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2>{sec.title}</h2>
              <p>{sec.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
