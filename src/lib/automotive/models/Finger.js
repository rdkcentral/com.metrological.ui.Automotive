import {Vector} from "./index";

export default class Finger {
    constructor(data) {
        this._identifier = data.identifier;
        this._startPosition = new Vector(data.screenX, data.screenY);
        this._currentPosition = this._startPosition;
        this._delta = new Vector(0.0, 0.0);
        this._moveRegistered = false;
        this._moved = false;
    }

    update(data) {
        this._currentPosition = new Vector(data.screenX, data.screenY);
        this._delta = this._currentPosition.subtract(
            this._startPosition
        );

        if (Math.abs(this._delta.x) > 40 || Math.abs(this._delta.y) > 40) {
            if (!this._moveRegistered) {
                this._moved = true;
            }
        }
    }

    get moved() {
        return this._moved;
    }

    get identifier() {
        return this._identifier;
    }

    get start() {
        return this._startPosition;
    }

    get end() {
        return this._currentPosition;
    }

    get position(){
        return this._currentPosition;
    }

    get delta() {
        return this._delta;
    }
}