# AutoMotive

## com.metrological.ui.Automotive

### Getting started

> Before you follow the steps below, make sure you have the
[Lightning-CLI](https://rdkcentral.github.io/Lightning-CLI/#/) installed _globally_ only your system

```
npm install -g @lightningjs/cli
```

#### Running the App

1. Install the NPM dependencies by running `npm install`

2. Build the App using the _Lightning-CLI_ by running `lng build` inside the root of your project

3. Fire up a local webserver and open the App in a browser by running `lng serve` inside the root of your project

#### Developing the App

During development you can use the **watcher** functionality of the _Lightning-CLI_.

- use `lng watch` to automatically _rebuild_ your App whenever you make a change in the `src` or  `static` folder
- use `lng dev` to start the watcher and run a local webserver / open the App in a browser _at the same time_

#### Documentation

This Library provides examples on how to build interactivity for a multi-touch touchscreen. The library
records and analyzes all fingers and it's movement ( there seems to be a hard limit in browser that it tacks max 10 fingers)

Once the analyser recognizes a gesture it tries to dispatch that event on one of the active touched elements.

### Available events

#### _onSingleTap()

Will be called when one finger quickly touches this element

#### _onMultiTap()

Will be called when mutliple fingers quickly touches this element

#### _onDoubleTap()

When one finger quickly double taps the same element

#### _onLongpress()

Will be invoked if one or more fingers are pressing this element for < 800ms. For  now the recording data holds data for all the fingers so it could be that 3 fingers are touching 3 individual elements they all receive

#### _onDrag()

Will be invoked when you touch an element and start moving your finger

#### _onDragEnd()

When you stop dragging an element

---

### Platform settings:

##### bridgeCloseTimeout

The amount of milliseconds we keep the 'bridge' open for new new fingers to touch
the screen. All touches within the list while the bridge is open will be recorded.


##### tapDelay
Max Amount of milliseconds between touchstart / end to be flagged


##### beforeDoubleTapDelay

Max amount of milliseconds that a touchstart can start after a tap flag to be flagged as a double tap

##### flagAsHoldDelay

Amount of milliseconds that need to be passed to start flagging recording as a hold; for drag / pinch / long hold

##### distanceHorizontalSwipe

Minimal amount of pixel one or more fingers need to travel before it's gets recognized as a horizontal swipe

##### distanceVerticalSwipe

Minimal amount of pixel one or more fingers need to travel before it's gets recognized as a vertical swipe