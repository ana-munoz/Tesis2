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
        this.name = name || 'New Actor';
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
        this.name = name || 'New Agent';
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
        this.name = name || 'New Role';
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
            this.name = name || 'New Goal';
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
            this.name = name || 'New Strategy';
            this.type = type || '<<Strategy>>';
            this.customShape = 'strategyShape';
            this.width = '120';
            this.height = '40';
            this.clone = function () {
                return mxUtils.clone(this);
            };
        };

            
    //CustomInfluenceObject (edge)
window.CustomInfluenceObject = function (name, type) {
            this.name = name || 'New Influence';
            this.type = type || '<<Influence>>';
            this.customShape = 'influenceShape';
            this.clone = function () {
                return mxUtils.clone(this);
            };
        };
