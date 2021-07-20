import {Lightning} from "@lightningjs/sdk";

const style = Symbol("style");

export default class Button extends Lightning.Component {
    static _template() {
        return {
            Start: {
                rect: true, w: 5, h: 15,
                LabelStart: {
                    y: 40, mountX: 0.5,
                    text: {
                        text: '0', fontFace: 'julius', fontSize: 15
                    }
                }
            },
            Slider: {
                rect: true, w: 400, h: 4, y: 6,
                Drag: {
                    rect: true, w: 12, y: -17, h: 40, x: 40,
                    Visual:{
                        shader: {
                            type: Lightning.shaders.RoundedRectangle,
                            radius: 5
                        },
                    },
                    LabelCurrent: {
                        y: -30, mountX: 0.5, x:5,
                        text: {
                            text: '', fontFace: 'julius', fontSize: 15
                        }
                    }
                }
            },
            End: {
                rect: true, w: 5, h: 15, x: 400,
                LabelEnd: {
                    y: 40, mountX: 0.5,
                    text: {
                        text: '200', fontFace: 'julius', fontSize: 15
                    }
                }
            }
        };
    }

    set config(data) {
        // grab template configuration
        const {min, max, width, startValue, steps} = data;
        const start = startValue - min;

        // calculate amount of steps we can take
        data.maxSteps = (max - min) / steps;

        // amount of pixels per step
        data.sizeSteps = width / data.maxSteps;

        // store current position in config object
        // so every 'drag' we calculate delta with last position
        data.currentPosition = start / steps * data.sizeSteps;

        // store config object in a special unique symbol
        // on the component instance
        this[style] = data;

        this.patch({
            w: width, h: 150,
            Start: {
                LabelStart: {
                    text: `${min}`
                }
            },
            Slider: {
                w: width,
                Drag: {
                    x: data.currentPosition
                }
            },
            End: {
                x: width,
                LabelEnd: {
                    text: `${max}`
                }
            }
        });

        this.value = startValue;
    }

    _onDrag(recording) {
        const {delta: {x}} = recording;
        const {sizeSteps, min, width, currentPosition, steps} = this[style];
        let position = Math.max(
            0, Math.min(width, currentPosition + (x - x % sizeSteps))
        );
        let value = (position / sizeSteps * steps) + min;

        // keep in bounds
        if(position >= 0 && position <= width){
            this.drag.x = position;
            this.value = value;
        }
    }

    _onDragEnd(){
        this[style].currentPosition = this.drag.x;
    }

    get drag() {
        return this.tag("Drag");
    }

    set value(v) {
        this._value = v;
        if(parseInt(v) === v){
            this.tag("LabelCurrent").text = `${Math.ceil(v)}`
        }

    }

    get value() {
        return this._value;
    }

    swipeLeft() {
        // block
    }

    swipeRight() {
        // block
    }

    swipeUp() {
        // block
    }

    swipeDown() {
        // block
    }

}