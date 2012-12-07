define(["three"], function( THREE ) {
function ShipOrientation() {

	var _material = new THREE.MeshBasicMaterial({color: 0x00FF00, wireframe:true});
	
	THREE.Mesh.call( this, globals.assets.geoms["ship"], _material );
	var self=this;

	var ROTATION_FACTOR = 1;

	this.yaw = 0;
	this.pitch = 0;
	this.roll = 0;
	this.eulerOrder="YZX";
	this.useQuaternion=false;

	this.incYaw = function( dir ) {
		this.yaw += dir * ROTATION_FACTOR;
		// this.yaw %= Math.PI;
	}
	
	this.incPitch = function( dir ) {
		this.pitch += dir * ROTATION_FACTOR;
		this.pitch %= Math.PI;
	}
	
	this.incRoll = function( dir ) {
		this.roll += dir * ROTATION_FACTOR;
		this.roll %= Math.PI;
	}

	this.orientation_matrix = function( ship_orientation ) {
		return new THREE.Matrix4().setRotationFromEuler( 
			new THREE.Vector3( this.pitch, this.yaw, this.roll ), "YZX" 
		);
	}

	this.reset = function() {
		this.pitch = 0;
		this.yaw = 0;
		this.roll = 0;
	}

	this.resetPitchRoll = function() {
		this.pitch = 0;
		this.roll = 0;
	}

	this.update=function() {
		//self.rotation.set( self.pitch, self.yaw, self.roll );
		self.rotation.set( self.pitch, 0, self.roll );
		self.updateMatrix();
	}

	this.setPosition=function( position ) {
		self.position.copy(position);	
	}

}

ShipOrientation.prototype = Object.create( THREE.Mesh.prototype );
return ShipOrientation;
});

