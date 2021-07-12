import {Lightning} from "@lightningjs/sdk";
import {createVector} from "../../models";
import {Item} from "../index";

export default class List extends Lightning.Component {
    static _template() {
        return {
            w: 1920, h: 400,
            Items:{
                y: 100, x: 30
            }
        };
    }

    _init(){
        this.tag("Items").children = new Array(50).fill('').map((el, index)=>{
            return {
                type: Item, x: index * 240, idx: index, startX: index * 240
            }
        });

        this.maxListDistance = 50 * 240;
    }

    _active(){
        this._current = createVector(this.tag("Items").x,this.tag("Items").y)
    }

    _onDrag(recording){
        const {delta} = recording;
        this.items.forEach((item)=>{
            item.x = item.startX + delta.x;
        })
    }

    _onDragEnd(){
        this.items.forEach((item)=>{
            item.startX = item.x;
        })
    }

    swipeLeft(recording){
        const absoluteDistance = Math.abs(recording.delta.x)
        const velocity = absoluteDistance / recording.duration;

        this.items.forEach((item)=>{
            const position = item.x - (velocity * 500)
            item.setSmooth('x', position , {
                duration:0.6, timingFunction:'ease-out'
            });
            item.startX = position;
        })
    }

    swipeRight(recording){
        const absoluteDistance = Math.abs(recording.delta.x)
        const velocity = absoluteDistance / recording.duration;
        this.items.forEach((item)=>{
            const position = item.x + (velocity * 500)
            item.setSmooth('x', position , {
                duration:0.6, timingFunction:'ease-out'
            });
            item.startX = position;
        })
    }

    get items(){
        return this.tag("Items").children;
    }
}