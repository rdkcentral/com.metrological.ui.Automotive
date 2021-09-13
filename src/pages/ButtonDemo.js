import {Lightning, Router} from "@lightningjs/sdk";
import {Button1} from "../components";
import {settings} from "../lib/automotiveSettings";

const dimension = settings.h / 4;
const gap = (settings.w - (dimension * 4)) / 6;
const position = dimension + gap;

export default class ButtonDemo extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: w=>w, h: h=>h,
            colorTop: 0xff330868, colorBl: 0xff330868, colorRight: 0xff30CFD0,
            ButtonsTitle:{
                x: 30, y: 20,
                text:{
                    text:'Automotive button demo', fontFace:'julius'
                }
            },
            Buttons:{
                y: 100,
                x: gap
            }
        }
    }

    _init(){
        this.count = 0;
        this.tag("Buttons").children = new Array(14).fill('').map((el, index)=>{
            return {
                type: Button1,
                x: index % 4 * position,
                y: ~~(index/4)* position,
                w: dimension,
                h: dimension, idx: index
            }
        })
    }

    pageTransition(){
        return "left";
    }
}
