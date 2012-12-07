define( [
	"three",
	"physijs",
	"src/Level",
	"src/Camera",
	"src/Sun",
	"src/Ship",
	"src/ShipOrientation"
], function( THREE, Physijs, Level, Camera, Sun, Ship, ShipOrientation ) {

function World() {

	var self = this;

	var ORIENTATION_INC = 0.025;
	var GRAVITY_POWER = 10;

	this.scene = new Physijs.Scene;
	this.scene.setGravity(new THREE.Vector3( 0, -GRAVITY_POWER, 0 ));
	this.scene.addEventListener( 'update', function() {
		self.update();
	});

	var level = new Level(this.scene);

	this.ship = level.ship;

	var shipOrientation = new ShipOrientation();
	// this.scene.add(shipOrientation);
	globals.overlay.scene.add( shipOrientation );

	this.camera = new Camera();

	this.scene.simulate(undefined, 1);


	this.update = function() {
		manageInputs();
		updateEntities();
	}

	function manageInputs() {

		if( globals.keyboard.pressed("space")) self.ship.thrust();
		if( globals.keyboard.pressed("left")) shipOrientation.incRoll(-ORIENTATION_INC);
		if( globals.keyboard.pressed("right")) shipOrientation.incRoll(ORIENTATION_INC);
		if( globals.keyboard.pressed("up")) shipOrientation.incPitch(ORIENTATION_INC);
		if( globals.keyboard.pressed("down")) shipOrientation.incPitch(-ORIENTATION_INC);
		if( globals.keyboard.pressed("d")) shipOrientation.incYaw(-ORIENTATION_INC);
		if( globals.keyboard.pressed("q")) shipOrientation.incYaw(ORIENTATION_INC);
		if( globals.keyboard.pressed("a")) self.camera.pitchUp();
		if( globals.keyboard.pressed("w")) self.camera.pitchDown();
		
		if( globals.keyboard.pressed("r")) { 
			shipOrientation.resetPitchRoll(); 
			self.ship.recover(); 
		}

	}

	function updateEntities() {
		shipOrientation.update();
		// shipOrientation.setPosition( self.ship.position );
		self.ship.update(shipOrientation);
		self.camera.update( self.ship, shipOrientation.yaw );
		level.sun.follow( self.ship ); 
		self.scene.simulate( undefined, 1 );
	}

}
return World;
}); // ] requirejs

