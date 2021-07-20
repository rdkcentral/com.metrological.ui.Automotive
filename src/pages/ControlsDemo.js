import {Lightning, Router} from "@lightningjs/sdk";
import {Slider} from "../lib/automotive/components";

export default class ControlsDemo  extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: 1920, h: 1080,
            colorTop: 0xff302b63, colorBottom: 0xff24243e,
            ListTitle: {
                x: 30, y: 20,
                text: {
                    text: 'Automotive controls demo', fontFace: 'julius'
                }
            },
            Slider:{
                type: Slider, y: 200, x: 100,
                config:{
                    min:0, max:2000, width:700,
                    startValue: 500, steps: 1
                }
            },
            Slider2:{
                type: Slider, y: 350, x: 100,
                config:{
                    min:0, max:800, width:500,
                    startValue: 400, steps: 8
                }
            },
            Slider3:{
                type: Slider, y: 500, x: 100,
                config:{
                    min:0, max:800, width:300,
                    startValue: 400, steps: 8
                }
            }
        }
    }

    pageTransition(i, o){
        const outHash = o[Router.symbols.hash];
        if(outHash === "rotatedcollision"){
            return "right"
        }
        return "left"
    }

    swipeUp(recording){
        if(recording.fingersTouched === 2){
            Router.navigate("listdemo2")
        }
    }

    swipeLeft(){
        // block
    }

    swipeRight(){
        // block
    }

    swipeDown(recording){
        if(recording.fingersTouched === 4){
            Router.navigate("rotatedcollision")
        }
    }


}
