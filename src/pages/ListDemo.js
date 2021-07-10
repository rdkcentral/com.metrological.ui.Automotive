import {Lightning} from "@lightningjs/sdk";
import {Button1} from "../lib/automotive/components";

const rand = (min, max)=>{
    return ~~(Math.random()* (max - min)) + min
}

export default class Home extends Lightning.Component{
    static _template(){
        return {
            shader: {
                type: lng.shaders.RadialGradient, pivotX: 1, outerColor: 0xffff0000, innerColor: 0xff0000ff
            },
            Label:{
                alpha: 0.4,
                x: 960, y: 480, mount: 0.5,
                text:{
                    text:'Autmotive interaction demo', fontSize: 60, fontFace:'julius'
                }
            },
            Buttons:{
                y: 100
            }
        }
    }

    _init(){
        this.count = 0;
        this.tag("Buttons").children = new Array(30).fill('').map((el, index)=>{
            return {
                type: Button1, x: index % 7 * 315 + 30, y: ~~(index/7)*300, w: 275, h: 275
            }
        })
    }
}
