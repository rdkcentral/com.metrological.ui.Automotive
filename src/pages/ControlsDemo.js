import {Lightning, Router} from "@lightningjs/sdk";
import {Slider, RotatingButton, VolumeButton} from "../components";

export default class ControlsDemo  extends Lightning.Component{
    static _template(context){
        return {
            rect: true, w: 1920, h: 1080,
            colorTop: 0xff2d2e30, colorBottom: 0xff2d2e30,
            ListTitle: {
                x: 80, y: 30, color: 0xffad999b, alpha:0.4,
                text: { fontSize:22,
                    text: 'Automotive controls demo', fontFace: 'julius'
                }
            },
            Slider:{
                type: Slider, y: 100, x: 100,
                config:{
                    min:50, max:1700, width:800,
                    startValue: 500, steps: 2,
                    onChange(value){

                    }
                }
            },
            Slider2:{
                type: Slider, y: 200, x: 100,
                config:{
                    min:5000, max:9000, width:800,
                    startValue: 5500, steps: 10,
                    onChange(value){

                    }
                }
            },
            Slider3:{
                type: Slider, y: 300, x: 100,
                config:{
                    min:0, max:100, width:800,
                    startValue: 80, steps: 1,
                    onChange(value){
                    }
                }
            },
            Slider4:{
                type: Slider, y: 400, x: 100,
                config:{
                    min:-180, max:180, width:800,
                    startValue: 10, steps: 1,
                    onChange(value){

                    }
                }
            },
            Slider5:{
                type: Slider, y: 125, x: 1100,
                config:{
                    min:125, max:180, width:257,
                    startValue: 150, steps: 1,
                    vertical:true,
                    onChange(value){ }
                }
            },
            Slider6:{
                type: Slider, y: 125, x: 1250,
                config:{
                    min:200, max:600, width:257,
                    startValue: 245, steps: 1,
                    vertical:true,
                    onChange(value){

                    }
                }
            },
            Slider7:{
                type: Slider, y: 125, x: 1400,
                config:{
                    min:0, max:12000, width:257,
                    startValue: 8600, steps: 10,
                    vertical:true,
                    onChange(value){

                    }
                }
            },
            Slider8:{
                type: Slider, y: 125, x: 1550,
                config:{
                    min:0, max:400, width:257,
                    startValue: 110, steps: 10,
                    vertical:true,
                    onChange(value){

                    }
                }
            },
            Button:{
                type: RotatingButton, y: 600, x: 400,
                config:{
                    onChange(value){

                    }
                }
            },
            Button2:{
                type: VolumeButton, y: 600, x: 800,
                config:{
                    dmin: 90, dmax: 360, vmin: 0, vmax: 100,
                    onChange(value, nv){

                    }
                }
            },
            Button3:{
                type: RotatingButton, y: 600, x: 1200,
                config:{
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
