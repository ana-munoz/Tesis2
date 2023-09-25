function zoom(graph){

    mxGraph.prototype.zoomFactor = 1.2;

    var min = 2;
    var max = 2;
    
    let buttonZoomIn = document.body.appendChild(mxUtils.button('Zoom In', function()
    {   
        if(min >= 1)
        {
            graph.zoomIn();
            min = min - 1;
            max = max + 1;
            buttonZoomOut.style.cursor = 'pointer';
        }
        if(min == 0){
            buttonZoomIn.style.cursor = 'not-allowed';
        }
    }));	
    
    buttonZoomIn.style.position = 'absolute';    
    buttonZoomIn.style.top = '27px';
    buttonZoomIn.style.right = '4px';
    buttonZoomIn.style.width = '73px';
    buttonZoomIn.setAttribute("class", "button");

    let buttonZoomOut = document.body.appendChild(mxUtils.button('Zoom Out', function()
    {        
        if(max >= 1)
        {
            graph.zoomOut();
            max = max - 1;
            min = min +1;
            buttonZoomIn.style.cursor = 'pointer';
        }
        if(max == 0){
            buttonZoomOut.style.cursor = 'not-allowed';
        }
    }));	
    
    buttonZoomOut.style.position = 'absolute';    
    buttonZoomOut.style.top = '50px';
    buttonZoomOut.style.right = '4px';
    buttonZoomOut.style.width = '73px';
    buttonZoomOut.setAttribute("class", "button");

}
export default zoom;