import { Feature, Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon, FeatureCollection } from 'geojson';

declare type Splitter = Feature<
  Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon
>;

/**
 * http://turfjs.org/docs/#linesplit
 */
declare function lineSplit<T extends LineString>(
  line: Feature<T> | T,
  splitter: Splitter
): FeatureCollection<T>;

export { type Splitter, lineSplit as default, lineSplit };
