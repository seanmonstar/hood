/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const assert = require('assert');

const header = require('../').header;
const mock = require('./util/mock');


var req, res;
module.exports = {
  'header': {
    'beforeEach': function() {
      req = new mock.Request();
      res = new mock.Response();
    },
    'should take a single argument': function() {
      var fn = header({ 'x-foo': 'bar' });
      fn(req, res, function() {
        var _header = res._headers['x-foo'];
        assert.equal(_header, 'bar');
      });
    },
    'should take 2 arguments': function() {
      var fn = header('x-baz', 'quux');
      fn(req, res, function() {
        var _header = res._headers['x-baz'];
        assert.equal(_header, 'quux');
      });
    }
  }
};
