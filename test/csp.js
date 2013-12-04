/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const assert = require('assert');

const csp = require('../').csp;
const mock = require('./util/mock');


var req, res;
module.exports = {
  'csp': {
    'beforeEach': function() {
      req = new mock.Request();
      res = new mock.Response();
    },
    '()': {
      'default': {
        'sets 3 headers': function() {
          var fn = csp();
          fn(req, res, function() {
            assert.equal(Object.keys(res._headers).length, 3);
          });
        },
        'headers contain default policy': function() {
          var fn = csp();
          fn(req, res, function() {
            var header = res._headers['Content-Security-Policy'];
            assert.equal(header, "default-src 'self';");
          });
        }
      },
      'policy' : {
        'should use the provide policy': function() {
          var fn = csp({ policy: { 'img-src': 'self', 'script-src': 'self' }});
          fn(req, res, function() {
            var header = res._headers['Content-Security-Policy'];
            assert.equal(header, "img-src 'self'; script-src 'self';");
          });
        },
        'can provide string value': function() {
          var fn = csp({ policy: "img-src 'self';"});
          fn(req, res, function() {
            var header = res._headers['Content-Security-Policy'];
            assert.equal(header, "img-src 'self';");
          });
        },
        'can provide object with arrays': function() {
          var fn = csp({ policy: { 'default-src': ['self', 'unsafe-eval'] } });
          fn(req, res, function() {
            var header = res._headers['Content-Security-Policy'];
            assert.equal(header, "default-src 'self' 'unsafe-eval';");
          });
        }
      },
      'reportOnly': {
        'should change to Report-Only header': function() {
          var fn = csp({ reportOnly: true });
          fn(req, res, function() {
            assert.equal(Object.keys(res._headers).length, 1);
            assert(res._headers['Content-Security-Policy-Report-Only']);
          });
        }
      },
      'shortcuts': function() {
        var fn = csp("img-src 'self';");
        fn(req, res, function() {
          var header = res._headers['Content-Security-Policy'];
          assert.equal(header, "img-src 'self';");
        });

        fn = csp("script-src 'self';", true);
        fn(req, res, function() {
          var header = res._headers['Content-Security-Policy-Report-Only'];
          assert.equal(header, "script-src 'self';");
        });
      }
    }
  }
};
