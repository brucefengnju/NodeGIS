/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geom/Coordinate.js
 */

/**
 * Defines a rectangular region of the 2D coordinate plane. It is often used to
 * represent the bounding box of a {@link Geometry}, e.g. the minimum and
 * maximum x and y values of the {@link Coordinate}s.
 * <p>
 * Note that Envelope2Ds support infinite or half-infinite regions, by using the
 * values of <code>Double.POSITIVE_INFINITY</code> and
 * <code>Double.NEGATIVE_INFINITY</code>.
 * <p>
 * When Envelope2D objects are created or initialized, the supplies extent values
 * are automatically sorted into the correct order.
 */



/**
 * Creates an <code>Envelope2D</code> for a region defined by maximum and
 * minimum values.
 *
 * @constructor
 */
jsts.geom.Envelope2D = function() {
  jsts.geom.Envelope2D.prototype.init.apply(this, arguments);
};


/**
 * the minimum x-coordinate
 *
 * @type {?number}
 */
jsts.geom.Envelope2D.prototype.minx = null;


/**
 * the maximum x-coordinate
 *
 * @type {?number}
 */
jsts.geom.Envelope2D.prototype.maxx = null;


/**
 * the minimum y-coordinate
 *
 * @type {?number}
 */
jsts.geom.Envelope2D.prototype.miny = null;


/**
 * the maximum y-coordinate
 *
 * @type {?number}
 */
jsts.geom.Envelope2D.prototype.maxy = null;


/**
 * Creates an <code>Envelope2D</code> for a region defined by maximum and
 * minimum values.
 *
 * Will call appropriate init* method depending on arguments.
 */
jsts.geom.Envelope2D.prototype.init = function() {
  if (typeof arguments[0] === 'number' && arguments.length === 4) {
    this.initFromValues(arguments[0], arguments[1], arguments[2], arguments[3]);
  } else if (arguments[0] instanceof jsts.geom.Coordinate &&
      arguments.length === 1) {
    this.initFromCoordinate(arguments[0]);
  } else if (arguments[0] instanceof jsts.geom.Coordinate &&
      arguments.length === 2) {
    this.initFromCoordinates(arguments[0], arguments[1]);
  } else if (arguments[0] instanceof jsts.geom.Envelope2D &&
      arguments.length === 1) {
    this.initFromEnvelope2D(arguments[0]);
  } else {
    this.setToNull();
  }
};


/**
 * Initialize an <code>Envelope2D</code> for a region defined by maximum and
 * minimum values.
 *
 * @param {number}
 *          x1 the first x-value.
 * @param {number}
 *          x2 the second x-value.
 * @param {number}
 *          y1 the first y-value.
 * @param {number}
 *          y2 the second y-value.
 */
jsts.geom.Envelope2D.prototype.initFromValues = function(x1, x2, y1, y2) {
  if (x1 < x2) {
    this.minx = x1;
    this.maxx = x2;
  } else {
    this.minx = x2;
    this.maxx = x1;
  }
  if (y1 < y2) {
    this.miny = y1;
    this.maxy = y2;
  } else {
    this.miny = y2;
    this.maxy = y1;
  }
};


/**
 * Initialize an <code>Envelope2D</code> to a region defined by two Coordinates.
 *
 * @param {jsts.geom.Coordinate}
 *          p1 the first Coordinate.
 * @param {jsts.geom.Coordinate}
 *          p2 the second Coordinate.
 */
jsts.geom.Envelope2D.prototype.initFromCoordinates = function(p1, p2) {
  this.initFromValues(p1.x, p2.x, p1.y, p2.y);
};


/**
 * Initialize an <code>Envelope2D</code> to a region defined by a single
 * Coordinate.
 *
 * @param {jsts.geom.Coordinate}
 *          p the Coordinate.
 */
jsts.geom.Envelope2D.prototype.initFromCoordinate = function(p) {
  this.initFromValues(p.x, p.x, p.y, p.y);
};


/**
 * Initialize an <code>Envelope2D</code> from an existing Envelope2D.
 *
 * @param {jsts.geom.Envelope2D}
 *          env the Envelope2D to initialize from.
 */
jsts.geom.Envelope2D.prototype.initFromEnvelope2D = function(env) {
  this.minx = env.minx;
  this.maxx = env.maxx;
  this.miny = env.miny;
  this.maxy = env.maxy;
};


/**
 * Makes this <code>Envelope2D</code> a "null" Envelope2D, that is, the Envelope2D
 * of the empty geometry.
 */
jsts.geom.Envelope2D.prototype.setToNull = function() {
  this.minx = 0;
  this.maxx = -1;
  this.miny = 0;
  this.maxy = -1;
};


/**
 * Returns <code>true</code> if this <code>Envelope2D</code> is a "null"
 * Envelope2D.
 *
 * @return {boolean} <code>true</code> if this <code>Envelope2D</code> is
 *         uninitialized or is the Envelope2D of the empty geometry.
 */
jsts.geom.Envelope2D.prototype.isNull = function() {
  return this.maxx < this.minx;
};


/**
 * Returns the difference between the maximum and minimum y values.
 *
 * @return {number} max y - min y, or 0 if this is a null <code>Envelope2D.</code>
 */
jsts.geom.Envelope2D.prototype.getHeight = function() {
  if (this.isNull()) {
    return 0;
  }
  return this.maxy - this.miny;
};


/**
 * Returns the difference between the maximum and minimum x values.
 *
 * @return {number} max x - min x, or 0 if this is a null <code>Envelope2D.</code>
 */
jsts.geom.Envelope2D.prototype.getWidth = function() {
  if (this.isNull()) {
    return 0;
  }
  return this.maxx - this.minx;
};


/**
 * Returns the <code>Envelope2D</code>s minimum x-value. min x > max x
 * indicates that this is a null <code>Envelope2D</code>.
 *
 * @return {number} the minimum x-coordinate.
 */
jsts.geom.Envelope2D.prototype.getMinX = function() {
  return this.minx;
};


/**
 * Returns the <code>Envelope2D</code>s maximum x-value. min x > max x
 * indicates that this is a null <code>Envelope2D</code>.
 *
 * @return {number} the maximum x-coordinate.
 */
jsts.geom.Envelope2D.prototype.getMaxX = function() {
  return this.maxx;
};


/**
 * Returns the <code>Envelope2D</code>s minimum y-value. min y > max y
 * indicates that this is a null <code>Envelope2D</code>.
 *
 * @return {number} the minimum y-coordinate.
 */
jsts.geom.Envelope2D.prototype.getMinY = function() {
  return this.miny;
};


/**
 * Returns the <code>Envelope2D</code>s maximum y-value. min y > max y
 * indicates that this is a null <code>Envelope2D</code>.
 *
 * @return {number} the maximum y-coordinate.
 */
jsts.geom.Envelope2D.prototype.getMaxY = function() {
  return this.maxy;
};


/**
 * Gets the area of this Envelope2D.
 *
 * @return {number} the area of the Envelope2D, 0.0 if the Envelope2D is null.
 */
jsts.geom.Envelope2D.prototype.getArea = function() {
  return getWidth() * getHeight();
};


/**
 * Enlarges this <code>Envelope2D</code>
 *
 * Will call appropriate expandToInclude* depending on arguments.
 */
jsts.geom.Envelope2D.prototype.expandToInclude = function() {
  if (arguments[0] instanceof jsts.geom.Coordinate) {
    this.expandToIncludeCoordinate(arguments[0]);
  } else if (arguments[0] instanceof jsts.geom.Envelope2D) {
    this.expandToIncludeEnvelope2D(arguments[0]);
  } else {
    this.expandToIncludeValues(arguments[0], arguments[1]);
  }
};


/**
 * Enlarges this <code>Envelope2D</code> so that it contains the given
 * {@link Coordinate}. Has no effect if the point is already on or within the
 * Envelope2D.
 *
 * @param {jsts.geom.Coordinate}
 *          p the Coordinate to expand to include.
 */
jsts.geom.Envelope2D.prototype.expandToIncludeCoordinate = function(p) {
  this.expandToIncludeValues(p.x, p.y);
};


/**
 * Enlarges this <code>Envelope2D</code> so that it contains the given point.
 * Has no effect if the point is already on or within the Envelope2D.
 *
 * @param {number}
 *          x the value to lower the minimum x to or to raise the maximum x to.
 * @param {number}
 *          y the value to lower the minimum y to or to raise the maximum y to.
 */
jsts.geom.Envelope2D.prototype.expandToIncludeValues = function(x, y) {
  if (this.isNull()) {
    this.minx = x;
    this.maxx = x;
    this.miny = y;
    this.maxy = y;
  } else {
    if (x < this.minx) {
      this.minx = x;
    }
    if (x > this.maxx) {
      this.maxx = x;
    }
    if (y < this.miny) {
      this.miny = y;
    }
    if (y > this.maxy) {
      this.maxy = y;
    }
  }
};


/**
 * Enlarges this <code>Envelope2D</code> so that it contains the
 * <code>other</code> Envelope2D. Has no effect if <code>other</code> is
 * wholly on or within the Envelope2D.
 *
 * @param {jsts.geom.Envelope2D}
 *          other the <code>Envelope2D</code> to expand to include.
 */
jsts.geom.Envelope2D.prototype.expandToIncludeEnvelope2D = function(other) {
  if (other.isNull()) {
    return;
  }
  if (this.isNull()) {
    this.minx = other.getMinX();
    this.maxx = other.getMaxX();
    this.miny = other.getMinY();
    this.maxy = other.getMaxY();
  } else {
    if (other.minx < this.minx) {
      this.minx = other.minx;
    }
    if (other.maxx > this.maxx) {
      this.maxx = other.maxx;
    }
    if (other.miny < this.miny) {
      this.miny = other.miny;
    }
    if (other.maxy > this.maxy) {
      this.maxy = other.maxy;
    }
  }
};


/**
 * Enlarges this <code>Envelope2D</code>
 *
 * Will call appropriate expandBy* depending on arguments.
 */
jsts.geom.Envelope2D.prototype.expandBy = function() {
  if (arguments.length === 1) {
    this.expandByDistance(arguments[0]);
  } else {
    this.expandByDistances(arguments[0], arguments[1]);
  }
};


/**
 * Expands this Envelope2D by a given distance in all directions. Both positive
 * and negative distances are supported.
 *
 * @param {number}
 *          distance the distance to expand the Envelope2D.
 */
jsts.geom.Envelope2D.prototype.expandByDistance = function(distance) {
  this.expandByDistances(distance, distance);
};


/**
 * Expands this Envelope2D by a given distance in all directions. Both positive
 * and negative distances are supported.
 *
 * @param {number}
 *          deltaX the distance to expand the Envelope2D along the the X axis.
 * @param {number}
 *          deltaY the distance to expand the Envelope2D along the the Y axis.
 */
jsts.geom.Envelope2D.prototype.expandByDistances = function(deltaX, deltaY) {
  if (this.isNull()) {
    return;
  }

  this.minx -= deltaX;
  this.maxx += deltaX;
  this.miny -= deltaY;
  this.maxy += deltaY;

  // check for Envelope2D disappearing
  if (this.minx > this.maxx || this.miny > this.maxy) {
    this.setToNull();
  }
};


/**
 * Translates this Envelope2D by given amounts in the X and Y direction.
 *
 * @param {number}
 *          transX the amount to translate along the X axis.
 * @param {number}
 *          transY the amount to translate along the Y axis.
 */
jsts.geom.Envelope2D.prototype.translate = function(transX, transY) {
  if (this.isNull()) {
    return;
  }
  this.init(this.minx + transX, this.maxx + transX, this.miny + transY,
      this.maxy + transY);
};


/**
 * Computes the coordinate of the centre of this Envelope2D (as long as it is
 * non-null
 *
 * @return {jsts.geom.Coordinate} the centre coordinate of this Envelope2D <code>null</code>
 *         if the Envelope2D is null.
 */
jsts.geom.Envelope2D.prototype.centre = function() {
  if (this.isNull()) {
    return null;
  }
  return new jsts.geom.Coordinate((this.minx + this.maxx) / 2.0,
      (this.miny + this.maxy) / 2.0);
};


/**
 * Computes the intersection of two {@link Envelope2Ds}
 *
 * @param {jsts.geom.Envelope2D}
 *          env the Envelope2D to intersect with.
 * @return {jsts.geom.Envelope2D} a new Envelope2D representing the intersection of
 *         the Envelope2Ds (this will be the null Envelope2D if either argument is
 *         null, or they do not intersect.
 */
jsts.geom.Envelope2D.prototype.intersection = function(env) {
  if (this.isNull() || env.isNull() || !this.intersects(env)) {
    return new jsts.geom.Envelope2D();
  }

  var intMinX = this.minx > env.minx ? this.minx : env.minx;
  var intMinY = this.miny > env.miny ? this.miny : env.miny;
  var intMaxX = this.maxx < env.maxx ? this.maxx : env.maxx;
  var intMaxY = this.maxy < env.maxy ? this.maxy : env.maxy;

  return new jsts.geom.Envelope2D(intMinX, intMaxX, intMinY, intMaxY);
};


/**
 * Check if the region defined by input overlaps (intersects) the region of this
 * <code>Envelope2D</code>.
 *
 * Will call appropriate intersects* depending on arguments.
 *
 * @return {boolean} <code>true</code> if an overlap is found.
 */
jsts.geom.Envelope2D.prototype.intersects = function() {
  if (arguments[0] instanceof jsts.geom.Envelope2D) {
    return this.intersectsEnvelope2D(arguments[0]);
  } else if (arguments[0] instanceof jsts.geom.Coordinate) {
    return this.intersectsCoordinate(arguments[0]);
  } else {
    return this.intersectsValues(arguments[0], arguments[1]);
  }
};


/**
 * Check if the region defined by <code>other</code> overlaps (intersects) the
 * region of this <code>Envelope2D</code>.
 *
 * @param {jsts.geom.Envelope2D}
 *          other the <code>Envelope2D</code> which this <code>Envelope2D</code>
 *          is being checked for overlapping.
 * @return {boolean} <code>true</code> if the <code>Envelope2D</code>s
 *         overlap.
 */
jsts.geom.Envelope2D.prototype.intersectsEnvelope2D = function(other) {
  if (this.isNull() || other.isNull()) {
    return false;
  }

  var result = !(other.minx > this.maxx || other.maxx < this.minx ||
      other.miny > this.maxy || other.maxy < this.miny);
  return result;
};


/**
 * Check if the point <code>p</code> overlaps (lies inside) the region of this
 * <code>Envelope2D</code>.
 *
 * @param {jsts.geom.Coordinate}
 *          p the <code>Coordinate</code> to be tested.
 * @return {boolean} <code>true</code> if the point overlaps this
 *         <code>Envelope2D.</code>
 */
jsts.geom.Envelope2D.prototype.intersectsCoordinate = function(p) {
  return this.intersectsValues(p.x, p.y);
};


/**
 * Check if the point <code>(x, y)</code> overlaps (lies inside) the region of
 * this <code>Envelope2D</code>.
 *
 * @param {number}
 *          x the x-ordinate of the point.
 * @param {number}
 *          y the y-ordinate of the point.
 * @return {boolean} <code>true</code> if the point overlaps this
 *         <code>Envelope2D.</code>
 */
jsts.geom.Envelope2D.prototype.intersectsValues = function(x, y) {
  if (this.isNull()) {
    return false;
  }

  return !(x > this.maxx || x < this.minx || y > this.maxy || y < this.miny);
};


/**
 * Tests if the input lies wholely inside this <code>Envelope2D</code>
 * (inclusive of the boundary).
 *
 * Will call appropriate contains* depending on arguments.
 *
 * @return {boolean} true if input is contained in this <code>Envelope2D.</code>
 */
jsts.geom.Envelope2D.prototype.contains = function() {
  if (arguments[0] instanceof jsts.geom.Envelope2D) {
    return this.containsEnvelope2D(arguments[0]);
  } else if (arguments[0] instanceof jsts.geom.Coordinate) {
    return this.containsCoordinate(arguments[0]);
  } else {
    return this.containsValues(arguments[0], arguments[1]);
  }
};


/**
 * Tests if the <code>Envelope2D other</code> lies wholely inside this
 * <code>Envelope2D</code> (inclusive of the boundary).
 * <p>
 * Note that this is <b>not</b> the same definition as the SFS
 * <tt>contains</tt>, which would exclude the Envelope2D boundary.
 *
 * @param {jsts.geom.Envelope2D}
 *          other the <code>Envelope2D</code> to check.
 * @return {boolean} true if <code>other</code> is contained in this
 *         <code>Envelope2D.</code>
 *
 * @see covers(Envelope2D)
 */
jsts.geom.Envelope2D.prototype.containsEnvelope2D = function(other) {
  return this.coversEnvelope2D(other);
};


/**
 * Tests if the given point lies in or on the Envelope2D.
 * <p>
 * Note that this is <b>not</b> the same definition as the SFS
 * <tt>contains</tt>, which would exclude the Envelope2D boundary.
 *
 * @param {jsts.geom.Coordinate}
 *          p the point which this <code>Envelope2D</code> is being checked for
 *          containing.
 * @return {boolean} <code>true</code> if the point lies in the interior or on
 *         the boundary of this <code>Envelope2D</code>.
 *
 * @see covers(Coordinate)
 */
jsts.geom.Envelope2D.prototype.containsCoordinate = function(p) {
  return this.coversCoordinate(p);
};


/**
 * Tests if the given point lies in or on the Envelope2D.
 * <p>
 * Note that this is <b>not</b> the same definition as the SFS
 * <tt>contains</tt>, which would exclude the Envelope2D boundary.
 *
 * @param {number}
 *          x the x-coordinate of the point which this <code>Envelope2D</code>
 *          is being checked for containing.
 * @param {number}
 *          y the y-coordinate of the point which this <code>Envelope2D</code>
 *          is being checked for containing.
 * @return {boolean} <code>true</code> if <code>(x, y)</code> lies in the
 *         interior or on the boundary of this <code>Envelope2D</code>.
 *
 * @see covers(double, double)
 */
jsts.geom.Envelope2D.prototype.containsValues = function(x, y) {
  return this.coversValues(x, y);
};


/**
 * Tests if the given point lies in or on the Envelope2D.
 *
 * Will call appropriate contains* depending on arguments.
 */
jsts.geom.Envelope2D.prototype.covers = function() {
  if (p instanceof jsts.geom.Envelope2D) {
    this.coversEnvelope2D(arguments[0]);
  } else if (p instanceof jsts.geom.Coordinate) {
    this.coversCoordinate(arguments[0]);
  } else {
    this.coversValues(arguments[0], arguments[1]);
  }
};


/**
 * Tests if the given point lies in or on the Envelope2D.
 *
 * @param {number}
 *          x the x-coordinate of the point which this <code>Envelope2D</code>
 *          is being checked for containing.
 * @param {number}
 *          y the y-coordinate of the point which this <code>Envelope2D</code>
 *          is being checked for containing.
 * @return {boolean} <code>true</code> if <code>(x, y)</code> lies in the
 *         interior or on the boundary of this <code>Envelope2D</code>.
 */
jsts.geom.Envelope2D.prototype.coversValues = function(x, y) {
  if (this.isNull()) {
    return false;
  }
  return x >= this.minx && x <= this.maxx && y >= this.miny && y <= this.maxy;
};


/**
 * Tests if the given point lies in or on the Envelope2D.
 *
 * @param {jsts.geom.Coordinate}
 *          p the point which this <code>Envelope2D</code> is being checked for
 *          containing.
 * @return {boolean} <code>true</code> if the point lies in the interior or on
 *         the boundary of this <code>Envelope2D</code>.
 */
jsts.geom.Envelope2D.prototype.coversCoordinate = function(p) {
  return this.coversValues(p.x, p.y);
};


/**
 * Tests if the <code>Envelope2D other</code> lies wholely inside this
 * <code>Envelope2D</code> (inclusive of the boundary).
 *
 * @param {jsts.geom.Envelope2D}
 *          other the <code>Envelope2D</code> to check.
 * @return {boolean} true if this <code>Envelope2D</code> covers the
 *         <code>other.</code>
 */
jsts.geom.Envelope2D.prototype.coversEnvelope2D = function(other) {
  if (this.isNull() || other.isNull()) {
    return false;
  }
  return other.minx >= this.minx && other.maxx <= this.maxx &&
      other.miny >= this.miny && other.maxy <= this.maxy;
};


/**
 * Computes the distance between this and another <code>Envelope2D</code>.
 *
 * @param {jsts.geom.Envelope2D}
 *          env The <code>Envelope2D</code> to test this <code>Envelope2D</code>
 *          against.
 * @return {number} The distance between overlapping Envelope2Ds is 0. Otherwise,
 *         the distance is the Euclidean distance between the closest points.
 */
jsts.geom.Envelope2D.prototype.distance = function(env) {
  if (this.intersects(env)) {
    return 0;
  }
  var dx = 0.0;
  if (this.maxx < env.minx) {
    dx = env.minx - this.maxx;
  }
  if (this.minx > env.maxx) {
    dx = this.minx - env.maxx;
  }

  var dy = 0.0;
  if (this.maxy < env.miny) {
    dy = env.miny - this.maxy;
  }
  if (this.miny > env.maxy) {
    dy = this.miny - env.maxy;
  }

  // if either is zero, the Envelope2Ds overlap either vertically or horizontally
  if (dx === 0.0) {
    return dy;
  }
  if (dy === 0.0) {
    return dx;
  }
  return Math.sqrt(dx * dx + dy * dy);
};


/**
 * @param {jsts.geom.Envelope2D}
 *          other the <code>Envelope2D</code> to check against.
 * @return {boolean} true if Envelope2Ds are equal.
 */
jsts.geom.Envelope2D.prototype.equals = function(other) {
  if (this.isNull()) {
    return other.isNull();
  }
  return this.maxx === other.maxx && this.maxy === other.maxy &&
      this.minx === other.minx && this.miny === other.miny;
};


/**
 * @return {string} String representation of this <code>Envelope2D.</code>
 */
jsts.geom.Envelope2D.prototype.toString = function() {
  return 'Env[' + this.minx + ' : ' + this.maxx + ', ' + this.miny + ' : ' +
      this.maxy + ']';
};


/**
 * Test the point q to see whether it intersects the Envelope2D defined by p1-p2
 *
 * NOTE: calls intersectsEnvelope2D if four arguments are given to simulate
 * overloaded function
 *
 * @param {jsts.geom.Coordinate}
 *          p1 one extremal point of the Envelope2D.
 * @param {jsts.geom.Coordinate}
 *          p2 another extremal point of the Envelope2D.
 * @param {jsts.geom.Coordinate}
 *          q the point to test for intersection.
 * @return {boolean} <code>true</code> if q intersects the Envelope2D p1-p2.
 */
jsts.geom.Envelope2D.intersects = function(p1, p2, q) {
  if (arguments.length === 4) {
    return jsts.geom.Envelope2D.intersectsEnvelope2D(arguments[0], arguments[1],
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


/**
 * Test the Envelope2D defined by p1-p2 for intersection with the Envelope2D defined
 * by q1-q2
 *
 * @param {jsts.geom.Coordinate}
 *          p1 one extremal point of the Envelope2D P.
 * @param {jsts.geom.Coordinate}
 *          p2 another extremal point of the Envelope2D P.
 * @param {jsts.geom.Coordinate}
 *          q1 one extremal point of the Envelope2D Q.
 * @param {jsts.geom.Coordinate}
 *          q2 another extremal point of the Envelope2D Q.
 * @return {boolean} <code>true</code> if Q intersects P.
 */
jsts.geom.Envelope2D.intersectsEnvelope2D = function(p1, p2, q1, q2) {
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
};


/**
 * @return {jsts.geom.Envelope2D} A new instance copied from this.
 */
jsts.geom.Envelope2D.prototype.clone = function() {
  return new jsts.geom.Envelope2D(this.minx, this.miny, this.maxx, this.maxy);
};
