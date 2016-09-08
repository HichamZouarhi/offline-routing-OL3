function createNetwork(features){
	var map=getVertices(features);
	console.log("number of vertexes : "+features.length);
	var wgs84Sphere = new ol.Sphere(6378137);
	var countVertices=0;
	for(var key in map){
		var coords=key.split(",");
		coords[0]=parseFloat(coords[0]);
		coords[1]=parseFloat(coords[1]);
		var innerMap={};
		features.forEach(function(feature){
			if(key==feature.getGeometry().getFirstCoordinate().toString() || key==feature.getGeometry().getLastCoordinate().toString()){
				var tmpCoords=feature.getGeometry().getFirstCoordinate();
				var target=(key==tmpCoords.toString())?feature.getGeometry().getLastCoordinate():tmpCoords;
				var distance=Math.round(wgs84Sphere.haversineDistance(coords,target));
				innerMap[target]=distance;
			}
		});
		map[key]=innerMap;
	}
	
	//console.log(Object.keys(map));
	//console.log("number of vertices supposed to be found : "+countVertices);
	//console.log("number of vertices found : "+_.size(map));
	console.log(JSON.stringify(map));
	//var Graph = new Graph(map);
	return map;
}

function getVertices(features){
	var map={};
	features.forEach(function(feature){
		map[feature.getGeometry().getFirstCoordinate()]={};
		map[feature.getGeometry().getLastCoordinate()]={};
	});
	console.log("number of vertices : "+_.size(map));
	return map;
}
function getShortestPath(source, destination){

}
