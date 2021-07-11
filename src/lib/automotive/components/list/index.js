import {Lightning} from "@lightningjs/sdk";
import {Item} from "../index";
import createVector from "../../models/vector";

export default class List extends Lightning.Component {
    static _template() {
        return {
            w:1920, h:400,
            Background:{
               rect: true, w: 1920, h: 1080, color:0x50000000
            },
            Label:{
                x: 30,
                text:{
                    text:'Touch list'
                }
            },
            List:{
                y: 550, type: List
            }
        };
    }

    _active(){
        this._current = createVector(this.tag("Items").x,this.tag("Items").y)
    }

    _onDrag(recording){
        const {delta} = recording;
        const position = this._current.add(delta);
        this.tag("Items").x = position.x;
    }

    _onDragEnd(){
        this._current = createVector(
            this.tag("Items").x,this.tag("Items").y
        )
    }

    swipeLeft(recording){
        const {delta, duration} = recording;
        this.tag("Items").setSmooth('x', -5000,{duration:1});
    }

    swipeRight(recording){
        this.tag("Items").setSmooth('x', 0, {duration:2});
    }
}