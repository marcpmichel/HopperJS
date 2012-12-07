define( ["three", "physijs" ], function( THREE, Physijs ) {
function Block( position, dimensions ) {

	var _material = Physijs.createMaterial(
		new THREE.MeshLambertMaterial({ 
			ambient : 0x444444,
			color: 0xAAAAAA,
			shininess: 300,
			ambient: 0x888888,
			shading : THREE.SmoothShading,	
			map: globals.assets.textures["crate"] 
		}),
		.5, // friction
		.5 // bouncyness
	);

	if( dimensions === undefined )
		dimensions = new THREE.Vector3(2,2,2);
	if( position === undefined ) 
		position = new THREE.Vector3(6,-2.5,6);

	Physijs.BoxMesh.call( this, new THREE.CubeGeometry(dimensions.x,dimensions.y,dimensions.z), _material, 0 );
	
	this.receiveShadow = true;
	this.castShadow = true;
	this.position.copy( position );

}

Block.prototype = Object.create( Physijs.BoxMesh.prototype );

return Block;

});
