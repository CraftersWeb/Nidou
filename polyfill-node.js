// Polyfills for Node 18 compatibility with Expo SDK 52+ Metro
if (!Array.prototype.toReversed) {
  Array.prototype.toReversed = function () {
    return [...this].reverse();
  };
}

if (!Array.prototype.toSorted) {
  Array.prototype.toSorted = function (compareFn) {
    return [...this].sort(compareFn);
  };
}

if (!Array.prototype.toSpliced) {
  Array.prototype.toSpliced = function (start, deleteCount, ...items) {
    const copy = [...this];
    copy.splice(start, deleteCount, ...items);
    return copy;
  };
}

if (!Array.prototype.with) {
  Array.prototype.with = function (index, value) {
    const copy = [...this];
    copy[index] = value;
    return copy;
  };
}

if (typeof global.File === 'undefined') {
  try {
    const { File } = require('buffer');
    if (File) {
      global.File = File;
    }
  } catch (e) {
    // ignore
  }
}

const util = require('util');
if (!util.styleText) {
  util.styleText = function (format, text) {
    return text;
  };
}

