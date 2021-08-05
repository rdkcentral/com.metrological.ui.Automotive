import {Lightning, Router} from "@lightningjs/sdk";
import {List2} from "../components";

export default class CarouselDemo extends Lightning.Component {
    static _template() {
        return {
            rect: true, w: 1920, h: 1080,
            colorTop: 0xffCF9FF2, colorBottom: 0xff001935,
            ListTitle: {
                x: 30, y: 20,
                text: {
                    text: 'Automotive list demo 2', fontFace: 'julius'
                }
            },
            Carousel: {
                type: List2, y: 216, w: 1920, h:600
            },
            L: {
                rect: true, w: 3, h: 1080, x: 960, alpha: 0.3
            },
            L1: {
                rect: true, w: 1920, h: 3, y: 540, alpha: 0.3
            }
        };
    }

    pageTransition() {
        return "left";
    }

    _onSwipeLeft(recording) {
        if (recording.fingersTouched === 2) {
            Router.navigate("controlsdemo");
        }

    }


    _onSwipeRight(recording) {
        if (recording.fingersTouched === 2) {
            Router.navigate("listdemo");
        }
    }


}
