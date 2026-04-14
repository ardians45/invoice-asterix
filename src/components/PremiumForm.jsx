import React from 'react';
import { Plus, Trash2, User, FileText, Calendar, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PremiumForm = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...data.items];
    newItems[index][field] = value;
    setData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), description: '', quantity: 1, rate: 0 }]
    }));
  };

  const removeItem = (id) => {
    if (data.items.length === 1) return;
    setData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  return (
    <div className="premium-form-container">
      {/* Section: Invoice Meta */}
      <section className="form-section animate-slide-up" style={{ animationDelay: '0s' }}>
        <h3 className="section-title"><FileText size={18} /> Invoice Details</h3>
        <div className="input-group">
          <label>Invoice Number</label>
          <input 
            type="text" 
            name="invoiceNumber" 
            value={data.invoiceNumber} 
            onChange={handleChange} 
            placeholder="INV-001"
          />
        </div>
        <div className="grid-cols-2">
          <div className="input-group">
            <label>Issue Date</label>
            <input 
              type="date" 
              name="issueDate" 
              value={data.issueDate} 
              onChange={handleChange} 
            />
          </div>
          <div className="input-group">
            <label>Due Date</label>
            <input 
              type="date" 
              name="dueDate" 
              value={data.dueDate} 
              onChange={handleChange} 
            />
          </div>
        </div>
      </section>

      {/* Section: Client Info */}
      <section className="form-section animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h3 className="section-title"><User size={18} /> Client Information</h3>
        <div className="input-group">
          <label>Client Name</label>
          <input 
            type="text" 
            name="clientName" 
            value={data.clientName} 
            onChange={handleChange} 
            placeholder="John Doe"
          />
        </div>
        <div className="input-group">
          <label>Client Email</label>
          <input 
            type="email" 
            name="clientEmail" 
            value={data.clientEmail} 
            onChange={handleChange} 
            placeholder="john@example.com"
          />
        </div>
        <div className="input-group">
          <label>Client Address</label>
          <textarea 
            name="clientAddress" 
            value={data.clientAddress} 
            onChange={handleChange} 
            placeholder="Street Address, City"
            rows="2"
          />
        </div>
      </section>

      {/* Section: Line Items */}
      <section className="form-section animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h3 className="section-title"><PlusCircle size={18} /> Services & Items</h3>
        <div className="items-list">
          {data.items.map((item, index) => (
            <div key={item.id} className="item-row">
              <div className="input-group full">
                <label>Description</label>
                <input 
                  type="text" 
                  value={item.description} 
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  placeholder="Service description..."
                />
              </div>
              <div className="grid-cols-2-action">
                <div className="input-group">
                  <label>Qty</label>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="input-group">
                  <label>Rate</label>
                  <input 
                    type="number" 
                    value={item.rate} 
                    onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <button className="btn-remove" onClick={() => removeItem(item.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="btn-add-item" onClick={addItem}>
          <Plus size={16} /> Add Item
        </button>
      </section>

      {/* Section: Summary Tweaks */}
      <section className="form-section animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="grid-cols-2">
          <div className="input-group">
            <label>Tax (%)</label>
            <input 
              type="number" 
              name="tax" 
              value={data.tax} 
              onChange={handleChange} 
            />
          </div>
          <div className="input-group">
            <label>Currency</label>
            <select name="currency" value={data.currency} onChange={handleChange}>
              <option value="IDR">IDR (Rp)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>
        </div>
      </section>
      
      <style>{`
        .premium-form-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding-bottom: 100px;
        }
        .form-section {
          background: white;
          padding: 24px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-soft);
          box-shadow: var(--shadow-sm);
        }
        .section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: var(--text-primary);
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }
        .input-group label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-tertiary);
        }
        input, textarea, select {
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-soft);
          background: var(--bg-secondary);
          color: var(--text-primary);
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        input:focus, textarea:focus {
          border-color: var(--accent);
          background: white;
          box-shadow: 0 0 0 4px var(--accent-soft);
        }
        .grid-cols-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .grid-cols-2-action {
          display: grid;
          grid-template-columns: 1fr 1.5fr auto;
          gap: 12px;
          align-items: flex-end;
        }
        .item-row {
          padding: 16px;
          border-radius: var(--radius-sm);
          border: 1px dashed var(--border-soft);
          margin-bottom: 16px;
        }
        .btn-remove {
          height: 44px;
          width: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ef4444;
          background: #fef2f2;
          border-radius: var(--radius-sm);
          margin-bottom: 16px;
        }
        .btn-add-item {
          width: 100%;
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: var(--radius-sm);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.9rem;
          border: 1px dashed var(--border-soft);
        }
        .btn-add-item:hover {
          background: var(--accent-soft);
          color: var(--accent);
          border-color: var(--accent);
        }
      `}</style>
    </div>
  );
};

export default PremiumForm;
