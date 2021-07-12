import {Lightning, Router} from "@lightningjs/sdk";
import {Button2} from "../lib/automotive/components";

const rand = (min, max)=>{
    return ~~(Math.random()* (max - min)) + min
}

export default class Main extends Lightning.Component{
    static _template(){
        return {
            w: 1920, h: 1080, rect:true,
            colorTop: 0xff000428, colorBottom: 0xff6699ff,
            Label:{
                alpha: 0.4,
                x: 960, y: 550, mount: 0.5,
                text:{
                    text:'Autmotive interaction demo', fontSize: 60, fontFace:'julius'
                }
            },
            Interaction:{
                alpha: 0.8,
                x: 960, y: 610, mount: 0.5,
                text:{
                    text:'Tap to start', fontSize: 30, fontFace:'julius'
                }
            },
            Buttons:{
                children:[
                    {type: Button2, mount:0.5, y: 540, x: 50 },
                    {type: Button2, mount:0.5, y: 540, x: 1850, scaleX: -1},
                ]
            }
        }
    }

    _onSingleTap(recording){
        this.tag("Interaction").text = "single tap"
    }

    _onDoubleTap(recording){
        this.tag("Interaction").text = "double tap"
    }

    _onMultiTap(recording){
        this.tag("Interaction").text = `${recording.fingersTouched} fingers tap`
    }

    _onLongpress(recording){
        this.tag("Interaction").text = `${recording.fingersTouched} fingers longpress`
    }

    swipeLeft(recording){
        Router.navigate("buttonsdemo")
    }

    pageTransition(pageIn, pageOut){
        const outHash = pageOut[Router.symbols.hash];
        if(outHash === "listdemo"){
            return "left"
        }
        return "right"
    }

}
