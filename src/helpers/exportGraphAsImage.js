import axios from "axios";
import swal from "sweetalert";
import vkbeautify from "vkbeautify";

//function exportModelJson(graph){
	/*graph.selectAll();
	var selection = graph.getSelectionCells();
	var model = 
	{
		"actores": [],
		"unidades": [],
		"roles": [],
		"metas": [],
		"estrategias": [],
		"tacticas": [],
		"objetivos": [],
		"influencias": [],
		"refinamientos": []
	};
	
	//var currentId = document.getElementsByClassName("modelIdentifier")[0].textContent;

	for (let index = 0; index < selection.length; index++) {
        if(selection[index].value.type == "Actor"){
            var actor = {
                unique: selection[index].id,
                identifier: selection[index].value.identifier,
                name: selection[index].value.name,
                type: selection[index].value.type,
                x: selection[index].geometry.x,
                y: selection[index].geometry.y
            }
            model.actores.push(actor);
        }
    }

	for (let index = 0; index < selection.length; index++) {
        if(selection[index].value.type == "UnidadOrganizacional"){
            var unidad = selection[index];
			var hijos = unidad.getChildCount();
			var unidadOrganizacional = {
                unique: selection[index].id,
                identifier: selection[index].value.identifier,
                name: selection[index].value.name,
                type: selection[index].value.type,
				parentShape: selection[index].value.parentCell,
                x: selection[index].geometry.x,
                y: selection[index].geometry.y
			}
			//console.log("hijos", hijos)
			for (let hijo_nro = 0; hijo_nro < hijos; hijo_nro++) {
				console.log("test,", unidad.getChildAt(hijo_nro).value.name); //if para pushear los consturctos anidados
				
				var item = unidad.getChildAt(hijo_nro).value;

				if(unidad.getChildAt(hijo_nro).value.type == "Influencia"){
					if(unidad.getChildAt(hijo_nro).geometry.points != null){
						var geometryPoints = []
						for (let a = 0; a < unidad.getChildAt(hijo_nro).geometry.points.length; a++) {
							geometryPoints[a] = unidad.getChildAt(hijo_nro).geometry.points[a];
						}
						var influencia = {
							unique: unidad.getChildAt(hijo_nro).id,
							identifier: unidad.getChildAt(hijo_nro).value.identifier,
							name: unidad.getChildAt(hijo_nro).value.name,
							type: unidad.getChildAt(hijo_nro).value.type,
							source: unidad.getChildAt(hijo_nro).source.id,
							target: unidad.getChildAt(hijo_nro).target.id,
							"points": geometryPoints
						}
						model.influencias.push(influencia);
					} else {
						var influencia = {
							unique: unidad.getChildAt(hijo_nro).id,
							identifier: unidad.getChildAt(hijo_nro).value.identifier,
							name: unidad.getChildAt(hijo_nro).value.name,
							type: unidad.getChildAt(hijo_nro).value.type,
							source: unidad.getChildAt(hijo_nro).source.id,
							target: unidad.getChildAt(hijo_nro).target.id,
						}
						model.influencias.push(influencia);
					}
				}
				if(unidad.getChildAt(hijo_nro).value.type == "Refinamiento"){
					var refinamiento = {
						unique: unidad.getChildAt(hijo_nro).id,
						identifier: unidad.getChildAt(hijo_nro).value.identifier,
						name: unidad.getChildAt(hijo_nro).value.name,
						type: unidad.getChildAt(hijo_nro).value.type,
						x: unidad.getChildAt(hijo_nro).geometry.x,
						y: unidad.getChildAt(hijo_nro).geometry.y
					}
					model.refinamientos.push(refinamiento);
				}

				if (unidad.getChildAt(hijo_nro).value.type == "Meta") {
					var parentCell = unidad.getChildAt(hijo_nro).getParent();	//FLAG
					var meta = {
						unique: unidad.getChildAt(hijo_nro).id,
						identifier: item.identifier,
						name: item.name,
						type: item.type,
						//parentShapeIdentifier: parentCell ? parentCell.value.identifier : null,
						x: unidad.getChildAt(hijo_nro).geometry.x,
						y: unidad.getChildAt(hijo_nro).geometry.y
					}
					console.log("parent cell,", parentCell ? parentCell.value.name : null);
					model.metas.push(meta);
				} 

				if (unidad.getChildAt(hijo_nro).value.type == "Estrategia"){
					var estrategia = {
						unique: item.id,
						identifier: item.identifier,
						name: item.name,
						type: item.type,
						x: unidad.getChildAt(hijo_nro).geometry.x,
						y: unidad.getChildAt(hijo_nro).geometry.y
					} 
					model.estrategias.push(estrategia);
				} 
				if (unidad.getChildAt(hijo_nro).value.type == "Tactica"){
					var tactica = {
						unique: item.id,
						identifier: item.identifier,
						name: item.name,
						type: item.type,
						x: unidad.getChildAt(hijo_nro).geometry.x,
						y: unidad.getChildAt(hijo_nro).geometry.y
					} 
					model.tacticas.push(tactica);
				}
				if (unidad.getChildAt(hijo_nro).value.type == "Objetivo"){
					var objetivo = {
						unique: item.id,
						identifier: item.identifier,
						name: item.name,
						type: item.type,
						x: unidad.getChildAt(hijo_nro).geometry.x,
						y: unidad.getChildAt(hijo_nro).geometry.y
					} 
					model.objetivos.push(objetivo);
				}*/
				/* DESDE AQUÍ SE ITERA SOBRE LOS CONSTRUCTOS ANIDADOS DENTRO DE UNO O MÁS ROLES */
				/*if(unidad.getChildAt(hijo_nro).value.type == "Rol") {
					var rol_padre = unidad.getChildAt(hijo_nro);
                	var hijos_rol = rol_padre.getChildCount();
					var rol = {
						unique: item.id,
						identifier: item.identifier,
						name: item.name,
						type: item.type,
						x: unidad.getChildAt(hijo_nro).geometry.x,
						y: unidad.getChildAt(hijo_nro).geometry.y
					}
					console.log("hijos rol", hijos_rol)
					for (let hijo_rol_nro = 0; hijo_rol_nro < hijos_rol; hijo_rol_nro++) {
						
						var itemRol = rol_padre.getChildAt(hijo_rol_nro).value;
						
						console.log("hijos padre,", rol_padre.getChildAt(hijo_rol_nro).value.name);
						
						if(rol_padre.getChildAt(hijo_rol_nro).value.type == "Meta"){
							var meta = {
								unique: rol_padre.getChildAt(hijo_rol_nro).id,
								identifier: itemRol.identifier,
								name: itemRol.name,
								type: itemRol.type,
								x: rol_padre.getChildAt(hijo_rol_nro).geometry.x,
								y: rol_padre.getChildAt(hijo_rol_nro).geometry.y
							}
							model.metas.push(meta);
						} 
		
						if (rol_padre.getChildAt(hijo_rol_nro).value.type == "Estrategia"){
							var estrategia = {
								unique: itemRol.id,
								identifier: itemRol.identifier,
								name: itemRol.name,
								type: itemRol.type,
								x: rol_padre.getChildAt(hijo_rol_nro).geometry.x,
								y: rol_padre.getChildAt(hijo_rol_nro).geometry.y
							} 
							model.estrategias.push(estrategia);
						} 
						if (rol_padre.getChildAt(hijo_rol_nro).value.type == "Tactica"){
							var tactica = {
								unique: itemRol.id,
								identifier: itemRol.identifier,
								name: itemRol.name,
								type: itemRol.type,
								x: rol_padre.getChildAt(hijo_rol_nro).geometry.x,
								y: rol_padre.getChildAt(hijo_rol_nro).geometry.y
							} 
							model.tacticas.push(tactica);
						}
						if (rol_padre.getChildAt(hijo_rol_nro).value.type == "Objetivo"){
							var objetivo = {
								unique: itemRol.id,
								identifier: itemRol.identifier,
								name: itemRol.name,
								type: itemRol.type,
								x: rol_padre.getChildAt(hijo_rol_nro).geometry.x,
								y: rol_padre.getChildAt(hijo_rol_nro).geometry.y
							} 
							model.objetivos.push(objetivo);
						}
					}
					model.roles.push(rol);
				} 
			}
			
            model.unidades.push(unidadOrganizacional);
        }
    }
	//getChildCount (para iterar); getChildAt(saca con un indice)

	for (let index = 0; index < selection.length; index++){
		if(selection[index].value.type == "Influencia"){
			if(selection[index].geometry.points != null){
				var geometryPoints = []
				for (let a = 0; a < selection[index].geometry.points.length; a++) {
					geometryPoints[a] = selection[index].geometry.points[a];
				}
				var influencia = {
					unique: selection[index].id,
					identifier: selection[index].value.identifier,
					name: selection[index].value.name,
					type: selection[index].value.type,
					source: selection[index].source.id,
                    target: selection[index].target.id,
                    "points": geometryPoints
				}
				model.influencias.push(influencia);
			} else {
				var influencia = {
					unique: selection[index].id,
                    identifier: selection[index].value.identifier,
                    name: selection[index].value.name,
                    type: selection[index].value.type,
                    source: selection[index].source.id,
                    target: selection[index].target.id
				}
				model.influencias.push(influencia);
			}
		}
	}


	console.log("Modelo JSON...", model);

    var modelString = JSON.stringify(model, null, 4);    
    return modelString;
	

}*/

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
	  
		// You can also copy the xmlString to clipboard here if needed
	  }
	/*function exportGraphToXml() {
		var model = graph.getModel();
		var encoder = new mxCodec();
		var xml = encoder.encode(model);
		var xmlString = mxUtils.getXml(xml);
	  
		// Format the XML using vkbeautify
		var formattedXml = vkbeautify.xml(xmlString);
	  
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
		  text: formattedXml, // Display the formatted XML
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
			  swal("Copied", "The model has been copied to the clipboard", "success", {
				className: 'view-model-normal',
			  });
			  copyClipboard(formattedXml);
			  break;
			case "close":
			  break;
		  }
		});
	  
		window.scrollTo(0, 0);
	  }*/
  
  // Assuming exportJSONbtn is your button
  var exportJSONbtn = document.body.appendChild(mxUtils.button('Exportar JSON', exportGraphToXml));
  
	exportJSONbtn.style.position = 'absolute';
	exportJSONbtn.style.top = '122px';
	exportJSONbtn.style.right = '4px';
	exportJSONbtn.style.width = '73px';
	exportJSONbtn.setAttribute("class", "button");

	/*let importJSONbtn = document.body.appendChild(mxUtils.button('Importar JSON', function()
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
					modelEntered.includes('"metas":')&&
					modelEntered.includes('"estartegias":')&&
					modelEntered.includes('"tacticas":')&&
					modelEntered.includes('"objetivos":') 
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
	}));*/
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
  var importJSONbtn = document.body.appendChild(mxUtils.button('Importar JSON', importGraphFromXml));
  
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