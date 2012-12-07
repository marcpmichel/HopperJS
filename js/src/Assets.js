define( [ "three" ], function( THREE ) {

function Assets( assets ) {
	
	THREE.EventTarget.call( this );

	var self = this;

	var totalAssets = 0;
	var loadedAssets = 0;

	this.textures = [];
	this.geoms = [];


	function assetLoaded() {
		loadedAssets++;
		console.log( "loaded Assets = " + loadedAssets + " / " + totalAssets + " ( " + (loadedAssets/totalAssets)*100 + "% )" );
		if(self.doneLoading()) {
			self.dispatchEvent( { type: 'load', content: "all loaded" } );
		}
	}
	/*
	var monitor = new THREE.LoadingMonitor();


	monitor.addEventListener( 'load', function ( event ) {
		assetLoaded();
	});

	monitor.addEventListener( 'error', function ( event ) {
		console.log("*** Error: " + event.message );
	});
	*/
	// var geometryLoader = new THREE.GeometryLoader();
	// var textureLoader = new THREE.TextureLoader();
	//monitor.add( geometryLoader );
	// monitor.add( textureLoader );


	this.loadAll = function( assets ) {

		totalAssets = assets.length;

		assets.forEach( function( asset ) {
			console.log( "loading " + asset.type + " \"" + asset.name+"\"..." );
			switch(asset.type) {
				case "geom": 
					//self.geoms[asset.name] = geometryLoader.load( asset.path );
					var loader = new THREE.JSONLoader();
					loader.load( asset.path, function(geom) { 
						self.geoms[asset.name] = geom;
						flatShade(geom);
						assetLoaded();
					},
					"./data/textures" );
				break;

				case "texture":
					// self.textures[asset.name] = textureLoader.load(asset.path);
					self.textures[asset.name] = THREE.ImageUtils.loadTexture( asset.path, undefined, assetLoaded );
				break;

				default:
					throw "unknown asset type";
				break;
			}
		});
	}

	this.doneLoading = function() {
		return loadedAssets === totalAssets;
	}

	function flatShade( geom ) {
		if( geom.materials ) {
			geom.materials.forEach( function(material) {
				material.shading = THREE.FlatShading;
			});
		}
	}
}
	return Assets;
}); // define

