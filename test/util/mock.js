/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

function MockRequest(options) {
  if (!(this instanceof MockRequest)) {
    return new MockRequest(options);
  }
  this.connection = { encrypted: {} };
}

function MockResponse(options) {
  if (!(this instanceof MockResponse)) {
    return new MockResponse(options);
  }

  this._headers = {};
}

MockResponse.prototype.header = function header(field, val) {
  if (2 === arguments.length) {
    if (Array.isArray(val)) {
      val = val.map(String);
    } else {
      val = String(val);
    }
    this.setHeader(field, val);
  } else {
    for (var key in field) {
      this.set(key, field[key]);
    }
  }
  return this;
};
MockResponse.prototype.set = MockResponse.prototype.header;

MockResponse.prototype.setHeader = function setHeader(key, val) {
  this._headers[key] = val;
};

exports.Request = MockRequest;
exports.Response = MockResponse;
