define(["three","src/FlameJet"], function( THREE, FlameJet ) {
function SmallFlameJet( relative_position ) {

	// var geom =  new THREE.CylinderGeometry( 
	// 	0 /*top radius*/, 
	// 	0.1 /*botton radius */, 
	// 	0.2 /*height*/, 
	// 	3/*radius segments*/, 
	// 	1 /* height segments*/ 
	// );

	// FlameJet.call( this, relative_position, geom );
	FlameJet.call( this, relative_position, globals.assets.geoms["flamejet"] );

}
SmallFlameJet.prototype = Object.create( FlameJet.prototype );
return SmallFlameJet;
});

