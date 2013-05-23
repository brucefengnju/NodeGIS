/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geom/Coordinate.js
 */

/**
 * Defines a rectangular region of coordinate plane. It is often used to
 * represent the bounding box of a {@link Geometry}, e.g. the minimum and
 * maximum x and y values of the {@link Coordinate}s.
 * <p>
 * Note that Envelopes support infinite or half-infinite regions, by using the
 * values of <code>Double.POSITIVE_INFINITY</code> and
 * <code>Double.NEGATIVE_INFINITY</code>.
 * <p>
 * When Envelope objects are created or initialized, the supplies extent values
 * are automatically sorted into the correct order.
 */



/**
 * Creates an <code>Envelope</code> for a region defined by maximum and
 * minimum values.
 *
 * @constructor
 */
jsts.geom.Envelope = function() {
  jsts.geom.Envelope.prototype.init.apply(this, arguments);
};

/**
 * the minimum coordinate
 *
 * @type {?Coordinate}
 **/
 
jsts.geom.Envelope.prototype.minCoord = null;
/**
 * the maxmum coordinate
 *
 * @type {?Coordinate}
 **/
jsts.geom.Envelope.prototype.maxCoord = null;

/**
 * Creates an <code>Envelope</code> for a region defined by maximum and
 * minimum values.
 *
 * Will call appropriate init* method depending on arguments.
 */
jsts.geom.Envelope.prototype.init = function() {
  if (arguments[0] instanceof jsts.geom.Coordinate &&
      arguments.length === 2) {
    if(arguments[0].sameDimension(arguments[1])){
        if(arguments[0].compareTo(arguments[1]) <= 0){
            this._initFromCoordinates(arguments[0], arguments[1]);    
        }else{
            this._initFromCoordinates(arguments[1], arguments[0]);    
        }
    }else{
        this.setToNull();
    }
  }else if(arguments.length === 1 && arguments[0] instanceof jsts.geom.Envelope){
    this._initFromEnvelope(arguments[0]);
  }else if(arguments.length === 1 && arguments[0] instanceof jsts.geom.Envelope2D){
    this._initFromEnvelope2D(arguments[0]);
  }else{
    this.setToNull();
  }
};


/**
 * Initialize an <code>Envelope</code> to a region defined by two Coordinates.
 *
 * @param {jsts.geom.Coordinate}
 *          p1 the first Coordinate.
 * @param {jsts.geom.Coordinate}
 *          p2 the second Coordinate.
 */
jsts.geom.Envelope.prototype._initFromCoordinates = function(p1, p2) {
  if(!p1.sameDimension(p2)){
    this.setToNull();
    return;
  }
  if(p1.compareTo(p2) === -1){
    this.minCoord = p1;
    this.maxCoord = p2;
  }else{
    this.minCoord = p2;
    this.maxCoord = p1;
  }

};

/**
 * Initialize an <code>Envelope</code> from an existing Envelope.
 *
 * @param {jsts.geom.Envelope}
 *          env the Envelope to initialize from.
 */
jsts.geom.Envelope.prototype._initFromEnvelope = function(env) {
  this.minCoord = env.minCoord;
  this.maxCoord = env.maxCoord;
};

jsts.geom.Envelope.prototype._initFromEnvelope2D = function(env2D){
  this.minCoord = new jsts.geom.Coordinate(env2D.minx,env2D.miny);
  this.maxCoord = new jsts.geom.Coordinate(env2D.maxx,env2D.maxy);
}


/**
 * Makes this <code>Envelope</code> a "null" Envelope, that is, the Envelope
 * of the empty geometry.
 */
jsts.geom.Envelope.prototype.setToNull = function() {
  this.minCoord = new jsts.geom.Coordinate(0,-1);
  this.maxCoord = new jsts.geom.Coordinate(-1,0);
};


/**
 * Returns <code>true</code> if this <code>Envelope</code> is a "null"
 * Envelope.
 *
 * @return {boolean} <code>true</code> if this <code>Envelope</code> is
 *         uninitialized or is the Envelope of the empty geometry.
 */
jsts.geom.Envelope.prototype.isNull = function() {
  return this.minCoord.compareTo(this.maxCoord) > 0;
};


/**
 * Returns the difference between the maximum and minimum y values.
 *
 * @return {number} max y - min y, or 0 if this is a null <code>Envelope.</code>
 */
jsts.geom.Envelope.prototype.getHeight = function() {
  if (this.isNull()) {
    return 0;
  }
  return this.maxCoord.y - this.minCoord.y;
};


/**
 * Returns the difference between the maximum and minimum x values.
 *
 * @return {number} max x - min x, or 0 if this is a null <code>Envelope.</code>
 */
jsts.geom.Envelope.prototype.getWidth = function() {
  if (this.isNull()) {
    return 0;
  }
  return this.maxCoord.x - this.minCoord.x;
};

jsts.geom.Envelope.prototype.getDepth = function(){
  if(this.isNull()){
    return 0;
  }
  if(this.minCoord.z !== null && this.maxCoord.z !== null){
    return this.maxCoord.z - this.minCoord.z;
  }else{
    return 0;
  }
}

/**
 * Gets the min coordinate
 *
 * @return {Coordinate}
 **/
jsts.geom.Envelope.prototype.getMinCoordinate  = function(){
  return this.minCoord;
}

/**
 * Gets the min coordinate
 *
 * @return {Coordinate}
 **/
jsts.geom.Envelope.prototype.getMaxCoordinate = function(){
  return this.maxCoord;
}

/**
 * Gets the area of this Envelope.
 *
 * @return {number} the area of the Envelope, 0.0 if the Envelope is null.
 */
jsts.geom.Envelope.prototype.getArea = function() {
  return this.getWidth() * this.getHeight();
};

/**
 * Gets the volume of this Envelope.
 *
 * @return {number} the volume of the Envelope, 0.0 if the Envelope is null.
 */
jsts.geom.Envelope.prototype.getVolume = function(){
  return this.getWidth() * this.getHeight() * this.getDepth();
}

/**
 * Enlarges this <code>Envelope</code>
 *
 * Will call appropriate expandToInclude* depending on arguments.
 */
jsts.geom.Envelope.prototype.expandToInclude = function() {
  if (arguments[0] instanceof jsts.geom.Coordinate) {
    this.expandToIncludeCoordinate(arguments[0]);
  } else if (arguments[0] instanceof jsts.geom.Envelope) {
    this.expandToIncludeEnvelope(arguments[0]);
  } 
};


/**
 * Enlarges this <code>Envelope</code> so that it contains the given
 * {@link Coordinate}. Has no effect if the point is already on or within the
 * Envelope.
 *
 * @param {jsts.geom.Coordinate}
 *          p the Coordinate to expand to include.
 */
jsts.geom.Envelope.prototype.expandToIncludeCoordinate = function(p) {
    if(!this.minCoord.sameDimension(p)){
        return;
    }
    if(this.isNull()){
        return;
    }
    if(p.compareTo(this.minCoord)<0){
        this.minCoord = p;
    }
    if(p.compareTo(this.maxCoord)>0){
        this.maxCoord = p;
    }
};


/**
 * Enlarges this <code>Envelope</code> so that it contains the
 * <code>other</code> Envelope. Has no effect if <code>other</code> is
 * wholly on or within the Envelope.
 *
 * @param {jsts.geom.Envelope}
 *          other the <code>Envelope</code> to expand to include.
 */
jsts.geom.Envelope.prototype.expandToIncludeEnvelope = function(other) {
  if (other.isNull()) {
    return;
  }
  if(this.isNull()){
    this.minCoord = other.minCoord;
    this.maxCoord = other.maxCoord;
  }else{
    if(other.minCoord.compareTo(this.minCoord)<0){
      this.minCoord = other.minCoord;
    }
    if(other.maxCoord.compareTo(other.maxCoord)>0){
      this.maxCoord = other.maxCoord;
    }
  }
};


/**
 * Enlarges this <code>Envelope</code>
 *
 * Will call appropriate expandBy* depending on arguments.
 */
jsts.geom.Envelope.prototype.expandBy = function() {
  if (arguments.length === 1) {
    this.expandByDistance(arguments[0]);
  } else if(arguments.length === 2) {
    this.expandByDistances(arguments[0], arguments[1]);
  }else{
    this.expandByDistances(arguments[0],arguments[1],arguments[2]);
  }
};


/**
 * Expands this Envelope by a given distance in all directions. Both positive
 * and negative distances are supported.
 *
 * @param {number}
 *          distance the distance to expand the Envelope.
 */
jsts.geom.Envelope.prototype.expandByDistance = function(distance) {
  if(this.minCoord.z === null){
    this.expandByDistances(distance, distance);  
  }else{
    this.expandByDistances(distance,distance,distance);
  }
  
};


/**
 * Expands this Envelope by a given distance in all directions. Both positive
 * and negative distances are supported.
 *
 * @param {number}
 *          deltaX the distance to expand the Envelope along the the X axis.
 * @param {number}
 *          deltaY the distance to expand the Envelope along the the Y axis.
 * @param {number}
 *          deltaY the distance to expand the Envelope along the the z axis.
 */
jsts.geom.Envelope.prototype.expandByDistances = function(deltaX, deltaY,deltaZ) {
  if (this.isNull()) {
    return;
  }
  this.minCoord.x -= deltaX;
  this.maxCoord.x += deltaX;
  this.minCoord.y -= deltaY;
  this.maxCoord.y += deltaY;
  
  if(this.minCoord.z !== null && deltaZ){
    this.minCoord.z -= deltaZ;
    this.maxCoord.z += deltaZ;
  }

  // check for Envelope disappearing
  if(this.minCoord.compareTo(this.maxCoord) >0){
    this.setToNull();
  }
};


/**
 * Translates this Envelope by given amounts in the X and Y direction.
 *
 * @param {number}
 *          transX the amount to translate along the X axis.
 * @param {number}
 *          transY the amount to translate along the Y axis.
 * @param {number}
 *          transZ the amount to translate along the Z axis.
 */
jsts.geom.Envelope.prototype.translate = function(transX, transY,transZ) {
  if (this.isNull()) {
    return;
  }
  if(this.minCoord.z !== null && transZ){
    this.minCoord.setCoordinate(this.minCoord.x + transX,this.minCoord.y + transY,
                                                         this.minCoord.z + transZ);
    this.maxCoord.setCoordinate(this.maxCoord.x + transX,this.maxCoord.y + transY,
                                                         this.maxCoord.z + transZ);
  }else{
    this.minCoord.setCoordinate(this.minCoord.x + transX,this.minCoord.y + transY);
    this.maxCoord.setCoordinate(this.maxCoord.x + transX,this.maxCoord.y + transY);
  }
  
};


/**
 * Computes the coordinate of the centre of this Envelope (as long as it is
 * non-null
 *
 * @return {jsts.geom.Coordinate} the centre coordinate of this Envelope <code>null</code>
 *         if the Envelope is null.
 */
jsts.geom.Envelope.prototype.centre = function() {
  if (this.isNull()) {
    return null;
  }
  if(this.minCoord.z === null){
    return new jsts.geom.Coordinate((this.minCoord.x + this.maxCoord.x)/2.0,
                                    (this.minCoord.y + this.maxCoord.y)/2.0);
  }else{
    return new jsts.geom.Coordinate((this.minCoord.x + this.maxCoord.x)/2.0,
                                    (this.minCoord.y + this.maxCoord.y)/2.0,
                                    (this.minCoord.z + this.maxCoord.z)/2.0);
  }
};


/**
 * Computes the intersection of two {@link Envelopes}
 *
 * @param {jsts.geom.Envelope}
 *          env the Envelope to intersect with.
 * @return {jsts.geom.Envelope} a new Envelope representing the intersection of
 *         the Envelopes (this will be the null Envelope if either argument is
 *         null, or they do not intersect.
 */
jsts.geom.Envelope.prototype.intersection = function(env) {
  if (this.isNull() || env.isNull() || !this.intersects(env)
            || !this.minCoord.sameDimension(env.minCoord)) {
    return new jsts.geom.Envelope();
  }
  var intMinCoord = this.minCoord.compareTo(env.minCoord) > 0 ? this.minCoord : env.minCoord;
  var intMaxCoord = this.maxCoord.compareTo(env.maxCoord) < 0 ? this.maxCoord : env.maxCoord;
  return new jsts.geom.Envelope(intMinCoord,intMaxCoord);
};


/**
 * Check if the region defined by input overlaps (intersects) the region of this
 * <code>Envelope</code>.
 *
 * Will call appropriate intersects* depending on arguments.
 *
 * @return {boolean} <code>true</code> if an overlap is found.
 */
jsts.geom.Envelope.prototype.intersects = function() {
  if (arguments[0] instanceof jsts.geom.Envelope) {
    return this.intersectsEnvelope(arguments[0]);
  } else if (arguments[0] instanceof jsts.geom.Coordinate) {
    return this.intersectsCoordinate(arguments[0]);
  } 
};


/**
 * Check if the region defined by <code>other</code> overlaps (intersects) the
 * region of this <code>Envelope</code>.
 *
 * @param {jsts.geom.Envelope}
 *          other the <code>Envelope</code> which this <code>Envelope</code>
 *          is being checked for overlapping.
 * @return {boolean} <code>true</code> if the <code>Envelope</code>s
 *         overlap.
 */
jsts.geom.Envelope.prototype.intersectsEnvelope = function(other) {
  if (this.isNull() || other.isNull() || !this.minCoord.sameDimension(other.minCoord)) {
    return false;
  }
  var result = !(other.minCoord.compareTo(this.maxCoord) >0 
                || other.maxCoord.compareTo(this.minCoord)<0);
  return result;
};


/**
 * Check if the point <code>p</code> overlaps (lies inside) the region of this
 * <code>Envelope</code>.
 *
 * @param {jsts.geom.Coordinate}
 *          p the <code>Coordinate</code> to be tested.
 * @return {boolean} <code>true</code> if the point overlaps this
 *         <code>Envelope.</code>
 */
jsts.geom.Envelope.prototype.intersectsCoordinate = function(p) {
  if(this.minCoord.sameDimension(p)){
    return !(p.compareTo(this.minCoord) < 0 || p.compareTo(this.maxCoord)>0);
  }
  return false;
};


/**
 * Tests if the input lies wholely inside this <code>Envelope</code>
 * (inclusive of the boundary).
 *
 * Will call appropriate contains* depending on arguments.
 *
 * @return {boolean} true if input is contained in this <code>Envelope.</code>
 */
jsts.geom.Envelope.prototype.contains = function() {
  if (arguments[0] instanceof jsts.geom.Envelope) {
    return this.containsEnvelope(arguments[0]);
  } else if (arguments[0] instanceof jsts.geom.Coordinate) {
    return this.containsCoordinate(arguments[0]);
  }
};


/**
 * Tests if the <code>Envelope other</code> lies wholely inside this
 * <code>Envelope</code> (inclusive of the boundary).
 * <p>
 * Note that this is <b>not</b> the same definition as the SFS
 * <tt>contains</tt>, which would exclude the Envelope boundary.
 *
 * @param {jsts.geom.Envelope}
 *          other the <code>Envelope</code> to check.
 * @return {boolean} true if <code>other</code> is contained in this
 *         <code>Envelope.</code>
 *
 * @see covers(Envelope)
 */
jsts.geom.Envelope.prototype.containsEnvelope = function(other) {
  return this.coversEnvelope(other);
};


/**
 * Tests if the given point lies in or on the Envelope.
 * <p>
 * Note that this is <b>not</b> the same definition as the SFS
 * <tt>contains</tt>, which would exclude the Envelope boundary.
 *
 * @param {jsts.geom.Coordinate}
 *          p the point which this <code>Envelope</code> is being checked for
 *          containing.
 * @return {boolean} <code>true</code> if the point lies in the interior or on
 *         the boundary of this <code>Envelope</code>.
 *
 * @see covers(Coordinate)
 */
jsts.geom.Envelope.prototype.containsCoordinate = function(p) {
  return this.coversCoordinate(p);
};


/**
 * Tests if the given point lies in or on the Envelope.
 * <p>
 * Note that this is <b>not</b> the same definition as the SFS
 * <tt>contains</tt>, which would exclude the Envelope boundary.
 *
 * @param {number}
 *          x the x-coordinate of the point which this <code>Envelope</code>
 *          is being checked for containing.
 * @param {number}
 *          y the y-coordinate of the point which this <code>Envelope</code>
 *          is being checked for containing.
 * @return {boolean} <code>true</code> if <code>(x, y)</code> lies in the
 *         interior or on the boundary of this <code>Envelope</code>.
 *
 * @see covers(double, double)
 */
jsts.geom.Envelope.prototype.containsValues = function(x, y) {
  return this.coversValues(x, y);
};


/**
 * Tests if the given point lies in or on the Envelope.
 *
 * Will call appropriate contains* depending on arguments.
 */
jsts.geom.Envelope.prototype.covers = function() {
  if (p instanceof jsts.geom.Envelope) {
    this.coversEnvelope(arguments[0]);
  } else if (p instanceof jsts.geom.Coordinate) {
    this.coversCoordinate(arguments[0]);
  } else {
    this.coversValues(arguments[0], arguments[1]);
  }
};

/**
 * Tests if the given point lies in or on the Envelope.
 *
 * @param {jsts.geom.Coordinate}
 *          p the point which this <code>Envelope</code> is being checked for
 *          containing.
 * @return {boolean} <code>true</code> if the point lies in the interior or on
 *         the boundary of this <code>Envelope</code>.
 */
jsts.geom.Envelope.prototype.coversCoordinate = function(p) {
  if(this.minCoord.sameDimension(p)){
    return p.compareTo(this.minCoord) >= 0 && p.compareTo(this.maxCoord) <=0;
  }
  return false;
};


/**
 * Tests if the <code>Envelope other</code> lies wholely inside this
 * <code>Envelope</code> (inclusive of the boundary).
 *
 * @param {jsts.geom.Envelope}
 *          other the <code>Envelope</code> to check.
 * @return {boolean} true if this <code>Envelope</code> covers the
 *         <code>other.</code>
 */
jsts.geom.Envelope.prototype.coversEnvelope = function(other) {
  if (this.isNull() || other.isNull() || !this.minCoord.sameDimension(other.minCoord)) {
    return false;
  }
  return other.minCoord.compareTo(this.minCoord) >=0 && other.maxCoord.compareTo(this.maxCoord) <=0;
};


/**
 * Computes the distance between this and another <code>Envelope</code>.
 *
 * @param {jsts.geom.Envelope}
 *          env The <code>Envelope</code> to test this <code>Envelope</code>
 *          against.
 * @return {number} The distance between overlapping Envelopes is 0. Otherwise,
 *         the distance is the Euclidean distance between the closest points.
 */
jsts.geom.Envelope.prototype.distance = function(env) {
  if(!this.minCoord.sameDimension(evn.minCoord)){
    return null;
  }
  if (this.intersects(env)) {
    return 0;
  }
  if(this.maxCoord.compareTo(env.minCoord) <=0){
    return this.maxCoord.distance(env.minCoord);
  }
  if(this.minCoord.compareTo(env.maxCoord)>=0){
    return this.minCoord.distance(env.maxCoord);
  }
};


/**
 * @param {jsts.geom.Envelope}
 *          other the <code>Envelope</code> to check against.
 * @return {boolean} true if Envelopes are equal.
 */
jsts.geom.Envelope.prototype.equals = function(other) {
  if (this.isNull()) {
    return other.isNull();
  }
  if(this.minCoord.sameDimension(other.minCoord)){
    return this.minCoord.equals(other.minCoord) && this.maxCoord.equals(this.maxCoord);
  }
  return false;
};


/**
 * @return {string} String representation of this <code>Envelope.</code>
 */
jsts.geom.Envelope.prototype.toString = function() {
    return 'Env[' + this.minCoord.toString() + ', ' + this.maxCoord.toString() + ']';
};


/**
 * Test the point q to see whether it intersects the Envelope defined by p1-p2
 *
 * NOTE: calls intersectsEnvelope if four arguments are given to simulate
 * overloaded function
 *
 * @param {jsts.geom.Coordinate}
 *          p1 one extremal point of the Envelope.
 * @param {jsts.geom.Coordinate}
 *          p2 another extremal point of the Envelope.
 * @param {jsts.geom.Coordinate}
 *          q the point to test for intersection.
 * @return {boolean} <code>true</code> if q intersects the Envelope p1-p2.
 */
/*jsts.geom.Envelope.intersects = function(p1, p2, q) {
  if (arguments.length === 4) {
    return jsts.geom.Envelope.intersectsEnvelope(arguments[0], arguments[1],
        arguments[2], arguments[3]);
  }

  var xc1 = p1.x < p2.x ? p1.x : p2.x;
  var xc2 = p1.x > p2.x ? p1.x : p2.x;
  var yc1 = p1.y < p2.y ? p1.y : p2.y;
  var yc2 = p1.y > p2.y ? p1.y : p2.y;

  if (((q.x >= xc1) && (q.x <= xc2)) && ((q.y >= yc1) && (q.y <= yc2))) {
    return true;
  }
  return false;
};
*/

/**
 * Test the Envelope defined by p1-p2 for intersection with the Envelope defined
 * by q1-q2
 *
 * @param {jsts.geom.Coordinate}
 *          p1 one extremal point of the Envelope P.
 * @param {jsts.geom.Coordinate}
 *          p2 another extremal point of the Envelope P.
 * @param {jsts.geom.Coordinate}
 *          q1 one extremal point of the Envelope Q.
 * @param {jsts.geom.Coordinate}
 *          q2 another extremal point of the Envelope Q.
 * @return {boolean} <code>true</code> if Q intersects P.
 */
/*jsts.geom.Envelope.intersectsEnvelope = function(p1, p2, q1, q2) {
  var minq = Math.min(q1.x, q2.x);
  var maxq = Math.max(q1.x, q2.x);
  var minp = Math.min(p1.x, p2.x);
  var maxp = Math.max(p1.x, p2.x);

  if (minp > maxq) {
    return false;
  }
  if (maxp < minq) {
    return false;
  }

  minq = Math.min(q1.y, q2.y);
  maxq = Math.max(q1.y, q2.y);
  minp = Math.min(p1.y, p2.y);
  maxp = Math.max(p1.y, p2.y);

  if (minp > maxq) {
    return false;
  }
  if (maxp < minq) {
    return false;
  }
  return true;
};*/


/**
 * @return {jsts.geom.Envelope} A new instance copied from this.
 */
jsts.geom.Envelope.prototype.clone = function() {
    return new jsts.geom.Envelope(this.minCoord,this.maxCoord);
};
