const PDFDocument = require('pdfkit');
const fs = require('fs');
const SVGtoPDF = require('svg-to-pdfkit');

PDFDocument.prototype.addSVG = function(svg, x, y, options) {
    return SVGtoPDF(this, svg, x, y, options), this;
  };

// Create a document
const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('output.pdf'));

const svgFilePath = 'lms100pbSimulation_d.svg'; 

const svgContent = fs.readFileSync(svgFilePath, 'utf-8');
const x = 100; 
const y = 100;
const options = {};
doc.addSVG(svgContent, x, y, options);
  

doc.end();