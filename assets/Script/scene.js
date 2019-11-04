
var Bar = require('./bar');
var Cube = require('./cube');
var Layout = require('./layout');
var Brick = require('./brick');
var Common = require("./common");

cc.Class({
    extends: cc.Component,

    // 所有可设置属性都放在场景中，场景注入到各对象中供调用
    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        
        score:{
            default:0,
            type:cc.Integer,
            visible:false
        },

        stage:{
            default:0,
            type:cc.Integer,
            visible:false
        },

        bar:{
            default:null,
            type:Bar,
            visible:true,
            tooltip:"挡板"
        },

        cube:{
            default:null,
            type:Cube,
            visible:true,
            tooltip:"攻击方块"
        },

        bricksLayout:{
            default:null,
            type: Layout,
            visible:true,
            tooltip:"砖块所在区域"
        },

        brickPrefab:{
            default:null,
            type:cc.Prefab,
            visible:true,
            tooltip:"砖块预制"
        },

        cubePrefab:{
            default:null,
            type:cc.Prefab,
            visible:true,
            tooltip:"攻击方块预制"
        },

        bricks:{
            default:null,
            visible:false
        },

        bricksCount:{
            default:30,
            type:cc.Integer,
            visible:true,
            tooltip:"砖块总数"
        },

        bricksCountPerLine:{
            default:10,
            type:cc.Integer,
            visible:true,
            tooltip:"每行砖块数"
        },

        bricksAddedPerStage:{
            default:30,
            type:cc.Integer,
            visible:true,
            tooltip:"关卡砖块增量"
        },

        effectsScale:{
            default:0.1,
            type:cc.Float,
            visible:true,
            tooltip:"魔法砖块比例"
        },
    },

    init(){
        cc.director.getPhysicsManager().enabled = true;
        Common.Scene = this;
        this.label.string = '得分 0';
        this.stage = 1;
        this.reset();
        this.nextStage();
        this.play();
    },

    reset(){
        this.bar.reset();
        this.cube.reset();
        this.bricks = new Map();
    },

    nextStage(){
        cc.director.getPhysicsManager().enabled = true;
        this.bricksLayout.init();
    },

    play(){
        this.bar.play();
        this.cube.play();
    },

    gameOver(){
        this.cube.node.angle = 0;
        this.cube.node.position = cc.v2(0,-375);
        cc.director.getPhysicsManager().enabled = false;
        //this.reset();
    },

    passStage(){
        this.reset();
    },

    //contact methods
    onContactWall(cubeObj,wallObj){

    },

    onContactLand(cubeObj,landObj){
        this.gameOver();
    },

    onContactBar(cubeObj,barObj){
        
    },

    onContactBrick(cubeObj,brickObj){
        let brick = this.bricks.get(brickObj.node.id);
        brick.effective();
        this.score += brick.score;
        this.label.string = '得分 '+this.score;
        //delete from map
        this.bricks.delete(brick.node.id);
        //delete from parent
        brick.node.parent = null;
        if(this.bricks.size == 0){
            //passed
            this.passStage();
        }
    },

    // use this for initialization
    onLoad: function () {
        this.init();
    },

    // called every frame
    update: function (dt) {

    },

    onDestroy(){
        cc.director.getPhysicsManager().enabled = false;
    }
});
