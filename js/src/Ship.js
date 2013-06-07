define( ["three","physijs","src/BigFlameJet"], function( THREE, Physijs, BigFlameJet ) {
function Ship() {

	var _geom = globals.assets.geoms["ship"];

	var _phys_material = Physijs.createMaterial( 
		new THREE.MeshFaceMaterial(),
		.8,
		.6
	);

	Physijs.BoxMesh.call( this, _geom, _phys_material, 1 );
	
	var self = this;
	
	var mainFlameJet = new BigFlameJet( new THREE.Vector3( 0, -0.8, 0 ));
	this.add( mainFlameJet );

	var TORQUE_POWER = 4.0;
	var TORQUE_POWER_RECOVER = 24.0;
	var TORQUE_THRESHOLD = 5.0 * Math.PI / 180.0;

	var THRUST_POWER = 40.0;
	var THRUST_FORCE = new THREE.Vector3( 0, THRUST_POWER, 0 );

	this.castShadow = true;
	this.receiveShadow = false;
	this.recovering = false;

	this.finalizeInit = function() {
		this.setDamping( 0.6, 0.9 ); // does work only after adding the object to the scene :/
	}

	function local2world( vector ) {
		var rotation_matrix = new THREE.Matrix4();
		rotation_matrix.extractRotation(self.matrix);
		return rotation_matrix.multiplyVector3(vector.clone());
	}

	this.torque = function( force ) {
		this.applyTorque( local2world( force ) );
	}

	this.thrust = function() {
		this.applyCentralForce( local2world( THRUST_FORCE ) );
		mainFlameJet.show();
	}

	this.freeze = function() {
		this.setLinearVelocity( new THREE.Vector3(0,0,0) );
		this.setAngularVelocity( new THREE.Vector3(0,0,0) );
	}


	function computeAndApplyOrientationForces( ship_orientation ) {
		
		var aimO = ship_orientation.orientation_matrix();
		var curO = new THREE.Matrix4().extractRotation( self.matrix );

		var aimYaw = aimO.multiplyVector3(new THREE.Vector3(0,0,1));
		var aimPitch = aimO.multiplyVector3(new THREE.Vector3(0,1,0));
		var aimRoll = aimO.multiplyVector3(new THREE.Vector3(1,0,0));

		var curYaw = curO.multiplyVector3(new THREE.Vector3(0,0,1));
		var curPitch = curO.multiplyVector3(new THREE.Vector3(0,1,0));
		var curRoll = curO.multiplyVector3(new THREE.Vector3(1,0,0));

		var lengthYaw = aimYaw.distanceTo( curYaw );
		var lengthPitch = aimPitch.distanceTo( curPitch );
		var lengthRoll = aimRoll.distanceTo( curRoll );

		var dotYaw = curRoll.dot(aimYaw);
		var dotRoll = curPitch.dot(aimRoll);
		var dotPitch = curYaw.dot(aimPitch);

		var torqueYaw = 0;
		var torquePitch = 0;
		var torqueRoll = 0;

		var torque_power = torquePower();

		if( dotYaw > TORQUE_THRESHOLD ) torqueYaw = torque_power * lengthYaw;
		if( dotYaw < -TORQUE_THRESHOLD ) torqueYaw = -torque_power * lengthYaw;
		if( dotRoll > TORQUE_THRESHOLD ) torqueRoll = torque_power * lengthRoll;
		if( dotRoll < -TORQUE_THRESHOLD ) torqueRoll = -torque_power * lengthRoll;
		if( dotPitch > TORQUE_THRESHOLD ) torquePitch = torque_power * lengthPitch;
		if( dotPitch < -TORQUE_THRESHOLD ) torquePitch= -torque_power * lengthPitch;

		self.torque( new THREE.Vector3( torquePitch, torqueYaw, torqueRoll ));
	}

	this.update = function( ship_orientation ) {
		computeAndApplyOrientationForces( ship_orientation );
		this.recovering = false;
		mainFlameJet.hide();
	}

	function torquePower() {
		return self.recovering ? TORQUE_POWER_RECOVER:TORQUE_POWER
	}

	this.recover = function() {
		this.recovering = true;
	}

}

Ship.prototype = Object.create( Physijs.BoxMesh.prototype );
return Ship;
});
