import React from 'react';
import logo from '../assets/logo.png';

const BoutiquePreview = ({ data }) => {
  const calculateSubtotal = () => {
    return data.items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
  };

  const subtotal = calculateSubtotal();
  const taxAmount = (subtotal * data.tax) / 100;
  const total = subtotal + taxAmount;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: data.currency,
      minimumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="preview-scale-wrapper">
      <div id="invoice-capture" className="a4-page">
        {/* Header Ribbon */}
        <div className="invoice-header">
          <div className="brand-box">
            <img src={logo} alt="Asterix Logo" className="invoice-logo" />
            <div className="brand-info">
              <h2 className="studio-name">ASTERIX STUDIO</h2>
              <p className="studio-meta">Creative Production & Interactive Agency</p>
            </div>
          </div>
          <div className="invoice-meta">
            <h1 className="invoice-title">INVOICE</h1>
            <div className="meta-grid">
              <div className="meta-item">
                <span className="label">NUMBER</span>
                <span className="value">#{data.invoiceNumber}</span>
              </div>
              <div className="meta-item">
                <span className="label">DATE</span>
                <span className="value">{data.issueDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="billing-section">
          <div className="bill-to">
            <span className="section-label">BILL TO</span>
            <h3 className="client-name">{data.clientName || 'Valued Client'}</h3>
            <p className="client-email">{data.clientEmail}</p>
            <p className="client-address">{data.clientAddress}</p>
          </div>
          <div className="bill-from">
            <span className="section-label">FROM</span>
            <h3 className="studio-name-small">Asterix Studio</h3>
            <p className="studio-contact">hello@asterix.studio</p>
            <p className="studio-address">Jakarta, Indonesia</p>
          </div>
        </div>

        <table className="items-table">
          <thead>
            <tr>
              <th className="col-desc">DESCRIPTION</th>
              <th className="text-center col-qty">QTY</th>
              <th className="text-right col-rate">RATE</th>
              <th className="text-right col-amount">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td className="desc-cell">{item.description || 'Service Description'}</td>
                <td className="text-center cell-pad-h">{item.quantity}</td>
                <td className="text-right cell-pad-h">{formatCurrency(item.rate)}</td>
                <td className="text-right cell-pad-h">{formatCurrency(item.quantity * item.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="summary-section">
          <div className="notes-box">
            <span className="section-label">NOTES</span>
            <p className="notes-text">{data.notes}</p>
          </div>
          <div className="totals-box">
            <div className="total-row">
              <span className="label">Subtotal</span>
              <span className="value">{formatCurrency(subtotal)}</span>
            </div>
            {data.tax > 0 && (
              <div className="total-row">
                <span className="label">Tax ({data.tax}%)</span>
                <span className="value">{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="total-row grand-total">
              <span className="label">Total</span>
              <span className="value">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="invoice-footer">
          <div className="footer-line"></div>
          <p className="copyright">© {new Date().getFullYear()} Asterix Studio. All Rights Reserved.</p>
        </div>
      </div>

      <style>{`
        .preview-scale-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 20px 0;
          overflow-x: auto;
        }
        .a4-page {
          width: 210mm;
          min-height: 297mm;
          padding: 20mm;
          margin: 0 auto;
          background: white;
          box-shadow: var(--shadow-lg);
          color: #1e293b;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        @media (max-width: 1023px) {
          .preview-scale-wrapper {
            transform: scale(0.40);
            transform-origin: top center;
            height: 140mm;
          }
        }
        @media (min-width: 1024px) and (max-width: 1400px) {
          .preview-scale-wrapper {
            transform: scale(0.65);
            transform-origin: top left;
            height: 210mm;
          }
        }

        .invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 30mm;
          position: relative;
        }
        .brand-box {
          display: flex;
          align-items: center;
          gap: 15px;
          z-index: 2;
        }
        .invoice-logo {
          height: 50px;
          width: auto;
          object-fit: contain;
        }
        .brand-info .studio-name {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          margin: 0;
          color: #0f172a;
        }
        .brand-info .studio-meta {
          font-size: 0.7rem;
          color: #64748b;
          margin: 0;
          font-weight: 500;
        }
        .invoice-title {
          font-size: 4rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: #f8fafc;
          margin: 0;
          position: absolute;
          right: 0;
          top: -10mm;
          z-index: 0;
          line-height: 1;
        }
        .invoice-meta {
          text-align: right;
          position: relative;
          z-index: 2;
        }
        .meta-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .meta-item .label {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #94a3b8;
          display: block;
          margin-bottom: 4px;
        }
        .meta-item .value {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e293b;
        }

        .billing-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20mm;
          margin-bottom: 20mm;
        }
        .section-label {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #94a3b8;
          display: block;
          margin-bottom: 12px;
        }
        .client-name, .studio-name-small {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 6px 0;
          color: #0f172a;
        }
        .client-email, .client-address, .studio-contact, .studio-address {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0 0 4px 0;
          line-height: 1.5;
        }

        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20mm;
          table-layout: fixed;
        }
        .col-desc { width: 45%; }
        .col-qty { width: 15%; }
        .col-rate { width: 20%; }
        .col-amount { width: 20%; }

        .items-table th {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: #94a3b8;
          padding: 12px 10px;
          border-bottom: 1px solid #e2e8f0;
          text-align: left;
        }
        .items-table th.text-center { text-align: center; }
        .items-table th.text-right { text-align: right; }

        .items-table td {
          padding: 16px 10px;
          font-size: 0.9rem;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: top;
        }
        .desc-cell {
          font-weight: 600;
          color: #1e293b;
          line-height: 1.5;
        }
        .text-center { text-align: center; }
        .text-right { text-align: right; }

        .summary-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20mm;
          margin-top: auto;
          padding-top: 10mm;
        }
        .notes-box {
          flex: 1;
        }
        .notes-text {
          font-size: 0.85rem;
          color: #64748b;
          line-height: 1.6;
          white-space: pre-wrap;
        }
        .totals-box {
          width: 300px;
          background: #f8fafc;
          padding: 20px;
          border-radius: 12px;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          font-size: 0.95rem;
        }
        .total-row .label { color: #64748b; font-weight: 500; }
        .total-row .value { font-weight: 700; color: #1e293b; }
        
        .grand-total {
          margin-top: 12px;
          padding-top: 16px;
          border-top: 2px solid #e2e8f0;
        }
        .grand-total .label { font-weight: 800; color: #0f172a; font-size: 1.1rem; }
        .grand-total .value { font-weight: 800; color: #2563eb; font-size: 1.3rem; }

        .invoice-footer {
          margin-top: 20mm;
          text-align: center;
        }
        .footer-line {
          height: 1px;
          background: #e2e8f0;
          margin-bottom: 12px;
        }
        .copyright {
          font-size: 0.75rem;
          color: #94a3b8;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default BoutiquePreview;
