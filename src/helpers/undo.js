function undo(graph)
{
    //sets undo manager and listeners 
    var undoManager = new mxUndoManager();
    var listener = function(sender, evt)
    {
        undoManager.undoableEditHappened(evt.getProperty('edit'));
    };
    graph.getModel().addListener(mxEvent.UNDO, listener);
    graph.getView().addListener(mxEvent.UNDO, listener);

    //Undo listener  for keypress "z"
    mxEvent.addListener(document, 'keydown', function(evt){
        if (evt.keyCode == '90' ) {   
            undoManager.undo();                   
        }
    });

    //Redo listener for keypress "z"
    mxEvent.addListener(document, 'keydown', function(evt){
        if (evt.keyCode == '89' ) {   
            undoManager.redo();                   
        }
    });
};
export default undo;
