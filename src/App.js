import {Router, Utils} from "@lightningjs/sdk";
import {Automotive} from "@lightningjs/automotive";
import routes from "./lib/routes";
import {settings} from "./lib/automotiveSettings";

export default class App extends Router.App {
    static getFonts() {
        return [
            {family: 'julius', url: Utils.asset('fonts/JuliusSansOne-Regular.ttf'), descriptors: {}},
        ];
    }

    _setup() {
        // start automotive engine
        Automotive.start(
            this.application, settings
        );

        Router.startRouter(routes, this);
    }

    static _template() {
        return {
            Background: {
                rect: true, color: 0xff000000, w: 1920, h: 1080,
                Label: {
                    color: 0xffffffff, mount: 0.5,
                    x: 960, y: 540,
                    text: {
                        fontFace: 'julius',
                        text: '', fontSize: 80
                    }
                }
            },
            // we MUST spread the base-class template
            // if we want to provide Widgets.
            ...super._template(),
            Widgets: {}
        };
    }

    _captureKey() {
        this.stage.drawFrame();
        this.core.render();
        return false;
    }

    _handleAppClose() {
        this.application.closeApp();
    }

    /**
     * Example of extending the Router.App StateMachine
     */
    static _states() {
        const states = super._states();
        states.push(
            class ExampleState extends this {
                $enter() {

                }

                $exit() {

                }
            }
        );
        return states;
    }
}

