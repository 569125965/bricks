


cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    reset(){
        this.node.x = 0;
    },

    play(){
        //
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            //将世界坐标转化为本地坐标
            let touchPoint = this.node.parent.convertToNodeSpace(event.getLocation());
            this.node.x = touchPoint.x;
        });
    },

    start () {

    },

    // update (dt) {},
});
