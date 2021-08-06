import {Lightning, Router} from "@lightningjs/sdk";

const demos = [
    {label:'Touch identifcation', link:'touchidentification'},
    {label:'Buttons', link:'buttonsdemo'},
    {label:'List', link:'listdemo'},
    {label:'Custom List', link:'listdemo2'},
    {label:'Navigation (Pinch)', link:'mapdemo'},
    {label:'Rotated collision', link:'rotatedcollision'},
    {label:'Distance demo', link:'distancedemo'},
    {label:'Car Controls', link:'controlsdemo'}
]

export default class DemoSelector extends Lightning.Component{
    static _template(){
        return {
            rect:true, w: 1920, h: 1080, alpha: 0,
            colorLeft: 0xee141e30, colorRight: 0xee243b55,
            Label:{
                y: 50, mountX: 0.5, x: 960,
                text:{
                    text:'Select a demo', fontFace:'julius'
                }
            },
            Demos:{
                y: 160, x: 260
            }
        }
    }

    _init(){
        this.demos = demos.map(({label, link}, index)=>{
            return {
                type: Demo,
                x: index % 4 * 350,
                y: Math.floor(index / 4) * 350 + 800,
                alpha:0,
                label, link,
                widget:this
            }
        })
    }

    _active(){
        this.toggle(true);
    }

    _inactive(){
        this.toggle(false)
    }

    toggle(visible){
        this.demos.forEach((el, idx)=>{
            const pos = Math.floor(idx / 4) * 350;
            el.patch({
                smooth:{
                    alpha:1,
                    y: [
                        visible ? pos : pos + 800, {
                            duration:0.3,
                            delay: idx * 0.02,
                            timingFunction: 'ease-out'
                        }]
                }
            })
        })
    }

    get demos(){
        return this.tag("Demos").children;
    }

    set demos(v){
        this.tag("Demos").children = v;
    }
}

class Demo extends Lightning.Component{
    static _template(){
        return {
            rect:true, w: 300, h: 300, color: 0x705b86e5,
            Label:{ mount: 0.5, x: 150, y: 150,
                text:{
                    fontSize:40, textAlign:'center', fontFace:'julius',
                    wordWrapWidth: 270, lineHeight:50
                }
            }
        }
    }

    set label(v){
        this.tag("Label").text = v;
    }

    set link(v){
        this._link = v;
    }

    get link(){
        return this._link;
    }

    set widget(v){
        this._widget = v;
    }

    _onSingleTap(){
        this._widget.setSmooth('alpha', 0)
        Router.navigate(this._link)
    }
}
