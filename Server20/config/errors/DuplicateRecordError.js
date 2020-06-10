"use strict";
function DuplicateRecordError(code, error) {
  Error.call(this, typeof error === "undefined" ? undefined : error.message);
  Error.captureStackTrace(this, this.constructor);
  this.name = "DuplicateRecordError";
  this.message = typeof error === "undefined" ? undefined : error.message;
  this.code = typeof code === "undefined" ? "409" : code;
  this.status = 409;
  this.inner = error;
}

DuplicateRecordError.prototype = Object.create(Error.prototype);
DuplicateRecordError.prototype.constructor = DuplicateRecordError;

module.exports = DuplicateRecordError;
