
var Common = require("./common");

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function (contact, self, other) {
        switch(other.tag){
            case 1:
                Common.Scene.onContactWall(self,other);
                break;
            case 2:
                Common.Scene.onContactLand(self,other);
                break;
            case 3:
                Common.Scene.onContactBar(self,other);
                break;
            case 4:
                Common.Scene.onContactBrick(self,other);
                break;
        }
    },

    reset(){
        this.node.angle = 0;
        this.node.position = cc.v2(0,-375);
    },

    play(){
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(400,400);
        this.getComponent(cc.RigidBody).angularVelocity = 400;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {

    },

    // update (dt) {},
});
