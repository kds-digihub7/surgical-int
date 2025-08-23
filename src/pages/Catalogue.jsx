// src/pages/Catalogue.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function Catalogue() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest"); // newest | az | za
  const [showCount, setShowCount] = useState(9);

  useEffect(() => {
    document.title = "Subhan International | Catalogue";

    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    // Normalize products (ensure id)
    const normalized = savedProducts.map((p, idx) => ({
      id: p.id ?? idx,
      name: p.name ?? "Unnamed product",
      category: p.category ?? "General",
      image: p.image ?? "/logo.png",
      price: p.price ?? null,
      createdAt: p.createdAt ?? Date.now() - idx * 1000,
      description: p.description ?? "",
      ...p,
    }));
    setProducts(normalized);
  }, []);

  // derive categories
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => (p.category || "General")));
    return ["all", ...Array.from(set)];
  }, [products]);

  // filtered & sorted products
  const results = useMemo(() => {
    let list = products.slice();

    if (category !== "all") {
      list = list.filter((p) => (p.category || "General") === category);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q)
      );
    }

    if (sort === "az") {
      list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sort === "za") {
      list.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    } else {
      // newest
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }

    return list;
  }, [products, category, query, sort]);

  const visible = results.slice(0, showCount);

  return (
    <div className="catalogue-page">
      <div className="container">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="catalogue-head"
        >
          <div>
            <h1 className="title">Our Product Catalogue</h1>
            <p className="subtitle">Browse our curated range of surgical instruments</p>
          </div>

          <div className="controls">
            <div className="search">
              <Search size={16} className="search-icon" />
              <input
                aria-label="Search products"
                placeholder="Search by name, category or description..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="filter-row">
              <div className="select">
                <Filter size={14} className="select-icon" />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((c) => (
                    <option value={c} key={c}>
                      {c === "all" ? "All Categories" : c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="select">
                <ChevronDown size={14} className="select-icon" />
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="newest">Newest</option>
                  <option value="az">Name: A → Z</option>
                  <option value="za">Name: Z → A</option>
                </select>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="meta-row">
          <div>{results.length} result{results.length !== 1 ? "s" : ""}</div>
          <div>
            <label>
              Show
              <select value={showCount} onChange={(e) => setShowCount(Number(e.target.value))}>
                <option value={6}>6</option>
                <option value={9}>9</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
              </select>
            </label>
          </div>
        </div>

        {results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="empty-state card"
          >
            <h3>No products found</h3>
            <p>Try removing filters or add products from the Admin panel.</p>
            <div style={{ marginTop: 14 }}>
              <a className="btn" href="/admin">Open Admin Panel</a>
              <a className="btn outline" href="/contact" style={{ marginLeft: 8 }}>Contact Us</a>
            </div>
          </motion.div>
        ) : (
          <motion.section
            className="products-grid"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.03 } }
            }}
          >
            {visible.map((product, i) => (
              <motion.div key={product.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="product-item">
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </motion.section>
        )}

        {results.length > showCount && (
          <div style={{ textAlign: "center", marginTop: 22 }}>
            <button className="btn" onClick={() => setShowCount((s) => s + 6)}>Load more</button>
          </div>
        )}
      </div>

      <style>{`
        :root{
          --nav-height: 72px; /* adjust this if your navbar has different height */
          --accent: #2563EB;
          --bg: #fff;
          --muted: #64748B;
          --card-bg: #ffffff;
          --shadow: 0 10px 30px rgba(2,6,23,0.06);
        }
        *{box-sizing:border-box}
        /* remove top padding on container so top bar stays fixed in place */
        .container{
          max-width:1160px;
          margin:0 auto;
          padding:24px;
          padding-top: 24px; /* keep small spacing but NOT nav-height here */
        }

        /* Push the header down so it sits below the fixed top bar,
           without moving the whole container. This keeps your top bar
           visually at the same position. */
        .catalogue-head {
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:16px;
          margin-bottom:12px;
          margin-top: calc(var(--nav-height) + 16px); /* <<-- important: moves header down */
        }

        /* if someone jumps/anchors to the title, this prevents it being hidden */
        .title {
          font-size:28px;
          margin:0 0 4px;
          font-weight:800;
          color:var(--text, #0f1724);
          scroll-margin-top: calc(var(--nav-height) + 24px);
        }

        .subtitle{margin:0;color:var(--muted);font-size:14px}

        .controls{display:flex;gap:12px;align-items:center}
        .search{display:flex;align-items:center;background:#f6f8fb;border:1px solid #e6eef8;padding:8px 10px;border-radius:10px;min-width:300px;box-shadow:var(--shadow);gap:8px}
        .search input{border:0;background:transparent;outline:none;padding:6px 4px;font-size:14px;color:var(--text)}
        .search-icon{color:var(--muted)}

        .filter-row{display:flex;gap:10px;align-items:center}
        .select{display:flex;align-items:center;background:#fff;border:1px solid #e6eef8;padding:6px 10px;border-radius:10px;box-shadow:var(--shadow)}
        .select select{border:0;background:transparent;padding:6px 8px;outline:none;font-weight:600}
        .select-icon{margin-right:8px;color:var(--muted)}

        .meta-row{display:flex;justify-content:space-between;align-items:center;color:var(--muted);margin:12px 0 18px;font-size:14px}
        .meta-row select{margin-left:8px;padding:4px 8px;border-radius:6px;border:1px solid #e6eef8}

        .card{background:var(--card-bg);border-radius:12px;padding:18px;box-shadow:var(--shadow);border:1px solid #eef2f7}

        .empty-state{display:flex;flex-direction:column;align-items:center;text-align:center;padding:36px;border-radius:12px}

        .products-grid{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:18px;
          margin-top:8px;
        }
        .product-item{width:100%}

        /* Responsive */
        @media (max-width: 980px){
          .catalogue-head{flex-direction:column;align-items:flex-start}
          .controls{width:100%;justify-content:space-between}
          .search{min-width:200px;flex:1}
          .products-grid{grid-template-columns:repeat(2,1fr)}
        }
        @media (max-width: 640px){
          .controls{flex-direction:column;align-items:stretch;gap:10px}
          .search{width:100%}
          .products-grid{grid-template-columns:1fr}
          .title{font-size:22px}
          .container{padding-top:16px;}
          .catalogue-head{margin-top: calc(var(--nav-height) + 8px);}
        }

        /* Buttons */
        .btn{
          display:inline-flex;align-items:center;justify-content:center;padding:10px 16px;border-radius:10px;background:linear-gradient(90deg,var(--accent), #1E40AF);color:white;border:0;font-weight:700;cursor:pointer;
        }
        .btn.outline{background:transparent;border:1px solid #e6eef8;color:var(--accent);font-weight:700}
      `}</style>
    </div>
  );
}
