/**
 * The amount of milliseconds between a touchstart and touchend
 * for the recording to be flagged as a swipe
 * @type {number}
 */
let maxSwipeTime = 800;

export const isSwipeLeft = (recording) => {
    return isSwipeInDirection({
        x: (x) => {
            return x < -100;
        },
        y: (y) => {
            return Math.abs(y) < 100;
        },
        event: 'swipeLeft',
        recording
    });
};

const isSwipeRight = (recording) => {
    return isSwipeInDirection({
        x: (x) => {
            return x > 100;
        },
        y: (y) => {
            return Math.abs(y) < 100;
        },
        event: 'swipeRight',
        recording
    });
};

export const isSwipeUp = (recording) => {
    return isSwipeInDirection({
        x: (x) => {
            return Math.abs(x) < 100;
        },
        y: (y) => {
            return y < -100;
        },
        event: 'swipeUp',
        recording
    });
};

export const isSwipeDown = (recording) => {
    return isSwipeInDirection({
        x: (x) => {
            return Math.abs(x) < 100;
        },
        y: (y) => {
            return y > 150;
        },
        event: 'swipeDown',
        recording
    });
};

const isSwipeInDirection = ({x: fnx, y: fny, event, recording}) => {
    let identified;
    const fingers = recording.fingers;
    for (let finger of fingers.values()) {
        // if one finger moves according to expected gesture
        // we flag the recording as identified
        // we may need to check each individual finger in the future
        if(fnx(finger.delta.x) && fny(finger.delta.y)){
            identified = true;
            break;
        }
    }
    if (identified) {
        return {
            event, recording
        };
    } else {
        return false;
    }
};

export const isSwipe = (recording) => {
    return recording.starttime - recording.endtime <= maxSwipeTime && recording.fingersTouched > 1;
};

export const isPotentialPinch = (recording) => {
    return recording.fingersTouched === 2;
};

export const swipes = [
    isSwipeLeft, isSwipeRight, isSwipeUp, isSwipeDown
];