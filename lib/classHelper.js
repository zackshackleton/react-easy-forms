'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var classHelper = exports.classHelper = function classHelper(initialClass, otherClasses) {
  var classArray = [initialClass];

  otherClasses.map(function (option) {
    if (option[1]) {
      classArray.push(option[0]);
    }
  });

  return classArray.join(' ');
};