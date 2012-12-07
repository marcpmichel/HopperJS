define(["three"], function( THREE ) {

function Sun() {

	var amb = new THREE.AmbientLight( 0x0A0A0A );

	var color = 0xFFFFFF;
	var intensity = 1;
	var distance = 10;
	THREE.DirectionalLight.call( this, color, intensity, distance );

	var SHADOW_WIDTH = 15;

	this.position.set(-5,15,5);
	this.castShadow = true;
	this.shadowDarkness = 0.5;
	this.shadowCameraRight = SHADOW_WIDTH;
	this.shadowCameraLeft = -SHADOW_WIDTH;
	this.shadowCameraTop = SHADOW_WIDTH;
	this.shadowCameraBottom = -SHADOW_WIDTH;
	this.shadowCameraNear = 0.1;
	this.shadowCameraVisible = false;

	this.ambientLight = function() {
		return amb;
	}

	this.follow = function( obj ) {
		this.position.set( obj.position.x - 5, obj.position.y + 15, obj.position.z + 5 );
		this.target = obj;	
	}
		
}
Sun.prototype = Object.create( THREE.DirectionalLight.prototype );
return Sun;
});
