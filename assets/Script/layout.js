
var Common = require("./common");


cc.Class({
    extends: cc.Component,

    properties: {
        count:{
            default:0,
            type:cc.Integer,
            visible:false
        },

        blanking:{
            default:10,  //pixels
            type:cc.Integer,
            visible:false
        },
    },

    init(){
        this.count = Common.Scene.bricksCount;
        this.generateBricks();
    },

    generateBricks(){
        let scene = Common.Scene;
        let brickNode = cc.instantiate(scene.brickPrefab);
        let padding = (this.node.width - brickNode.width*scene.bricksCountPerLine + this.blanking*(scene.bricksCountPerLine-1))/2;
        padding = Math.floor(padding);
        for(let i=0;i<this.count;i++){
            brickNode = cc.instantiate(scene.brickPrefab);
            brickNode.parent = this.node;
            brickNode.x =  (i % scene.bricksCountPerLine)*(brickNode.width+this.blanking) + brickNode.width/2;
            brickNode.y = -Math.floor(i / scene.bricksCountPerLine)*(brickNode.height+this.blanking) - brickNode.height/2;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //
    },

    start () {

    },

    // update (dt) {},
});
