'use strict';

// TODO: get rid of these
var globals = { overlay:null, keyboard:null, assets:null }

require.config({
	baseUrl: "js",
	shim: {
		"three" : { exports : "THREE" },
		"detector" : { exports : "Detector" },
		"stats" : { exports : "Stats" },
		"keyboard_state" : { exports : "KeyboardState" },
		"physijs" : { 
			deps: ['three'],
			exports: "Physijs" 
		}
	},
	paths: {
		"three": ["lib/three"],
		"detector": ["lib/Detector"],
		"stats" : ["lib/stats.min"],
		"keyboard_state" : ["lib/THREEx.KeyboardState"],
		"physijs" : ["lib/physi"]
	}
});


require( [
	"detector",
	"three",
	"keyboard_state",
	"physijs",
	"stats",
	"src/Assets",
	"src/World",
	"src/Camera",
	"src/Overlay"
], function( Detector, THREE, KeyboardState, Physijs, Stats, Assets, World, Camera, Overlay ) {



var APP_PATH = "/";

function init() {
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	Physijs.scripts.worker = APP_PATH + "js/lib/physijs_worker.js";
	Physijs.scripts.ammo = APP_PATH + "js/lib/ammo.js";

	globals.keyboard = new THREEx.KeyboardState();

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	var canvasContainer = document.getElementById('viewport');
	canvasContainer.appendChild(renderer.domElement);

	renderer.shadowMapEnabled = true;

	globals.overlay = new Overlay();

	var world = new World();

	var stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	canvasContainer.appendChild( stats.domElement );

	function render() { 
		renderer.render(world.scene, world.camera);
		globals.overlay.render();	
		stats.update();
		requestAnimationFrame(render);
	}

	requestAnimationFrame( render );

	window.addEventListener( 'resize', onWindowResize, false );

	function onWindowResize() {
		//windowHalfX = window.innerWidth / 2;
		//windowHalfY = window.innerHeight / 2;
		world.camera.updateAspect(window.innerWidth, window.innerHeight);
		renderer.setSize( window.innerWidth, window.innerHeight );
	}	
}


function boot() {

	var resources = [
		{ name: "ship", type: "geom", path: "data/models/lander3.js" },
		{ name: "grid", type: "texture", path: "data/textures/grid.jpg" },
		{ name: "crate", type: "texture", path: "data/textures/crate1.jpg" },
		{ name: "flamejet", type: "geom", path: "data/models/flamejet2.js" }
	];


	var monitor = new THREE.LoadingMonitor();

	monitor.addEventListener( 'load', function ( event ) {
		init(); 
	});

	globals.assets = new Assets();
	monitor.add( globals.assets );
	globals.assets.loadAll( resources );
}

// window.onload = boot;
boot();

}); // ] require

