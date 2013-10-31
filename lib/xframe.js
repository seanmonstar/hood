/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const HEADER = 'X-FRAME-OPTIONS';

function isString(obj) {
  return Object.prototype.toString.call(obj) === "[object String]";
}

// xframe() //deny
// xframe({ sameOrigin: true })
// xframe({ allow: 'http://example.domain' })
// xframe(rawStr)
function xframeFactory(options) {
  options = options || {};

  var str = 'DENY';
  if (isString(options)) {
    str = options;
  } else {
    if (options.sameOrigin) {
      str = 'SAMEORIGIN';
    }
    if (options.allow) {
      if (options.sameOrigin) {
        throw new Error('Cannot specify both ALLOW-FROM and SAMEORIGIN');
      }

      str = 'ALLOW-FROM ' + options.allow;
    }
  }

  return function xframe(req, res, next) {
    res.header(HEADER, str);
    next();
  };
}

module.exports = xframeFactory;
