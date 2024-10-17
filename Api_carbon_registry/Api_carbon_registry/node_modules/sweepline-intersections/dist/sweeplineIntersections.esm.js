class TinyQueue {
    constructor(data = [], compare = defaultCompare) {
        this.data = data;
        this.length = this.data.length;
        this.compare = compare;

        if (this.length > 0) {
            for (let i = (this.length >> 1) - 1; i >= 0; i--) this._down(i);
        }
    }

    push(item) {
        this.data.push(item);
        this.length++;
        this._up(this.length - 1);
    }

    pop() {
        if (this.length === 0) return undefined;

        const top = this.data[0];
        const bottom = this.data.pop();
        this.length--;

        if (this.length > 0) {
            this.data[0] = bottom;
            this._down(0);
        }

        return top;
    }

    peek() {
        return this.data[0];
    }

    _up(pos) {
        const {data, compare} = this;
        const item = data[pos];

        while (pos > 0) {
            const parent = (pos - 1) >> 1;
            const current = data[parent];
            if (compare(item, current) >= 0) break;
            data[pos] = current;
            pos = parent;
        }

        data[pos] = item;
    }

    _down(pos) {
        const {data, compare} = this;
        const halfLength = this.length >> 1;
        const item = data[pos];

        while (pos < halfLength) {
            let left = (pos << 1) + 1;
            let best = data[left];
            const right = left + 1;

            if (right < this.length && compare(data[right], best) < 0) {
                left = right;
                best = data[right];
            }
            if (compare(best, item) >= 0) break;

            data[pos] = best;
            pos = left;
        }

        data[pos] = item;
    }
}

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

function checkWhichEventIsLeft (e1, e2) {
    if (e1.p.x > e2.p.x) return 1
    if (e1.p.x < e2.p.x) return -1

    if (e1.p.y !== e2.p.y) return e1.p.y > e2.p.y ? 1 : -1
    return 1
}

function checkWhichSegmentHasRightEndpointFirst (seg1, seg2) {
    if (seg1.rightSweepEvent.p.x > seg2.rightSweepEvent.p.x) return 1
    if (seg1.rightSweepEvent.p.x < seg2.rightSweepEvent.p.x) return -1

    if (seg1.rightSweepEvent.p.y !== seg2.rightSweepEvent.p.y) return seg1.rightSweepEvent.p.y < seg2.rightSweepEvent.p.y ? 1 : -1
    return 1
}

class Event {

    constructor (p, featureId, ringId, eventId) {
        this.p = {
            x: p[0],
            y: p[1]
        };
        this.featureId = featureId;
        this.ringId = ringId;
        this.eventId = eventId;

        this.otherEvent = null;
        this.isLeftEndpoint = null;
    }

    isSamePoint (eventToCheck) {
        return this.p.x === eventToCheck.p.x && this.p.y === eventToCheck.p.y
    }
}

function fillEventQueue (geojson, eventQueue) {
    if (geojson.type === 'FeatureCollection') {
        const features = geojson.features;
        for (let i = 0; i < features.length; i++) {
            processFeature(features[i], eventQueue);
        }
    } else {
        processFeature(geojson, eventQueue);
    }
}

let featureId = 0;
let ringId = 0;
let eventId = 0;
function processFeature (featureOrGeometry, eventQueue) {
    const geom = featureOrGeometry.type === 'Feature' ? featureOrGeometry.geometry : featureOrGeometry;
    let coords = geom.coordinates;
    // standardise the input
    if (geom.type === 'Polygon' || geom.type === 'MultiLineString') coords = [coords];
    if (geom.type === 'LineString') coords = [[coords]];

    for (let i = 0; i < coords.length; i++) {
        for (let ii = 0; ii < coords[i].length; ii++) {
            let currentP = coords[i][ii][0];
            let nextP = null;
            ringId = ringId + 1;
            for (let iii = 0; iii < coords[i][ii].length - 1; iii++) {
                nextP = coords[i][ii][iii + 1];

                const e1 = new Event(currentP, featureId, ringId, eventId);
                const e2 = new Event(nextP, featureId, ringId, eventId + 1);

                e1.otherEvent = e2;
                e2.otherEvent = e1;

                if (checkWhichEventIsLeft(e1, e2) > 0) {
                    e2.isLeftEndpoint = true;
                    e1.isLeftEndpoint = false;
                } else {
                    e1.isLeftEndpoint = true;
                    e2.isLeftEndpoint = false;
                }
                eventQueue.push(e1);
                eventQueue.push(e2);

                currentP = nextP;
                eventId = eventId + 1;
            }
        }
    }
    featureId = featureId + 1;
}

class Segment {

    constructor (event) {
        this.leftSweepEvent = event;
        this.rightSweepEvent = event.otherEvent;
    }
}

function testSegmentIntersect (seg1, seg2) {
    if (seg1 === null || seg2 === null) return false

    if (seg1.leftSweepEvent.ringId === seg2.leftSweepEvent.ringId &&
        (seg1.rightSweepEvent.isSamePoint(seg2.leftSweepEvent) ||
        seg1.rightSweepEvent.isSamePoint(seg2.leftSweepEvent) ||
        seg1.rightSweepEvent.isSamePoint(seg2.rightSweepEvent) ||
        seg1.leftSweepEvent.isSamePoint(seg2.leftSweepEvent) ||
        seg1.leftSweepEvent.isSamePoint(seg2.rightSweepEvent))) return false

    const x1 = seg1.leftSweepEvent.p.x;
    const y1 = seg1.leftSweepEvent.p.y;
    const x2 = seg1.rightSweepEvent.p.x;
    const y2 = seg1.rightSweepEvent.p.y;
    const x3 = seg2.leftSweepEvent.p.x;
    const y3 = seg2.leftSweepEvent.p.y;
    const x4 = seg2.rightSweepEvent.p.x;
    const y4 = seg2.rightSweepEvent.p.y;

    const denom = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
    const numeA = ((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3));
    const numeB = ((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3));

    if (denom === 0) {
        if (numeA === 0 && numeB === 0) return false
        return false
    }

    const uA = numeA / denom;
    const uB = numeB / denom;

    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        const x = x1 + (uA * (x2 - x1));
        const y = y1 + (uA * (y2 - y1));
        return [x, y]
    }
    return false
}

// import {debugEventAndSegments, debugRemovingSegment} from './debug'

function runCheck (eventQueue, ignoreSelfIntersections) {
    ignoreSelfIntersections = ignoreSelfIntersections ? ignoreSelfIntersections : false;

    const intersectionPoints = [];
    const outQueue = new TinyQueue([], checkWhichSegmentHasRightEndpointFirst);

    while (eventQueue.length) {
        const event = eventQueue.pop();
        if (event.isLeftEndpoint) {
            // debugEventAndSegments(event.p, outQueue.data)
            const segment = new Segment(event);
            for (let i = 0; i < outQueue.data.length; i++) {
                const otherSeg = outQueue.data[i];
                if (ignoreSelfIntersections) {
                    if (otherSeg.leftSweepEvent.featureId === event.featureId) continue
                }
                const intersection = testSegmentIntersect(segment, otherSeg);
                if (intersection !== false) intersectionPoints.push(intersection);
            }
            outQueue.push(segment);
        } else if (event.isLeftEndpoint === false) {
            outQueue.pop();
            // const seg = outQueue.pop()
            // debugRemovingSegment(event.p, seg)
        }
    }
    return intersectionPoints
}

function sweeplineIntersections (geojson, ignoreSelfIntersections) {
    const eventQueue = new TinyQueue([], checkWhichEventIsLeft);
    fillEventQueue(geojson, eventQueue);
    return runCheck(eventQueue, ignoreSelfIntersections)
}

export default sweeplineIntersections;
