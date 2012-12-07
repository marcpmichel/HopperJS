define(["three", "physijs" ], function( THREE, Physijs) {
function Ground() {

	var _geometry = new THREE.CubeGeometry(100,1,100);

	var _material = Physijs.createMaterial(
		new THREE.MeshLambertMaterial({
			ambient		: 0x444444,
			color		: 0x8844AA,
			shininess	: 300, 
			specular	: 0x33AA33,
			shading		: THREE.SmoothShading,
			map			: globals.assets.textures["grid"]
		}),
		.8, // high friction
		.3 // low restitution
	);

	Physijs.BoxMesh.call( this, _geometry, _material, 0 /* mass */ );
	this.receiveShadow = true;
	this.position.y = -4;
}

Ground.prototype = Object.create( Physijs.BoxMesh.prototype );

return Ground;
});
