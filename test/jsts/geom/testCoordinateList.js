test('CoordinateList:Construct',function(){
    var coord = new jsts.geom.Coordinate();
    var coordList1 = new jsts.geom.CoordinateList();
    var coordList2 = new jsts.geom.CoordinateList([coord]);
    var coordList3 = new jsts.geom.CoordinateList(null);
    return coordList1.length === 0 && coordList2.length===1 && coordList3.length ===0;
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
 test('CoordinateArrays:removeRepeatedPoints',function(){
    var coords = [];
    coords[0] = new jsts.geom.Coordinate();
    coords[1] = new jsts.geom.Coordinate();
    coords = jsts.geom.CoordinateArrays.removeRepeatedPoints(coords);
    return coords.length === 1 && coords[1] === undefined;
 });