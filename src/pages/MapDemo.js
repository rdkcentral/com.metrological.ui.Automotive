import {Lightning, Router, Utils} from "@lightningjs/sdk";
import Events from "../lib/Events";

export default class MapDemo  extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: 1920, h: 1080, color:0xff000000,
            Image:{
                w:1920, h: 1080, src: Utils.asset('images/map.jpg')
            },
            ButtonsTitle:{
                x: 30, y: 20,
                text:{
                    text:'Automotive Map demo', fontFace:'julius'
                }
            },
            Scale:{
                x: 30, y: 70, alpha:0.5,
                text:{ fontSize:18,
                    text:'', fontFace:'julius'
                }
            },
            Rotation:{
                x: 30, y: 95, alpha:0.5,
                text:{fontSize:18,
                    text:'', fontFace:'julius'
                }
            },
        }
    }

    _active(){
        this.listenerId = Events.listen('App', 'pinch', ({distance, angle}) => {
            // @todo: screen width
            const level = (distance / 1920) * 6;
            this.tag("Image").scale = level < 0.2 ? 1 : 1 + level ;
            this.tag("Image").rotation = angle ;
            this.tag("Scale").text = `scale: ${level + 1}`;
            this.tag("Rotation").text = `rotation: ${angle}`; ;
        });
    }

    _inactive() {
        Events.clear(this.listenerId);
    }


    pageTransition(){
        return "left";
    }

    swipeLeft(recording){
        if(recording.fingersTouched === 4){
            Router.navigate("listdemo")
        }

    }

    swipeUp(){
        // block
    }

    swipeRight(recording){
        if(recording.fingersTouched === 4){
            Router.navigate("main")
        }
    }

    swipeDown(){
        // block
    }
}
