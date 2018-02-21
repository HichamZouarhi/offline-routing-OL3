tried to use Dijkstra algorithm with spatial data offline on the browser, unfortunately I didn't found anything about it,
so why not make my own ... I tried it for now and it's working ( at least on my setup)

1- check if your road network is perfectly connected

2- make sure that the vertices of your network aren't complicated otherwise you may have false routes

How to use it :

    <script src="http://openlayers.org/en/v3.18.2/build/ol.js"></script>
    <script src="required/underscore.js"></script>
    <script src="required/graph.js"></script>
    <script src="OR-OL3.js"></script>
    
  make sure to get all the js files above
  
  create your network from a featureCollection (linestring geometries):
  
    var network = createNetwork(yourFeatureCollection);
  
  then you get the geometry of the shortest path between two set of coordinates following your network
  
    var shortestPath = getShortestPath(network, coordsSource, coordsDestination);
  
  there is a working example on Example.html for the old Medina of Tangier
  
NOTE: credits for the graph.js goes to https://github.com/andrewhayward/dijkstra
