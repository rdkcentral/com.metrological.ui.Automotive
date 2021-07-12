import {getApplication} from "./index";
import {Settings} from "@lightningjs/sdk";

/**
 * Return element with the highest zIndex for a map of fingers
 * @param fingers
 * @returns {Array}
 */
export const getTouchedElements = (fingers) => {
    return getElementsAtPosition(fingers);
};

/**
 * Returns an array of all elements that collide
 * with the fingers zIndex is ignored
 */
export const getAllTouchedElements = (fingers) => {
    return getElementsAtPosition(fingers, true);
};

/**
 * Collect elements that collide with fingers
 * @param fingers
 * @param collectAll
 * @returns {Array}
 */
const getElementsAtPosition = (fingers, collectAll) => {
    const touched = [];
    for (let finger of fingers.values()) {
        const collection = getAtPosition(finger.start.x, finger.start.y);
        if (collection?.length) {
            if (collectAll) {
                touched.push(...collection);
            } else {
                // push element with highest zIndex
                touched.push(collection.slice(-1)[0]);
            }
        }
    }
    return touched;
};

export const getAtPosition = (x, y) => {
    const rootElements = getApplication().children;
    const activeElements = findChildren([], rootElements);
    const touched = inRange(activeElements, x, y) || [];
    if (touched.length) {
        touched.sort((a, b) => {
            // Sort by zIndex and then id
            if (a.zIndex > b.zIndex) {
                return 1;
            } else if (a.zIndex < b.zIndex) {
                return -1;
            } else {
                return a.id > b.id ? 1 : -1;
            }
        });
        return touched;
    }
};

const findChildren = (bucket, children) => {
    let n = children.length;
    while (n--) {
        const child = children[n];
        // only add active children
        if (child.__active) {
            // potentially slow
            // add collision flag?
            bucket.push(child);
            if (child.hasChildren()) {
                findChildren(bucket, child.children);
            }
        }
    }
    return bucket;
};

const inRange = (affected, x, y) => {
    let n = affected.length;
    const candidates = [];
    const stage = getApplication().stage;

    // loop through affected children
    // and perform collision detection
    while (n--) {
        const child = affected[n];
        const precision = stage.getRenderPrecision();
        const ctx = child.core._worldContext;

        const cx = ctx.px * precision;
        const cy = ctx.py * precision;
        const cw = child.finalW * ctx.ta * precision;
        const ch = child.finalH * ctx.td * precision;

        if (cx > stage.w || cy > stage.h) {
            continue;
        }

        if (child.parent.core._scissor && !testCollision(x, y, ...child.parent.core._scissor)) {
            continue;
        }

        if (testCollision(x, y, cx, cy, cw, ch)) {
            candidates.push(child);
        }
    }
    return candidates;
};

const testCollision = (px, py, cx, cy, cw, ch) => {
    return px >= cx && px <= cx + cw && py >= cy && py <= cy + ch;
};

export const distance = (v1, v2) => {
    const a = v1.x - v2.x;
    const b = v1.y - v2.y;
    return Math.sqrt(a * a + b * b);
};


export const getConfigMap = () => {
    const automotiveSettings = Settings.get("platform", "automotive");
    return [
        "bridgeCloseTimeout",
        "tapDelay",
        "beforeDoubleTapDelay",
        "flagAsHoldDelay",
        "doubleTapMaxDistance",
        "distanceHorizontalSwipe",
        "distanceVerticalSwipe",
        "externalTouchScreen",
        "componentBlockBroadcast",
        "swipeTresholdHorizontal",
        "swipeTresholdVertical"
    ].reduce((config, key) => {
        config.set(key, automotiveSettings[key]);
        return config;
    }, new Map());
};
