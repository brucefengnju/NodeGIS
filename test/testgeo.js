
/**
 * test coordinate
 **/

 test('coordinate constructor:no args',function () {
 	var coord = new jsts.geom.Coordinate();
 	return coord.x === 0 && coord.y === 0 && coord.z === null && coord.m === null;
 });
 test('coordinate constructor: args are x and y',function () {
 	var x = 1;
 	var y = 2;
 	var coord = new jsts.geom.Coordinate(x,y);
 	return coord.x === x && coord.y === y;
 });
 test('coordinate constructor: x y are string',function () {
 	var x = '1.4';
 	var y = '2.4';
 	var coord = new jsts.geom.Coordinate(x,y);
 	return coord.x === 1.4 && coord.y === 2.4;
 });
 test('coordinate constructor: x,y,z,m',function () {
 	var x = 1,y = 2,z = 3,m = 4;
 	var coord = new jsts.geom.Coordinate(x,y,z,m);
 	return coord.x === x && coord.y === y && coord.z === z && coord.m === m;
 });
 test('coordinateList constructor',function () {
 	var coords = [];
 	coords[0] = new jsts.geom.Coordinate();
 	coords[1] = new jsts.geom.Coordinate(1,1);
 	var coordList = new jsts.geom.CoordinateList(coords);
 	return coordList.length == 2 && coordList[0].equals(coords[0]) && coordList[1].equals(coords[1]);
 });
 test('coordinateList constructor:no repeat',function () {
 	var coords = [];
 	coords[0] = new jsts.geom.Coordinate();
 	coords[1] = new jsts.geom.Coordinate();
 	var coordList = new jsts.geom.CoordinateList(coords,false);
 	return coordList.length ==1 && coordList[0].equals(coords[0]);

 });
 test('coordinateList constructor:no repeat',function () {
 	 	var coords = [];
 	coords[0] = new jsts.geom.Coordinate();
 	coords[1] = new jsts.geom.Coordinate();
 	var coordList = new jsts.geom.CoordinateList(coords);
 	coordList.clear();
 	return coordList.length == 0 && coordList[0] === undefined;
 });
 test('test CoordinateArrays:removeRepeatedPoints',function(){
 	var coords = [];
 	coords[0] = new jsts.geom.Coordinate();
	coords[1] = new jsts.geom.Coordinate();
	coords = jsts.geom.CoordinateArrays.removeRepeatedPoints(coords);
	return coords.length === 1 && coords[1] === undefined;
 });
