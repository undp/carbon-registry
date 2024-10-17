# sweepline-intersections
A small and fast module using a sweepline algorithm to detect intersections between polygons and/or polylines.

## Documentation

### Install
````
npm install sweepline-intersections
````

### Basic Use
Valid inputs: Geojson `Feature` or `Geometry` including `Polygon`, `LineString`, `MultiPolygon`, `MultiLineString`, as well as `FeatureCollection`.

Returns an array of intersection points eg, [[x1, y1], [x2, y2]] 

````js
    const findIntersections = require('sweepline-intersections')

    const box = {type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]}
    const intersections = findIntersections(box)
    // returns an array of self-intersection points
````

Also accepts an optional boolean argument second which when set to true means the module won't detect self-intersections and will only report intersections between different features. This defaults to false.
eg 
````js
    const findIntersections = require('sweepline-intersections')
    const intersectionsBetweenFeature = findIntersections(featureCollection, true)
    // returns an array of intersection points between features
````

### Complex Use
This library also provide a class-based approach which is helpful if you want to check multiple geometries against a single geometry. This allows you to save the state of the initial event queue with the primary geometry.

````js
    import SweeplineIntersectionsClass from 'sweepline-intersections/dist/SweeplineIntersectionsClass'

    // create the base instance
    const sl = new SweeplineIntersectionsClass()
    // populate the event queue with your primary geometry
    sl.addData(largeGeoJson)
    // clone the event queue in the original state so you can reuse it
    const origQueue = sl.cloneEventQueue()

    // now you can iterate through some other set of features saving
    // the overhead of having to populate the complete queue multiple times
    someOtherFeatureCollection.features.forEach(feature => {
        // add another feature to test against your original data
        sl.addData(feature, origQueue)
        // check if those two features intersect
        // add an optional boolean argument to ignore self-intersections 
        const intersectionPoints = sl.getIntersections(true)
    })
````

#### API
`new SweeplineIntersectionsClass()` - creates a new instance

`.addData(geojson, existingQueue)` - add geojson to the event queue. The second argument for an `existingQueue` is optional, and takes a queue generated from `.cloneEventQueue()`

`.cloneEventQueue()` - clones the state of the existing event queue that's been populated with geojson. Returns a queue that you can pass to the `addData` method

`.getIntersections(ignoreSelfIntersections)` - Checks for segment intersections. Accepts an optional boolean argument to ignore self intersections are only report intersections between features.


## Benchmarks
Tested against 
- bentley-ottmann-intersections - https://www.npmjs.com/package/bentley-ottmann-intersections
- gpsi - https://www.npmjs.com/package/geojson-polygon-self-intersections
- isects - https://www.npmjs.com/package/2d-polygon-self-intersections
````
// Switzerland (~700 vertices)
// gpsi x 37.05 ops/sec ±1.77% (49 runs sampled)
// bentleyOttmann x 2,010 ops/sec ±1.52% (89 runs sampled)
// sweepline x 2,621 ops/sec ±0.29% (95 runs sampled)
// isects x 14.29 ops/sec ±2.16% (40 runs sampled)
// - Fastest is sweepline (this library)

// Simple Case (6 vertices)
// gpsi x 246,512 ops/sec ±1.23% (90 runs sampled)
// bentleyOttmann x 546,326 ops/sec ±0.66% (92 runs sampled)
// sweepline x 1,157,425 ops/sec ±1.04% (94 runs sampled)
// - Fastest is sweepline (this library)

// Chile - Vertical geometry (17,000 vertices)
// bentleyOttmann x 50.22 ops/sec ±1.75% (65 runs sampled)
// sweepline x 35.64 ops/sec ±1.20% (62 runs sampled)
// - Fastest is bentleyOttmann (although it doesn't find intersection)
````

## Contributing
- For a live dev server run `npm run debug`. 
  - The geometry being tested can be modified in `debug/src/App.vue`
- There are a couple of test suites
  - `npm run test` runs all tests
  - `npm run test:e2e` does a general test that the correct number of self-intersections are found in the `test/fixtures` folder
  - `npm run test:unit` is unit style tests to make sure functions & methods do the right thing
    - these need some love


## Algorithm notes
The basic concept of this algorithm is based on a sweepline. Where this algorithm differs from the [bentley-ottmann algorithm](https://en.wikipedia.org/wiki/Bentley%E2%80%93Ottmann_algorithm) is that there is no use of a tree data structure to store the segments. The reason for the modification is because if you are dealing with polygons or polylines (rather than a random group of line segments) there is a reasonable assumption that there are going to be very few segments that lie on the same x plane.

Removing the tree structure greatly simplifies the code. The tree structure is replaced with a priority queue of segments which is sorted by the x vertex of the right endpoint of the segments. A priority queue is already used to sort the vertices which means only 1 data structure is required.

The package size of this module is 3kb compared to my implementation of the bentley-ottmann algorithm which is 16kb while performance is typically faster than bentley-ottmann. 

Bentley-ottman only outperforms this library when there are several thousands vertices, however I'm also less confident in the results of my bentley-ottman lib as it occassionally misses intersections and is much harder to write tests for due to the more complex logic.


### Algorithm Steps
- Vertices are entered into a priority queue sorted from left to right
- An empty priority queue is created to store segments encountered
- An item is removed from the priority queue
    - If the vertex is the left endpoint of a segment, we test it against every other segment in the segment queue for intersections with any intersection recorded. We then add the vertex (and it's associated right endpoint) to the segment queue.
    - When we encounter a right endpoint we remove the first item from the segment queue.

Each pair of segments are only tested once. And only segments that overlap on the x plane are tested against each other.
