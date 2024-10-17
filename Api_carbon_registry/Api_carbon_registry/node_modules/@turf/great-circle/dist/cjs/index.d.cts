import { GeoJsonProperties, Feature, LineString, MultiLineString } from 'geojson';
import { Coord } from '@turf/helpers';

/**
 * http://turfjs.org/docs/#greatcircle
 */
declare function greatCircle(
  start: Coord,
  end: Coord,
  options?: {
    properties?: GeoJsonProperties;
    npoints?: number;
    offset?: number;
  }
): Feature<LineString | MultiLineString>;

export { greatCircle as default, greatCircle };
