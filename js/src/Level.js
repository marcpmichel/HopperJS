define( 
	["src/Ship","src/Sun", "src/Block", "src/Monolith", "src/Ground" ], 
	function( Ship, Sun, Block, Monolith, Ground ) {
function Level( scene ) {

	this.ship = new Ship();
	scene.add(this.ship);
	this.ship.finalizeInit();

	this.sun = new Sun();

	this.objects = [];

	this.objects.push( new Block( new THREE.Vector3(-7, -2, 7), new THREE.Vector3(3,3,3) ));
	// this.objects.push( new Corridors());
	this.objects.push( new Monolith());
	this.objects.push( new Ground());
	this.objects.push(this.sun);
	this.objects.push(this.sun.ambientLight);
	//this.objects.push(new THREE.AxisHelper(2));

	//  new THREE.Fog();

	for( var i=0; i<this.objects.length; i++ ) {
		scene.add(this.objects[i]);
	}

}
return Level;
});
