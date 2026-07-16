import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Eye, Download, Plus, Trash2, Smartphone, Monitor } from 'lucide-react';
import PremiumForm from './components/PremiumForm';
import BoutiquePreview from './components/BoutiquePreview';
import { exportToPDF } from './utils/pdfEngine';
import { generateInvoiceNumber, getStoredCounter, setStoredCounter } from './utils/invoiceNumber';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: generateInvoiceNumber(getStoredCounter()),
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    items: [
      { id: 1, description: 'Creative Design Service', quantity: 1, rate: 0 }
    ],
    notes: 'Thank you for choosing Asterix Studio.',
    discount: 0,
    tax: 0,
    currency: 'IDR'
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleExport = () => {
    // Export the current invoice
    exportToPDF('invoice-capture', `Invoice_${invoiceData.invoiceNumber}_${invoiceData.clientName || 'Client'}`);
    
    // Prepare for the next invoice
    const nextCounter = getStoredCounter() + 1;
    setStoredCounter(nextCounter);
    
    // Update the UI with the new number
    setInvoiceData(prev => ({
      ...prev,
      invoiceNumber: generateInvoiceNumber(nextCounter)
    }));
  };

  return (
    <div className="app-container">
      <div className="top-banner">
        <span>Akses File & Template: </span>
        <a href="https://drive.google.com/drive/folders/1SYkoed2KDadagX8mWRLxvAHKr2AIIbep" target="_blank" rel="noreferrer">
          Google Drive Folder
        </a>
      </div>

      {/* Header / Nav */}
      <header className="app-header glass">
        <div className="header-content">
          <div className="logo-section">
            <span className="logo-text">ASTERIX</span>
            <span className="logo-subtext">INVOICE GENERATOR</span>
          </div>
          
          <div className="header-actions">
            {!isMobile && (
              <button className="btn-primary" onClick={handleExport}>
                <Download size={18} />
                <span>Download PDF</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Mobile Tabs */}
        {isMobile && (
          <div className="mobile-tabs">
            <button 
              className={`tab-btn ${activeTab === 'edit' ? 'active' : ''}`}
              onClick={() => setActiveTab('edit')}
            >
              <Edit3 size={20} />
              <span>Edit</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              <Eye size={20} />
              <span>Preview</span>
            </button>
          </div>
        )}

        <div className="editor-preview-layout">
          {/* Editor Panel */}
          <section className={`panel editor-panel ${isMobile && activeTab !== 'edit' ? 'hidden' : ''}`}>
            <PremiumForm data={invoiceData} setData={setInvoiceData} />
          </section>

          {/* Preview Panel */}
          <section className={`panel preview-panel ${isMobile && activeTab !== 'preview' ? 'hidden' : ''}`}>
            <div className="preview-sticky">
              <div className="preview-container-wrapper">
                <BoutiquePreview data={invoiceData} />
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Export Fab */}
      {isMobile && activeTab === 'preview' && (
        <motion.button 
          className="fab-download"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={handleExport}
        >
          <Download size={24} />
        </motion.button>
      )}
    </div>
  );
};

export default App;
