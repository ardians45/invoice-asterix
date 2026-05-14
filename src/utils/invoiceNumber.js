/**
 * Generates a formatted invoice number based on current date and a counter.
 * Format: INV/YYYY/MM/DD/XXXX
 * @param {number} counter 
 * @returns {string}
 */
export const generateInvoiceNumber = (counter) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const formattedCounter = String(counter).padStart(4, '0');
  
  return `INV/${year}/${month}/${day}/${formattedCounter}`;
};

/**
 * Gets the current invoice counter from local storage.
 * Defaults to 1 if not set.
 * @returns {number}
 */
export const getStoredCounter = () => {
  const counter = localStorage.getItem('asterix_invoice_counter');
  return counter ? parseInt(counter, 10) : 1;
};

/**
 * Saves the invoice counter to local storage.
 * @param {number} counter 
 */
export const setStoredCounter = (counter) => {
  localStorage.setItem('asterix_invoice_counter', counter.toString());
};
