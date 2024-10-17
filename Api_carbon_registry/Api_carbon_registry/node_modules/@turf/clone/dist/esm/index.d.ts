import { GeoJsonProperties } from 'geojson';
import { AllGeoJSON } from '@turf/helpers';

/**
 * Returns a cloned copy of the passed GeoJSON Object, including possible 'Foreign Members'.
 * ~3-5x faster than the common JSON.parse + JSON.stringify combo method.
 *
 * @name clone
 * @param {GeoJSON} geojson GeoJSON Object
 * @returns {GeoJSON} cloned GeoJSON Object
 * @example
 * var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]], {color: 'red'});
 *
 * var lineCloned = turf.clone(line);
 */
declare function clone<T extends AllGeoJSON>(geojson: T): T;
/**
 * Clone Properties
 *
 * @private
 * @param {Object} properties GeoJSON Properties
 * @returns {Object} cloned Properties
 */
declare function cloneProperties(properties: GeoJsonProperties): {
    [key: string]: any;
};

export { clone, cloneProperties, clone as default };
