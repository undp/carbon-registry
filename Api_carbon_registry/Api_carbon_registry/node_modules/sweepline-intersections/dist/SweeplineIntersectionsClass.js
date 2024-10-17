(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.sweeplineIntersections = factory());
}(this, (function () { 'use strict';

    var TinyQueue = function TinyQueue(data, compare) {
        if ( data === void 0 ) data = [];
        if ( compare === void 0 ) compare = defaultCompare;

        this.data = data;
        this.length = this.data.length;
        this.compare = compare;

        if (this.length > 0) {
            for (var i = (this.length >> 1) - 1; i >= 0; i--) { this._down(i); }
        }
    };

    TinyQueue.prototype.push = function push (item) {
        this.data.push(item);
        this.length++;
        this._up(this.length - 1);
    };

    TinyQueue.prototype.pop = function pop () {
        if (this.length === 0) { return undefined; }

        var top = this.data[0];
        var bottom = this.data.pop();
        this.length--;

        if (this.length > 0) {
            this.data[0] = bottom;
            this._down(0);
        }

        return top;
    };

    TinyQueue.prototype.peek = function peek () {
        return this.data[0];
    };

    TinyQueue.prototype._up = function _up (pos) {
        var ref = this;
            var data = ref.data;
            var compare = ref.compare;
        var item = data[pos];

        while (pos > 0) {
            var parent = (pos - 1) >> 1;
            var current = data[parent];
            if (compare(item, current) >= 0) { break; }
            data[pos] = current;
            pos = parent;
        }

        data[pos] = item;
    };

    TinyQueue.prototype._down = function _down (pos) {
        var ref = this;
            var data = ref.data;
            var compare = ref.compare;
        var halfLength = this.length >> 1;
        var item = data[pos];

        while (pos < halfLength) {
            var left = (pos << 1) + 1;
            var best = data[left];
            var right = left + 1;

            if (right < this.length && compare(data[right], best) < 0) {
                left = right;
                best = data[right];
            }
            if (compare(best, item) >= 0) { break; }

            data[pos] = best;
            pos = left;
        }

        data[pos] = item;
    };

    function defaultCompare(a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    }

    function checkWhichEventIsLeft (e1, e2) {
        if (e1.p.x > e2.p.x) { return 1 }
        if (e1.p.x < e2.p.x) { return -1 }

        if (e1.p.y !== e2.p.y) { return e1.p.y > e2.p.y ? 1 : -1 }
        return 1
    }

    function checkWhichSegmentHasRightEndpointFirst (seg1, seg2) {
        if (seg1.rightSweepEvent.p.x > seg2.rightSweepEvent.p.x) { return 1 }
        if (seg1.rightSweepEvent.p.x < seg2.rightSweepEvent.p.x) { return -1 }

        if (seg1.rightSweepEvent.p.y !== seg2.rightSweepEvent.p.y) { return seg1.rightSweepEvent.p.y < seg2.rightSweepEvent.p.y ? 1 : -1 }
        return 1
    }

    var Event = function Event (p, featureId, ringId, eventId) {
        this.p = {
            x: p[0],
            y: p[1]
        };
        this.featureId = featureId;
        this.ringId = ringId;
        this.eventId = eventId;

        this.otherEvent = null;
        this.isLeftEndpoint = null;
    };

    Event.prototype.isSamePoint = function isSamePoint (eventToCheck) {
        return this.p.x === eventToCheck.p.x && this.p.y === eventToCheck.p.y
    };

    function fillEventQueue (geojson, eventQueue) {
        if (geojson.type === 'FeatureCollection') {
            var features = geojson.features;
            for (var i = 0; i < features.length; i++) {
                processFeature(features[i], eventQueue);
            }
        } else {
            processFeature(geojson, eventQueue);
        }
    }

    var featureId = 0;
    var ringId = 0;
    var eventId = 0;
    function processFeature (featureOrGeometry, eventQueue) {
        var geom = featureOrGeometry.type === 'Feature' ? featureOrGeometry.geometry : featureOrGeometry;
        var coords = geom.coordinates;
        // standardise the input
        if (geom.type === 'Polygon' || geom.type === 'MultiLineString') { coords = [coords]; }
        if (geom.type === 'LineString') { coords = [[coords]]; }

        for (var i = 0; i < coords.length; i++) {
            for (var ii = 0; ii < coords[i].length; ii++) {
                var currentP = coords[i][ii][0];
                var nextP = null;
                ringId = ringId + 1;
                for (var iii = 0; iii < coords[i][ii].length - 1; iii++) {
                    nextP = coords[i][ii][iii + 1];

                    var e1 = new Event(currentP, featureId, ringId, eventId);
                    var e2 = new Event(nextP, featureId, ringId, eventId + 1);

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

    var Segment = function Segment (event) {
        this.leftSweepEvent = event;
        this.rightSweepEvent = event.otherEvent;
    };

    function testSegmentIntersect (seg1, seg2) {
        if (seg1 === null || seg2 === null) { return false }

        if (seg1.leftSweepEvent.ringId === seg2.leftSweepEvent.ringId &&
            (seg1.rightSweepEvent.isSamePoint(seg2.leftSweepEvent) ||
            seg1.rightSweepEvent.isSamePoint(seg2.leftSweepEvent) ||
            seg1.rightSweepEvent.isSamePoint(seg2.rightSweepEvent) ||
            seg1.leftSweepEvent.isSamePoint(seg2.leftSweepEvent) ||
            seg1.leftSweepEvent.isSamePoint(seg2.rightSweepEvent))) { return false }

        var x1 = seg1.leftSweepEvent.p.x;
        var y1 = seg1.leftSweepEvent.p.y;
        var x2 = seg1.rightSweepEvent.p.x;
        var y2 = seg1.rightSweepEvent.p.y;
        var x3 = seg2.leftSweepEvent.p.x;
        var y3 = seg2.leftSweepEvent.p.y;
        var x4 = seg2.rightSweepEvent.p.x;
        var y4 = seg2.rightSweepEvent.p.y;

        var denom = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
        var numeA = ((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3));
        var numeB = ((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3));

        if (denom === 0) {
            if (numeA === 0 && numeB === 0) { return false }
            return false
        }

        var uA = numeA / denom;
        var uB = numeB / denom;

        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
            var x = x1 + (uA * (x2 - x1));
            var y = y1 + (uA * (y2 - y1));
            return [x, y]
        }
        return false
    }

    // import {debugEventAndSegments, debugRemovingSegment} from './debug'

    function runCheck (eventQueue, ignoreSelfIntersections) {
        ignoreSelfIntersections = ignoreSelfIntersections ? ignoreSelfIntersections : false;

        var intersectionPoints = [];
        var outQueue = new TinyQueue([], checkWhichSegmentHasRightEndpointFirst);

        while (eventQueue.length) {
            var event = eventQueue.pop();
            if (event.isLeftEndpoint) {
                // debugEventAndSegments(event.p, outQueue.data)
                var segment = new Segment(event);
                for (var i = 0; i < outQueue.data.length; i++) {
                    var otherSeg = outQueue.data[i];
                    if (ignoreSelfIntersections) {
                        if (otherSeg.leftSweepEvent.featureId === event.featureId) { continue }
                    }
                    var intersection = testSegmentIntersect(segment, otherSeg);
                    if (intersection !== false) { intersectionPoints.push(intersection); }
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

    var SweeplineIntersections = function SweeplineIntersections () {
        this._eventQueue = new TinyQueue([], checkWhichEventIsLeft);
    };

    SweeplineIntersections.prototype.addData = function addData (geojson, alternateEventQueue) {
        if (alternateEventQueue !== undefined) {
            var newQueue = new TinyQueue([], checkWhichEventIsLeft);
            for (var i = 0; i < alternateEventQueue.length; i++) {
                newQueue.push(alternateEventQueue.data[i]);
            }
            this._eventQueue = newQueue;
        }
        fillEventQueue(geojson, this._eventQueue);
    };

    SweeplineIntersections.prototype.cloneEventQueue = function cloneEventQueue () {
        var newQueue = new TinyQueue([], checkWhichEventIsLeft);
        for (var i = 0; i < this._eventQueue.length; i++) {
            newQueue.push(this._eventQueue.data[i]);
        }
        return newQueue
    };

    SweeplineIntersections.prototype.getIntersections = function getIntersections (ignoreSelfIntersections) {
        return runCheck(this._eventQueue, ignoreSelfIntersections)
    };

    return SweeplineIntersections;

})));
