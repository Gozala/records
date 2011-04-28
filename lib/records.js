/* vim:set ts=2 sw=2 sts=2 expandtab */
/*jshint undef: true es5: true node: true devel: true
         forin: true latedef: false supernew: true */
/*global define: true */

(typeof define === "undefined" ? function ($) { $(require, exports, module); } : define)(function (require, exports, module, undefined) {

"use strict";

var Model = require("./models").Model;

exports.version = "0.0.1";
exports.Record = Model.extend({
  constructor: function Record(options) {
    // `id` is a reserved key, so we need to make sure that it's set to `null`.
    this.id = null;
    Model.call(this, options);
  },
  id: function id(value) {
    return value;
  },
  validate: function validate(attributes) {
    var values = {};
    Object.keys(attributes).forEach(function(key) {
      var field = Object.getPrototypeOf(this)[key];
      if (field) {
        if (field.isModel)
          return (values[key] = field.set(attributes[key]).toJSON());
        else if (field.isGuard)
          return (values[key] = field(attributes[key], key));
      }
      throw new Error("Record does not defines field '" + key + "'");
    }, this);
    return values;
  }
});

/*

var Record = require("mvc/record").Record;
var PointModel = Record.extend({
  x: Record.Number.extend({ defaults: 0 }),
  y: Record.Number.extend({ defaults: 0 })
});

var SegmentModel = Record.extend({
  start: PointModel,
  end: PointModel,
  opacity: guards.Number.extend({ defaults: 0 })
});


var segment = SegmentModel({
  start: { x: 0, y: 0 },
  end: { x: 10, y: 17 },
  opacity: 29
});
*/

})
