import {Lightning} from "@lightningjs/sdk";

export default class Main extends Lightning.Component {
    static _template() {
        return {
            w: 1920, h: 1080, rect: true,
            colorBottom: 0xff000428, colorTop: 0xff004e92,
            Label: {
                alpha: 0.2,
                x: 960, y: 550, mount: 0.5,
                text: {
                    text: 'Automotive touch identification demo', fontSize: 60, fontFace: 'julius'
                }
            },
            Interaction: {
                alpha: 0.8,
                x: 960, y: 610, mount: 0.5,
                text: {
                    text: 'Interact with screen', fontSize: 30, fontFace: 'julius'
                }
            }
        };
    }

    _onSingleTap(recording) {
        this.tag("Interaction").text = "single tap";
    }

    _onDoubleTap(recording) {
        this.tag("Interaction").text = "double tap";
    }

    _onMultiTap(recording) {
        this.tag("Interaction").text = `${recording.fingersTouched} fingers tap`;
    }

    _onLongpress(recording) {
        this.tag("Interaction").text = `${recording.fingersTouched} fingers longpress`;
    }

    swipeLeft(rec) {
        this.handleSwipe(rec, 'left');
    }

    swipeRight(rec) {
        this.handleSwipe(rec, 'right');
    }

    swipeUp(rec) {
        this.handleSwipe(rec, 'up');
    }

    swipeDown(rec) {
        this.handleSwipe(rec, 'down');
    }

    handleSwipe(rec, dir) {
        const amount = rec.fingersTouched;
        this.tag("Interaction").text = `${amount} finger${amount > 1 ? 's' : ''} swipe ${dir}`;
    }

    _onPinch({pinch}) {
        this.tag("Interaction").text = `${pinch.distance > 0 ? 'spread' : 'pinch'}`;
    }
}



