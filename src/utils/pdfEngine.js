import html2pdf from 'html2pdf.js';

/**
 * Exports a targeted HTML element to a high-quality PDF.
 * @param {string} elementId - The ID of the HTML element to capture.
 * @param {string} fileName - The name of the resulting PDF file.
 */
export const exportToPDF = (elementId, fileName) => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error(`Element with ID ${elementId} not found.`);
    return;
  }

  const opt = {
    margin: 0,
    filename: `${fileName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, // High resolution
      useCORS: true,
      letterRendering: true,
      scrollX: 0,
      scrollY: 0
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // Pre-process: temporary styles if needed for capture
  const originalBoxShadow = element.style.boxShadow;
  element.style.boxShadow = 'none'; // Remove screen shadow for clean PDF

  html2pdf().set(opt).from(element).save().then(() => {
    // Restore styles
    element.style.boxShadow = originalBoxShadow;
  });
};
