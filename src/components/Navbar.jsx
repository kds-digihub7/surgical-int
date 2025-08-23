import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      className={`navbar ${scrolled ? "scrolled" : ""}`}
    >
      <div className="container">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="logo-text"
          >
            Subhan International
          </motion.span>
        </Link>

        <ul className="nav-links">
          {navItems.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              <Link
                to={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div className="nav-indicator" layoutId="nav-indicator" />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>

        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          className="mobile-menu-btn"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;