'use strict';

var ndarray = require('ndarray');

module.exports = function(game, opts) {
  return new Flatland(game, opts);
};
module.exports.pluginInfo = {
  loadAfter: ['voxel-registry']
};

function Flatland(game, opts) {
  this.game = game;

  this.registry = game.plugins.get('voxel-registry');
  if (!this.registry) throw new Error('voxel-flatland requires voxel-registry plugin');

  this.block = opts.block;
  if (!this.block) throw new Error('voxel-flatland requires block option');

  this.enable();
}

Flatland.prototype.enable = function() {
  this.game.voxels.on('missingChunk', this.onMissingChunk = this.missingChunk.bind(this));
};

Flatland.prototype.disable = function() {
  this.game.voxels.removeListener('missingChunk', this.onMissingChunk);
};


Flatland.prototype.missingChunk = function(position) {
  console.log('missingChunk',position);

  if (position[1] !== 0) return; // everything besides y=0 is all air, above and below

  var blockIndex = this.registry.getBlockIndex(this.block);
  if (!blockIndex) {
    throw new Error('voxel-flatland unable to find block of name: '+this.block);
  };

  var width = this.game.chunkSize;
  var pad = this.game.chunkPad;
  var arrayType = this.game.arrayType;

  var buffer = new ArrayBuffer((width+pad) * (width+pad) * (width+pad) * arrayType.BYTES_PER_ELEMENT);
  var voxelsPadded = ndarray(new arrayType(buffer), [width+pad, width+pad, width+pad]);
  var h = pad >> 1;
  var voxels = voxelsPadded.lo(h,h,h).hi(width,width,width);

  for (var x = 0; x < this.game.chunkSize; ++x) {
    for (var z = 0; z < this.game.chunkSize; ++z) {
      for (var y = 0; y < this.game.chunkSize; ++y) {
        voxels.set(x,y,z, blockIndex);
      }
    }
  }

  var chunk = voxelsPadded;
  chunk.position = position;

  console.log('about to showChunk',chunk);
  this.game.showChunk(chunk);
};
