import {Lightning, Router} from "@lightningjs/sdk";
import {settings} from "../lib/automotiveSettings"
import {Item} from "../components";

export default class Main extends Lightning.Component{
    static _template(){
        return {
            w: settings.w, h: settings.h,
            Blurred:{
                w: settings.w, h: settings.h, rect: true,
                type: Lightning.components.FastBlurComponent, amount: 0, content: {
                    Bg:{
                        w: settings.w, h: settings.h, rect:true, colorTop: 0xff000428, colorBottom: 0xff6699ff,
                    },
                    Label:{
                        alpha: 0.4,
                        x: settings.w / 2, y: settings.h / 2, mount: 0.5,
                        text:{
                            text:'Automotive interaction demo', fontSize: 60, fontFace:'julius'
                        }
                    },
                    Interaction:{
                        alpha: 0.8,
                        x: settings.w / 2, y: settings.h / 2 + 100, mount: 0.5,
                        text:{
                            text:'Double tap to start', fontSize: 30, fontFace:'julius'
                        }
                    },

                }
            }
        }
    }

    _onSingleTap(){
        this.content.tag("Interaction").text = `That's a single tap :)`;
        setTimeout(()=>{
            this.content.tag("Interaction").text = `Double tap to start`;
        },2000)
    }

    _onDoubleTap(){
        this._setState("Selector")
    }

    static _states(){
        return [
            class Selector extends this {
                $enter(){
                    this.content.tag("Interaction").text = `Loading demo pages`
                    this.tag("Blurred").animation({
                        duration: 0.5, repeat:0,
                        actions:[
                            {p:'scale', v:{0:1, 0.4:1.09, 1:1}},
                            {p:'amount', v:{0:0, 0.4:0, 1:2}},
                        ]
                    }).start();

                    this.widgets.demoselector.setSmooth('alpha',1, {
                        duration:0.3, delay:0
                    })
                }
                _onDoubleTap(){
                    this._setState("")
                }
                $exit(){
                    this.content.tag("Interaction").text = `Double tap to start`
                    this.tag("Blurred").animation({
                        duration: 0.2, repeat:0,
                        actions:[
                            {p:'amount', v:{0:2, 1:0}}
                        ]
                    }).start();
                    this.widgets.demoselector.setSmooth('alpha',0, {
                        duration:0.3, delay:0
                    })
                }
            }
        ]
    }

    get content(){
        return this.tag("Blurred").content;
    }
}



