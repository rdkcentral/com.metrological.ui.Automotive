import {Lightning, Router} from "@lightningjs/sdk";
import {Button1} from "../lib/automotive/components";

export default class ButtonDemo extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: 1920, h: 1080,
            colorTop: 0xff330868, colorBl: 0xff330868, colorRight: 0xff30CFD0,
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
                type: Button1, x: index % 7 * 315 + 30, y: ~~(index/7)*315, w: 275, h: 275, idx: index
            }
        })
    }

    pageTransition(){
        return "left";
    }

    swipeLeft(){
        Router.navigate("listdemo")
    }

    swipeUp(){
        // block
    }


    _onDoubleTap(){
        console.log("??")
    }


    swipeRight(){
        Router.navigate("main")
    }

    swipeDown(){
        // block
    }
}
