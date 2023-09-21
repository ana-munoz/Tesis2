import morphLayout from "./morphLayout";

function autoLayout(graph){
    
    mxEvent.addListener(document, 'keydown', function(evt){
        if (evt.keyCode == '76' ) {   
            doAutoLayout(graph);                   
        }
    });

    function doAutoLayout(graph){
        console.log('AUTOLAYOUT');
            
        graph.gridSize = 40; //size of each in the auto layout
        
        let parent = graph.getDefaultParent();
        let layout = new mxFastOrganicLayout(graph);
        //layout.radius = 75;
        layout.forceConstant = 75;


        graph.getModel().beginUpdate();
        try
            {
                layout.execute(parent);
                
            }
        catch (e)
        {
            throw e;
        }
        finally
        {
            
            // Default values are 6, 1.5, 20
            var morph = new mxMorphing(graph, 10, 1.7, 20);
            morph.startAnimation();
            morph.addListener(mxEvent.DONE, function()
                {
                    graph.getModel().endUpdate();
                });
            graph.updateSelection();
            }
        //morphLayout(graph, layout, parent);
        
        }
    }
export default autoLayout;