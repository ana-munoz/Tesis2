import axios from "axios";
import swal from "sweetalert";
import xmltojson from "xmltojson";

/* function parseXmlJSON (graph){
	var encoder = new mxCodec();
	var node = encoder.encode(graph.getModel());

	var testString = mxUtils.getXml(node);   // fetch xml (string or document/node)
	var result = xmlToJSON.parseString(testString);   // parses to JSON object
	mxUtils.popup(JSON.stringify(result, null, 4), true); // turns into string
} */
function exportGraphToXml() {
  var model = graph.getModel();
  var encoder = new mxCodec();
  var xml = encoder.encode(model);
  var xmlString = mxUtils.getXml(xml);

  // Show a SweetAlert modal with the XML content
  swal('Exported XML', xmlString, 'info');
}

function exportGraphAsImage(graph){


	let exportJSONbtn = document.body.appendChild(mxUtils.button('Exportar JSON', function() {
		console.log("exportando JSON...");
		var modelString = parseXmlJSON(graph);

        function copyClipboard(text) {
            var x = document.createElement("textarea");
            document.body.appendChild(x);
            x.value = text;
            x.select();
            document.execCommand("copy");
            document.body.removeChild(x);
        }

        swal({
            title: "Export Model",
            text: modelString,
            className: 'view-model',
            buttons: {
                copyclipboard: {
                    text: "Copy Clipboard"
                },
                close: {
                    text: "Close"
                },
            },
        })
        .then((value) => {
            switch (value) {
                case "copyclipboard":
                    swal("Copied", "The model has been copied to the clipboard", "success",{
                        className: 'view-model-normal',
                    });
                    copyClipboard(modelString);
                    break;
                case "close":
                    break;
            }
        });

        window.scrollTo(0, 0);
    
	}));
	exportJSONbtn.style.position = 'absolute';
	exportJSONbtn.style.top = '122px';
	exportJSONbtn.style.right = '4px';
	exportJSONbtn.style.width = '73px';
	exportJSONbtn.setAttribute("class", "button");

	let importJSONbtn = document.body.appendChild(mxUtils.button('Importar JSON', function()
    {        
        var modelEntered;
        var loadedIdentifier;

        
        swal("Importar", "Ingrese su modelo utilizando el método LiteStrat",{
            content: "input",
            className: 'view-model-normal',
            buttons: ['Cancelar', 'Importar']
        })
       .then((value) => {
            modelEntered = value;
            //var modelEntered = prompt("Ingrese el modelo:", "");
            if (modelEntered == null || modelEntered == "") {
                //alert("Canceled");
                if(modelEntered == null){
                    /*
                    swal("Canceled", "", "error", {
                        dangerMode: true
                    });
                    */
                }
                if(modelEntered == ""){
                    swal("Vacío", "", "error", {
                        dangerMode: true
                    });
                }
            } else {
				if(modelEntered.includes('"actores":')&&
					modelEntered.includes('"unidades":')&&
					modelEntered.includes('"roles":')&&
					modelEntered.includes('"metas":')/*&&
					modelEntered.includes('"estartegias":')&&
					modelEntered.includes('"tacticas":')&&
					modelEntered.includes('"objetivos":') */
					){

                	graph.getModel().beginUpdate();

					try
					{

						//load model from JSON
						let model = JSON.parse(modelEntered);

						var soloActores = [];

						for (let index = 0; index < model.actores.length; index++) {
							let actr = new window.CustomActorObject();
							actr.identifier = model.actores[index].identifier;
							actr.name = model.actores[index].name;
							actr.type = model.actores[index].type;
							let parent = graph.getDefaultParent();
							soloActores[index] = graph.insertVertex(parent, 
								model.actores[index].unique, 
								actr, model.actores[index].x, 
								model.actores[index].y, 
								40, 50, 
								'shape=actorShape;fillColor=#33C9FA;strokeWidth=3;resizable=0;fontSize=12;fontFamily=Arial;strokeColor=#000000;align=center;');
						}

						var soloUnidades = [];

						for (let index = 0; index < model.unidades.length; index++) {
							let unit = new window.CustomAgentObject();
							unit.identifier = model.unidades[index].identifier;
							unit.name = model.unidades[index].name;
							unit.type = model.unidades[index].type;
							let parent = graph.getDefaultParent();
							soloUnidades[index] = graph.insertVertex(parent, 
								model.unidades[index].unique, 
								unit, model.unidades[index].x, 
								model.unidades[index].y, 
								40, 50, 
								'shape=agentShape;fillColor=#33C9FA;strokeWidth=3;resizable=0;fontSize=12;fontFamily=Arial;strokeColor=#000000;align=center;');
						}

						var soloRoles = [];

						for (let index = 0; index < model.roles.length; index++) {
							let role = new window.CustomRoleObject();
							role.identifier = model.roles[index].identifier;
							role.name = model.roles[index].name;
							role.type = model.roles[index].type;
							let parent = graph.getDefaultParent();
							soloRoles[index] = graph.insertVertex(parent, 
								model.roles[index].unique, 
								role, model.roles[index].x, 
								model.roles[index].y, 
								40, 50, 
								'shape=roleShape;fillColor=#33C9FA;strokeWidth=3;resizable=0;fontSize=12;fontFamily=Arial;strokeColor=#000000;align=center;');
						}

						var soloMetas = [];
						for (let index = 0; index < model.metas.length; index++) {
							let goal = new window.CustomGoalObject();
							goal.identifier = model.metas[index].identifier;
							goal.name = model.metas[index].name;
							goal.type = model.metas[index].type;
							let parent = graph.getDefaultParent();
							soloMetas[index] = graph.insertVertex(parent, 
								model.metas[index].unique, 
								goal, model.metas[index].x, 
								model.metas[index].y, 
								40, 50, 
								'shape=goalShape;fillColor=#33C9FA;strokeWidth=3;resizable=0;fontSize=12;fontFamily=Arial;strokeColor=#000000;align=center;');
						}
						//ESTO DEBIERA SER TACTICAS :D
						/* var soloMetas = [];
						for (let index = 0; index < model.metas.length; index++) {
							let goal = new window.CustomGoalObject();
							goal.identifier = model.metas[index].identifier;
							goal.name = model.metas[index].name;
							goal.type = model.metas[index].type;
							let parent = graph.getDefaultParent();
							soloMetas[index] = graph.insertVertex(parent, 
								model.metas[index].unique, 
								goal, model.metas[index].x, 
								model.metas[index].y, 
								40, 50, 
								'shape=goalShape;fillColor=#33C9FA;strokeWidth=3;resizable=0;fontSize=12;fontFamily=Arial;strokeColor=#000000;align=center;');
						} */


						//ESTO NO SE MUEVE DE AQUÍ
						graph.refresh();
					}
					finally {
						graph.getModel().endUpdate();
					}

                } else {
                    //alert("Invalid model");
                    swal("Modelo inválido", "", "Error", {
                        dangerMode: true
                    });
				}
			
			}})
	}));



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