/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const assert = require('assert');

const hsts = require('../').hsts;
const mock = require('./util/mock');


var req, res;
module.exports = {
  'hsts': {
    'beforeEach': function() {
      req = new mock.Request();
      res = new mock.Response();
    },
    'should set correct header': function() {
      var fn = hsts();
      fn(req, res, function() {
        var header = res._headers['Strict-Transport-Security'];
        assert.equal(header, 'max-age=15552000');
      });
    },
    'should use provided options': function() {
      var fn = hsts({ maxAge: 100, includeSubdomains: true });
      fn(req, res, function() {
        var header = res._headers['Strict-Transport-Security'];
        assert.equal(header, 'max-age=100; includeSubdomains');
      });
    },
    'shortcuts': {
      'maxAge': function() {
        var fn = hsts(200);
        fn(req, res, function() {
          var header = res._headers['Strict-Transport-Security'];
          assert.equal(header, 'max-age=200');
        });
      },
      'includeSubdomains': function() {
        var fn = hsts(true);
        fn(req, res, function() {
          var header = res._headers['Strict-Transport-Security'];
          assert.equal(header, 'max-age=15552000; includeSubdomains');
        });
      },
      'both': function() {
        var fn = hsts(300, true);
        fn(req, res, function() {
          var header = res._headers['Strict-Transport-Security'];
          assert.equal(header, 'max-age=300; includeSubdomains');
        });
      }
    }
  }
};
