define(["keyboard_state"], function(KeyboardState) {

	function InputManager(element) {
		self = this;
		this.keyboard = new THREEx.KeyboardState();
		this.pointerLockEnabled = false;
		this.mouseDeltaX = 0;
		this.mouseDeltaY = 0;
		this.leftMouseButtonDown = false;
		this.rightMouseButtonDown = false;


			this.update = function() {
				this.mouseDeltaX = 0;
				this.mouseDeltaY = 0;
			}

			var pointerlockchange = function ( event ) {
				if ( document.pointerLockElement === element || 
					document.mozPointerLockElement === element || 
					document.webkitPointerLockElement === element ) {
					self.pointerLockEnabled = true;
					element.removeEventListener('click', startPointerLock, false );
					// blocker.style.display = 'none';
					element.addEventListener('mousedown', onMouseDown, false);
					element.addEventListener('mouseup', onMouseUp, false);
				} else {
					self.pointerLockEnabled = false;
					element.removeEventListener('mousedown', onMouseDown, false);
					element.removeEventListener('mouseup', onMouseUp, false);
					element.addEventListener( 'click', startPointerLock, false );
					// blocker.style.display = '-webkit-box';
					// blocker.style.display = '-moz-box';
					// blocker.style.display = 'box';
				}
			}

			var pointerlockerror = function ( event ) {
				console.log("pointerlockerror event received !");
			}

			var onMouseMove = function(event) {
				self.mouseDeltaX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
				self.mouseDeltaY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
			}

			var onMouseDown = function(event) {
				event.preventDefault();
				console.log(event.button);
				if(event.button == 0) self.leftMouseButtonDown = true; else self.leftMouseButtonDown = false;
				if(event.button == 1) self.middleMouseButtonDown = true; else self.middleMouseButtonDown = false;
				if(event.button == 2) self.rightMouseButtonDown = true; else self.rightMouseButtonDown = false;
			}

			var onMouseUp = function(event) {
				event.preventDefault();
				if(event.button == 0) self.leftMouseButtonDown = false;
				if(event.button == 1) self.middleMouseButtonDown = false;
				if(event.button == 2) self.rightMouseButtonDown = false;
			}

			var startPointerLock = function(event) {
				element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
				element.requestPointerLock();// Ask the browser to lock the pointer
			}
		
		var havePointerLock = 'pointerLockElement' in document || 
				'mozPointerLockElement' in document || 
				'webkitPointerLockElement' in document;

		if(havePointerLock) {

			// Hook pointer lock state change events
			document.addEventListener( 'pointerlockchange', pointerlockchange, false );
			document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
			document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

			document.addEventListener( 'pointerlockerror', pointerlockerror, false );
			document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
			document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

			document.addEventListener( 'mousemove', onMouseMove, false );

			element.addEventListener( 'click', startPointerLock, false );
		}


	};
	
	return InputManager;

});
