function morphLayout(graph, layout, cell){
    graph.getModel().beginUpdate();
            try
                {
                    layout.execute(cell);
                }
            catch (e)
            {
                throw e;
            }
            finally
            {
                
                // Default values are 6, 1.5, 20
                var morph = new mxMorphing(graph, 10, 1.7, 20);
                morph.addListener(mxEvent.DONE, function()
                {
                    graph.getModel().endUpdate();
                });
                morph.startAnimation();
                
                }
}
export default morphLayout