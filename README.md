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

This Library provides examples on how to interactive with a multi-touch touchscreen. All active elements  

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