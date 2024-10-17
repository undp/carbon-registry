# Turf JSTS

This is a treeshakend version of [JSTS](https://github.com/bjornharrtell/jsts) which only contains the subset of features require to work with Turf's modules that require JSTS (currently only `@turf/buffer`). The code is compiled to ES5 for compatibility with Turf.

This library is not intended to be used outside of Turf.

## Scripts

### Build

This uses rollup to build the bundle:

`npm run build`

### Test

This uses some basic tests to assure that the correct methods have been exported from `jsts` correctly:

`npm run test`
