<template>
    <div>
        <!-- div for navigation bar-->
        <!--
        <div id="navbar">
            <nav-bar/>
        </div>
        -->
        <!-- div for side bar-->
        <div id="sidebar">
            <div id="panelTitle"
                style="height: 30px;font-family: Arial, Helvetica, sans-serif; color: #ffffff;vertical-align:baseline;">
                <p>Lite*</p>
            </div>
            <div id="icons">
            </div>
            <div id="hotKeys"
                style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: #C0C0C0;vertical-align:baseline;">
                <i class="fas fa-th" aria-hidden="true"></i>
                <strong>HotKeys</strong>
                <p>Delete: backspace</p>
                <p>Cut: ctrl/cmd + x</p>
                <p>Copy: ctrl/cmd + c</p>
                <p>Paste: ctrl/cmd + v</p>
                <p></p>
                <p>Undo: z</p>
                <p>Redo: y</p>
                <p></p>
                <p>Auto-Layout: L</p>
            </div>
            <!-- div for modeller-->
        </div>
        <div id="container" style="background-color:#000000;">

        </div>

        <!-- <EditForm ref="form" @change="changeObjectValues" :cell-data="currentCell"/> -->
    </div>
</template>

<script src="/YOUR_PATH/global.js" type="text/javascript"></script>


<script>
    import mxgraph from 'mxgraph';
    //import NavBar from "./NavBar";
    //import SideBar from "./SideBar";
    import EditForm from "./EditForm";
    import clipboardInit from "../helpers/clipboard";
    import undo from "../helpers/undo";
    import autoLayout from "../helpers/autoLayout";
    import childAutoLayout from "../helpers/childAutoLayout";
    import morphLayout from "../helpers/childAutoLayout";
    import customShapes from "../helpers/customShapes";
    import zoom from "../helpers/zoom";
    import exportGraphAsImage from "../helpers/exportGraphAsImage";
    //import loadModels from "../models/models";


//*****INITILIZE MXGRAPH******

// if you plan to use the built-in interfaces, you need to specify the path to the resources
    const graphConfig = {
        mxBasePath: '/mx/', //Specifies the path in mxClient.basePath.
        mxImageBasePath: '/mx/images', // Specifies the path in mxClient.imageBasePath.
        mxLanguage: 'en', // Specifies the language for resources in mxClient.language.
        mxDefaultLanguage: 'en', // Specifies the default language in mxClient.defaultLanguage.
        //mxLoadResources: false, // Specifies if any resources should be loaded.  Default is true.
        //mxLoadStylesheets: true, // Specifies if any stylesheets should be loaded.  Default is true
    };

    const {
        mxClient, mxUtils, mxEvent, mxEditor, mxRectangle, mxActor, mxGraph, mxGeometry, mxCell,
        mxImage, mxDivResizer, mxObjectCodec, mxCodecRegistry, mxConnectionHandler,
         mxClipboard, mxRubberband, mxGraphModel,  mxCodec, mxConstants,mxUndoManager, mxMorphing, 
         mxFastOrganicLayout, mxDragSource, mxCellTracker, mxGraphView, mxCircleLayout, 
         mxLayoutManager, mxEllipse, mxHierarchicalLayout,  mxCylinder, mxCellRenderer, mxImageExport,
         mxSvgCanvas2D, mxXmlRequest, mxXmlCanvas2D, mxPrintPreview

    } = mxgraph(graphConfig);

// Golbal Access for mxGraph objetcs
    window.mxClient = mxClient;
    window.mxUtils = mxUtils;
    window.mxActor = mxActor;
    window.mxRectangle = mxRectangle;
    window.mxGraph = mxGraph;
    window.mxEvent = mxEvent;
    window.mxGeometry = mxGeometry;
    window.mxCell = mxCell;
    window.mxImage = mxImage;
    window.mxEditor = mxEditor;
    window.mxDivResizer = mxDivResizer;
    window.mxObjectCodec = mxObjectCodec;
    window.mxCodecRegistry = mxCodecRegistry;
    window.mxConnectionHandler = mxConnectionHandler;
    window.mxClipboard = mxClipboard;
    window.mxRubberband = mxRubberband;
    window.mxGraphModel = mxGraphModel;
    window.mxCodec = mxCodec;
    window.mxConstants= mxConstants;
    window.mxUndoManager= mxUndoManager;
    window.mxMorphing= mxMorphing;
    window.mxFastOrganicLayout= mxFastOrganicLayout;
    window.mxDragSource= mxDragSource;
    window.mxCellTracker= mxCellTracker;
    window.mxGraphView= mxGraphView;
    window.mxCircleLayout= mxCircleLayout;
    window.mxLayoutManager= mxLayoutManager;
    window.mxEllipse = mxEllipse;
    window.mxHierarchicalLayout = mxHierarchicalLayout;
    window.mxCylinder = mxCylinder;
    window.mxCellRenderer = mxCellRenderer;
    window.mxImageExport = mxImageExport;
    window.mxSvgCanvas2D = mxSvgCanvas2D;
    window.mxXmlRequest = mxXmlRequest;
    window.mxXmlCanvas2D = mxXmlCanvas2D;
    window.mxPrintPreview = mxPrintPreview;
      
    //Main Editor
    var editor;
    var sourceCell;
    //celltracker
    var cellTracker;

    //cells selection color
    mxConstants.HANDLE_FILLCOLOR = '#99ccff';
	mxConstants.HANDLE_STROKECOLOR = '#0088cf';
    mxConstants.VERTEX_SELECTION_COLOR = '#00a8ff';

    //load Models
    // CustomUserObject
    window.CustomUserObject = function (name, type) {
    this.name = name || 'New Name';
    this.type = type || '<<New Type>>';
    this.clone = function () {
        return mxUtils.clone(this);
    };
};
// Prototype values for new objects
// CustomActorObject (Vertex)
    window.CustomActorObject = function (name, type) {
            this.name = name || 'Actor';
            this.type = type || '<<Actor>>';
            this.customShape = 'actorShape';
            this.width = '75';
            this.height = '75';
            this.clone = function () {
                return mxUtils.clone(this);
            };
        };
// CustomAgentObject (Vertex)
    window.CustomAgentObject = function (name, type) {
            this.name = name || 'Unidad Organizacional';
            this.type = type || '<<Agent>>';
            this.customShape = 'agentShape';
            this.width = '75';
            this.height = '75';
            this.clone = function () {
                return mxUtils.clone(this);
            };
        };
    // CustomRoleObject (Vertex)
    window.CustomRoleObject = function (name, type) {
            this.name = name || 'Rol';
            this.type = type || '<<Role>>';
            this.customShape = 'roleShape';
            this.width = '75';
            this.height = '75';
            this.clone = function () {
                return mxUtils.clone(this);
            };
        };
    
    //CustomGoalObject (Vertex)
    window.CustomGoalObject = function (name, type) {
                this.name = name || 'Meta';
                this.type = type || '<<Goal>>';
                this.customShape = 'goalShape';
                this.width = '120';
                this.height = '40';
                this.clone = function () {
                    return mxUtils.clone(this);
                };
            };

    //CustomStrategyObject (Vertex)
    window.CustomStrategyObject = function (name, type) {
                this.name = name || 'Estrategia';
                this.type = type || '<<Strategy>>';
                this.customShape = 'strategyShape';
                this.width = '120';
                this.height = '40';
                this.clone = function () {
                    return mxUtils.clone(this);
                };
            };
    //CustomTacticObject (Vertex)
    window.CustomTacticObject = function (name, type) {
                this.name = name || 'Tactica';
                this.type = type || '<<Tactic>>';
                this.customShape = 'tacticShape';
                this.width = '120';
                this.height = '40';
                this.clone = function () {
                    return mxUtils.clone(this);
                };
            };

    window.CustomObjObject = function (name, type) {
                this.name = name || 'Objetivo';
                this.type = type || '<<Objective>>';
                this.customShape = 'objShape';
                this.width = '120';
                this.height = '40';
                this.clone = function () {
                    return mxUtils.clone(this);
                }
    }
            
    //CustomInfluenceObject (edge)
    window.CustomInfluenceObject = function (name, type, removeSelection) {
                this.name = name || 'Nueva Influencia';
                this.type = type || '<<Influencia>>';
                this.customShape = 'influenceShape';
                this.removeSelection = removeSelection || 0;
                this.clone = function () {
                    return mxUtils.clone(this);
                };
            };
    //CustomRefinObject (edge)

    window.CustomRefinObject = function (name, type, removeSelection) {
        this.name = name || 'Nuevo Refinamiento';
        this.type = type || '<<Refinamiento>>';
        this.customShape = 'refinShape';
        this.removeSelection = removeSelection || 0;
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };


    //VUE component
    export default {
        name: 'graph-wrapper',
        components: {EditForm},
        data() {
            return {
                currentCell: null,
                parentcell: null,
            }
        },
        methods: {
        
        //*********EDIT VALUES IN VUE FORM METHODS************
            // change selected in a separate panel
            // transfer the object to the VUE environment
            selectionChanged() {
                let cell = editor.graph.getSelectionCell();
                this.$set(this, 'currentCell', cell);
                this.$set(this, 'parentcell', editor.graph.getModel().getParent(cell));
            },
        
            
            // return the updated value to the mxGraph environment
            changeObjectValues(newCellValue) {
                editor.graph.model.setValue(this.currentCell, newCellValue);
            },
        
        
        
        //** SIDEBAR */

            // add sidebar elements            
            addSidebarIcon: function (graph, sidebar, prototype) {
                
                
            /** SETTING DROP TARGET AS PARENT */
            
                graph.addMouseListener(
               {         
                    mouseMove: function(sender, me) { 
                        null
                    },
                    mouseDown: function(sender, me) {    
                            //detects selected cell thay coul be possibily dragged
                            let selectedCell = me.getCell();
                            
                            if (selectedCell != null){
                                let eventPoints = graph.getPointForEvent(me.evt);
                                let selectedCellX = selectedCell.geometry.x;
                                let selectedCellY = selectedCell.geometry.y;    

                            //if event & selection points are the same, the user is connecting, not dragging.
                                if (eventPoints.x != selectedCellX && eventPoints.y != selectedCellY){
                                    sourceCell = selectedCell;
                                }
                            }
                            
                    },
                    mouseUp: function(sender, me){   
                            //detects the target cell for drag&drop
                            var targetCell = me.getCell() ;
                            
                            //Dropping sourceCell on targetCell
                            /* if(sourceCell != null && targetCell != null && sourceCell.isEdge() == false ){
                                if(targetCell != sourceCell && targetCell != sourceCell.getParent()){
                                    if(targetCell.isVertex()){ 
                                        let model = graph.getModel();
                                                                             
                                        model.beginUpdate();
                                        //AQUÍ SE ARMA EL CONTAINER QUE PIERDE EL MONO Y HACE EL ANIDADO
                                        try{
                                            if(targetCell.getChildCount()<2){
                                                targetCell.style='shape=rectangle;fillColor=#ebf0f2;strokeColor=#33C9FA;resizable=0;opacity=50;verticalAlign=top;align=left;';
                                            }
                                        
                                            graph.addCell(sourceCell,targetCell);
                                            
                                            sourceCell.geometry.x = 200;
                                            sourceCell.geometry.y = 200;
                                            
                                            targetCell.geometry.width = 300;
                                            targetCell.geometry.height = 300;
                                        }
                                        finally{
                                            model.endUpdate();
                                            
                                        }
                                    
                                        graph.setSelectionCell(sourceCell);
                                        sourceCell = null;
                                        targetCell = null;
                                    }
                                }
                                
                            }  */   
                                      
                        }
                   }                
                );
          
    

                /** CALLBACK FOR NEW VERTEX*/
                let dragCallBackFunct = function (graph, evt, obj) {
                    
                    //prepares graph for editing
                    graph.stopEditing(false);
                    let model = graph.getModel();
                    


                    //Check if drop was on parent
                    let pt = graph.getPointForEvent(evt);
                    let newParent = null;
                    let parentx = pt.x;
                    let parenty = pt.y;

                    newParent = graph.getCellAt(parentx, parenty);

                    //Model update
                    model.beginUpdate();
                    
                    let v1 = model.cloneCell(prototype);
                    
                    try {
                        //Set properties for new cell
                        v1.setValue(obj);
                        v1.geometry.x = parseInt(pt.x);
                        v1.geometry.y = parseInt(pt.y);
                        v1.geometry.width = parseInt(obj.width);
                        v1.geometry.height = parseInt(obj.height);
                        v1.style='shape='+obj.customShape+';fillColor=#33C9FA;strokeColor=#000000;strokeWidth=3;resizable=0;'; //Al hacer resizable esto en verdad solo lo hace con el texto
                        //v1.geometry.alternateBounds = new mxRectangle(0, 0, 300, 300);
                       
                       //Set child to parent and parent's styles
                       if(newParent!=null && newParent.isVertex()){
                                newParent.style='shape=rectangle;fillColor=#ebf0f2;strokeColor=#33C9FA;resizable=1;opacity=50;verticalAlign=top;align=left;spacingLeft=40;spacingTop=10;';
                                v1.geometry.relative=false;
                                v1.geometry.x = 200;// parseInt(pt.x);
                                v1.geometry.y = 200;//parseInt(pt.y);
                                //newParent.geometry.width = 200;
                                //newParent.geometry.height = 200;
                        }
                        else{
                            newParent = graph.getDefaultParent();                            
                        }
                        graph.addCell(v1, newParent);
                    } finally {
                        model.endUpdate();
                    }

                    graph.setSelectionCell(v1);
                };


                /** CALLBACK FOR SPECIFIC VERTEX*/
                //Passes type of node depending on dragged icon
                let dragActorCallBackFunct = function (graph, evt) {
                    let obj = new window.CustomActorObject();
                    dragCallBackFunct(graph, evt, obj);
                };

                let dragAgentCallBackFunct = function (graph, evt) {
                    let obj = new window.CustomAgentObject();
                    dragCallBackFunct(graph, evt, obj);
                };
                
                let dragRoleCallBackFunct = function (graph, evt) {
                    let obj = new window.CustomRoleObject();
                    dragCallBackFunct(graph, evt, obj);
                };

                let dragGoalCallBackFunct = function (graph, evt) {
                    let obj = new window.CustomGoalObject();
                    dragCallBackFunct(graph, evt, obj);
                };

                let dragStrategyCallBackFunct = function (graph, evt) {
                    let obj = new window.CustomStrategyObject();
                    dragCallBackFunct(graph, evt, obj);
                };

                let dragTacticCallBackFunct = function (graph, evt) {
                    let obj = new window.CustomTacticObject();
                    dragCallBackFunct(graph, evt, obj);
                }

                let dragObjCallBackFunct = function (graph, evt) {
                    let obj = new window.CustomObjObject();
                    dragCallBackFunct(graph, evt, obj);
                }

                /** SIDEBAR ICONS */
                    // Creates the image which is used as the sidebar icon (drag source)
                   // Role concept wrapper
                
                let sidebaricons = document.getElementById('icons');

                   // Actor concept wrapper
                let actorWrapper = document.createElement('div');
                actorWrapper.style.cursor = 'pointer';
                actorWrapper.style.margin = '10px';
                actorWrapper.style.width = '60px';
                actorWrapper.style.height = '60px';
                actorWrapper.style.textAlign = 'center';
                actorWrapper.style.display = 'flex';
                actorWrapper.style.flexWrap = 'wrap';
                actorWrapper.style.alignItems = 'center';
                actorWrapper.style.justifyContent = 'center';
                //actorWrapper.style.border = '1px dashed #C0C0C0';
                actorWrapper.innerHTML = '<div><img src='+mxImageBasePath +'/actor.png></div>';
                sidebaricons.appendChild(actorWrapper);  

                 // Agent concept wrapper
                let agentWrapper = document.createElement('div');
                agentWrapper.style.cursor = 'pointer';
                agentWrapper.style.margin = '10px';
                agentWrapper.style.width = '60px';
                agentWrapper.style.height = '60px';
                agentWrapper.style.textAlign = 'center';
                agentWrapper.style.display = 'flex';
                agentWrapper.style.flexWrap = 'wrap';
                agentWrapper.style.alignItems = 'center';
                agentWrapper.style.justifyContent = 'center';
                //agentWrapper.style.border = '1px dashed #C0C0C0';
                agentWrapper.innerHTML = '<div><img src='+mxImageBasePath +'/agent.png></div>';
                sidebaricons.appendChild(agentWrapper);

                let roleWrapper = document.createElement('div');
                roleWrapper.style.cursor = 'pointer';
                roleWrapper.style.margin = '10px';
                roleWrapper.style.width = '60px';
                roleWrapper.style.height = '60px';
                roleWrapper.style.textAlign = 'center';
                roleWrapper.style.display = 'flex';
                roleWrapper.style.flexWrap = 'wrap';
                roleWrapper.style.alignItems = 'center';
                roleWrapper.style.justifyContent = 'center';
                //roleWrapper.style.border = '1px dashed #C0C0C0';
                roleWrapper.innerHTML = '<div><img src='+mxImageBasePath +'/role.png></div>';
                sidebaricons.appendChild(roleWrapper);
                
                let goalWrapper = document.createElement('div');
                goalWrapper.style.cursor = 'pointer';
                goalWrapper.style.margin = '10px';
                goalWrapper.style.width = '60px';
                goalWrapper.style.height = '60px';
                goalWrapper.style.textAlign = 'center';
                goalWrapper.style.display = 'flex';
                goalWrapper.style.flexWrap = 'wrap';
                goalWrapper.style.alignItems = 'center';
                goalWrapper.style.justifyContent = 'center';
                //goalWrapper.style.border = '1px dashed #C0C0C0';
                goalWrapper.innerHTML = '<div><img src='+mxImageBasePath +'/goal.png></div>';
                sidebaricons.appendChild(goalWrapper);
                
                let strategyWrapper = document.createElement('div');
                strategyWrapper.style.cursor = 'pointer';
                strategyWrapper.style.margin = '10px';
                strategyWrapper.style.width = '60px';
                strategyWrapper.style.height = '60px';
                strategyWrapper.style.textAlign = 'center';
                strategyWrapper.style.display = 'flex';
                strategyWrapper.style.flexWrap = 'wrap';
                strategyWrapper.style.alignItems = 'center';
                strategyWrapper.style.justifyContent = 'center';
                //strategyWrapper.style.border = '1px dashed #C0C0C0';
                strategyWrapper.innerHTML = '<div><img src='+mxImageBasePath +'/strategy.png></div>';
                sidebaricons.appendChild(strategyWrapper);

                let tacticWrapper = document.createElement('div');
                tacticWrapper.style.cursor = 'pointer';
                tacticWrapper.style.margin = '10px';
                tacticWrapper.style.width = '60px';
                tacticWrapper.style.height = '60px';
                tacticWrapper.style.textAlign = 'center';
                tacticWrapper.style.display = 'flex';
                tacticWrapper.style.flexWrap = 'wrap';
                tacticWrapper.style.alignItems = 'center';
                tacticWrapper.style.justifyContent = 'center';
                //strategyWrapper.style.border = '1px dashed #C0C0C0';
                tacticWrapper.innerHTML = '<div><img src='+mxImageBasePath +'/tactica.png></div>';
                sidebaricons.appendChild(tacticWrapper);

                let objWrapper = document.createElement('div');
                objWrapper.style.cursor = 'pointer';
                objWrapper.style.margin = '10px';
                objWrapper.style.width = '60px';
                objWrapper.style.height = '60px';
                objWrapper.style.textAlign = 'center';
                objWrapper.style.display = 'flex';
                objWrapper.style.flexWrap = 'wrap';
                objWrapper.style.alignItems = 'center';
                objWrapper.style.justifyContent = 'center';
                //strategyWrapper.style.border = '1px dashed #C0C0C0';
                objWrapper.innerHTML = '<div><img src='+mxImageBasePath +'/objetivo.png></div>';
                sidebaricons.appendChild(objWrapper);

                // Creates the image which is used as the drag icon (preview)
                let dragImageActor = actorWrapper.cloneNode(true);
                let dragImageAgent = agentWrapper.cloneNode(true);
                let dragImageRole = roleWrapper.cloneNode(true);
                let dragImageGoal = goalWrapper.cloneNode(true);
                let dragImageStrategy = strategyWrapper.cloneNode(true);
                let dragImageTactic = tacticWrapper.cloneNode(true);
                let dragImageObj = objWrapper.cloneNode(true);


                // Makes  the sidebar icons dragable
                mxUtils.makeDraggable(actorWrapper, graph, dragActorCallBackFunct, dragImageActor);
                mxUtils.makeDraggable(agentWrapper, graph, dragAgentCallBackFunct, dragImageAgent);
                mxUtils.makeDraggable(roleWrapper, graph, dragRoleCallBackFunct, dragImageRole);
                mxUtils.makeDraggable(goalWrapper, graph, dragGoalCallBackFunct, dragImageGoal);
                mxUtils.makeDraggable(strategyWrapper, graph, dragStrategyCallBackFunct, dragImageStrategy);
                mxUtils.makeDraggable(tacticWrapper, graph, dragTacticCallBackFunct, dragImageTactic);
                mxUtils.makeDraggable(objWrapper, graph, dragObjCallBackFunct, dragImageObj);
            },
            
            
            // create and configure the model editor
            createGraph() {
                // Checks if the browser is supported
                if (!mxClient.isBrowserSupported()) {
                    // Displays an error message if the browser is not supported.
                    mxUtils.error('Browser is not supported!', 200, false);
                } else {
                                        
                    //STYLES FOR EDITOR CONTAINER
                    let container = document.getElementById('container');
                    container.style.position = 'absolute';
                    container.style.overflow = 'no-scroll';
                    container.style.left = '100px';
                    container.style.top = '0px';
                    container.style.right = '0px';
                    container.style.bottom = '0px';
                    container.style.width = 'auto';
                    container.style.height = 'auto';
                    container.style.background = `url("${require('../assets/grid.gif')}")`;

                    //STYLES FOR SIDEBAR CONTAINER   --- OLD                    
                    let sidebar = document.getElementById('sidebar');
                    sidebar.style.position = 'absolute';
                    sidebar.style.overflow = 'hidden';
                    sidebar.style.padding = '0px';
                    sidebar.style.left = '0px';
                    sidebar.style.top = '0px';
                    sidebar.style.width = '100px';
                    sidebar.style.bottom = '0px';
                    sidebar.style.display = 'flex';
                    sidebar.style.flexDirection = 'column';
                    sidebar.style.alignItems = 'center';
                    sidebar.style.justifyContent = 'center';
                    sidebar.style.backgroundColor = '#808080';
                    

                    /** JUST FOR IE */
                    if (mxClient.IS_QUIRKS) {
                        document.body.style.overflow = 'hidden';
                        new mxDivResizer(container);
                        new mxDivResizer(sidebar);
                    }


                    /** EDITOR CREATION AND CONFIG */
                    editor = new mxEditor();
                    editor.setGraphContainer(container);
                    cellTracker = new mxCellTracker(editor.graph, 'blue');
                    
                    mxGraphView.prototype.updateStyle = true;
                    
                    // global connection management
                    mxConnectionHandler.prototype.connectImage = new mxImage(mxImageBasePath +'/connector.png', 16, 16);
                    editor.graph.setConnectable(true);
                    editor.graph.setCellsDisconnectable(false);
                    editor.graph.setPanning(true);
                    editor.graph.setAllowDanglingEdges(false);

                    editor.graph.centerZoom = false;
                    editor.graph.setDropEnabled(true);
                    

                    //DRAG OFFSET
                    mxDragSource.prototype.dragOffset = 0;

                     
                    /* AQUÍ ES QUE SE DEFINE LA CAJA EN QUE SE COLAPSAN LOS ANIDADOS */
                    // Settings for grouping and folding
                    editor.graph.collapsedImage = new mxImage(mxImageBasePath +'/collapsed.png', 18, 16);
                    editor.graph.expandedImage = new mxImage(mxImageBasePath +'/expanded.png', 16, 16);
                    editor.graph.collapseToPreferredSize = true;
                    editor.graph.constrainChildren = true;
                    editor.graph.extendParentsOnAdd = true;
                    editor.graph.extendParents = true; //Extend parents size
                    editor.graph.setExtendParentsOnMove = true; 




                    /** LISTENER FOR NEW EDGES */
                    editor.graph.connectionHandler.addListener(mxEvent.CONNECT, function(sender, evt)
                    {
                        //console.log('flecha', evt.getProperty('cell'));
                        //console.log('origen', evt.getProperty('cell').source.getValue('type'));
                        //console.log('destino', evt.getProperty('cell').target.getValue('type'));
                        //editor.graph.stopEditing(true);
                        //sourceCell = null;
                        var edge = evt.getProperty('cell');
                        let edgevalue = new window.CustomInfluenceObject();
                        edge.value=edgevalue;

                         //DESDE ACTOR A UNIDAD ORGANIZACIONAL
                        if ((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Actor")) 
                        && (Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Unidad Organizacional")))
                        {
                            edgevalue.removeSelection = 0;
                            edge.style='curved=1;edgeStyle=segmentEdgeStyle;strokeWidth=3;strokeColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;fontColor=#000000;verticalLabelPosition=top;';
                            console.log("conectando actor a org");
                        } //IMPEDIR CONEXIONES DESDE ACTOR A CUALQUIER COSA
                        else if ((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Actor")) 
                        && !(Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Unidad Organizacional"))) {
                            console.log("conexion no validaaaa")
                            edgevalue.removeSelection = 1;
                            //edge.style='null';
                            editor.graph.getModel().remove(edge);
                        }
                        
                        //IMPEDIR CONEXIONES DESDE ORGANIZACION O ROL HACIA CUALQUIER COSA
                        if((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Unidad Organizacional"))
                        || (Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Rol")))
                        {
                            edgevalue.removeSelection = 1;
                            editor.graph.getModel().remove(edge);
                            console.log("conexion desde org no valida");
                        }


                        //DESDE GOAL A ESTRATEGIA, ESTRATEGIA A TACTICA, TACTICA A OBJETIVO
                        if (((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Meta"))
                        &&((Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Estrategia"))))
                        ||(((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Estrategia")))
                        &&((Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Tactica"))))
                        ||(((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Tactica")))
                        &&((Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Objetivo")))))
                        {
                            var edgeRef = evt.getProperty('cell');
                            let edgeRefValue = new window.CustomRefinObject();
                            edgeRef.value=edgeRefValue;
                            edgeRef.style='curved=1;edgeStyle=segmentEdgeStyle;strokeWidth=3;strokeColor=#000000;labelBackgroundColor=#ffffff;labelBorderColor=#000000;fontColor=#000000;verticalLabelPosition=top;dashed=1';
                            console.log("conexion valida");
                        }
                        
                        //REMOVER DESDE OBJETIVO A TACTICA, TACTICA A ESTRATEGIA, ESTRATEGIA A META
                        else if( ((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Meta"))
                        && !(Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Estrategia")))
                        || ((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Estrategia"))
                        && !(Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Tactica")))
                        || ((Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Tactica"))
                        && !(Object.values(evt.getProperty('cell').target.getValue(Object)).includes("Objetivo")))
                        || (Object.values(evt.getProperty('cell').source.getValue(Object)).includes("Objetivo"))
                        )
                        {
                            var edgeRef = evt.getProperty('cell');
                            let edgeRefValue = new window.CustomRefinObject();
                            edgeRef.value=edgeRefValue;
                            console.log("no se puede conectar un objetivo a tactica")
                            edgeRefValue.removeSelection = 1;
                            editor.graph.getModel().remove(edgeRef);
                        }

                    });
                    
                    // CHANGE CELLS VALUES IN A EDITOR
                    
                    editor.graph.getSelectionModel().addListener(mxEvent.CHANGE, () => { 
                        this.selectionChanged();
                    });
                    this.selectionChanged();
                    
                    // Fields are dynamically created HTML labels
                    editor.graph.isHtmlLabel = function (cell) {
                        return !this.isSwimlane(cell) &&
                            !this.model.isEdge(cell);
                    };

                    // not editable
                    editor.graph.isCellEditable = function () { //tiene que ser editable porque sino no se puede cambiar el nombre del constructo
                        return false
                    };
                    
                    // Returns the name propertie of the user object for the label
                    editor.graph.convertValueToString = function (cell) {
                        if (cell.value != null && cell.value.name != null) {
                            return cell.value.name;
                            
                        }
                        return mxGraph.prototype.convertValueToString.apply(this, arguments); // "supercall"
                    };
                    

                    
                    // Creates a dynamic HTML label for properties
                    editor.graph.getLabel = function (cell) {
                        //console.log('getLabel ', cell);
                        if (cell && this.isHtmlLabel(cell) && cell.value) {
                            //TODO here is the html code for the contents of the Field
                            let label = '';
                            label += '<div style="width: 100%;display: flex; justify-content: flex-start; align-items: baseline">';            
                            label += '<div style="width: 100%;margin: 0px; font-weight: 600">' +
                                '<strong>' + mxUtils.htmlEntities(cell.value.name, false) + '</strong>' +
                                '</div>';
                            label += '</div>';
                            return label
                        }

                        return mxGraph.prototype.getLabel.apply(this, arguments); // "supercall"
                    };
                    
                    // Adds sidebar icons 
                    
                    let customObject = new window.CustomUserObject();

                    let object = new mxCell(customObject, new mxGeometry(0, 0,75, 75), '');
                    object.setVertex(true);
                    object.setConnectable(true);

                    this.addSidebarIcon(editor.graph, sidebar, object);

                

                    //Init cliboard: cut-copy-paste
                    clipboardInit(editor.graph);
                    
                    //Init cutomshapes
                    customShapes(mxUtils, mxCylinder, mxCellRenderer);
                    //Init undo:
                    undo(editor.graph);
                    //Init autolayout:
                    autoLayout(editor.graph);

                    //Init Zoom:
                    zoom(editor.graph);
                    
                    exportGraphAsImage(editor.graph);
            }
            },
        // settings
            init() {
                //////////////////////////////////////////
                // CUSTOM FIELDS CODES for export import
                //////////////////////////////////////////
                let codecCustomUserObject = new mxObjectCodec(new window.CustomUserObject());
                codecCustomUserObject.encode = function (enc, obj) {
                    let node = enc.document.createElement('CustomUserObject');
                    mxUtils.setTextContent(node, JSON.stringify(obj));

                    return node;
                };
                codecCustomUserObject.decode = function (dec, node) {
                    let obj = JSON.parse(mxUtils.getTextContent(node));
                    let beatyObj = new window.CustomUserObject();
                    obj = Object.assign(beatyObj, obj);
                    return obj;
                };
                mxCodecRegistry.register(codecCustomUserObject);

                this.createGraph();
            },
        },
        mounted() {
            this.init();
        }
    }
</script>
