import os
import re

# Directorio donde se encuentran los archivos SVG
directorio = '/ruta/de/tu/directorio'

# Expresiones regulares para buscar las etiquetas a eliminar
patron_g = r'<g[^>]*>\s*<image[^>]*xlink:href="data:image/png;base64,iVBORw0KGgoAAAAN[^>]*>\s*</g>'
patron_defs = r'<defs>\s*<linearGradient[^>]*>\s*<stop[^>]*>\s*<stop[^>]*>\s*</linearGradient>\s*</defs>'

# Iterar a través de los archivos en el directorio
def cleanImageAndGradient(archivo):
    if archivo.endswith('.svg'):
        ruta_archivo = os.path.join(directorio, archivo)
        with open(ruta_archivo, 'r') as archivo_svg:
            contenido = archivo_svg.read()
        
        # Eliminar las etiquetas <g> con atributo xlink:href específico
        contenido = re.sub(patron_g, '', contenido)
        
        # Eliminar la etiqueta <defs> con el gradiente lineal específico
        contenido = re.sub(patron_defs, '', contenido)
        
        # Escribir el contenido modificado nuevamente en el archivo
        with open(ruta_archivo, 'w') as archivo_svg:
            archivo_svg.write(contenido)
