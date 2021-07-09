import {Lightning} from "@lightningjs/sdk";
import {Button, List} from "../lib/automotive/components";

const rand = (min, max)=>{
    return ~~(Math.random()* (max - min)) + min
}

export default class Home extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: 1920, h: 1080,
            color: 0xff20639B,
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
                    text:'Buttons'
                }
            },
            Buttons:{
                y: 100
            },
            List:{
                y: 550, type: List
            }
        }
    }

    _init(){
        this.count = 0;
        this.tag("Buttons").children = new Array(6).fill('').map((el, index)=>{
            return {
                type: Button, x: index % 7 * 315 + 30, y: ~~(index/7)*300, w: 275, h: 275
            }
        })
    }

    _onSingleTap(recording){
        this.tag("Label").text = "SINGLE TAP"
    }

    _onDoubleTap(){
        this.tag("Label").text = "DOUBLE TAP"
    }

    _onMultiTap(recording){
        this.tag("Label").text = `${recording.fingersTouched} FINGERS TAP`
    }

    _onMultiLongpress(recording){
        this.tag("Label").text = `${recording.fingersTouched} FINGERS LONGPRESS`
    }


}
