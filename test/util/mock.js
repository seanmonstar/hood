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

MockResponse.prototype.setHeader = function setHeader(key, val) {
  this._headers[key] = val;
};

exports.Request = MockRequest;
exports.Response = MockResponse;
