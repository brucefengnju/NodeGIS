/* Copyright (c) 2013 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Constructs a new list from an array of Coordinates, allowing caller to
 * specify if repeated points are to be removed.
 *
 * In JSTS CoordinateList do *not* expose an API extended from ArrayList in Java, instead it is based on a simple JavaScript array.
 * CoordinateList does not seem to be used extensively which would warrant keeping the API.
 *
 * @param {Array.<jsts.geom.Coordinate>}
 *          coords the array of coordinates to load into the list.
 * @param {boolean} 
 *          allowRepeated if <code>false</code>, repeated points are removed.
 *
 * @constructor
 */
jsts.geom.CoordinateList = function(coords, allowRepeated) {
  allowRepeated = (typeof allowRepeated === 'undefined') ? true : allowRepeated;

  if (coords && coords.length) {
    this.add(coords, allowRepeated);
  }
};

jsts.geom.CoordinateList.prototype = new Array();


/**
 * Adds an array of coordinates to the list.
 *
 * @param {Array.<jsts.geom.Coordinate>}
 *          coord The coordinates.
 * @param {boolean}
 *          allowRepeated if set to false, repeated coordinates are collapsed.
 * @param {boolean}
 *          direction if false, the array is added in reverse order.
 * @return {boolean} true (as by general collection contract).
 */
jsts.geom.CoordinateList.prototype.add = function(coords, allowRepeated,
    direction) {
  if(typeof direction === 'undefined' || direction === null){
    direction = true;
  }
  coords = coords || [];
  if (direction) {
    var length = coords.length;
    for (var i = 0; i < length; i++) {
      this.addCoordinate(coords[i], allowRepeated);
    }
  } else {
    var length = coords.length;
    for (var i = length - 1; i >= 0; i--) {
      this.addCoordinate(coords[i], allowRepeated);
    }
  }
  return true;
};


/**
 * Adds a coordinate to the end of the list.
 *
 * @param {Coordinate}
 *          coord The coordinates.
 * @param {boolean}
 *          allowRepeated if set to false, repeated coordinates are collapsed.
 */
jsts.geom.CoordinateList.prototype.addCoordinate = function(coord,
    allowRepeated) {
  // don't add duplicate coordinates
  if (!allowRepeated) {
    if (this.length >= 1) {
      var length = this.length;
      for(var i=0;i<length;i++){
        if(this[i].equals(coord)){
          return ;
        }
      }
    }
  }
  this.push(coord);
};

/**
 * Inserts a coordinate at the specified place in the list
 *
 * @param {Number}
 *          index The index where to insert the coordinate.
 * @param {Coordinate}
 *          coord The coordinate.
 * @param {boolean}
 *          allowRepeated if set to false, repeated coordinates are collapsed.
 */
jsts.geom.CoordinateList.prototype.insertCoordinate = function(index, coord,
    allowRepeated) {
  // don't add duplicate coordinates
  if (!allowRepeated) {
    for(var i=0;i<this.length;i++){
      if(this[i].equals(coord)){
        return;
      }
    }
  }
  this.splice(index, 0, coord);
};

/**
 * Inserts an array/list of coordinates to the list
 * @param {Number}
           index The index where to insert the coordinates.
 * @param {Array.<jsts.geom.Coordinate>}
           coords the array/list of coordinates.
 * @param {boolean}
           allowRepeated if set to false, repeated coordinates are collapsed.
 **/
jsts.geom.CoordinateList.prototype.insertCoordinates = function(index,coords,allowRepeated){
  if(coords && coords.length){
    var il = coords.length;
      if(!allowRepeated){
        for(var i=0;i<il;i++){
          var repeated = false;
          for(var j=0;j<this.length;j++){
            if(this[j].equals(coords[i])){
              repeated = true;
              break;
            }
          }
          if(!repeated){
            this.splice(index++, 0, coords[i]);
          }
        }
      }else{
        for(var i= 0;i<il;i++){
          this.splice(index++, 0, coords[i]);
        }        
      }
  }
}

/**
 * Ensure this coordList is a ring, by adding the start point if necessary
 */
jsts.geom.CoordinateList.prototype.closeRing = function() {
  if (this.length > 0) {
    this.addCoordinate(new jsts.geom.Coordinate(this[0]), false);
  }
};

/**
 * Creates a standard javascript-array from the contents of this list
 *
 * @return {Array}
 *            the created array.
 */
jsts.geom.CoordinateList.prototype.toArray = function() {
  var i, il, arr;
  i = 0, il = this.length, arr = new Array(il);

  for (i; i < il; i++) {
    arr[i] = this[i];
  }

  return arr;
};

/**
 * delete all coordinates
 **/
 jsts.geom.CoordinateList.prototype.clear = function () {
   this.splice(0,this.length);
 }
 
 /**
  * toString
  **/
 jsts.geom.CoordinateList.prototype.toString = function(){
  var str = "CoordinateList:[";
  var coordArray = this.toArray();
  str += coordArray.toString();
  str +="]";
  return str;
 }
// TODO: port rest?
