import {Registry} from "@lightningjs/sdk";
import {Finger} from "./";
import Vector from "./Vector";
import {sticky, config} from "../index";

export default class Recording {
    constructor(event) {
        this._starttime = Date.now();

        const touches = event.touches;
        const len = touches.length;
        const fingers = new Map();

        for (let i = 0; i < len; i++) {
            const touch = touches[i];
            fingers.set(touch.identifier, new Finger(touch));
        }
        this._fingers = fingers;

        // we schedule a timeout in which this recording flags
        // itself as a 'hold'. A touchend can clear the timeout
        // if callback hasn't fired
        Registry.setTimeout(() => {
            if (!this.isHold) {
                this._isHold = true;
                Registry.setInterval(() => {
                    sticky('_onDrag', this);
                }, 1);
            }
        }, config.get('flagAsHoldDelay'));
    }

    /**
     * Update current with recording with data collected from
     * a touchmove event
     * @param event
     */
    update(event) {
        const touches = event.touches;
        const len = touches.length;

        for (let i = 0; i < len; i++) {
            const touch = touches[i];
            if (this._fingers.has(touch.identifier)) {
                const finger = this._fingers.get(touch.identifier);
                finger.update(touch);
            }
        }

        // if finger has moved we start emitting dragEvent early
        // drag always initiated by one finger
        if (!this.isHold && this.hasFingerMoved()) {
            this.isHold = true;
            this.moved = true
            Registry.clearTimeouts();
            Registry.setInterval(() => {
                sticky('_onDrag', this);
            }, 1);
        }
    }

    get starttime() {
        return this._starttime;
    }

    get fingers() {
        return this._fingers;
    }

    get fingersTouched() {
        return this._fingers.size;
    }

    set endtime(ms) {
        Registry.clearTimeouts();
        Registry.clearIntervals();
        if (this.isHold) {
            sticky('_onDragEnd', this);
        }
        this._endtime = ms;
    }

    get endtime() {
        return this._endtime;
    }

    get duration() {
        return this.endtime - this.starttime;
    }

    set isTap(v) {
        this._isTap = v;
    }

    get isTap() {
        return this._isTap;
    }

    set isHold(v) {
        this._isHold = v;
    }

    get isHold() {
        return this._isHold;
    }

    /**
     * return if fingers have moved
     */
    hasFingerMoved() {
        for (let finger of this._fingers.values()) {
            if (finger.moved) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns the first finger startposition
     */
    get startposition() {
        return this._fingers?.values()?.next()?.value?.start;
    }

    /**
     * returns delta between start and current position
     * for first finger
     */
    get delta() {
        const finger = this._fingers?.values()?.next()?.value;
        if (finger) {
            return finger.delta;
        } else {
            return new Vector(0, 0);
        }
    }
}