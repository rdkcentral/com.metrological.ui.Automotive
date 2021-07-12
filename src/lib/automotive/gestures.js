import {config} from "./index";

export const getSwipe = (recording) => {
    let identified;
    let direction;

    const fingers = recording.fingers;
    const hTreshold = config.get('swipeTresholdHorizontal');
    const vTreshold = config.get('swipeTresholdVertical');

    for (let finger of fingers.values()) {
        const x1 = finger.start.x;
        const y1 = finger.start.y;
        const x2 = finger.end.x;
        const y2 = finger.end.y;
        const rDisx = x2 - x1;
        const rDisy = y2 - y1;
        const aDisx = Math.abs(rDisx);
        const aDisy = Math.abs(rDisy);
        const diff = aDisx > aDisy ? aDisy / aDisx : aDisx / aDisy;
        let valid = false;

        if (aDisx > aDisy) {
            direction = rDisx <= 0 ? 'Left' : 'Right';
            valid = hTreshold < aDisx;
        } else {
            direction = rDisy <= 0 ? 'Up' : 'Down';
            valid = vTreshold < aDisy;
        }

        // @todo: do we really want to test for normalized distance?
        if (valid && diff < 0.4) {
            identified = true;
            break;
        }
    }

    if (identified) {
        return {
            event: `swipe${direction}`,
            recording
        };
    } else {
        return false;
    }
};


export const isPotentialPinch = (recording) => {
    return recording.fingersTouched === 2;
};