/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const assert = require('assert');

const xframe = require('../').xframe;
const mock = require('./util/mock');

const X_FRAME_OPTIONS = 'X-FRAME-OPTIONS';


var req, res;
module.exports = {
  'xframe': {
    'beforeEach': function() {
      req = new mock.Request();
      res = new mock.Response();
    },
    'should set correct header': function() {
      var fn = xframe();
      fn(req, res, function() {
        var header = res._headers[X_FRAME_OPTIONS];
        assert.equal(header, 'DENY');
      });
    },
    'options': {
      'allow': function() {
        var fn = xframe({
          allow: 'http://example.domain'
        });
        fn(req, res, function() {
          var header = res._headers[X_FRAME_OPTIONS];
          assert.equal(header, 'ALLOW-FROM http://example.domain');
        });
      },
      'same-origin': function() {
        var fn = xframe({
          sameOrigin: true
        });
        fn(req, res, function() {
          var header = res._headers[X_FRAME_OPTIONS];
          assert.equal(header, 'SAMEORIGIN');
        });
      },
      'cannot combine options': function() {
        assert.throws(function() {
          xframe({
            sameOrigin: true,
            allow: 'http://example.domain'
          });
        });
      },
      'shortcut': function() {
        var fn = xframe('SAMEORIGIN');
        fn(req, res, function() {
          var header = res._headers[X_FRAME_OPTIONS];
          assert.equal(header, 'SAMEORIGIN');
        });
      }
    }
  }
};
