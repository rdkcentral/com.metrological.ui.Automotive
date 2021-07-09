import {Router} from "@lightningjs/sdk";
import {initAutomotive} from "./lib/automotive"
import routes from "./lib/routes"
import Events from "./lib/Events"
import {getConfigMap} from "./lib/automotive/helpers";

export default class App extends Router.App {
    // define which fonts are used in the App
    static getFonts() {
        return [
        ];
    }

    _setup() {
        initAutomotive(this.application, getConfigMap());
        Router.startRouter(routes, this);

        this.initListeners();
    }

    static _template(){
        return {
            Background:{
                rect: true, color: 0xffE68C0A, w: 1920, h: 1080,
                Label:{ color: 0xff8E6730, mount: 0.5,
                    x: 960, y: 540,
                    text:{
                        text:''
                    }
                }
            },
            // we MUST spread the base-class template
            // if we want to provide Widgets.
            ...super._template(),
            Widgets:{

            }
        }
    }

    _captureKey(){
        this.stage.drawFrame();
        this.core.render();
        return false
    }

    _handleAppClose(){
        this.application.closeApp();
    }

    /**
     * Example of extending the Router.App StateMachine
     */
    static _states(){
        const states = super._states();
        states.push(
            class ExampleState extends this{
                $enter(){

                }
                $exit(){

                }
            }
        );
        return states;
    }

    initListeners(){
        /**
         * Swipes will not be called on the touched
         * element but broadcasted so listeners can
         * subscribe to the event
         */
        Events.listen('App', 'swipeLeft', (recording)=>{
            const page = Router.getActivePage();
            page.animation({
                duration:2, actions:[
                    {p:'x', v:{0:0, 0.1: -1920, 0.8:-1920, 1:0}}
                ]
            }).start();

            this.tag("Label").text = `${recording.fingersTouched} FINGERS SWIPE LEFT`
        })

        Events.listen('App', 'swipeRight', (recording)=>{
            const page = Router.getActivePage();
            page.animation({
                duration:2, actions:[
                    {p:'x', v:{0:0, 0.1: 1920, 0.8:1920, 1:0}}
                ]
            }).start();

            this.tag("Label").text = `${recording.fingersTouched} FINGERS SWIPE RIGHT`
        })

        Events.listen('App', 'swipeUp', (recording)=>{
            const page = Router.getActivePage();
            page.animation({
                duration:2, actions:[
                    {p:'y', v:{0:0, 0.1: -1080, 0.8:-1080, 1:0}}
                ]
            }).start();
            this.tag("Label").text = `${recording.fingersTouched} FINGERS SWIPE UP`
        })

        Events.listen('App', 'swipeDown', (recording)=>{
            const page = Router.getActivePage();
            page.animation({
                duration:2, actions:[
                    {p:'y', v:{0:0, 0.1: 1080, 0.8:1080, 1:0}}
                ]
            }).start();
            this.tag("Label").text = `${recording.fingersTouched} FINGERS SWIPE DOWN`
        })
    }
}

