# voxel-flatland

Simple flat land terrain generator (voxel.js plugin)

![screenshot](http://imgur.com/T3m4fkX.png "Screenshot")

## Usage

Requires [voxel-registry](https://github.com/voxel/voxel-registry). Load with [voxel-plugins](https://github.com/voxel/voxel-plugins), options:

`block` (required): name of a block to fill the terrain with, for example `bedrock` (provided by [voxel-bedrock](https://github.com/voxel/voxel-bedrock).

The voxel-engine-stackgl game options should have `generateChunks: false`. voxel-flatland
will listen on `game.voxel` for the `missingChunk` event and generate the new
chunks. The generator can be unregistered by disabling the plugin.

## How it works

Listens for `missingChunk` events from `game.voxels` (emitted by
[voxel](https://github.com/maxogden/voxel), accessed via the [voxel-engine-stackgl](https://github.com/voxel/voxel-engine-stackgl)
game instance), then calls `game.showChunk` with the voxel chunk array data.

Chunks at y=0 and below are filled entirely with the given block.
Chunks above y=0 are left empty (air, not generated).

## See also

* [voxel-land](https://github.com/voxel/voxel-land), a more sophisticated terrain generation example
* [another terrain generation example](https://github.com/deathcap/voxel-example/issues/6)
* [voxel-example](https://github.com/voxel/voxel-example)

## License

MIT

