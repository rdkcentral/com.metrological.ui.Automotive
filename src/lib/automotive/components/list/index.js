import {Lightning} from "@lightningjs/sdk";
import {Item} from "../index";
import {Vector} from "../../models";

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
            Items:{
                x: 30, y: 50
            }
        };
    }

    _init(){
        this.tag("Items").children = new Array(50).fill('').map((el, index)=>{
            return {
                type: Item, x: index * 240, idx: index
            }
        });
    }

    _active(){
        this._current = new Vector(this.tag("Items").x,this.tag("Items").y)
    }

    _onDrag(recording){
        const {delta} = recording;
        const position = this._current.add(delta);
        this.tag("Items").x = position.x;
    }

    _onDragEnd(){
        this._current = new Vector(
            this.tag("Items").x,this.tag("Items").y
        )
    }

    swipeLeft(recording){
        this.tag("Items").setSmooth('x', -5000,{duration:1});
        console.log("list swipe?")
    }

    swipeRight(recording){
        this.tag("Items").setSmooth('x', 0, {duration:2});

    }
}