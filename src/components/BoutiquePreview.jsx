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
              <th>DESCRIPTION</th>
              <th className="text-center">QTY</th>
              <th className="text-right">RATE</th>
              <th className="text-right">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td className="desc-cell">{item.description || 'Service Description'}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-right">{formatCurrency(item.rate)}</td>
                <td className="text-right">{formatCurrency(item.quantity * item.rate)}</td>
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
              <span className="label">Total Amount</span>
              <span className="value">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="invoice-footer">
          <div className="footer-line"></div>
          <p className="copyright">© 2024 Asterix Studio. All Rights Reserved.</p>
        </div>
      </div>

      <style>{`
        .preview-scale-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 20px 0;
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
        }
        @media (max-width: 1023px) {
          .preview-scale-wrapper {
            transform: scale(0.45);
            transform-origin: top center;
            height: 150mm;
          }
        }
        @media (min-width: 1024px) and (max-width: 1400px) {
          .preview-scale-wrapper {
            transform: scale(0.7);
            transform-origin: top left;
            height: 220mm;
          }
        }

        .invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40mm;
        }
        .brand-box {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .invoice-logo {
          height: 60px;
          width: auto;
          object-fit: contain;
        }
        .brand-info .studio-name {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          margin: 0;
          color: #0f172a;
        }
        .brand-info .studio-meta {
          font-size: 0.75rem;
          color: #64748b;
          margin: 0;
          font-weight: 500;
        }
        .invoice-title {
          font-size: 3rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          color: #f1f5f9;
          margin: 0;
          position: absolute;
          right: 20mm;
          top: 15mm;
          z-index: 0;
          line-height: 1;
        }
        .invoice-meta {
          text-align: right;
          position: relative;
          z-index: 1;
          margin-top: 5mm;
        }
        .meta-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .meta-item .label {
          font-size: 0.65rem;
          font-weight: 700;
          color: #94a3b8;
          display: block;
          margin-bottom: 2px;
        }
        .meta-item .value {
          font-size: 1rem;
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
          margin: 0 0 4px 0;
        }
        .client-email, .client-address, .studio-contact, .studio-address {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0;
          line-height: 1.4;
        }

        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20mm;
        }
        .items-table th {
          font-size: 0.65rem;
          font-weight: 800;
          color: #94a3b8;
          padding: 12px 0;
          border-bottom: 2px solid #f1f5f9;
          text-align: left;
        }
        .items-table td {
          padding: 20px 0;
          font-size: 0.9rem;
          border-bottom: 1px solid #f8fafc;
        }
        .desc-cell {
          font-weight: 600;
          color: #334155;
        }
        .text-center { text-align: center; }
        .text-right { text-align: right; }

        .summary-section {
          display: grid;
          grid-template-columns: 1fr 200px;
          gap: 20mm;
          margin-top: auto;
          padding-top: 10mm;
        }
        .notes-text {
          font-size: 0.8rem;
          color: #64748b;
          line-height: 1.6;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 0.9rem;
        }
        .total-row .label { color: #64748b; font-weight: 500; }
        .total-row .value { font-weight: 700; color: #1e293b; }
        .grand-total {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 2px solid #f1f5f9;
        }
        .grand-total .label { font-weight: 800; color: #0f172a; font-size: 1rem; }
        .grand-total .value { font-weight: 800; color: #2563eb; font-size: 1.25rem; }

        .invoice-footer {
          margin-top: 20mm;
          text-align: center;
        }
        .footer-line {
          height: 1px;
          background: #f1f5f9;
          margin-bottom: 8px;
        }
        .copyright {
          font-size: 0.7rem;
          color: #cbd5e1;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default BoutiquePreview;
