import {Lightning, Router} from "@lightningjs/sdk";
import {Button3} from "../lib/automotive/components";
import createVector from "../lib/automotive/models/vector";
import {rotatePoint, collide} from "../lib/automotive/helpers";

export default class RotatedCollision extends Lightning.Component {
    static _template() {
        return {
            rect: true, w: 1920, h: 1080, colorBottom: 0xffc94b4b, colorTop: 0xff4b134f,
            Title: {
                x: 30, y: 20,
                text: {
                    text: 'Automotive rotate collision', fontFace: 'julius'
                }
            },
            Shapes: {
                Shape: {
                    type: Button3, x: 1920 / 2 - 150, y: 1080 / 2 - 150, w: 300, h: 300, alpha: 0.2, rotation: 0.8
                }
            },
            Locators: {}
        };
    }

    _init() {
        this.tag("Shape").animation({
            duration: 20, repeat: -1,
            actions: [
                {p: 'rotation', v: {sm: 0, 0: 0, 1: Math.PI * 2}},
                {p: 'x', v: {sm: 0.7, 0: 1920 / 2 - 150, 0.5: 1500, 1: 1920 / 2 - 150}},
                {p: 'y', v: {sm: 0.7, 0: 1080 / 2 - 150, 0.5: 700, 1: 1080 / 2 - 150}},
                {p: 'w', v: {sm: 0.7, 0: 300, 0.5: 700, 1: 300}},
                {p: 'w', v: {sm: 0.7, 0: 300 , 0.5: 50, 1: 300}},
            ]
        }).start();
        this.sc = 0xffffffff;
    }

    get locators() {
        return this.tag('Locators').childList;
    }

    get shape(){
        return this.tag("Shape")
    }

    addPoint(v) {
        const {x, y} = v;
        const l = this.stage.c({
            type: PositionPoint, x: x - 15, y: y - 15, color: this.sc
        });

        this.locators.add(l);
        l.setSmooth('scale', 1.1, {duration: 0.3});
        l.setSmooth('alpha', 0, {duration: 0.3});
        l.transition('scale').on('finish', () => {
            this.locators.remove(l);
        });
    }

    _onDrag(rec) {
        for (let finger of rec.fingers.values()) {
            this.addPoint(finger.position);
            const ctx = this.shape.core._worldContext;
            const origin = createVector(
                this.shape.x + this.shape.w / 2,
                this.shape.y + this.shape.h / 2
            );
            const p1 = rotatePoint(origin.x, origin.y,  -this.shape.rotation, {x: ctx.px, y:ctx.py});
            const t = rotatePoint(origin.x, origin.y, -this.shape.rotation , {x: finger.position.x, y:finger.position.y});
            if(
                collide(
                    this.shape.w,
                    this.shape.h,
                    0,
                    p1.x + this.shape.w / 2,
                    p1.y + this.shape.h / 2,
                    t.x, t.y
                )
            ){
                this.shape.alpha = 1
                this.sc = 0xff000000;
            }else{
                this.shape.alpha = 0.2
                this.sc = 0xffffffff;
            }
        }
    }

    _active() {

    }

    _inactive() {

    }

    pageTransition() {
        return "down";
    }

    swipeLeft(recording) {

    }

    swipeUp() {
        // block
    }

    swipeRight(recording) {
        if (recording.fingersTouched === 2) {
            Router.navigate('mapdemo');
        }
    }

    swipeDown() {
        // block
    }
}

class PositionPoint extends Lightning.Component {
    static _template() {
        return {
            rect: true, w: 30, h: 30, color: 0xffffffff,
            shader: {
                type: Lightning.shaders.RoundedRectangle, radius: 15
            }
        };
    }

}
