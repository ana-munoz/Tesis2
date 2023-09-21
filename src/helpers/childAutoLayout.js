function childAutoLayout(graph, cell){
    
    // Enables crisp rendering of rectangles in SVG
    //mxConstants.ENTITY_SEGMENT = 20;
    
    // Allows droping a cell onto other cell

    // Disables global features
    
    graph.collapseToPreferredSize = false; //Specifies that the cell size should not be changed to the preferred size when a cell is first collapsed.  Default is true.
    graph.constrainChildren = false; //Childs are not constrained to their parents
    graph.cellsSelectable = false; //Childs are not selectable
    graph.extendParentsOnAdd = false; //Extend parents size
    graph.extendParents = false; //Extend parents size
    graph.border = 10; // NO SE

    


    // Sets global styles
    /*var style = graph.getStylesheet().getDefaultEdgeStyle();
    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
    style[mxConstants.STYLE_ROUNDED] = true;

    style = graph.getStylesheet().getDefaultVertexStyle();
    style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
    style[mxConstants.STYLE_SHAPE] = 'swimlane';
    style[mxConstants.STYLE_STARTSIZE] = 30;
    
    style = [];
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
    style[mxConstants.STYLE_STROKECOLOR] = 'none';
    style[mxConstants.STYLE_FILLCOLOR] = 'none';
    style[mxConstants.STYLE_FOLDABLE] = false;
    graph.getStylesheet().putCellStyle('column', style);
    */
    
    // Installs auto layout for all levels
    var layout = new mxCircleLayout(graph);
    layout.border = graph.border;
    var layoutMgr = new mxLayoutManager(graph);
    layoutMgr.getLayout = function(cell)
    {
        if (!cell.collapsed)
        {
            if (cell.parent != graph.model.root)
            {
                layout.resizeParent = true;
                layout.horizontal = false;
                layout.spacing = 1;
            }
            else
            {
                layout.resizeParent = true;
                layout.horizontal = true;
                layout.spacing = 1;
            }
            
            return layout;
        }
        
        return null;
    };
    
    // Resizes the container
    //graph.setResizeContainer(true);
				

    // Gets the default parent for inserting new cells. This
    // is normally the first child of the root (ie. layer 0).
// Adds cells to the model in a single step


}
export default childAutoLayout;