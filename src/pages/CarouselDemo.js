import {Lightning, Router} from "@lightningjs/sdk";
import {List2} from "../components";

export default class CarouselDemo extends Lightning.Component {
    static _template() {
        return {
            rect: true, w: w=>w, h: h=>h,
            colorTop: 0xffCF9FF2, colorBottom: 0xff001935,
            ListTitle: {
                x: 30, y: 20,
                text: {
                    text: 'Automotive list demo 2', fontFace: 'julius'
                }
            },
            Carousel: {
                type: List2, y: 216, w: w=>w, h:h=>h
            },
            L: {
                rect: true, w: 3, h: h=>h, x: w=>w/2, alpha: 0.3
            },
            L1: {
                rect: true, w: w=>w, h: 3, y: h=>h/2, alpha: 0.3
            }
        };
    }

    pageTransition() {
        return "left";
    }

}
