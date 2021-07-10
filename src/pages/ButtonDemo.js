import {Lightning, Router} from "@lightningjs/sdk";
import {Button1, List} from "../lib/automotive/components";

const rand = (min, max)=>{
    return ~~(Math.random()* (max - min)) + min
}

export default class ButtonsDemo extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: 1920, h: 1080,
            colorTop: 0xff9055ff, colorBottom: 0xff13e2da,
            Label:{
                alpha: 0.4,
                x: 960, y: 480, mount: 0.5,
                text:{
                    text:'', fontSize: 80
                }
            },
            Details: {
                x: 960, y: 590, mount: 0.5, alpha: 0.5,
                text: {
                    fontSize: 27, textColor: 0xdd000000,
                    text: ''
                }
            },
            ButtonsTitle:{
                x: 30, y: 20,
                text:{
                    text:'Automotive button demo', fontFace:'julius'
                }
            },
            Buttons:{
                y: 100
            }
        }
    }

    _init(){
        this.count = 0;
        this.tag("Buttons").children = new Array(14).fill('').map((el, index)=>{
            return {
                type: Button1, x: index % 7 * 315 + 30, y: ~~(index/7)*300, w: 275, h: 275
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
