/*
* If not stated otherwise in this file or this component's LICENSE file the
* following copyright and licenses apply:
*
* Copyright 2020 Metrological
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
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
