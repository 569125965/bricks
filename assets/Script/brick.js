
var Bar = require('./bar');
var Cube = require('./cube');
var Layout = require('./layout');
var Common = require("./common");

cc.Class({
    extends: cc.Component,

    properties: {

        /*
        
    WHITE Color 纯白色，RGBA 是 [255, 255, 255, 255]。
    BLACK Color 纯黑色，RGBA 是 [0, 0, 0, 255]。
    TRANSPARENT Color 透明，RGBA 是 [0, 0, 0, 0]。
    GRAY Color 灰色，RGBA 是 [127.5, 127.5, 127.5]。
    RED Color 纯红色，RGBA 是 [255, 0, 0]。
    GREEN Color 纯绿色，RGBA 是 [0, 255, 0]。
    BLUE Color 纯蓝色，RGBA 是 [0, 0, 255]。
    YELLOW Color 黄色，RGBA 是 [255, 235, 4]。
    ORANGE Color 橙色，RGBA 是 [255, 127, 0]。
    CYAN Color 青色，RGBA 是 [0, 255, 255]。
    MAGENTA Color 洋红色（品红色），RGBA 是 [255, 0, 255]。

        */

        score:{
            default:10,
            type:cc.Integer,
            visible:false
        },

        effect:{
            default:Common.BrickEffect.Normal,
            type:cc.Integer,
            visible:false
        },

        label:{
            default:null,
            type:cc.Label,
            visible:true
        },
    },

    // custom methods
    effective(){
        cc.log('brick='+this.node.id+','+this.effect+','+this.score);
    },

    init(){
        let scene = Common.Scene;
        //random color
        let colors = [cc.Color.WHITE,cc.Color.GRAY,cc.Color.GREEN,cc.Color.BLUE,cc.Color.YELLOW,cc.Color.ORANGE,cc.Color.CYAN,cc.Color.MAGENTA];
        let n = Math.floor(Math.random()*colors.length);
        //cc.log('n='+n);
        let color = colors[n];
        //cc.log(color);
        this.node.color = color;
        this.score = (n+1)*10;
        this.label.string = this.score.toString();
        //effect
        let hit = Math.random() <= scene.effectsScale;
        if(hit == true){
            this.effect = Math.random()*7|0
        }
        //append to scene
        this.node.id = scene.bricks.size.toString();
        scene.bricks.set(this.node.id,this);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init();
    },

    start () {

    },

    // update (dt) {},
});
