define(["three"], function( THREE) {
function Corridors() {

	var WIDTH = 9;

	var BLOCK_SIZE = 8;
	var block_dimensions = new THREE.Vector3( BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE );

	var world_offset = new THREE.Vector3( 10,10,10 );

	var blocks=[];
	for( var i=0; i<WIDTH; i++ ) {
		blocks.push( createBlockLayer() );
	}

	function createBlockLayer() {
		var layer=[];
		for(var i=0; i<WIDTH; i++ ) {
			layer.push( createBlockRow() );
		}
		return layer;
	}

	function createBlockRow( layer ) {
		var row=[];
		for( var i=0; i<WIDTH; i++ ) {
			row.push(false);
		}
		return row;
	}

	for( var i=0; i<WIDTH; i++ ) {
		blocks[4][i][4] = true;
	}

	var createBlock = function(x,y,z) {
		var position = new THREE.Vector3(
			x*BLOCK_SIZE + world_offset.x, 
			y*BLOCK_SIZE + world_offset.y, 
			z*BLOCK_SIZE + world_offset.z ); 
		return new Block( position, block_dimensions );
	}

}
return Corridors;
});
