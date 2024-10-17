import { FeatureCollection, Feature, GeometryObject } from "geojson";

export type Intersection = [number, number];

export default function sweeplineIntersections(
  geojson: FeatureCollection<GeometryObject> | Feature<GeometryObject>,
  ignoreSelfIntersections: boolean
): Intersection[];
