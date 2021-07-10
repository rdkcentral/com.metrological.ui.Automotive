import {Lightning, Router} from "@lightningjs/sdk";

export default class Button extends Lightning.Component {
    static _template() {
        return {
            rect: true, alpha: 0.2, collision: true,
            Label:{
                mount:0.5, x: 150, y: 150,
                text:{
                    text:''
                }
            }
        };
    }

    _active() {
        this.restore = {
            x: this.x, y: this.y
        };
        this._dragStarted = false;
    }

    /**
     * Will be called when one finger quickly touches this element
     * @private
     */
    _onSingleTap() {
        this.alpha = 1;
    }

    /**
     *
     * @param recording - recording data
     * @private
     */
    _onMultiTap(recording) {
        this.tag("Label").text = `${recording.fingersTouched}`
        this.animation({
            duration: 2, actions: [
                {p: 'alpha', v: {0: 1, 9: 1, 1: 0.5}}
            ]
        }).start();
    }

    /**
     * When one finger quickly double taps the same element
     * @private
     */
    _onDoubleTap() {
        this.animation({
            duration: 0.4, actions: [
                {p: 'alpha', v: {0: 0.5, 0.2: 1, 1: 0.5}},
                {p: 'scale', v: {0: 1, 0.2: 1.5, 1: 1}},
            ]
        }).start();
    }


    /**
     * Will be invoked if one or more fingers are pressing this element
     * for < 800ms. For  now the recording data holds data for all the fingers
     * so it could be that 3 fingers are touching 3 individual elements they all receive
     * this data
     * @param recording
     * @private
     */
    _onLongpress(recording) {
        this.animation({
            duration: 2, actions: [
                {p: 'color', v: {0: 0xff000000, 9: 0xff000000, 1: 0xffffffff}},
                {p: 'alpha', v: {0: 1, 9: 1, 1: 0.2}},
                {p: 'scale', v: {0: 1, 0.5: 3, 1: 1}},
            ]
        }).start();
    }

    _onDrag(recording) {
        if (!this._dragStarted) {
            this.color = 0xffBAF2FF;
            this.animation({
                duration: 0.4, actions: [
                    {p: 'alpha', v: {0: 0.5, 1: 1}},
                    {p: 'scale', v: {0: 1, 0.2: 1.9, 1: 1}},
                ]
            }).start();
            this._dragStarted = true;
        }
        const {x, y} = recording.delta;
        const {x: startX, y: startY} = this.restore;
        this.x = startX + x;
        this.y = startY + y;
    }

    _onDragStart() {

    }

    _onDragEnd() {
        setTimeout(()=>{
            this.patch({
                smooth: {
                    x: [this.restore.x, {delay: 1}],
                    y: [this.restore.y, {delay: 1}],
                }
            });
            this._dragStarted = false;
        }, 800)
    }
    /**
     * @todo: better blocking solution
     */

    swipeLeft(){
       this.setSmooth('x', -1000, {duration:0.4, timingFunction:'linear'})
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