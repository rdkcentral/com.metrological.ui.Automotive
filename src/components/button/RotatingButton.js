import {Lightning, Utils} from "@lightningjs/sdk";
import {Automotive} from "@lightningjs/automotive";
const config = Symbol("config");

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

    get config(){
        return this[config];
    }

    set config(data) {
        // store config object in a special unique symbol
        // on the component instance
        this[config] = data;
    }

    _onDragStart(){
        if(this.started){
            return
        }

        let {px, py} = this.button.core._worldContext;

        this.center = Automotive.createVector(
            ~~(px) + (this.w / 2),
            ~~(py) + (this.h / 2)
        );

        this.a = 0;
        this.r = 0

        this.startAngle = 0;
        this.button.rotation = 0;

        this.started = true;
    }

    _onDrag(recording) {
        let {firstFinger:{position:{x,y}}} = recording;

        // apply rotation
        this.button.rotation = Math.atan2(
            ~~(y) - this.center.y, ~~(x) - this.center.x
        );
    }
}