function createNetwork(features){
	var map={};
	var wgs84Sphere = new ol.Sphere(6378137);
	features.forEach(function(feature){
		var featureID=feature.get('id');
		var source=feature.getGeometry().getFirstCoordinate();
		var innerMap={};
		features.forEach(function(feature){
			if(feature.get('id')!=featureID){
				if(source == feature.getGeometry().getFirstCoordinate() || source == feature.getGeometry().getLastCoordinate()){
					var tmpCoords=feature.getGeometry().getFirstCoordinate();
					var target = (source==tmpCoords)?feature.getGeometry().getLastCoordinate():tmpCoords;
					var distance=wgs84Sphere.haversineDistance(source,target);
					innerMap[target]=distance;
				}
			}
		});
		map[source]=innerMap;
	});
	
	var Graph=new Graph(map);
	return Graph;
}

function getShortestPath(source, destination){

}
