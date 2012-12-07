define(["three", "src/FlameJet"], function(THREE, FlameJet) {
function BigFlameJet( relative_position ) {
	
	FlameJet.call( this, relative_position, globals.assets.geoms["flamejet"] );

	/*
	var spotLight = new THREE.SpotLight( 0xc3ffff )
	spotLight.castShadow = true
	spotLight.shadowMapWidth = 128
	spotLight.shadowMapHeight = 128
	spotLight.shadowCameraNear = 1.0
	spotLight.shadowCameraFar = 50
	spotLight.shadowCameraFov = 30

	this.add( spotLight );
	*/

	/*
	var pointLight = new THREE.PointLight( 0xC3FFFF, 0.1, 50 );
	pointLight.position.set( 0, -1, 0 );
	this.add( pointLight );
	*/
}
BigFlameJet.prototype = Object.create( FlameJet.prototype );

return BigFlameJet;
});
