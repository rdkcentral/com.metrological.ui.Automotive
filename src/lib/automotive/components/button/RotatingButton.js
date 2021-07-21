import {Lightning, Utils} from "@lightningjs/sdk";
import {createVector} from "../../models";

export default class RotatingButton extends Lightning.Component {
    static _template() {
        return {
            w:234, h:234,
            Shadow:{
                src: Utils.asset('images/rotate-bg.png'), scale:1.2, x: -100, y: -100
            },
            Button:{
                w:234, h:234,
                src: Utils.asset('images/rotating-button.png')
            }
        };
    }

    _init(){
        this.started = false;
    }

    get button(){
        return this.tag("Button")
    }


    _onDragStart(recording){
        if(this.started){
            return
        }

        let {firstFinger:{position:{x:fx,y:fy}}} = recording;
        let {px, py} = this.button.core._worldContext;

        fx = ~~(fx);
        fy = ~~(fy);

        px = ~~(px);
        py = ~~(py);

        this.a = 0;
        this.r = 0

        this.center = createVector(
            px + (this.w / 2),
            py + (this.h / 2)
        );

        const x = fx - this.center.x;
        const y = fy - this.center.y;

        this.startAngle = Math.atan2(y, x);
        this.button.rotation = this.startAngle;

        this.started = true;
    }

    _onDrag(recording) {
        let {firstFinger:{position:{x:fx,y:fy}}} = recording;

        fx = ~~(fx);
        fy = ~~(fy);

        // assuming the position of the button is not changing
        const x = fx - this.center.x;
        const y = fy - this.center.y;
        const r = Math.atan2(y, x);

        this.r = r - this.startAngle;
        this.button.rotation = this.a + this.r;
    }


    _onDragEnd(){
        this.a += this.r;
    }

    swipeLeft(){

    }

    swipeUp(){
        // block
    }

    swipeRight(){
        // block
    }

    swipeDown(){
        // block
    }
}