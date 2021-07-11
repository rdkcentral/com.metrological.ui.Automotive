import {Lightning, Router} from "@lightningjs/sdk";
import {Button1} from "../lib/automotive/components";

const rand = (min, max)=>{
    return ~~(Math.random()* (max - min)) + min
}

export default class ButtonsDemo extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: 1920, h: 1080,
            colorTop: 0xff9055ff, colorBottom: 0xff13e2da,
            ButtonsTitle:{
                x: 30, y: 20,
                text:{
                    text:'Automotive button demo', fontFace:'julius'
                }
            },
            Buttons:{
                y: 100
            },
            Details: {
                x: 30, y: 700,
                text:{
                    text:'Automotive button demo', fontFace:'julius', fontSize:22
                }
            }
        }
    }

    _init(){
        this.count = 0;
        this.tag("Buttons").children = new Array(14).fill('').map((el, index)=>{
            return {
                type: Button1, x: index % 7 * 315 + 30, y: ~~(index/7)*315, w: 275, h: 275, idx: index
            }
        })


    }

    pageTransition(){
        return "left";
    }

    swipeLeft(){
        // block
    }

    swipeUp(){
        // block
    }

    swipeRight(){
        Router.navigate("main")
    }

    swipeDown(){
        // block
    }
}
