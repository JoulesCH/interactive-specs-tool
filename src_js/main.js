// Interactive Specs Tool 
// V0.0.1  17/08/23
// Hernandez, Julio 223105498

const PDFDocument = require('pdfkit');
const fs = require('fs');
const SVGtoPDF = require('svg-to-pdfkit');
const jsdom = require('jsdom');
const path = require('path');
const { JSDOM } = jsdom;

// ----------------------------- USER INPUT ----------------------------

const base_path = '../'
const path_hierarchy_files = '../support/slwebview_files/lms100pbSimulation_h_1.json'
const output_pdf_path = 'output.pdf'
const simulation_name = 'lms100pbSimulation'

// Constants for PDF dimensions (8.5 x 11 inches for letter size with 0.5-inch margin)
const pdfWidth = 8.5 * 72;  
const pdfHeight = 11 * 72;
const margin = 0.5 * 72;

// -----------------------------    CODE    ----------------------------

// A method for converting SVG to PDF is added to PDFDocument class
PDFDocument.prototype.addSVG = function(svg, x, y, options) {
    return SVGtoPDF(this, svg, x, y, options), this;
  };

// Add hyperlinks to the SVG file function
function addLinkToPage(archivo) {
  const svg_content = fs.readFileSync(archivo, 'utf8');
  const dom = new JSDOM(svg_content, { contentType: 'text/xml' });
  const document = dom.window.document;

  const svg = document.querySelector('svg');
  svg.setAttribute('id', archivo.substring(archivo.lastIndexOf('/') + 1, archivo.lastIndexOf('.')));

  // Extract the g tags with the id starting with the simulation name and ':'
  const g_tags = document.querySelectorAll(`g[id^="${simulation_name}:"]`);

  // Add a parent link tag to each g tag
  g_tags.forEach((g_tag) => {
      const a_tag = document.createElement('a');
      // The href attribute is the id of the g tag with the ':' replaced by '_' and a '_d' added at the end
      // also the id is truncated at the last '#out' to remove the '#out' and the number at the end
      const out_index = g_tag.id.lastIndexOf('#out');
      const id = g_tag.id.replace(':', '_').substring(0, out_index == -1 ? g_tag.id.length : out_index);

      a_tag.setAttribute('href', `#${id}_d`);

      g_tag.parentNode.insertBefore(a_tag, g_tag);

      g_tag.removeAttribute('id');

      a_tag.appendChild(g_tag);
  });

  fs.writeFileSync(archivo, dom.serialize());
}

// Creating the pdf document and pipe the stream to a file
const output_doc = new PDFDocument();
output_doc.pipe(fs.createWriteStream(output_pdf_path));

// Read the hierarchy json file
const json_hierarchy_files = JSON.parse(fs.readFileSync(path_hierarchy_files, 'utf-8'));

// For each svg file in the json file, add a page to the pdf document and add the svg file to the page
json_hierarchy_files.forEach((simulation, index) => {
  console.log(simulation.svg)
  if(['support/slwebview_files/lms100pbSimulation_9557_d.svg', 'support/slwebview_files/lms100pbSimulation_10741_d.svg','support/slwebview_files/lms100pbSimulation_6264_d.svg','support/slwebview_files/lms100pbSimulation_8508_d.svg', 'support/slwebview_files/lms100pbSimulation_8505_d.svg','','','','',''].includes(simulation.svg)){
    console.log('saltado')
    return;
  }
  // Get the path of the svg file and add the hyperlinks to the svg file
  const svg = path.join(base_path, simulation.svg);
  addLinkToPage(svg);
  
  // Get the svg content, the name of the svg for adding a named destination
  const svg_content = fs.readFileSync(svg, 'utf-8');
  const svg_name = simulation.fullname;
  const a_href_destination = simulation.sid.replace(':', '_') + '_d';
  
  const svg_width = pdfWidth - 2 * margin; // Adjust SVG width to fit within margins
  const svg_height = pdfHeight - 2 * margin; // Adjust SVG height to fit within margins
  const x = margin;
  const y = margin;
  const options = {width: svg_width, height: svg_height, preserveAspectRatio: 'xMidYMid meet'};

  // Add title centered above the SVG
  const tittle_font_size = 14;
  const titleX = margin + (svg_width - svg_name.length * tittle_font_size * 0.5) / 2;
  const titleY = margin - tittle_font_size; // Adjust to place title above SVG

  output_doc.fontSize(tittle_font_size)
    .text(a_href_destination, titleX, titleY, { align: 'center' });

  // Convert the svg to pdf and add it to the pdf document
  output_doc.addSVG(svg_content, x, y, options);

  output_doc.addNamedDestination(a_href_destination, { pageNumber: index + 1 });

  output_doc.addPage();

});

output_doc.end();