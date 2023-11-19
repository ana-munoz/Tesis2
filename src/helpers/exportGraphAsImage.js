import axios from "axios";
import swal from "sweetalert";

function exportModelJson(graph){
	graph.selectAll();
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
				}
				/* DESDE AQUÍ SE ITERA SOBRE LOS CONSTRUCTOS ANIDADOS DENTRO DE UNO O MÁS ROLES */
				if(unidad.getChildAt(hijo_nro).value.type == "Rol") {
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
	

}

function exportGraphAsImage(graph){


	let exportSvgBtn = document.body.appendChild(mxUtils.button('Exportar SVG', function()
	{
		var background = '#ffffff';
		var scale = 1;
		var border = 1;
		
		var imgExport = new mxImageExport();
		var bounds = graph.getGraphBounds();
		var vs = graph.view.scale;

		// Prepares SVG document that holds the output
		var svgDoc = mxUtils.createXmlDocument();
		var root = (svgDoc.createElementNS != null) ?
				svgDoc.createElementNS(mxConstants.NS_SVG, 'svg') : svgDoc.createElement('svg');
		
		if (background != null)
		{
			if (root.style != null)
			{
				root.style.backgroundColor = background;
			}
			else
			{
				root.setAttribute('style', 'background-color:' + background);
			}
		}
		
		if (svgDoc.createElementNS == null)
		{
			root.setAttribute('xmlns', mxConstants.NS_SVG);
			root.setAttribute('xmlns:xlink', mxConstants.NS_XLINK);
		}
		else
		{
			// KNOWN: Ignored in IE9-11, adds namespace for each image element instead. No workaround.
			root.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', mxConstants.NS_XLINK);
		}
		
		root.setAttribute('width', (Math.ceil(bounds.width * scale / vs) + 2 * border) + 'px');
		root.setAttribute('height', (Math.ceil(bounds.height * scale / vs) + 2 * border) + 'px');
		root.setAttribute('version', '1.1');
		
		// Adds group for anti-aliasing via transform
		var group = (svgDoc.createElementNS != null) ?
				svgDoc.createElementNS(mxConstants.NS_SVG, 'g') : svgDoc.createElement('g');
		group.setAttribute('transform', 'translate(0.5,0.5)');
		root.appendChild(group);
		svgDoc.appendChild(root);

		// Renders graph. Offset will be multiplied with state's scale when painting state.
		var svgCanvas = new mxSvgCanvas2D(group);
		svgCanvas.translate(Math.floor((border / scale - bounds.x) / vs), Math.floor((border / scale - bounds.y) / vs));
		svgCanvas.scale(scale / vs);

		// Displayed if a viewer does not support foreignObjects (which is needed to HTML output)
		svgCanvas.foAltText = '[Not supported by viewer]';
		imgExport.drawState(graph.getView().getState(graph.model.root), svgCanvas);

		var xml = encodeURIComponent(mxUtils.getXml(root));
		new mxXmlRequest('http://localhost:8080/echo', 'filename=export.svg&format=svg' + '&xml=' + xml).simulate(document, '_blank');
	}));
	exportSvgBtn.style.position = 'absolute';
	exportSvgBtn.style.top = '80px';
	exportSvgBtn.style.right = '4px';
	exportSvgBtn.style.width = '73px';
	exportSvgBtn.setAttribute("class", "button");

	let exportJSONbtn = document.body.appendChild(mxUtils.button('Exportar JSON', function() {
		console.log("exportando JSON...");
		var modelString = exportModelJson(graph);

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
	exportJSONbtn.style.top = '200px';
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
	}));



	importJSONbtn.style.position = 'absolute';
	importJSONbtn.style.top = '240px';
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


	
	function exportFile(format)
	{
		var bg = '#ffffff';
		var scale = 1;
		var b = 1;
		
		var imgExport = new mxImageExport();
		var bounds = graph.getGraphBounds();
		var vs = graph.view.scale;
		
		// New image export
		var xmlDoc = mxUtils.createXmlDocument();
		var root = xmlDoc.createElement('output');
		xmlDoc.appendChild(root);
		
		// Renders graph. Offset will be multiplied with state's scale when painting state.
		var xmlCanvas = new mxXmlCanvas2D(root);
		xmlCanvas.translate(Math.floor((b / scale - bounds.x) / vs), Math.floor((b / scale - bounds.y) / vs));
		xmlCanvas.scale(scale / vs);
		
		imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);

		// Puts request data together
		var w = Math.ceil(bounds.width * scale / vs + 2 * b);
		var h = Math.ceil(bounds.height * scale / vs + 2 * b);
		
		var xml = mxUtils.getXml(root);
			
		if (bg != null)
		{
			bg = '&bg=' + bg;
		}
		
		new mxXmlRequest('http://localhost:8080/export', 'filename=export.' + format + '&format=' + format +
			bg + '&w=' + w + '&h=' + h + '&xml=' + encodeURIComponent(xml)).
			simulate(document, '_blank');
	}
	
	// Exporting to bitmap using ExportServlet
	let exportPngBtn = document.body.appendChild(mxUtils.button('Exportar PNG', function()
	{
		exportFile('png');
	}));
	exportPngBtn.style.position = 'absolute';
	exportPngBtn.style.top = '120px';
	exportPngBtn.style.right = '4px';
	exportPngBtn.style.width = '73px';
	exportPngBtn.setAttribute("class", "button");
	

} 

export default exportGraphAsImage;