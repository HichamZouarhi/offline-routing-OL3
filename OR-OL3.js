
function createNetwork(features){
	var map=getVertices(features);
	for(var key in map){
		var coords=key.split(",");
		coords[0]=parseFloat(coords[0]);
		coords[1]=parseFloat(coords[1]);
		var innerMap={};
		features.forEach(function(feature){
			if(key==feature.getGeometry().getFirstCoordinate().toString() || key==feature.getGeometry().getLastCoordinate().toString()){
				var tmpCoords=feature.getGeometry().getFirstCoordinate();
				var target=(key==tmpCoords.toString())?feature.getGeometry().getLastCoordinate():tmpCoords;
				var distance=Math.round(ol.sphere.getDistance(coords,target));
				innerMap[target]=distance;
			}
		});
		map[key]=innerMap;
	}
	
	return map;
}

function getVertices(features){
	var map={};
	features.forEach(function(feature){
		map[feature.getGeometry().getFirstCoordinate()]={};
		map[feature.getGeometry().getLastCoordinate()]={};
	});
	return map;
}
function getShortestPath(map, source, destination){
	var graph=new Graph(map);
	var startPoint=source;
	var endPoint=destination;
	source=getClosestPoint(map, source);
	destination=getClosestPoint(map, destination);
	var shortestPathvertices=graph.findShortestPath(source, destination);
	var shortestPath= new ol.geom.LineString();
	shortestPath.appendCoordinate(startPoint);
	for(var vertice in shortestPathvertices){
		var _vertice=shortestPathvertices[vertice].split(",");
		_vertice[0]=parseFloat(_vertice[0]);
		_vertice[1]=parseFloat(_vertice[1]);
		shortestPath.appendCoordinate(_vertice);
	}
	shortestPath.appendCoordinate(endPoint);
	return shortestPath;
}

function getClosestPoint(map, point){
	var distances={};
	for(var key in map){
		var coords=key.split(",");
		coords[0]=parseFloat(coords[0]);
		coords[1]=parseFloat(coords[1]);
		distances[key]=ol.sphere.getDistance(coords,point);
	}
	return _.min(Object.keys(distances), function (o) { return distances[o]; });
}
