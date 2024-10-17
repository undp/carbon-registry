import { Feature, LineString, Position } from 'geojson';

/**
 * Takes a ring and return true or false whether or not the ring is clockwise or counter-clockwise.
 *
 * @name booleanClockwise
 * @param {Feature<LineString>|LineString|Array<Array<number>>} line to be evaluated
 * @returns {boolean} true/false
 * @example
 * var clockwiseRing = turf.lineString([[0,0],[1,1],[1,0],[0,0]]);
 * var counterClockwiseRing = turf.lineString([[0,0],[1,0],[1,1],[0,0]]);
 *
 * turf.booleanClockwise(clockwiseRing)
 * //=true
 * turf.booleanClockwise(counterClockwiseRing)
 * //=false
 */
declare function booleanClockwise(line: Feature<LineString> | LineString | Position[]): boolean;

export { booleanClockwise, booleanClockwise as default };
