/*document.body.appendChild(mxUtils.button('Export SVG', function()
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
					new mxXmlRequest('/Echo', 'filename=export.svg&format=svg' + '&xml=' + xml).simulate(document, '_blank');
				}));
				
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
					
					new mxXmlRequest('/Export', 'filename=export.' + format + '&format=' + format +
	        			bg + '&w=' + w + '&h=' + h + '&xml=' + encodeURIComponent(xml)).
	        			simulate(document, '_blank');
				}
				
				// Exporting to bitmap using ExportServlet
				document.body.appendChild(mxUtils.button('Export PNG', function()
				{
					exportFile('png');
				}));
				
				// Exporting to PDF using ExportServlet
				document.body.appendChild(mxUtils.button('Export PDF', function()
				{
					exportFile('pdf');
				}));
			}
		};*/