# Built-in packages
import json
# Local packages
from cleanSVG import cleanImageAndGradient
# Installed packages
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, landscape
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPDF

base_path = '../'

# Leer el archivo JSON
json_file_path = base_path + 'support/slwebview.json'
with open(json_file_path, 'r') as json_file:
    slwebview = json.load(json_file)

section = slwebview['sections'][0] # TODO: Iterar sobre las secciones
hierarchyUrl = section['hierarchyUrl']
title = section['name']
backingUrl = section['backingUrl']

# Leer el archivo JSON
json_file_path = hierarchyUrl
with open(json_file_path, 'r') as json_file:
    data = json.load(json_file)

# Configurar el archivo PDF
output_pdf_path = base_path + 'out/test3.pdf'
c = canvas.Canvas(output_pdf_path, pagesize=landscape(letter))

page_width, page_height = letter

# Iterar sobre los elementos SVG y agregarlos al PDF
for element in data[:1]:
    svg_file_path = base_path + element['svg']

    # Limpiar el archivo SVG
    cleanImageAndGradient(svg_file_path)

    drawing = svg2rlg(svg_file_path)

    c.translate(50 + (page_width - drawing.width)//2, 50 + (page_height - drawing.height)//2 )
    renderPDF.draw(drawing, c, 0, 0)
    c.showPage()

# Guardar el PDF generado
c.save()

