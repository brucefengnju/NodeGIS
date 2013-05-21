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
    return coordList.length == 2 && coordList[0].equals(coords[0]) 
            && coordList[1].equals(coords[1]);
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
    return coordList.length == 0 && typeof coordList[0] === 'undefined';
 });
 test('coordinateList.add:add coords',function(){
    var coords = [];
    coords[0] = new jsts.geom.Coordinate();
    coords[1] = new jsts.geom.Coordinate(1,1);
    var coordList = new jsts.geom.CoordinateList();
    var length1= coordList.length;
    coordList.add(coords);
    return 0 == length1 && 2 == coordList.length;
 });
  test('coordinateList.add:add coords reverse',function(){
    var coords = [];
    coords[0] = new jsts.geom.Coordinate();
    coords[1] = new jsts.geom.Coordinate(1,1);
    var coordList = new jsts.geom.CoordinateList();
    var length1= coordList.length;
    coordList.add(coords,true,false);
    return 0 == length1 && 2 == coordList.length 
    && coordList[1].equals(coords[0]) && coordList[0].equals(coords[1]);
 });
  test('CoordinateList.addCoordinate: add coordinate',function(){
    var coord = new jsts.geom.Coordinate();
    var coordList = new jsts.geom.CoordinateList();
    var length1 = coordList.length;
    coordList.addCoordinate(coord);
    return 0 == length1 && 1== coordList.length && coordList[0].equals(coord);
  });
  test('CoordinateList.addCoordinate: add coordinate no repeat',function(){
    var coord = new jsts.geom.Coordinate();
    var coord1 = new jsts.geom.Coordinate(1,1);
    var coordList = new jsts.geom.CoordinateList([coord,coord1]);
    coordList.addCoordinate(coord,false);
    return 2== coordList.length && coordList[0].equals(coord);
  });
  test('CoordinateList.insertCoordinate: insert coordiante',function(){
    var coord = new jsts.geom.Coordinate();
    var coord1 = new jsts.geom.Coordinate(1,1);
    var coord2 = new jsts.geom.Coordinate(2,2,0);
    var coordList = new jsts.geom.CoordinateList([coord,coord1]);
    var length1 = coordList.length;
    coordList.insertCoordinate(1,coord2);
    return 2 == length1 && 3 == coordList.length && coordList[1].equals(coord2);
  });
  test('CoordinateList.insertCoordinate:insert coordinate repeated',function(){
    var coord = new jsts.geom.Coordinate();
    var coord1 = new jsts.geom.Coordinate(1,1);
    var coord2 = new jsts.geom.Coordinate(1,1);
    var coordList = new jsts.geom.CoordinateList([coord,coord1]);
    var length1 = coordList.length;
    coordList.insertCoordinate(1,coord2,true);
    return 2 == length1 && 3 == coordList.length && coordList[1].equals(coord2);
  });
  test('CoordinateList.insertCoordinates:insert an array of coordinates',function(){
    var coord = new jsts.geom.Coordinate();
    var coord1 = new jsts.geom.Coordinate(1,1);
    var coord2 = new jsts.geom.Coordinate(2,2,0);
    var coordList = new jsts.geom.CoordinateList();
    var olength = coordList.length;
    coordList.insertCoordinates(0,[coord,coord1,coord2]);
    return 0 == olength && 3 == coordList.length && coordList[0].equals(coord)
            && coordList[1].equals(coord1) && coordList[2].equals(coord2);
  });
test('CoordinateList.insertCoordinates:insert an array of coordinates repeated',function(){
    var coord = new jsts.geom.Coordinate();
    var coord1 = new jsts.geom.Coordinate(1,1);
    var coord2 = new jsts.geom.Coordinate(1,1);
    var coordList = new jsts.geom.CoordinateList();
    var olength = coordList.length;
    coordList.insertCoordinates(0,[coord,coord1,coord2],true);
    return 0 == olength && 3 == coordList.length && coordList[0].equals(coord)
            && coordList[1].equals(coord1) && coordList[2].equals(coord2);
  });
  test('CoordinateList.toArray: coordlist to array',function(){
    var coord = new jsts.geom.Coordinate();
    var coord1 = new jsts.geom.Coordinate(1,1);
    var coord2 = new jsts.geom.Coordinate(1,1);
    var coordList = new jsts.geom.CoordinateList([coord,coord1,coord2]);
    var coordArray = coordList.toArray();
    return 3 == coordArray.length && coordArray instanceof Array && coordArray[0].equals(coord)
            && coordArray[1].equals(coord1) && coordArray[2].equals(coord2);
  });
test('CoordinateList.toString: to string ',function(){
    var coord = new jsts.geom.Coordinate();
    var coord1 = new jsts.geom.Coordinate(1,1);
    var coord2 = new jsts.geom.Coordinate(1,1);
    var coordList = new jsts.geom.CoordinateList([coord,coord1,coord2]);
    console.log(coordList.toString());
    return '' !== coordList.toString();
});