
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
 