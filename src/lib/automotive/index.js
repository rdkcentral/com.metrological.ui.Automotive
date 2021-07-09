import {Registry, Log, Router} from "@lightningjs/sdk";
import {Recording} from "./models";
import {analyzeEnded,resetRecordings} from "./analyzer";
import {getTouchedElements, getAllTouchedElements} from "./helpers";

let application = null;

export const initAutomotive = (app) => {
    disableBrowserBehavior();
    setup(document, app);
};

/**
 * Since every finger that touches the screen triggers it's own 'touchstart' event
 * we need to flag if one finger is already pressing the screen while the listener
 * get executed
 * @type {boolean}
 */
let touchStarted = false;

/**
 * flag if the bridge to accept new fingers on screen is open
 * @type {boolean}
 */
let bridgeOpen = true;

/**
 * The amount of milliseconds we keep the 'bridge' open for new new fingers to touch
 * the screen. All touches within the list while the bridge is open will be recorded.
 * @type {number} - milliseconds
 */
const bridgeCloseTimeout = 110;

/**
 * timeout id
 * @type {number}
 */
let bridgeTimeoutId = 0;

/**
 * Since every finger fires one 'touchstart' event we're always storing the last one fired
 * so our recording can use the touches (fingers) as it's starting point
 * @type {null}
 */
let lastTouchStartEvent = null;

/**
 * Timestamp when the first finger lands on the screen
 * @type {number}
 */
let timestampTouchStarted = 0;

/**
 * Array of recordings that is being used to analyze the users gesture
 * @type {Object}
 */
let activeRecording = {};

/**
 * Timestamp of when we last updated recording with move data
 * @type {number}
 */
let lastUpdate = 0;

/**
 * Timestamp of when we last pushed data to hold analyse9
 * @type {number}
 */
let lastHoldUpdate = 0;

/**
 * The elements that the user is holding / dragging
 * @type {Array}
 */
let stickyElements = [];

/**
 * The element that's accepting the hold / drag event
 * @type {null}
 */
let stickyElement = null;

/**
 * Elements that user last touched
 * @type {Array}
 */
let lastTouchedElements = [];

/**
 * Called when user start touching dashboard touchscreen
 * @param event
 */
const handleTouchStart = (event) => {
    if (!isTouchStarted()) {
        openBridge();
    }
    if (isBridgeOpen()) {
        lastTouchStartEvent = event;
    } else {
        Log.warn(`Not accepting new finger identifiers as long touchend hasn't fired`);
    }
};

/**
 * Called for every finger that stopped touching the screen
 * @param event
 */
const handleTouchEnd = (event) => {
    let recording = activeRecording;
    Log.info(`touchend`);
    // flag that at least one finger stopped touching the screen
    touchStarted = false;

    // if touchend occurs while bridge is still open
    // we create a new recording
    if (isBridgeOpen()) {
        // start new recording session
        recording = startRecording(lastTouchStartEvent);
        activeRecording = recording;
    }

    // store end time
    recording.endtime = Date.now();

    // start analyzing
    analyzeEnded(recording);

    // reset sticky element
    stickyElements.length = 0;
};

/**
 * Called for every move the n amount of fingers do on screen
 * @param event
 */
const handleTouchMove = (event) => {
    if(activeRecording.starttime){
        activeRecording.update(event);
    }
};


const disableBrowserBehavior = () => {
    try {
        // disable chrome scroll to refresh
        document.body.style.overscrollBehavior = 'none';

        // disable chrome contextmenu on longpress
        document.body.oncontextmenu = () => false;

        // prevent double tap zoom in on chrome
        const element = document.createElement('meta');
        element.name = 'viewport';
        element.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';

        // append meta element
        document.head.appendChild(element);
    } catch (e) {
        // silent
    }
};

/**
 * Open bridge for fingers to identify themself
 */
const openBridge = () => {
    // store timestamp
    timestampTouchStarted = Date.now();

    // flag that first finger has landed
    touchStarted = true;

    // flag bridge open
    bridgeOpen = true;

    // schedule timeout
    bridgeTimeoutId = Registry.setTimeout(
        closeBridge, bridgeCloseTimeout
    );
};

/**
 * close bridge so no new fingers can enter
 */
const closeBridge = () => {
    bridgeOpen = false;
    // start new recording session
    activeRecording = startRecording(lastTouchStartEvent);
};

/**
 * Returns a new recording session
 * @param event
 * @returns {Recording}
 */
const startRecording = (event) => {
    return new Recording(event);
};

/**
 * return if a new touchStart recording has started
 * @returns {boolean}
 */
const isTouchStarted = () => {
    return touchStarted;
};
/**
 * return if we still accept new fingers
 * @returns {boolean}
 */
const isBridgeOpen = () => {
    return bridgeOpen;
};

/**
 * Setup correct event handlers
 */
const setup = (target, app) => {
    // store Lightning.Application instance
    application = app;
    try {
        target.addEventListener('touchstart', (event) => {
            // prevent handling extra event fired by InputDevice
            // @todo: make setting for external touch device (beetronics only?)
            if (!event.sourceCapabilities) {
                handleTouchStart(event);
            }
        });
        target.addEventListener('touchend', (event) => {
            // prevent handling extra event fired by InputDevice
            // @todo: make setting for external touch device (beetronics only?)
            if (!event.sourceCapabilities) {
                handleTouchEnd(event);
            }
        });
        target.addEventListener('touchmove', (event) => {
            if (!event.sourceCapabilities) {
                handleTouchMove(event);
            }
        });
    } catch (e) {
        console.error(`Error while add correct listeners to: ${target}`);
    }
};

/**
 *
 * @param event
 * @param recording
 */
export const dispatch = (event, recording) => {
    const touched = getTouchedElements(recording.fingers);
    if(touched.length){
        touched.forEach((element)=>{
            try{
                element[event](recording)
            }catch(e){
                // silent
            }
        })
        lastTouchedElements = touched;
    }
    // clean up recording
    resetRecordings();
};

/**
 * Keep dispatching event on that we started the hold / drag on
 * @param event
 * @param recording
 */
export const sticky = (event, recording) => {
    // on first fire after a new recording has started
    // we collect the elements;
    if(!stickyElements.length){
        stickyElements = getAllTouchedElements(recording.fingers).filter((element)=>{
            return element[event];
        });
    }
    if(stickyElements.length){
        stickyElements.forEach((element)=>{
            try{
                element[event](recording)
            }catch(e){
                // silent
            }
        });
    }
}

export const getApplication = () => {
    return application;
};

export const activeTouchedElements = ()=>{
    return stickyElements;
};

export const getLastTouchedElements = ()=>{
    return lastTouchedElements;
};

