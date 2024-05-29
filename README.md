# LiteStratModeller - proyecto de título
Herramienta de modelado para el lenguaje LiteStrat.

Para ejecutar de manera local: npm run serve 

## Documentación del código
A continuación se presentan los archivos principales asociados a lógica de funcionamiento de la herramienta.
### GraphWrapper.vue
En este archivo se encuentra la lógica principal del código, ya que se describe el área de trabajo, la lógica detrás de la anidación de figuras, su modificación (tamaño, texto, etc.), conexión entre ellas, etc. 
### ExportGraphAsImage.js
Aquí se encuentra la lógica dettrás de la exportación e importación de modelos en sus respectivos formatos y todo lo asociado a acciones de zoom-in y zoom-out.
### customShapes.js
Aquí se encuentran definidas todas la figuras que corresponden a los constructos del lenguaje, utilizando la librería MxGraph.
### Clipboard.js
Este archivo contiene todo lo asociado al clipboard para las acciones de "copiar" y "pegar" dentro del espacio de trabajo.

