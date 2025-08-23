// src/pages/Contact.jsx
import React, { useEffect, useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  useEffect(() => {
    document.title = "Subhan International | Contact";
  }, []);

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Please enter your name.";
    if (!formData.email.trim()) e.email = "Please enter your email.";
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(formData.email)) e.email = "Enter a valid email address.";
    }
    if (!formData.subject.trim()) e.subject = "Please add a subject.";
    if (!formData.message.trim()) e.message = "Please write your message.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    // Simulate sending (replace with real API / email service)
    setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3500);
    }, 1100);
  };

  return (
    <div className="ci-page">
      {/* Embedded styles (single-file) */}
      <style>{`
        :root {
          --bg-1: #ffffff;
          --bg-2: #f8fafc;
          --card-bg: #ffffff;
          --muted: #64748b;
          --accent-a: #2563eb;
          --accent-b: #3b82f6;
          --glass: rgba(255,255,255,0.5);
          --text: #1e293b;
          --border: #e2e8f0;
        }

        /* Layout */
        .ci-page {
          min-height: calc(100vh - 0px);
          padding: 96px 18px 36px;
          background: var(--bg-2);
          color: var(--text);
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial;
          display: flex;
          justify-content: center;
        }

        .ci-wrap {
          width: 100%;
          max-width: 1160px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          align-items: start;
          animation: pageFade .6s ease both;
        }

        /* small entrance animation */
        @keyframes pageFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Left column */
        .ci-left { display:flex; flex-direction:column; gap:14px; }
        .brand { text-align:center; padding: 22px 8px 8px; opacity: .98; }
        .brand img { width: 86px; margin: 0 auto 8px; display:block; border-radius: 8px; }
        .brand h2 { margin: 0; font-size: 18px; letter-spacing: 1px; font-weight:700; color: var(--accent-a); }
        .brand p { margin: 10px 0 0; color: var(--muted); font-size:13px; }

        /* card base */
        .card {
          background: var(--card-bg);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }

        /* Right column / form */
        .ci-right { display:flex; flex-direction:column; gap:12px; }

        .muted { color: var(--muted); font-size: 13px; margin-bottom: 12px; }

        /* form group */
        .form-group { position: relative; margin-bottom: 20px; }
        .form-group input, .form-group textarea {
          width: 100%;
          background: #f8fafc;
          border: 1px solid var(--border);
          padding: 14px;
          border-radius: 10px;
          color: var(--text);
          font-size: 14px;
          outline: none;
          resize: vertical;
          box-sizing: border-box;
          transition: border .18s ease, box-shadow .18s ease;
        }

        .form-group input:focus, .form-group textarea:focus {
          border: 1px solid var(--accent-a);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .form-group label {
          position:absolute; left:14px; top:14px; color:var(--muted); font-size:13px;
          pointer-events:none; transition: transform .14s ease, top .14s ease, font-size .14s ease, color .14s;
          background: transparent; padding:0 6px;
        }

        .form-group input:not(:placeholder-shown) + label,
        .form-group textarea:not(:placeholder-shown) + label,
        .form-group input:focus + label,
        .form-group textarea:focus + label {
          transform: translateY(-22px) scale(.88);
          top: 14px;
          font-size: 12px;
          color: var(--accent-a);
          background: var(--card-bg);
          padding: 0 6px;
        }

        .form-card h3 { 
          margin-top: 0;
          margin-bottom: 16px;
          color: var(--text);
          font-weight: 700;
          font-size: 24px;
        }

        /* error & success styles */
        .error { color: #dc2626; font-size: 13px; margin-top: 8px; }
        .success { margin-top: 12px; padding: 10px 12px; border-radius: 8px; background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; font-size: 14px; }

        /* Send button */
        .btn {
          display:inline-flex; gap:12px; align-items:center; justify-content:center;
          border: none; padding: 14px 24px; border-radius: 10px; font-weight: 600; cursor: pointer; margin-top: 8px;
          background: linear-gradient(90deg, var(--accent-a), var(--accent-b));
          color: white; 
          box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
          transition: transform .12s ease, box-shadow .12s ease, opacity .12s;
          position: relative;
          overflow: hidden;
        }
        .btn:hover {
          box-shadow: 0 6px 12px rgba(37, 99, 235, 0.25);
          transform: translateY(-2px);
        }
        .btn:active { transform: translateY(0); }
        .btn:disabled { opacity: 0.7; cursor: default; transform: none; }

        .btn .arrow {
          display:inline-block;
          transform: translateX(6px);
          transition: transform .28s cubic-bezier(.2,.9,.3,1);
          font-size: 16px;
        }
        .btn.sending .arrow { transform: translateX(0); }

        /* micro pulse when sent */
        .sentPulse {
          animation: pulseSent .9s ease;
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
        }
        @keyframes pulseSent {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }

        /* staggered entry for left and right */
        .ci-left, .ci-right { opacity: 0; transform: translateY(8px); animation: enterCol .55s ease forwards; }
        .ci-left { animation-delay: .08s; }
        .ci-right { animation-delay: .16s; }
        @keyframes enterCol { to { opacity: 1; transform: translateY(0); } }

        /* Contact info styles */
        .info-list p { margin: 12px 0; color: var(--muted); font-size: 14px; line-height:1.45; }
        .info-list a { color: var(--accent-a); text-decoration: none; font-weight: 500; }
        .info-list a:hover { text-decoration: underline; }

        .card h3, .card h4 {
          margin: 0 0 16px 0;
          color: var(--text);
          font-weight: 700;
          position: relative;
        }
        .card h3::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 36px;
          height: 4px;
          background: linear-gradient(90deg, var(--accent-a), var(--accent-b));
          border-radius: 4px;
        }

        .map-box {
          height: 130px;
          border-radius: 8px;
          display:flex;
          align-items:center;
          justify-content:center;
          color: var(--muted); 
          font-size:13px;
          border: 1px dashed var(--border);
          background: #f8fafc;
        }

        .socials { display:flex; gap:10px; margin-top:16px; }
        .social {
          width:40px;
          height:40px;
          border-radius:8px;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          background: #f1f5f9; 
          color: var(--muted); 
          text-decoration:none; 
          font-weight:700; 
          border: 1px solid var(--border);
          transition: transform .18s ease, background .18s ease, color .18s ease;
        }
        .social:hover {
          transform: translateY(-2px);
          background: linear-gradient(90deg, var(--accent-a), var(--accent-b));
          color: white;
        }

        /* responsive adjustments */
        @media (max-width: 920px) {
          .ci-wrap { grid-template-columns: 1fr; }
          .brand img { width: 70px; }
          .map-box { height: 100px; }
          .ci-page { padding: 72px 18px 24px; }
        }
      `}</style>

      <div className="ci-wrap" role="main">
        {/* LEFT */}
        <div className="ci-left">
          <div className="brand">
            <img src="/logo.png" alt="Subhan International" onError={(e) => (e.target.style.display = "none")} />
            <h2>Subhan International</h2>
            <p>Quality medical & surgical supplies — we're here to help.</p>
          </div>

          <div className="card info-card" aria-labelledby="contact-info-heading">
            <h3 id="contact-info-heading">Contact Information</h3>
            <div className="info-list">
              <p><strong>Email:</strong> <a href="mailto:info@subhainint.com">info@subhainint.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+92123456789">+92-123456789</a></p>
              <p><strong>Address:</strong> 123 Medical Street, Karachi, Pakistan</p>
            </div>

            <div style={{ marginTop: 16 }}>
              <h4 style={{ margin: "16px 0 8px" }}>Business Hours</h4>
              <p style={{ margin: 0 }} className="muted">Mon-Fri: 9:00 AM - 6:00 PM</p>
              <p style={{ margin: 0 }} className="muted">Sat: 10:00 AM - 2:00 PM • Sun: Closed</p>
            </div>

            <div className="socials" aria-hidden>
              <a className="social" href="#" title="Facebook">FB</a>
              <a className="social" href="#" title="Instagram">IG</a>
              <a className="social" href="#" title="LinkedIn">LI</a>
            </div>
          </div>

          <div className="card" aria-labelledby="find-us-heading">
            <h4 id="find-us-heading">Find Us</h4>
            <div className="map-box">Map placeholder — ask me to add live Google Map iframe</div>
            <p style={{ marginTop: 8, color: "var(--muted)", fontSize: 13 }}>(I can add a Google Maps iframe if you want.)</p>
          </div>
        </div>

        {/* RIGHT - FORM */}
        <div className="ci-right">
          <div className="card form-card" aria-labelledby="send-us-heading">
            <h3 id="send-us-heading">Send Us a Message</h3>
            <p className="muted">We typically reply within 1 business day.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  autoComplete="name"
                />
                <label htmlFor="name">Your Name</label>
                {errors.name && <div className="error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  autoComplete="email"
                />
                <label htmlFor="email">Email Address</label>
                {errors.email && <div className="error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label htmlFor="subject">Subject</label>
                {errors.subject && <div className="error">{errors.subject}</div>}
              </div>

              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label htmlFor="message">Message</label>
                {errors.message && <div className="error">{errors.message}</div>}
              </div>

              <button
                className={`btn ${status === "sent" ? "sentPulse" : ""} ${status === "sending" ? "sending" : ""}`}
                type="submit"
                disabled={status === "sending"}
                aria-live="polite"
              >
                <span>{status === "sending" ? "Sending..." : status === "sent" ? "Sent" : "Send Message"}</span>
                <span className="arrow" aria-hidden>➜</span>
              </button>

              {status === "sent" && <div className="success">Thank you! Your message was sent. We'll contact you shortly.</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}