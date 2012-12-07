define(["three"], function( THREE ) {
function FlameJet( relative_position, geom ) {

	THREE.Mesh.call( this, geom, new THREE.MeshFaceMaterial() );

	this.castShadow = false;
	this.receiveShadow = false;
	this.position.copy( relative_position );

	this.hide = function() {
		// this.visible = false; // doesn't work for child objects
		// this.material.visible = false; // doesn't work either
		// this.scale = 0.01; // not any better.
	}
	this.show = function() {
		// this.visible = true;
		// this.material.visible = true; 
		// this.scale = 1.0;
	}
}

FlameJet.prototype = Object.create( THREE.Mesh.prototype );
return FlameJet;
});


