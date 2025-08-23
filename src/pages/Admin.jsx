// src/pages/Admin.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Image as ImageIcon,
  LogOut,
  Save,
  X
} from "lucide-react";

function Admin() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    longDescription: "",
    image: "",
    features: [],
    specifications: {
      material: "",
      length: "",
      type: "",
      sterilization: ""
    }
  });
  const [newFeature, setNewFeature] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  // Check if user is logged in on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    // Load products from localStorage
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    // Basic authentication - in a real app, this would connect to a backend
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      setIsLoggedIn(true);
      localStorage.setItem("adminLoggedIn", "true");
    } else {
      alert("Invalid credentials. Try admin/admin123");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
  };

  // Handle adding a new feature to the product
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setNewProduct({
        ...newProduct,
        features: [...newProduct.features, newFeature.trim()]
      });
      setNewFeature("");
    }
  };

  // Handle removing a feature from the product
  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...newProduct.features];
    updatedFeatures.splice(index, 1);
    setNewProduct({ ...newProduct, features: updatedFeatures });
  };

  // Handle image upload (simulated)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload to a server and get a URL
      // For demo purposes, we'll create a local URL
      const imageUrl = URL.createObjectURL(file);
      setNewProduct({ ...newProduct, image: imageUrl });
    }
  };

  // Handle adding a new product
  const handleAddProduct = () => {
    const product = {
      ...newProduct,
      id: Date.now(), // Simple ID generation
      category: newProduct.category || "Uncategorized"
    };
    
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    
    // Reset form
    setNewProduct({
      name: "",
      category: "",
      description: "",
      longDescription: "",
      image: "",
      features: [],
      specifications: {
        material: "",
        length: "",
        type: "",
        sterilization: ""
      }
    });
    setIsAddingProduct(false);
  };

  // Handle editing a product
  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  // Handle saving edited product
  const handleSaveEdit = () => {
    const updatedProducts = products.map(p => 
      p.id === editingProduct.id ? editingProduct : p
    );
    
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setEditingProduct(null);
  };

  // Handle deleting a product
  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }
  };

  // Login form if not authenticated
  if (!isLoggedIn) {
    return (
      <div className="section">
        <div className="container">
          <motion.div 
            className="admin-login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Username</label>
                <input 
                  type="text" 
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required 
                />
              </div>
              <button type="submit" className="btn">Login</button>
            </form>
            <p className="login-hint">Hint: Use admin/admin123</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="admin-header">
            <h2>Product Management</h2>
            <button onClick={handleLogout} className="btn btn-outline">
              <LogOut size={16} style={{ marginRight: "8px" }} />
              Logout
            </button>
          </div>

          <div className="admin-actions">
            <button 
              onClick={() => setIsAddingProduct(true)}
              className="btn"
            >
              <Plus size={18} style={{ marginRight: "8px" }} />
              Add New Product
            </button>
          </div>

          {/* Add Product Form */}
          {isAddingProduct && (
            <motion.div 
              className="product-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <h3>Add New Product</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name</label>
                  <input 
                    type="text" 
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Category</label>
                  <input 
                    type="text" 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Short Description</label>
                  <textarea 
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Long Description</label>
                  <textarea 
                    value={newProduct.longDescription}
                    onChange={(e) => setNewProduct({...newProduct, longDescription: e.target.value})}
                    rows="4"
                  />
                </div>
                
                <div className="form-group">
                  <label>Product Image</label>
                  <div className="image-upload">
                    {newProduct.image ? (
                      <div className="image-preview">
                        <img src={newProduct.image} alt="Preview" />
                        <button 
                          type="button" 
                          onClick={() => setNewProduct({...newProduct, image: ""})}
                          className="btn-remove-image"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="upload-area">
                        <Upload size={24} />
                        <span>Click to upload image</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload}
                          style={{ display: "none" }}
                        />
                      </label>
                    )}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Features</label>
                  <div className="features-input">
                    <input 
                      type="text" 
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Enter a feature"
                    />
                    <button 
                      type="button" 
                      onClick={handleAddFeature}
                      className="btn"
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className="features-list">
                    {newProduct.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <span>{feature}</span>
                        <button 
                          type="button" 
                          onClick={() => handleRemoveFeature(index)}
                          className="btn-remove"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Specifications</label>
                  <div className="specs-grid">
                    <div>
                      <label>Material</label>
                      <input 
                        type="text" 
                        value={newProduct.specifications.material}
                        onChange={(e) => setNewProduct({
                          ...newProduct, 
                          specifications: {
                            ...newProduct.specifications,
                            material: e.target.value
                          }
                        })}
                      />
                    </div>
                    
                    <div>
                      <label>Length</label>
                      <input 
                        type="text" 
                        value={newProduct.specifications.length}
                        onChange={(e) => setNewProduct({
                          ...newProduct, 
                          specifications: {
                            ...newProduct.specifications,
                            length: e.target.value
                          }
                        })}
                      />
                    </div>
                    
                    <div>
                      <label>Type</label>
                      <input 
                        type="text" 
                        value={newProduct.specifications.type}
                        onChange={(e) => setNewProduct({
                          ...newProduct, 
                          specifications: {
                            ...newProduct.specifications,
                            type: e.target.value
                          }
                        })}
                      />
                    </div>
                    
                    <div>
                      <label>Sterilization</label>
                      <input 
                        type="text" 
                        value={newProduct.specifications.sterilization}
                        onChange={(e) => setNewProduct({
                          ...newProduct, 
                          specifications: {
                            ...newProduct.specifications,
                            sterilization: e.target.value
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  onClick={handleAddProduct}
                  className="btn"
                  disabled={!newProduct.name || !newProduct.description}
                >
                  <Save size={16} style={{ marginRight: "8px" }} />
                  Save Product
                </button>
                <button 
                  onClick={() => setIsAddingProduct(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {/* Edit Product Form */}
          {editingProduct && (
            <motion.div 
              className="product-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <h3>Edit Product</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name</label>
                  <input 
                    type="text" 
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Category</label>
                  <input 
                    type="text" 
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Short Description</label>
                  <textarea 
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Long Description</label>
                  <textarea 
                    value={editingProduct.longDescription}
                    onChange={(e) => setEditingProduct({...editingProduct, longDescription: e.target.value})}
                    rows="4"
                  />
                </div>
                
                <div className="form-group">
                  <label>Product Image</label>
                  <div className="image-upload">
                    {editingProduct.image ? (
                      <div className="image-preview">
                        <img src={editingProduct.image} alt="Preview" />
                        <button 
                          type="button" 
                          onClick={() => setEditingProduct({...editingProduct, image: ""})}
                          className="btn-remove-image"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="upload-area">
                        <Upload size={24} />
                        <span>Click to upload image</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const imageUrl = URL.createObjectURL(file);
                              setEditingProduct({...editingProduct, image: imageUrl});
                            }
                          }}
                          style={{ display: "none" }}
                        />
                      </label>
                    )}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Features</label>
                  <div className="features-input">
                    <input 
                      type="text" 
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Enter a feature"
                    />
                    <button 
                      type="button" 
                      onClick={() => {
                        if (newFeature.trim()) {
                          setEditingProduct({
                            ...editingProduct,
                            features: [...editingProduct.features, newFeature.trim()]
                          });
                          setNewFeature("");
                        }
                      }}
                      className="btn"
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className="features-list">
                    {editingProduct.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <span>{feature}</span>
                        <button 
                          type="button" 
                          onClick={() => {
                            const updatedFeatures = [...editingProduct.features];
                            updatedFeatures.splice(index, 1);
                            setEditingProduct({ ...editingProduct, features: updatedFeatures });
                          }}
                          className="btn-remove"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Specifications</label>
                  <div className="specs-grid">
                    <div>
                      <label>Material</label>
                      <input 
                        type="text" 
                        value={editingProduct.specifications.material}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct, 
                          specifications: {
                            ...editingProduct.specifications,
                            material: e.target.value
                          }
                        })}
                      />
                    </div>
                    
                    <div>
                      <label>Length</label>
                      <input 
                        type="text" 
                        value={editingProduct.specifications.length}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct, 
                          specifications: {
                            ...editingProduct.specifications,
                            length: e.target.value
                          }
                        })}
                      />
                    </div>
                    
                    <div>
                      <label>Type</label>
                      <input 
                        type="text" 
                        value={editingProduct.specifications.type}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct, 
                          specifications: {
                            ...editingProduct.specifications,
                            type: e.target.value
                          }
                        })}
                      />
                    </div>
                    
                    <div>
                      <label>Sterilization</label>
                      <input 
                        type="text" 
                        value={editingProduct.specifications.sterilization}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct, 
                          specifications: {
                            ...editingProduct.specifications,
                            sterilization: e.target.value
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  onClick={handleSaveEdit}
                  className="btn"
                >
                  <Save size={16} style={{ marginRight: "8px" }} />
                  Save Changes
                </button>
                <button 
                  onClick={() => setEditingProduct(null)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {/* Products List */}
          <div className="products-table">
            <h3>Current Products ({products.length})</h3>
            
            {products.length === 0 ? (
              <p>No products found. Add your first product!</p>
            ) : (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="product-thumb" />
                          ) : (
                            <div className="no-image">
                              <ImageIcon size={20} />
                            </div>
                          )}
                        </td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.description.substring(0, 60)}...</td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              onClick={() => handleEditProduct(product)}
                              className="btn-icon"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="btn-icon btn-danger"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .admin-actions {
          margin-bottom: 2rem;
        }
        
        .product-form {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: inherit;
        }
        
        .form-group textarea {
          min-height: 80px;
          resize: vertical;
        }
        
        .image-upload {
          margin-top: 0.5rem;
        }
        
        .upload-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 2px dashed #ddd;
          border-radius: 4px;
          padding: 2rem;
          cursor: pointer;
          transition: border-color 0.3s;
        }
        
        .upload-area:hover {
          border-color: #2563eb;
        }
        
        .upload-area span {
          margin-top: 0.5rem;
          color: #64748b;
        }
        
        .image-preview {
          position: relative;
          width: 150px;
          height: 150px;
        }
        
        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }
        
        .btn-remove-image {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ef4444;
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        .features-input {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        
        .features-input input {
          flex: 1;
        }
        
        .features-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          background: #f1f5f9;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
        }
        
        .btn-remove {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          margin-left: 0.25rem;
        }
        
        .specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .specs-grid > div {
          display: flex;
          flex-direction: column;
        }
        
        .specs-grid label {
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
          color: #64748b;
        }
        
        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        .products-table {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .table-container {
          overflow-x: auto;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        th, td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }
        
        th {
          font-weight: 600;
          background: #f8fafc;
        }
        
        .product-thumb {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 4px;
        }
        
        .no-image {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          border-radius: 4px;
          color: #94a3b8;
        }
        
        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }
        
        .btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 4px;
          border: 1px solid #e2e8f0;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .btn-icon:hover {
          background: #f1f5f9;
        }
        
        .btn-danger {
          color: #ef4444;
        }
        
        .btn-danger:hover {
          background: #fef2f2;
        }
        
        .admin-login {
          max-width: 400px;
          margin: 0 auto;
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .admin-login h2 {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        
        .login-hint {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.875rem;
          color: #64748b;
        }
        
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .specs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Admin;