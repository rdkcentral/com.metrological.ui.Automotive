import {Registry} from "@lightningjs/sdk";
import {dispatch, sticky} from "./index";
import {isSwipe, swipes} from "./gestures";
import {distance} from "./helpers";
import Events from "../Events";

/**
 * Max Amount of milliseconds between touchstart / end to be flagged
 * as a tap
 * @type {number}
 */
export let tapDelay = 80;

/**
 * Max amount of milliseconds that a touchstart can start after a tap flag
 * to be flagged as a double tap
 * @type {number}
 */
const beforeDoubleTapDelay = 180;

/**
 * Amount of milliseconds that need to be passed to start flagging
 * recording as a hold; for drag / pinch / long hold
 * @type {number}
 */
export const flagAsHoldDelay = 800;

/**
 * Max amount of pixels between 2 taps startposition
 * to be flagged as double tap
 * @type {number}
 */
const doubleTapMaxDistance = 40;

/**
 * Timeout id for dispatching onTap on touched screen element
 * @type {number}
 */
let tapFireTimeoutId = 0;

/**
 * Reference to last recording so we can identify
 * double tap
 * @type {{}}
 */
let lastRecording = {};
/**
 * Analyze a recording that has ended
 * @param recording
 */
export const analyzeEnded = (recording) => {
    if (isTap(recording)) {
        if (recording.fingersTouched === 1) {
            recording.isTap = true;
            // if previous recording was also a tap we
            if (lastRecording && lastRecording.isTap) {
                // test if both taps are close to each other
                const dis = distance(
                    recording.startposition, lastRecording.startposition
                );
                if (Math.abs(dis) < doubleTapMaxDistance) {
                    Registry.clearTimeouts();
                    dispatch('_onDoubleTap', recording);
                    recording.isTap = false;
                }
            } else {
                // if no new tap is clearing this timeout
                // we emit onSingleTap
                tapFireTimeoutId = Registry.setTimeout(() => {
                    dispatch('_onSingleTap', recording);
                    recording.isTap = false;
                }, beforeDoubleTapDelay);
            }
            lastRecording = recording;
        } else if (!recording.moved && !recording.isHold) {
            dispatch('_onMultiTap', recording);
            lastRecording = null;
        }else{
            console.log("swipe?")
        }
    } else if (!recording.moved) {
        // if we passed tap delay and we haven't moved
        dispatch('_onLongpress', recording);
    } else  {
        // start analyzing as a swipe
        const analyzed = swipes.map((swipe) => {
            return swipe(recording);
        }).filter(Boolean);
        if (analyzed.length) {
            const data = analyzed[0];
            Events.broadcast(data.event, data.recording);
        }
    }
};

export const resetRecordings = () => {
    lastRecording = null;
};

const isTap = (recording) => {
    return recording.endtime - recording.starttime <= tapDelay && !recording.moved;
};


