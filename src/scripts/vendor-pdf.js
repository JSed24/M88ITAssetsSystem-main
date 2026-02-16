/**
 * jsPDF vendor shim
 * Imports jsPDF and autotable plugin from npm and makes them available globally
 * (replaces CDN: cdnjs.cloudflare.com/ajax/libs/jspdf + jspdf-autotable)
 */
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Attach autoTable as a method on jsPDF instances.
// The default export from jspdf-autotable v3.x is a standalone function: autoTable(doc, options)
// We wrap it so it can be called as doc.autoTable(options).
jsPDF.API.autoTable = function (...args) {
    autoTable(this, ...args);
    return this;
};

// Make jsPDF available globally
window.jspdf = { jsPDF };
