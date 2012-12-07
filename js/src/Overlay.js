define( ["three"], function( THREE ) {
function Overlay() {

	this.scene = new THREE.Scene();

	this.camera = new THREE.PerspectiveCamera( 60, 5/4, 0.1, 100 );
	this.camera.position.set( 0, 1.0, -4 );
	// this.camera = new THREE.OrthographicCamera( -100, 100, 100, -100, 0.1, 100 );
	// this.camera.position.set( 0, 0.5, -50 );

	this.camera.lookAt( new THREE.Vector3(0,0,0) );
	this.scene.add( this.camera );
	this.scene.add( new THREE.AxisHelper(2));

	// this.renderer = new THREE.WebGLRenderer(); // it seems we can't have 2 of these 
	this.renderer = new THREE.CanvasRenderer();
	this.renderer.setSize(200,200); 

	var overlayCanvasContainer = document.getElementById("orientation");
	overlayCanvasContainer.appendChild( this.renderer.domElement );

	this.render = function() {
		this.renderer.render( this.scene, this.camera );	
	}

}
return Overlay;
});
