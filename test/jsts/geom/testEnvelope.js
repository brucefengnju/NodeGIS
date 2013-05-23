test('Envelope:construct no arguments',function(){
    var env = new jsts.geom.Envelope();
    console.log(env.toString());
    return env.isNull();
});
test('Envelope:construct coordinates',function(){
    var minCoord = new jsts.geom.Coordinate();
    var maxCoord = new jsts.geom.Coordinate(1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);
    return !env.isNull() && env.getMinCoordinate().equals(minCoord) 
            && env.getMaxCoordinate().equals(maxCoord);
});
test('Envelope:construct init from Envelope',function(){
    var minCoord = new jsts.geom.Coordinate();
    var maxCoord = new jsts.geom.Coordinate(1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);
    var env1 = new jsts.geom.Envelope(env);
    return !env1.isNull() && env.equals(env1);
});

test('Envelope:construct wrong arguments',function(){
    var env = new jsts.geom.Envelope(1,1);
    var env1 = new jsts.geom.Envelope(new jsts.geom.Coordinate(),new jsts.geom.Coordinate(1,1,2));
    return env.isNull() && env1.isNull();
});

test('Envelope:getWidth',function(){
    var minCoord = new jsts.geom.Coordinate(0,0,0);
    var maxCoord = new jsts.geom.Coordinate(1,1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);

    return env.getWidth() === 1;
});
test('Envelope:getHeight',function(){
    var minCoord = new jsts.geom.Coordinate(0,0,0);
    var maxCoord = new jsts.geom.Coordinate(1,1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);

    return env.getHeight() === 1;
});
test('Envelope:getDepth',function(){
    var minCoord = new jsts.geom.Coordinate(0,0,0);
    var maxCoord = new jsts.geom.Coordinate(1,1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);

    return env.getDepth() === 1;
});
test('Envelope:getArea',function(){
    var minCoord = new jsts.geom.Coordinate(0,0,0);
    var maxCoord = new jsts.geom.Coordinate(1,1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);

    return env.getArea() === 1;
});
test('Envelope:getVolume',function(){
    var minCoord = new jsts.geom.Coordinate(0,0,0);
    var maxCoord = new jsts.geom.Coordinate(1,1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);

    return env.getVolume() === 1;
});
test('Envelope:expandToInclude expand to include coordinate',function(){
    var minCoord = new jsts.geom.Coordinate(0,0,0);
    var maxCoord = new jsts.geom.Coordinate(1,1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);
    env.expandToInclude(minCoord);
    var f1 = env.minCoord.equals(minCoord);
    var coord = new jsts.geom.Coordinate(2,1,1);
    env.expandToInclude(coord);
    var coord1 = new jsts.geom.Coordinate(-1,0,0);
    env.expandToInclude(coord1);
    var coord3 = new jsts.geom.Coordinate(-2,0);
    env.expandToInclude(coord3);
    return f1 && env.maxCoord.equals(coord) && env.minCoord.equals(coord1);
});
test('Envelope:expandToInclude expand to include envelope',function(){
    var minCoord = new jsts.geom.Coordinate(0,0,0);
    var maxCoord = new jsts.geom.Coordinate(1,1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);
    var env1= new jsts.geom.Envelope(new jsts.geom.Coordinate(0,0,0)
                                     ,new jsts.geom.Coordinate(0.5,0.5,0.5));
    env.expandToInclude(env1);
    var f1 = env.minCoord.equals(minCoord) && env.maxCoord.equals(maxCoord);
    var env2 = new jsts.geom.Envelope(new jsts.geom.Coordinate(0.5,0.5,0.5)
                                     ,new jsts.geom.Coordinate(2,2,2));
    env.expandToInclude(env2);
    var env3 = new jsts.geom.Envelope(new jsts.geom.Coordinate(-1,-1,-1)
                                     ,new jsts.geom.Coordinate(0,0,0));
    env.expandToInclude(env3);
    return f1 && env.minCoord.equals(new jsts.geom.Coordinate(-1,-1,-1))
              && env.maxCoord.equals(new jsts.geom.Coordinate(2,2,2));
});
test('Envelope:expandBy expand by distance',function(){
    var minCoord = new jsts.geom.Coordinate(0,0,0);
    var maxCoord = new jsts.geom.Coordinate(1,1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);
    var env1 = new jsts.geom.Envelope(minCoord,maxCoord);
    var distance = 1;
    env.expandBy(distance);
    env1.expandBy(-distance);
    return env.minCoord.equals(new jsts.geom.Coordinate(-1,-1,-1)) 
            && env.maxCoord.equals(new jsts.geom.Coordinate(2,2,2))
            && env1.isNull();
});
test('Envelope:translate',function(){
    var minCoord = new jsts.geom.Coordinate(0,0,0);
    var maxCoord = new jsts.geom.Coordinate(1,1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);
    env.translate(-1,-1,-1);

    var env1 = new jsts.geom.Envelope(new jsts.geom.Coordinate(0,0)
                                    ,new jsts.geom.Coordinate(1,1));
    env1.translate(-1,-1,-1);

    return env.minCoord.equals(new jsts.geom.Coordinate(-1,-1,-1))
            && env.maxCoord.equals(new jsts.geom.Coordinate(0,0,0))
            && env1.minCoord.equals(new jsts.geom.Coordinate(-1,-1))
            && env1.maxCoord.equals(new jsts.geom.Coordinate(0,0));
});
test('Envelope:centre',function(){
    var minCoord = new jsts.geom.Coordinate(0,0,0);
    var maxCoord = new jsts.geom.Coordinate(1,1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);
    var center = env.centre();
    return center.equals(new jsts.geom.Coordinate(0.5,0.5,0.5));
});
test('Envelope:intersection',function(){
    var minCoord = new jsts.geom.Coordinate(0,0,0);
    var maxCoord = new jsts.geom.Coordinate(1,1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);

    var minCoord1 = new jsts.geom.Coordinate(0.5,0.5,0.5);
    var maxCoord1 = new jsts.geom.Coordinate(2,2,2);
    var env1 = new jsts.geom.Envelope(minCoord1,maxCoord1);

    var interEnv = env.intersection(env1);
    return interEnv.minCoord.equals(minCoord1) && interEnv.maxCoord.equals(maxCoord);
});
test('Envelope:intersects intersects envelope',function(){
    var minCoord = new jsts.geom.Coordinate(0,0,0);
    var maxCoord = new jsts.geom.Coordinate(1,1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);

    var minCoord1 = new jsts.geom.Coordinate(0.5,0.5,0.5);
    var maxCoord1 = new jsts.geom.Coordinate(2,2,2);
    var env1 = new jsts.geom.Envelope(minCoord1,maxCoord1);

    return env.intersects(env1);
});
test('Envelope:intersects intersects coordinate',function(){
    var minCoord = new jsts.geom.Coordinate(0,0,0);
    var maxCoord = new jsts.geom.Coordinate(1,1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);

    var coord1 = new jsts.geom.Coordinate(0,0);
    var coord2 = new jsts.geom.Coordinate(0.5,0.5,0.5);
    var coord3 = new jsts.geom.Coordinate(2,2,2);

    return !env.intersects(coord1) && env.intersects(coord2) && !env.intersects(coord3);
});
test('Envelope:contains contain envelope',function(){
    var minCoord = new jsts.geom.Coordinate(0,0,0);
    var maxCoord = new jsts.geom.Coordinate(1,1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);

    var minCoord1 = new jsts.geom.Coordinate(0.5,0.5,0.5);
    var maxCoord1 = new jsts.geom.Coordinate(2,2,2);
    var env1 = new jsts.geom.Envelope(minCoord1,maxCoord1);

    var env2 = new jsts.geom.Envelope(minCoord,minCoord1);

    return !env.contains(env1) && env.contains(env2);
});
test('Envelope:contains contain coordinate',function(){
    var minCoord = new jsts.geom.Coordinate(0,0,0);
    var maxCoord = new jsts.geom.Coordinate(1,1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);

    var coord1 = new jsts.geom.Coordinate(0.5,0.5,0.5);
    var coord2 = new jsts.geom.Coordinate(2,2,2);

    return env.contains(minCoord) && env.contains(maxCoord) 
            && env.contains(coord1) && !env.contains(coord2);
});
test('Envelope:distance',function(){
    var minCoord = new jsts.geom.Coordinate(0,0,0);
    var maxCoord = new jsts.geom.Coordinate(1,1,1);
    var env = new jsts.geom.Envelope(minCoord,maxCoord);

    var minCoord1 = new jsts.geom.Coordinate(0.5,0.5,0.5);
    var maxCoord1 = new jsts.geom.Coordinate(2,2,2);
    var env1 = new jsts.geom.Envelope(minCoord1,maxCoord1);
    var dis1 = env.distance(env1) 
    var dis2 = env1.distance(env);

    var env2 = new jsts.geom.Envelope(maxCoord1,new jsts.geom.Coordinate(3,3,3));

    return dis1 === dis2 && dis1 === 0 && env.distance(env2) === Math.sqrt(3);
})