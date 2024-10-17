import { BBox, Position, FeatureCollection, Point, Polygon, LineString } from 'geojson';

/**
 * Returns a random position within a {@link bounding box}.
 *
 * @name randomPosition
 * @param {Array<number>} [bbox=[-180, -90, 180, 90]] a bounding box inside of which positions are placed.
 * @returns {Array<number>} Position [longitude, latitude]
 * @throws {Error} if bbox is invalid
 * @example
 * var position = turf.randomPosition([-180, -90, 180, 90])
 * // => position
 */
declare function randomPosition(bbox?: BBox | {
    bbox: BBox;
}): Position;
/**
 * Returns a random {@link point}.
 *
 * @name randomPoint
 * @param {number} [count=1] how many geometries will be generated
 * @param {Object} [options={}] Optional parameters
 * @param {Array<number>} [options.bbox=[-180, -90, 180, 90]] a bounding box inside of which geometries are placed.
 * @returns {FeatureCollection<Point>} GeoJSON FeatureCollection of points
 * @throws {Error} if bbox is invalid
 * @example
 * var points = turf.randomPoint(25, {bbox: [-180, -90, 180, 90]})
 * // => points
 */
declare function randomPoint(count?: number, options?: {
    bbox?: BBox;
}): FeatureCollection<Point, any>;
/**
 * Returns a random {@link polygon}.
 *
 * @name randomPolygon
 * @param {number} [count=1] how many geometries will be generated
 * @param {Object} [options={}] Optional parameters
 * @param {Array<number>} [options.bbox=[-180, -90, 180, 90]] a bounding box inside of which geometries are placed.
 * @param {number} [options.num_vertices=10] is how many coordinates each LineString will contain.
 * @param {number} [options.max_radial_length=10] is the maximum number of decimal degrees latitude or longitude that a
 * vertex can reach out of the center of the Polygon.
 * @returns {FeatureCollection<Polygon>} GeoJSON FeatureCollection of polygons
 * @throws {Error} if bbox is invalid
 * @example
 * var polygons = turf.randomPolygon(25, {bbox: [-180, -90, 180, 90]})
 * // => polygons
 */
declare function randomPolygon(count?: number, options?: {
    bbox?: BBox;
    num_vertices?: number;
    max_radial_length?: number;
}): FeatureCollection<Polygon, any>;
/**
 * Returns a random {@link linestring}.
 *
 * @name randomLineString
 * @param {number} [count=1] how many geometries will be generated
 * @param {Object} [options={}] Optional parameters
 * @param {Array<number>} [options.bbox=[-180, -90, 180, 90]] a bounding box inside of which geometries are placed.
 * @param {number} [options.num_vertices=10] is how many coordinates each LineString will contain.
 * @param {number} [options.max_length=0.0001] is the maximum number of decimal degrees that a
 * vertex can be from its predecessor
 * @param {number} [options.max_rotation=Math.PI / 8] is the maximum number of radians that a
 * line segment can turn from the previous segment.
 * @returns {FeatureCollection<LineString>} GeoJSON FeatureCollection of linestrings
 * @throws {Error} if bbox is invalid
 * @example
 * var lineStrings = turf.randomLineString(25, {bbox: [-180, -90, 180, 90]})
 * // => lineStrings
 */
declare function randomLineString(count?: number, options?: {
    bbox?: BBox;
    num_vertices?: number;
    max_length?: number;
    max_rotation?: number;
}): FeatureCollection<LineString, any>;

export { randomLineString, randomPoint, randomPolygon, randomPosition };
