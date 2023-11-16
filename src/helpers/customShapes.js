function customShapes(utils, cylinder, cellRenderer){
    function StrategyShape()
    {
        cylinder.call(this);
    }

    function TacticShape()
    {
        cylinder.call(this);
    }
    
    function GoalShape()
    {
        cylinder.call(this);
    }

    function ObjShape()
    {
        cylinder.call(this);
    }
    
    function ActorShape()
    {
        cylinder.call(this);
    }
    
    
    function AgentShape()
    {
        cylinder.call(this);
    }
    
    function RoleShape()
    {
        cylinder.call(this);
    }
    
    
    //StrategyShape
    utils.extend(StrategyShape, cylinder);
    
    StrategyShape.prototype.redrawPath = function(path, x, y, w, h, isForeground){
        
    
        x=60;
        y=40;  
        path.moveTo(x-50,y);
        path.lineTo(x+50,y);  //-
        path.lineTo(x+60,y-20); //\    
        path.lineTo(x+50,y-40); // /
        path.lineTo(x-50,y-40); // _
        path.lineTo(x-60,y-20); // \
        path.lineTo(x-50,y); // /
        path.close();
   
    }; 
   
    cellRenderer.registerShape('strategyShape', StrategyShape);

    //TacticShape
    utils.extend(TacticShape, cylinder);
    
    TacticShape.prototype.redrawPath = function(path2, x2, y2, w2, h2, isForeground){
        
    
        x2=60;
        y2=40;  
        path2.moveTo(x2-50,y2);
        path2.lineTo(x2+50,y2);  //-
        path2.lineTo(x2+60,y2-20); //\    
        path2.lineTo(x2+50,y2-40); // /
        path2.lineTo(x2-50,y2-40); // _
        path2.lineTo(x2-60,y2-20); // \
        path2.lineTo(x2-50,y2); // /
        
        path2.lineTo(x2-50,y2-40); // | left
        
        path2.moveTo(x2+50,y2);
        path2.lineTo(x2+50,y2-40)
        path2.close();
   
    }; 
   
    cellRenderer.registerShape('tacticShape', TacticShape);

    //Goal Shape
    utils.extend(GoalShape, cylinder);
   
    GoalShape.prototype.redrawPath = function(path1, x1, y1, w1, h1, isForeground){
        
        x1=60;
        y1=40;        
        path1.moveTo(x1-40,y1);
        path1.lineTo(x1+40,y1);  //-
        path1.quadTo(x1+60,y1,x1+60,y1-19); //\       
        path1.lineTo(x1+60,y1-21);  //|
        path1.quadTo(x1+60,y1-40,x1+40,y1-40);// /
        path1.lineTo(x1-40,y1-40); // _
        path1.quadTo(x1-60,y1-40,x1-60,y1-21);// \
        path1.lineTo(x1-60,y1-19);  //|
        path1.quadTo(x1-60,y1,x1-40,y1);//
        
       /*  path1.moveTo(x1-40, y1-40);
        path1.lineTo(x1-40, y1);
        path1.moveTo(x1+40, y1-40);
        path1.lineTo(x1+40, y1); */
        path1.close();
  
    }; 
    cellRenderer.registerShape('goalShape', GoalShape);
   
    //Objetivo Shape
    utils.extend(ObjShape, cylinder);

    ObjShape.prototype.redrawPath = function(path3, x3, y3, w3, h3, isForeground){
        
        x3=60;
        y3=40;        
        path3.moveTo(x3-40,y3);
        path3.lineTo(x3+40,y3);  //-
        path3.quadTo(x3+60,y3,x3+60,y3-19); //\       
        path3.lineTo(x3+60,y3-21);  //|
        path3.quadTo(x3+60,y3-40,x3+40,y3-40);// /
        path3.lineTo(x3-40,y3-40); // _
        path3.quadTo(x3-60,y3-40,x3-60,y3-21);// \
        path3.lineTo(x3-60,y3-19);  //|
        path3.quadTo(x3-60,y3,x3-40,y3);//
        
        path3.moveTo(x3-40, y3-40);
        path3.lineTo(x3-40, y3);
        path3.moveTo(x3+40, y3-40);
        path3.lineTo(x3+40, y3);
        path3.close();
    
    }; 
    cellRenderer.registerShape('objShape', ObjShape);

    //Agent Shape
    utils.extend(AgentShape, cylinder);
    
    AgentShape.prototype.redrawPath = function(n1, x,y,w,h, isForeground)
    {

        if(!isForeground){

            n1.moveTo(75,37);
            n1.arcTo(37,37, 0,1,1,0,37);
            n1.arcTo(-37,37, 0,1,1,75,37);
            
            n1.moveTo(5,20);
            n1.lineTo(70,20);
            
        /* }
        //foreground
        else {
        n1.moveTo(37,0);
        n1.lineTo(37,-100);
        n1.lineTo(200,-100);
        
        n1.lineTo(200,200);
        n1.moveTo(37,74);
        n1.lineTo(37,200);
        n1.moveTo(200,200);
        n1.lineTo(37,200); */
        

        n1.close();
        }
    };

    cellRenderer.registerShape('agentShape', AgentShape);

   
//Role Shape
utils.extend(RoleShape, cylinder);
    
RoleShape.prototype.redrawPath = function(c, x, y, w, h, isForeground){
{
        if (!isForeground){
        /*c.moveTo(36,0);
        c.arcTo(13,13, 0,1,1,-36,0);
        c.arcTo(-13,13, 0,1,1,36,0);
        */

        c.moveTo(75,37);
        c.arcTo(37,37, 0,1,1,0,37);
        c.arcTo(-37,37, 0,1,1,75,37);
        
        c.moveTo(72,50);
        c.arcTo(72,50, 0,0,1,3,50);
        } 
    }
};

cellRenderer.registerShape('roleShape', RoleShape);

//Actor
utils.extend(ActorShape, cylinder);
    
ActorShape.prototype.redrawPath = function(c, x, y, w, h){

        
        c.moveTo(75,37);
        c.arcTo(37,37, 0,1,1,0,37);
        c.arcTo(-37,37, 0,1,1,75,37);
        
    };

cellRenderer.registerShape('actorShape', ActorShape);


}
export default customShapes