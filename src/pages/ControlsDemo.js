import {Lightning, Router} from "@lightningjs/sdk";
import {Slider} from "../lib/automotive/components";

export default class ControlsDemo  extends Lightning.Component{
    static _template(context){
        return {
            rect: true, w: 1920, h: 1080,
            colorTop: 0xff302b63, colorBottom: 0xff24243e,
            ListTitle: {
                x: 30, y: 20,
                text: {
                    text: 'Automotive controls demo', fontFace: 'julius'
                }
            },
            Obj:{
                rect:true,x:100, y:100,w:50, h: 50,
            },
            Slider:{
                type: Slider, y: 200, x: 100,
                config:{
                    min:50, max:1700, width:700,
                    startValue: 500, steps: 2,
                    onChange(value){
                        context.tag("Obj").x = value;
                    }
                }
            },
            Slider2:{
                type: Slider, y: 350, x: 100,
                config:{
                    min:10, max:1080, width:1100,
                    startValue: 100, steps: 10,
                    onChange(value){
                        context.tag("Obj").y = value;
                    }
                }
            },
            Slider3:{
                type: Slider, y: 500, x: 100,
                config:{
                    min:0, max:100, width:800,
                    startValue: 50, steps: 1,
                    onChange(value){
                        context.tag("Obj").alpha = value / 100;
                    }
                }
            },
            Slider4:{
                type: Slider, y: 650, x: 100,
                config:{
                    min:0, max:20, width:500,
                    startValue: 1, steps: 1,
                    onChange(value){
                        context.tag("Obj").scale = value;
                    }
                }
            },
            Slider5:{
                type: Slider, y: 800, x: 100,
                config:{
                    min:0, max:Math.PI * 2, width:200,
                    startValue: 0, steps: 0.1,
                    onChange(value){
                        context.tag("Obj").rotation = value;
                    }
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
