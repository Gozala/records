/* vim:set ts=2 sw=2 sts=2 expandtab */
/*jshint undef: true es5: true node: true devel: true
         forin: true supernew: true */
/*global define: true */

(typeof define === "undefined" ? function ($) { $(require, exports, module); } : define)(function (require, exports, module, undefined) {

"use strict";

var Record = require("records").Record;
var guards = require("guards");

exports["test basics"] = function(assert) {
  var Todo = Record.extend({
    description: guards.String
  });
  var todo = new Todo;

  assert.equal(todo.get('description'), undefined, "descripton is undefiend");
  assert.throws(function() {
    todo.set({ description: 15 });
  }, "invalid value is being set");
  todo.set({ description: "go and get some sleep" });
  assert.equal(todo.get("description"), "go and get some sleep",
               "correct value is set normally");
};

exports["test id validator"] = function(assert) {
  var Task = Record.extend({
    id: guards.Number,
    description: guards.String.extend({ defaults: 'Todo' }),
    defaults: {
      description: undefined
    }
  });

  var task = new Task;
};

if (module == require.main)
  require("test").run(exports);

});
