import {Registry} from "@lightningjs/sdk";
import {createFinger, createVector} from "./index";
import {sticky, config} from "../index";

export default (event) => {
    const starttime = Date.now();
    const touches = event.touches;
    const fingers = new Map();
    const len = touches.length;
    let endtime = Date.now();
    let isTap = false;

    /**
     * Is user long holding the screen
     * @type {boolean}
     */
    let isHold = false;

    /**
     * Did one of the fingers in this recording move
     * @type {boolean}
     */
    let moved = false;

    // register every finger
    for (let i = 0; i < len; i++) {
        const touch = touches[i];
        fingers.set(touch.identifier, createFinger(touch));
    }

    // we schedule a timeout in which this recording flags
    // itself as a 'hold'. A touchend can clear the timeout
    // if callback hasn't fired
    Registry.setTimeout(() => {
        if (!isHold) {
            isHold = true;
            Registry.setInterval(() => {
                sticky('_onDrag', record);
            }, 1);
        }
    }, config.get('flagAsHoldDelay'));

    /**
     * Update current with recording with data collected from
     * a touchmove event
     * @param event
     */
    const update = (event) => {
        const touches = event.touches;
        const len = touches.length;

        for (let i = 0; i < len; i++) {
            const touch = touches[i];
            if (fingers.has(touch.identifier)) {
                const finger = fingers.get(touch.identifier);
                // update new event data
                finger.update(touch);
            }
        }

        // if finger has moved we start emitting dragEvent early
        // drag always initiated by one finger
        if (!isHold && hasFingerMoved()) {
            isHold = true;
            moved = true;
            Registry.clearTimeouts();
            Registry.setInterval(() => {
                sticky('_onDrag', record);
            }, 1);
        }
    };

    const hasFingerMoved = () => {
        for (let finger of fingers.values()) {
            if (finger.moved) {
                return true;
            }
        }
        return false;
    };

    const record = {
        update,
        get starttime() {
            return starttime;
        },
        get fingers() {
            return fingers;
        },
        get fingersTouched() {
            return fingers.size;
        },
        set endtime(ms) {
            Registry.clearTimeouts();
            Registry.clearIntervals();
            if (isHold) {
                sticky('_onDragEnd', record);
            }
            endtime = ms;
        },
        get endtime() {
            return endtime;
        },
        get duration() {
            return endtime - starttime;
        },
        set isTap(v) {
            isTap = v;
        },
        get isTap() {
            return isTap;
        },
        set isHold(v) {
            isHold = v;
        },
        get moved() {
            return moved;
        },
        set moved(v) {
            moved = v;
        },
        get isHold() {
            return isHold;
        },
        /**
         * return if fingers have moved
         */
        hasFingerMoved() {
            for (let finger of fingers.values()) {
                if (finger.moved) {
                    return true;
                }
            }
            return false;
        },
        /**
         * Returns the first finger startposition
         */
        get startposition() {
            return fingers?.values()?.next()?.value?.start;
        },
        /**
         * returns delta between start and current position
         * for first finger
         */
        get delta() {
            const finger = fingers?.values()?.next()?.value;
            if (finger) {
                return finger.delta;
            } else {
                return createVector(0.0, 0.0);
            }
        }
    };
    return record;
}
