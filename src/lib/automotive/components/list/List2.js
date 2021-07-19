import {Lightning} from "@lightningjs/sdk";
import {createVector} from "../../models";
import {Item} from "../index";
import {findStraightLine} from "../../analyzer";
import {smoothstep} from "../../helpers";

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
        this.itemWidth = 500;
        this.tag("Items").children = new Array(50).fill('').map((el, index) => {
            let x = index * (this.itemWidth / 2);
            const center = 1920 / 2 - (this.itemWidth / 2);
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
                image: `https://picsum.photos/id/${index + 30}/500/600`
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

        this.items.forEach(
            (item) => this.update(item, item.startX + delta.x)
        );
    }

    _onDragEnd() {
        this.items.forEach((item) => {
            item.startX = item.x;
        });
    }

    swipeLeft(recording) {
        this.swipe(recording, -1);
    }

    swipeRight(recording) {
        this.swipe(recording, 1);
    }

    swipe(rec, dir){
        const {duration, distance} = findStraightLine(rec.firstFinger);
        let force = distance / duration * 500 * dir;

        this.items.forEach((item) => {
            const position = item.x + (force);
            item.setSmooth('x', position, {
                duration: 0.6, timingFunction: 'ease-out'
            });
            item.transition('x').on('progress', () => this.update(item));
            item.startX = position;
        });
    }

    update(item, x) {
        // if x is set we update it's position
        // else we use it's current position
        // for calculation
        if (x) {
            item.x = x;
        } else {
            x = item.x;
        }

        const center = 1920 / 2 - (this.itemWidth / 2);
        const aDis = Math.abs(x - center);
        const dis = aDis / center;
        const zIndex = 40 - dis * 10;
        const scale = 1 - smoothstep(0, center, aDis);
        const alpha = smoothstep(0.1, 0.7, scale);

        item.patch({
            zIndex, scale, alpha
        });
    }

    get items() {
        return this.tag("Items").children;
    }
}