// src/pages/Contact.jsx
import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone as PhoneIcon,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

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
      {/* Embedded styles */}
      <style>{`
        :root {
          --bg-1: #ffffff;
          --bg-2: #f8fafc;
          --card-bg: #ffffff;
          --muted: #64748b;
          --accent-a: #2563eb;
          --accent-b: #3b82f6;
          --accent-soft: rgba(37,99,235,0.08);
          --text: #0f1724;
          --border: #e2e8f0;
          --glass: rgba(255,255,255,0.6);
        }

        * { box-sizing: border-box; }
        .ci-page {
          min-height: calc(100vh - 0px);
          padding: 88px 18px 36px;
          background: linear-gradient(180deg, #f7fbff 0%, var(--bg-2) 100%);
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
          gap: 28px;
          align-items: start;
          padding: 12px;
          padding:56px 0;
        }

        /* Card base */
        .card {
          background: var(--card-bg);
          border-radius: 14px;
          padding: 22px;
          box-shadow: 0 10px 30px rgba(2,6,23,0.06);
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }

        /* Left column */
        .ci-left { display:flex; flex-direction:column; gap:14px; }
        .brand { text-align:center; padding: 8px 6px 0; opacity: .98; }
        .brand img { width: 86px; margin: 0 auto 8px; display:block; border-radius: 8px; }
        .brand h2 { margin: 0; font-size: 18px; letter-spacing: 1px; font-weight:700; color: var(--accent-a); }
        .brand p { margin: 8px 0 0; color: var(--muted); font-size:13px; }

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

        .info-list p { margin: 10px 0; color: var(--muted); font-size: 14px; line-height:1.45; display:flex; align-items:center; gap:8px; }
        .info-list a { color: var(--accent-a); text-decoration: none; font-weight: 600; }
        .info-list a:hover { text-decoration: underline; }

        .map-box {
          height: 140px;
          border-radius: 10px;
          display:flex;
          align-items:center;
          justify-content:center;
          color: var(--muted); 
          font-size:13px;
          border: 1px dashed var(--border);
          background: linear-gradient(180deg, rgba(59,130,246,0.03), #fff);
        }

        /* contact methods with icons */
        .contact-methods { display:flex; flex-direction:column; gap:10px; margin-top:8px; }
        .method {
          display:flex; gap:12px; align-items:center;
          background: linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.75));
          border-radius: 10px;
          padding: 10px;
          border: 1px solid var(--border);
        }
        .method .icon {
          width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center;
          background: var(--accent-soft); color: var(--accent-a);
        }
        .method .meta { display:flex; flex-direction:column; }
        .method .meta .label { font-size:12px; color:var(--muted); }
        .method .meta .value { font-weight:700; color:var(--text); font-size:14px; }

        /* socials */
        .socials { display:flex; gap:10px; margin-top:12px; }
        .social {
          width:46px;
          height:46px;
          border-radius:10px;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          background: linear-gradient(180deg,#fff,#f7fbff);
          color: var(--muted);
          text-decoration:none;
          border: 1px solid var(--border);
          transition: transform .18s ease, background .18s ease, color .18s ease;
        }
        .social svg { width:20px; height:20px; }
        .social:hover {
          transform: translateY(-4px);
          background: linear-gradient(90deg, var(--accent-a), var(--accent-b));
          color: white;
          box-shadow: 0 8px 24px rgba(37,99,235,0.12);
        }

        /* Right column / form */
        .ci-right { display:flex; flex-direction:column; gap:12px; }
        .muted { color: var(--muted); font-size: 13px; margin-bottom: 12px; }

        .form-group { position: relative; margin-bottom: 16px; }
        .form-group input, .form-group textarea {
          width: 100%;
          background: #fff;
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
          box-shadow: 0 6px 18px rgba(37,99,235,0.09);
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
          margin-bottom: 12px;
          color: var(--text);
          font-weight: 700;
          font-size: 22px;
        }

        .error { color: #dc2626; font-size: 13px; margin-top: 8px; }
        .success { margin-top: 12px; padding: 10px 12px; border-radius: 8px; background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; font-size: 14px; }

        .btn {
          display:inline-flex; gap:12px; align-items:center; justify-content:center;
          border: none; padding: 12px 20px; border-radius: 10px; font-weight: 700; cursor: pointer; margin-top: 8px;
          background: linear-gradient(90deg, var(--accent-a), var(--accent-b));
          color: white; 
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.15);
          transition: transform .12s ease, box-shadow .12s ease, opacity .12s;
          position: relative;
        }
        .btn:hover { transform: translateY(-3px); }
        .btn:disabled { opacity: 0.7; cursor: default; transform: none; }

        .btn .arrow { display:inline-block; transform: translateX(6px); transition: transform .24s cubic-bezier(.2,.9,.3,1); font-size: 14px; }
        .btn.sending .arrow { transform: translateX(0); }

        .sentPulse { animation: pulseSent .9s ease; box-shadow: 0 10px 30px rgba(37, 99, 235, 0.18); }
        @keyframes pulseSent {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }

        /* responsive */
        @media (max-width: 920px) {
          .ci-wrap { grid-template-columns: 1fr; }
          .brand img { width: 70px; }
          .map-box { height: 110px; }
          .ci-page { padding: 72px 18px 24px; }
        }
      `}</style>

      <div className="ci-wrap" role="main">
        {/* LEFT */}
        <div className="ci-left">
          <div className="brand">
            <img src="/subhanint-logo.png" alt="Subhan International" onError={(e) => (e.target.style.display = "none")} />
            <h2>Subhan International</h2>
            <p>Quality medical & surgical supplies — here to support healthcare professionals.</p>
          </div>

          <div className="card info-card" aria-labelledby="contact-info-heading">
            <h3 id="contact-info-heading">Contact Information</h3>

            <div className="contact-methods" aria-hidden={false}>
              <div className="method" aria-label="Email">
                <div className="icon"><Mail size={18} /></div>
                <div className="meta">
                  <div className="label">Email</div>
                  <div className="value"><a href="mailto:info@subhainint.com">info@subhainint.com</a></div>
                </div>
              </div>

              <div className="method" aria-label="Phone">
                <div className="icon"><PhoneIcon size={18} /></div>
                <div className="meta">
                  <div className="label">Phone</div>
                  <div className="value"><a href="tel:+92123456789">+92-123456789</a></div>
                </div>
              </div>

              <div className="method" aria-label="Address">
                <div className="icon"><MapPin size={18} /></div>
                <div className="meta">
                  <div className="label">Address</div>
                  <div className="value">123 Medical Street, Karachi, Pakistan</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <h4 style={{ margin: "10px 0 8px" }}>Business Hours</h4>
              <p style={{ margin: 0 }} className="muted">Mon-Fri: 9:00 AM - 6:00 PM</p>
              <p style={{ margin: 0 }} className="muted">Sat: 10:00 AM - 2:00 PM • Sun: Closed</p>
            </div>

            <div style={{ marginTop: 14 }}>
              <h4 style={{ margin: "12px 0 8px" }}>Find Us</h4>
              <div className="map-box">Map placeholder — ask me to add live Google Map iframe</div>
            </div>

            <div>
              <h4 style={{ margin: "12px 0 8px" }}>Follow Us</h4>
              <div className="socials" role="navigation" aria-label="Social links">
                <a className="social" href="#" title="Facebook" aria-label="Facebook">
                  <Facebook />
                </a>
                <a className="social" href="#" title="Instagram" aria-label="Instagram">
                  <Instagram />
                </a>
                <a className="social" href="#" title="LinkedIn" aria-label="LinkedIn">
                  <Linkedin />
                </a>
              </div>
            </div>
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
                  rows={6}
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
