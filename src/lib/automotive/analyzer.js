import {Registry} from "@lightningjs/sdk";
import {dispatch, config} from "./index";
import {swipes} from "./gestures";
import {distance} from "./helpers";
import Events from "../Events";

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
                if (Math.abs(dis) < config.get('doubleTapMaxDistance')) {
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
                }, config.get('beforeDoubleTapDelay'));
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
    return recording.endtime - recording.starttime <= config.get('tapDelay') && !recording.moved;
};


