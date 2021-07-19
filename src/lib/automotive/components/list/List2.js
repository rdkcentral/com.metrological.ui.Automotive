import {Lightning} from "@lightningjs/sdk";
import {createVector} from "../../models";
import {Item} from "../index";
import {findStraightLine} from "../../analyzer";
import { smoothstep} from "../../helpers";

export default class List extends Lightning.Component {
    static _template() {
        return {
            w: 1920, h: 400,
            Items: {
                y: 30,
            }
        };
    }

    _init() {
        const w = 500;
        this.tag("Items").children = new Array(50).fill('').map((el, index) => {
            let x = index * (w / 2);
            const center = 1920 / 2 - (w/2);
            const dis = Math.abs(x - center) / center;
            const aDis = Math.abs(x - center);
            let z = 40 - dis * 10;
            let s = 1 - smoothstep(0, center, aDis);

            return {
                type: Item,
                zIndex: z < 1 ? 1 : z,
                x, w: 500, h: 600,
                scale: s,
                startX: x,
                alpha: smoothstep(0.1, 0.7, s),
                image: `https://picsum.photos/id/${index+30}/500/600`
            };
        });
    }

    _active() {
        this._current = createVector(
            this.tag("Items").x, this.tag("Items").y
        );
    }

    _onDrag(recording) {
        const {delta} = recording;
        const w = 500;
        this.items.forEach((item) => {
            let x = item.x;

            const center = 1920 / 2 - (w/2);
            const dis = Math.abs(x - center) / center;
            const aDis = Math.abs(x - center);
            let z = 40 - dis * 10;
            let s = 1 - smoothstep(0, center, aDis);

            item.zIndex = z;
            item.scale = s;
            item.x = item.startX + delta.x;
            item.alpha = smoothstep(0.1, 0.7, s);
        });
    }

    _onDragEnd() {
        this.items.forEach((item) => {
            item.startX = item.x;
        });
    }

    swipeLeft(recording) {
        const {duration, distance} = findStraightLine(recording.firstFinger);
        const force = distance / duration * 500;
        const w = 500;
        this.items.forEach((item) => {
            const position = item.x - (force);

            item.setSmooth('x', position, {
                duration: 0.6, timingFunction: 'ease-out'
            });

            item.transition('x').on('progress',()=>{
                let x = item.x;
                const center = 1920 / 2 - (w/2);
                const dis = Math.abs(x - center) / center;
                const aDis = Math.abs(x - center);
                let z = 40 - dis * 10;
                let s = 1 - smoothstep(0, center, aDis);
                item.zIndex = z;
                item.scale = s;
                item.alpha = smoothstep(0.1, 0.7, s);
            })

            item.startX = position;
        });
    }

    swipeRight(recording) {
        const {duration, distance} = findStraightLine(recording.firstFinger);
        const force = distance / duration * 500;
        const w = 500;
        this.items.forEach((item) => {
            const position = item.x + (force);
            item.setSmooth('x', position, {
                duration: 0.6, timingFunction: 'ease-out'
            });
            item.transition('x').on('progress',()=>{
                let x = item.x;
                const center = 1920 / 2 - (w/2);
                const dis = Math.abs(x - center) / center;
                const aDis = Math.abs(x - center);
                let z = 40 - dis * 10;
                let s = 1 - smoothstep(0, center, aDis);
                item.zIndex = z;
                item.scale = s;
                item.alpha = smoothstep(0.1, 0.7, s);
            })
            item.startX = position;
        });
    }

    get items() {
        return this.tag("Items").children;
    }
}