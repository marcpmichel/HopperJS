define( [ "three", "physijs" ], function( THREE, Physijs ) {
function Monolith() {

	var _material = Physijs.createMaterial(
		new THREE.MeshLambertMaterial({ color:0x000000	}),
		.5, // friction
		.5 // bouncyness
	);
	Physijs.BoxMesh.call( this, new THREE.CubeGeometry(1,9,4), _material, 0 );
	
	this.receiveShadow = true;
	this.castShadow = true;
	this.position.set(4, 0, 4);

}

Monolith.prototype = Object.create( Physijs.BoxMesh.prototype );
return Monolith;
});
