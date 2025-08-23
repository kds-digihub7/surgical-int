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
    setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3500);
    }, 1100);
  };

  return (
    <div className="ci-page">
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
        }

        * { box-sizing: border-box; }

        .ci-page {
          min-height: 100vh;
          padding: 40px 18px;
          background: linear-gradient(180deg, #f7fbff 0%, var(--bg-2) 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial;
          color: var(--text);
        }

        .ci-wrap {
          width: 100%;
          max-width: 1160px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: stretch;
        }

        /* Card */
        .card {
          background: var(--card-bg);
          border-radius: 14px;
          padding: 24px;
          box-shadow: 0 8px 28px rgba(2,6,23,0.08);
          border: 1px solid var(--border);
        }

        /* Left */
        .ci-left { display:flex; flex-direction:column; gap:16px; justify-content:center; }
        .brand { text-align:center; padding: 8px; }
        .brand img { width: 90px; margin: 0 auto 8px; display:block; border-radius: 8px; }
        .brand h2 { margin: 0; font-size: 20px; font-weight:700; color: var(--accent-a); }
        .brand p { margin: 8px 0 0; color: var(--muted); font-size:14px; }

        .card h3, .card h4 {
          margin: 0 0 16px 0;
          color: var(--text);
          font-weight: 700;
        }
        .card h3::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 36px;
          height: 3px;
          background: linear-gradient(90deg, var(--accent-a), var(--accent-b));
          border-radius: 4px;
        }

        .contact-methods { display:flex; flex-direction:column; gap:12px; }
        .method {
          display:flex; gap:12px; align-items:center;
          background: #fafbfc;
          border-radius: 10px;
          padding: 12px;
          border: 1px solid var(--border);
        }
        .method .icon {
          width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center;
          background: var(--accent-soft); color: var(--accent-a);
        }
        .method .meta { display:flex; flex-direction:column; }
        .method .meta .label { font-size:12px; color:var(--muted); }
        .method .meta .value { font-weight:600; font-size:14px; color:var(--text); }

        /* Socials */
        .socials { display:flex; gap:10px; margin-top:14px; }
        .social {
          width:42px; height:42px; border-radius:10px;
          display:flex; align-items:center; justify-content:center;
          background: #fff; color: var(--muted); border: 1px solid var(--border);
          transition: all .2s ease;
        }
        .social:hover {
          background: linear-gradient(90deg,var(--accent-a),var(--accent-b));
          color:#fff;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(37,99,235,0.12);
        }

        /* Right / Form */
        .ci-right { display:flex; flex-direction:column; justify-content:center; }
        .form-group { position: relative; margin-bottom: 18px; }
        .form-group input, .form-group textarea {
          width: 100%; padding: 14px;
          border: 1px solid var(--border);
          border-radius: 10px;
          font-size: 14px;
          outline: none; background: #fff;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--accent-a);
          box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
        }
        .form-group label {
          position:absolute; left:14px; top:14px;
          color:var(--muted); font-size:13px;
          pointer-events:none; transition: all .2s ease;
          background: #fff; padding:0 6px;
        }
        .form-group input:focus + label,
        .form-group textarea:focus + label,
        .form-group input:not(:placeholder-shown) + label,
        .form-group textarea:not(:placeholder-shown) + label {
          transform: translateY(-22px) scale(.9);
          font-size:12px; color: var(--accent-a);
        }

        .btn {
          padding: 12px 20px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(90deg, var(--accent-a), var(--accent-b));
          color:#fff; font-weight:700; cursor:pointer;
          box-shadow: 0 6px 18px rgba(37,99,235,0.15);
          transition: transform .15s ease;
        }
        .btn:hover { transform: translateY(-2px); }
        .btn:disabled { opacity:.7; cursor:default; transform:none; }

        .error { color: #dc2626; font-size: 13px; margin-top: 6px; }
        .success { margin-top: 12px; padding: 10px; border-radius: 8px; background: #f0fdf4; color:#166534; border:1px solid #bbf7d0; font-size:14px; }

        /* Responsive */
        @media (max-width: 920px) {
          .ci-wrap { grid-template-columns: 1fr; }
          .ci-page { padding: 20px; }
        }
      `}</style>

      <div className="ci-wrap">
        {/* Left */}
        <div className="ci-left">
          <div className="brand">
            <img src="/logo.png" alt="Subhan International" />
            <h2>Subhan International</h2>
            <p>Quality medical & surgical supplies — here to support healthcare professionals.</p>
          </div>

          <div className="card">
            <h3>Contact Information</h3>
            <div className="contact-methods">
              <div className="method">
                <div className="icon"><Mail size={18} /></div>
                <div className="meta"><div className="label">Email</div><div className="value"><a href="mailto:info@subhainint.com">info@subhainint.com</a></div></div>
              </div>
              <div className="method">
                <div className="icon"><PhoneIcon size={18} /></div>
                <div className="meta"><div className="label">Phone</div><div className="value"><a href="tel:+92123456789">+92-123456789</a></div></div>
              </div>
              <div className="method">
                <div className="icon"><MapPin size={18} /></div>
                <div className="meta"><div className="label">Address</div><div className="value">123 Medical Street, Karachi, Pakistan</div></div>
              </div>
            </div>
            <div className="socials">
              <a className="social" href="#"><Facebook /></a>
              <a className="social" href="#"><Instagram /></a>
              <a className="social" href="#"><Linkedin /></a>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="ci-right">
          <div className="card">
            <h3>Send Us a Message</h3>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder=" " />
                <label htmlFor="name">Your Name</label>
                {errors.name && <div className="error">{errors.name}</div>}
              </div>
              <div className="form-group">
                <input id="email" name="email" value={formData.email} onChange={handleChange} placeholder=" " />
                <label htmlFor="email">Email Address</label>
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
              <div className="form-group">
                <input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder=" " />
                <label htmlFor="subject">Subject</label>
                {errors.subject && <div className="error">{errors.subject}</div>}
              </div>
              <div className="form-group">
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder=" " rows={5} />
                <label htmlFor="message">Message</label>
                {errors.message && <div className="error">{errors.message}</div>}
              </div>
              <button className="btn" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : status === "sent" ? "Sent ✓" : "Send Message"}
              </button>
              {status === "sent" && <div className="success">Thank you! Your message was sent.</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
