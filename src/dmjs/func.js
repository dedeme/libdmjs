/*
 * Copyright 19-jul-2013 ºDeme
 *
 * This file is part of 'dmBasic'.
 *
 * 'dmBasic' is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License.
 *
 * 'dmBasic' is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with 'dmBasic'.  If not, see <http://www.gnu.org/licenses/>.
 */

/*globals goog, dmjs */

/** Function utilities */
goog.provide("dmjs.func");

(function (ns) {
  'use strict';

  /** Function which do nothing */
  ns.nop = function () {
    return undefined;
  };

  /**
   * Tests if object is empty. (It does not have keys)
   * @param {!Object} object
   * @return {boolean}
   */
  ns.isEmpty = function (object) {
    return Object.keys(object).length
      === 0;
  };

  /**
   * Returns a function que returns true if its argument is '===' to 'o'.
   * @param {*} o
   * @return (function (*):!boolean)
   */
  ns.eq = function (o) { return function (e) { return e === o; }; };

  /**
   * Returns a function of an object with a field named 'fieldName', which
   * it returns true if object[fieldName] === 'value'.
   * @param {string} fieldName
   * @param {*} value
   * @return (function (*):!boolean)
   */
  ns.feq = function (fieldName, value) {
    return function (e) { return e[fieldName] === value; };
  };

  /**
   * Returns an ordenation function of two objects with a field named
   * 'field'. (if e1 > e2 -> 1)
   *
   * @param {!Object.<string, *>} e1
   * @param {!Object.<string, *>} e2
   * @param {!string} field
   * @return {!number}
   */
  ns.comparator = function (e1, e2, field) {
    return (e1[field] > e2[field]) ? 1 : (e1[field] < e2[field]) ? -1 : 0;
  };

  /**
   * Returns an ordenation function of two objects with a field named
   * 'field' using 'cmp'.
   *
   * @param {!Object.<string, *>} e1
   * @param {!Object.<string, *>} e2
   * @param {!string} field
   * @param {!function(*, *):!number} cmp
   * @return {!number}
   */
  ns.fcomparator = function (e1, e2, field, cmp) {
    return cmp(e1[field], e2[field]);
  };

  /**
   * Returns a boolean function which returns negated the value of 'f'.
   * @param {function (*):!boolean} f
   * @return {function (*):!boolean}
   */
  ns.negate = function (f) { return function (e) { return !f(e); }; };

  /**
   * <p>Return a function for generating a parameter read-write in an object.
   * </p>
   * <p>A parameter is declarated, for example:</p>
   * <p><tt>
   *  /&#042;&#042;<br>
   *  &nbsp;&#042; @type {function(!string=):!string} Default ""<br>
   *  &nbsp;&#042;/<br>
   *  this.sessionId = dmjs.func.param("");
   * </tt></p>
   */
  ns.param = function (def) {
    var
      v;
    v = def;

    return function (value) {
      if (value === undefined) {
        return v;
      }
      v = value;
      return v;
    };
  };

}(dmjs.func));
