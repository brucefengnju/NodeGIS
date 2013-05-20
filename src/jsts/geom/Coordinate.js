/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

(function() {

  /**
   * A lightweight class used to store coordinates on the 2-dimensional
   * Cartesian plane. It is distinct from {@link Point}, which is a subclass of
   * {@link Geometry}. Unlike objects of type {@link Point} (which contain
   * additional information such as an envelope, a precision model, and spatial
   * reference system information), a <code>Coordinate</code> only contains
   * coordinate values and accessor methods.
   *
   * @requires jsts/geom/Geometry.js
   */



  /**
   * @constructor
   */
  jsts.geom.Coordinate = function(x, y,z,m) {
    if (typeof x === 'number' && typeof y === 'number') {
      this.x = x;
      this.y = y;
    } else if (x instanceof jsts.geom.Coordinate) {
      this.x = parseFloat(x.x);
      this.y = parseFloat(x.y);
      this.z = parseFloat(x.z);
      this.m = parseFloat(x.m);
    } else if (typeof x === 'undefined' || x === null || typeof y === 'undefined' || y === null) {
      this.x = 0;
      this.y = 0;
    } else if (typeof x === 'string') {
      this.x = parseFloat(x);
      this.y = parseFloat(y);
    }
    if(typeof z === 'number'){
      this.z = z;
    }else if(typeof z === 'string'){
      this.z = parseFloat(z);
    }else if('undefined' == typeof z || null == z){
      this.z = null;
    }
    
    if(typeof m === 'number'){
      this.m = m;
    }else if(typeof m === 'string'){
      this.m = parseFloat(m);
    }else if('undefined' == typeof m || null == m){
      this.m = null;
    }
  };

  /**
   * Sets this <code>Coordinate</code>s (x,y,z) values to that of
   * <code>other</code>.
   *
   * @param {Coordinate}
   *          other the <code>Coordinate</code> to copy.
   */
  jsts.geom.Coordinate.prototype.setCoordinate = function(other) {
    this.x = other.x;
    this.y = other.y;
    this.z = other.z;
    this.m = other.m;
  };


  /**
   * Clones this instance.
   *
   * @return {Coordinate} A point instance cloned from this.
   */
  jsts.geom.Coordinate.prototype.clone = function() {
    return new jsts.geom.Coordinate(this.x, this.y,this.z,this.m);
  };


  /**
   * Computes the 2-dimensional Euclidean distance to another location. The
   * Z-ordinate is ignored.
   *
   * @param {Coordinate}
   *          p a point.
   * @return {number} the 2-dimensional Euclidean distance between the
   *         locations.
   */
  jsts.geom.Coordinate.prototype.distance = function(p) {
    var dx = this.x - p.x;
    var dy = this.y - p.y;
    var dz = 0;
    if( null != this.z && null != p.z){
      dz = this.z - p.z;
    }
    return Math.sqrt(dx * dx + dy * dy + dz*dz);
  };

  /**
   * Returns whether the planar projections of the two <code>Coordinate</code>s
   * are equal.
   *
   * @param {Coordinate}
   *          other a <code>Coordinate</code> with which to do the 2D
   *          comparison.
   * @return {boolean} <code>true</code> if the x- and y-coordinates are
   *         equal; the z-coordinates do not have to be equal.
   */
  jsts.geom.Coordinate.prototype.equals2D = function(other) {

    return this.x === other.x && this.y === other.y;
  };

  /**
   * Returns <code>true</code> if <code>other</code> has the same values for
   * the x and y ordinates. Since Coordinates are 2.5D, this routine ignores the
   * z value when making the comparison.
   *
   * @param {Coordinate}
   *          other a <code>Coordinate</code> with which to do the comparison.
   * @return {boolean} <code>true</code> if <code>other</code> is a
   *         <code>Coordinate</code> with the same values for the x and y
   *         ordinates.
   */
  jsts.geom.Coordinate.prototype.equals = function(other) {
    if (!other instanceof jsts.geom.Coordinate || typeof other === 'undefined') {
      return false;
    }
    if(this.z!== null && typeof this.z!== 'undefined'){
      return this.equals2D(other) && this.z === other.z;  
    }else{
      return this.equals2D(other);
    }
    
  };

  /**
   * Compares this {@link Coordinate} with the specified {@link Coordinate} for
   * order. This method ignores the z value when making the comparison. Returns:
   * <UL>
   * <LI> -1 : this.x < other.x || ((this.x == other.x) && (this.y < other.y))
   * <LI> 0 : this.x == other.x && this.y = other.y
   * <LI> 1 : this.x > other.x || ((this.x == other.x) && (this.y > other.y))
   *
   * </UL>
   * Note: This method assumes that ordinate values are valid numbers. NaN
   * values are not handled correctly.
   *
   * @param {Coordinate}
   *          other the <code>Coordinate</code> with which this
   *          <code>Coordinate</code> is being compared.
   * @return {number} -1, zero, or 1 as explained above.
   */
  jsts.geom.Coordinate.prototype.compareTo = function(other) {
    if (this.x < other.x) {
      return -1;
    }
    if (this.x > other.x) {
      return 1;
    }
    if (this.y < other.y) {
      return -1;
    }
    if (this.y > other.y) {
      return 1;
    }
    if(this.z !== null && typeof this.z !== 'undefined' 
      && other.z !== null && typeof other.z !== 'undefined'){
      if(this.z < other.z){
        return -1;
      }
      if(this.z > other.z){
        return 1;
      }  
    }
    return 0;
  };

  jsts.geom.Coordinate.prototype.toString = function() {
    var coordStr = '(' + this.x + ', ' + this.y ;
    if(null != this.z && 'undefined'!= typeof this.z){
      coordStr += ',' + this.z;
    }
    if(null != this.m && 'undefined'!= typeof this.m){
      coordStr += ',' + this.m;
    }
    coordStr += ')';
    return coordStr;
  };

})();
