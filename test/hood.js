/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const assert = require('assert');

const hood = require('../');
const mock = require('./util/mock');

var req, res;
module.exports = {
  'hood': {
    'beforeEach': function() {
      req = new mock.Request();
      res = new mock.Response();
    },
    'applies default middleware': function() {
      var fn = hood();
      fn(req, res, function() {
        assert('Strict-Transport-Security' in res._headers);
        assert('Content-Security-Policy' in res._headers);
        assert('X-FRAME-OPTIONS' in res._headers);
      });
    },
    'passes options to each middleware': function() {
      var fn = hood({
        xframe: 'SAMEORIGIN',
        csp: "default-src 'unsafe-eval'"
      });

      fn(req, res, function() {
        var h = res._headers;
        assert.equal(h['Content-Security-Policy'], "default-src 'unsafe-eval'");
        assert.equal(h['X-FRAME-OPTIONS'], "SAMEORIGIN");
      });

    },
    'can disable middleware': function() {
      var fn = hood({
        csp: false
      });
      fn(req, res, function() {
        assert('Strict-Transport-Security' in res._headers);
        assert(!('Content-Security-Policy' in res._headers));
        assert('X-FRAME-OPTIONS' in res._headers);
      });
    }
  }
};
