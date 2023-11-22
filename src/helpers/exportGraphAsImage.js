//import axios from "axios";
import swal from "sweetalert";
//import vkbeautify from "vkbeautify";

function exportGraphAsImage(graph){

	// Function to export the graph to XML
	function exportGraphToXml() {
		var model = graph.getModel();
		var encoder = new mxCodec();
		var xml = encoder.encode(model);
		var xmlString = mxUtils.getXml(xml);
	  
		// Wrap JSON-like content with CDATA
		var jsonLikeContent = '{"definition":"Meta","identifier":"Meta","name":"Meta","type":"Meta","customShape":"goalShape","width":"120","height":"40"}';
		xmlString = xmlString.replace(jsonLikeContent, '<![CDATA[' + jsonLikeContent + ']]>');
	  
		// Output to console
		console.log('Exported XML:');
		console.log(xmlString);
		alert(xmlString);
	  
		// You can also copy the xmlString to clipboard here if needed
	  }
  
  // Assuming exportJSONbtn is your button
  var exportJSONbtn = document.body.appendChild(mxUtils.button('Exportar XML', exportGraphToXml));
  
	exportJSONbtn.style.position = 'absolute';
	exportJSONbtn.style.top = '122px';
	exportJSONbtn.style.right = '4px';
	exportJSONbtn.style.width = '73px';
	exportJSONbtn.setAttribute("class", "button");

	// Function to import the graph from XML
	function importGraphFromXml() {
		// Prompt for XML input
		var xmlInput = prompt('Paste XML here:');
	  
		try {
		  var parser = new DOMParser();
		  var doc = parser.parseFromString(xmlInput, 'application/xml');
	  
		  // Check for parsing errors
		  if (doc.getElementsByTagName('parsererror').length > 0) {
			console.error('XML Parsing Error:', doc.getElementsByTagName('parsererror')[0].textContent);
			throw new Error('XML Parsing Error');
		  }
	  
		  var model = graph.getModel();
		  var decoder = new mxCodec(doc);
		  decoder.decode(doc.documentElement, model);
		  graph.refresh();
		  console.log('Import Successful: Graph has been imported successfully!');
		} catch (error) {
		  console.error('Import Failed:', error);
		}
	  }
	  
  // Assuming importJSONbtn is your import button
  var importJSONbtn = document.body.appendChild(mxUtils.button('Importar XML', importGraphFromXml));
  
	importJSONbtn.style.position = 'absolute';
	importJSONbtn.style.top = '80px';
	importJSONbtn.style.right = '4px';
	importJSONbtn.style.width = '73px';
	importJSONbtn.setAttribute("class", "button");

	let buttonPreview = document.body.appendChild(mxUtils.button('Imprimir', function()
    {        
        var preview = new mxPrintPreview(graph, 1);
        preview.title = 'Imprimir';
        
        swal("Print", "Se abrirá una nueva ventana para generar el modelo en formato PDF, desea continuar?",{
            className: 'view-model-normal',
            buttons: {
                cancel: true,
                open: {
                  text: "Abrir",
                },
            },
        })
        .then((value) => {
            switch (value) {
                case "open":
                    preview.open();
                    break;
                default:
                    break;
            }
        });

    }));

    buttonPreview.style.position = 'absolute';    
    buttonPreview.style.top = '4px';
    buttonPreview.style.right = '4px';
    buttonPreview.style.width = '72px';
    buttonPreview.setAttribute("class", "button");

} 

export default exportGraphAsImage;