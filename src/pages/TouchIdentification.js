import {Lightning} from "@lightningjs/sdk";
import {Automotive} from "@lightningjs/automotive";

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
                x: 960, y: 610, mountX: 0.5,
                text: {
                    text: 'Interact with screen', fontSize: 30, fontFace: 'julius', textAlign:'center', lineHeight:50
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

    _onSwipeLeft(rec) {
        this.handleSwipe(rec, 'left');
    }

    _onSwipeRight(rec) {
        this.handleSwipe(rec, 'right');
    }

    _onSwipeUp(rec) {
        this.handleSwipe(rec, 'up');
    }

    _onSwipeDown(rec) {
        this.handleSwipe(rec, 'down');
    }

    handleSwipe(rec, dir) {
        const amount = rec.fingersTouched;
        const forceX = Automotive.getHorizontalForce(rec.firstFinger);
        const forceY = Automotive.getVerticalForce(rec.firstFinger);

        this.tag("Interaction").text = [
            `${amount} finger${amount > 1 ? 's' : ''} swipe ${dir}`,
            `force x: ${parseFloat(forceX).toFixed(6)}`,
            `force y: ${parseFloat(forceY).toFixed(6)}`
        ].join('\n');
    }

    _onPinch({pinch}) {
        this.tag("Interaction").text = `${pinch.distance > 0 ? 'spread' : 'pinch'}`;
    }
}



