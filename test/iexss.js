/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const assert = require('assert');

const iexss = require('../').iexss;
const mock = require('./util/mock');


var req, res;
module.exports = {
  'iexss': {
    'beforeEach': function() {
      req = new mock.Request();
      res = new mock.Response();
    },
    'should add header': function() {
      var fn = iexss();
      fn(req, res, function() {
        assert.equal(res._headers['X-XSS-Protection'], '1; mode=block');
      });
    }
  }
};
