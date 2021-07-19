import {Lightning, Router} from "@lightningjs/sdk";
import {List2} from "../lib/automotive/components";

export default class CarouselDemo extends Lightning.Component{
    static _template(){
        return {
            rect:true, w: 1920, h: 1080,
            colorTop: 0xffCF9FF2, colorBottom: 0xff001935,
            ListTitle:{
                x: 30, y: 20,
                text:{
                    text:'Automotive list demo 2', fontFace:'julius'
                }
            },
            Carousel:{
                type: List2, y: 150
            },
            L:{
                rect:true, w:3, h: 1080, x: 960
            }

        }
    }

    pageTransition(){
        return "left";
    }

    swipeLeft(){
        Router.navigate("mapdemo")
    }

    swipeUp(){
        // block
    }

    swipeRight(){
        Router.navigate("buttonsdemo")
    }

    swipeDown(){
        // block
    }

}
