define( ["three"], function() {

function Camera() {

	this.FOLLOW = 1;
	this.RANDOM = 1;

	THREE.PerspectiveCamera.call(this, 75, window.innerWidth/window.innerHeight, 0.1, 1000);
	this.position.set( 0, 50, 0 );
	this.lookAt( new THREE.Vector3(0,0,0) );

	this.update_func = followCam;

	this.update = function( obj, yaw ) {
		this.update_func(obj, yaw );
	}

	this.updateAspect=function( width, height ) {
		this.aspect = width / height;
		this.updateProjectionMatrix();
	}

	this.setType = function( cam_type ) {
		switch(cam_type) {
			case this.FOLLOW: this.update_func=followCam;
			case this.RANDOM: this.update_func=randomCam;
		}
	}

	var yaw = 0;
	var pitch = -Math.PI/3.5;
	var ELASTICITY = 30.0;

	function fixedCam( obj ) {
		this.position.set( 0, 5, -5 );
		this.lookAt( obj.position );
	}

	function rel2world( obj, vector ) {
		var rotation_matrix = new THREE.Matrix4();
		rotation_matrix.extractRotation(obj.matrix);
		return rotation_matrix.multiplyVector3(vector.clone());
	}

	var BEHIND_DISTANCE = 8.0;
	function followCam( obj, target_yaw ) {

		// if( obj_yaw==undefined ) yaw = obj.rotation.y; else yaw = obj.yaw;
		yaw += (target_yaw - yaw)/ELASTICITY;

		this.position.set(
			obj.position.x + BEHIND_DISTANCE * Math.sin( yaw ) * Math.sin( pitch ),
			obj.position.y + BEHIND_DISTANCE * Math.cos( pitch ),
			obj.position.z + BEHIND_DISTANCE * Math.cos( yaw ) * Math.sin( pitch )
		);
		this.lookAt( obj.position );
	}


	var PITCH_RATE = 0.05;
	this.pitchDown=function() {
		if(pitch > -Math.PI + Math.PI/8 )
			pitch -= PITCH_RATE;
	}

	this.pitchUp = function() {
		if(pitch < 0 - Math.PI/8 )
			pitch += PITCH_RATE;
	}
	
}

Camera.prototype = Object.create( THREE.PerspectiveCamera.prototype );

return Camera;

});

