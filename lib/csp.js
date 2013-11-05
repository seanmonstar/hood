/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const util = require('util');

const HEADERS = [
  'X-Content-Security-Policy',
  'X-WebKit-CSP',
  'Content-Security-Policy',
];

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function isString(obj) {
  return Object.prototype.toString.call(obj) === "[object String]";
}

const DEFAULT = {
  'default-src': 'self'
};

// csp({ policy: {src: value})
// csp({ policy: {src: [values]})
// csp({ policy: policyStr })
// csp(policyStr)
function cspFactory(options) {
  options = options || {};
  if (isString(options)) {
    options = { policy: options };
  }
  var headers = options.headers || HEADERS;
  var policy = options.policy || DEFAULT;
  policy = toHeader(policy);
  return function csp(req, res, next) {
    headers.forEach(function(header) {
      res.header(header, policy);
    });
    next();
  };
}

function toHeader(policy) {
  if (isString(policy)) {
    return policy;
  }
  var parts = [];
  for (var src in policy) {
    if (hasOwn(policy, src)) {
      var str = src + ' ';
      if (util.isArray(policy[src])) {
        str += policy[src].map(toString).join(' ');
      } else {
        str += toString(policy[src]);
      }
      parts.push(str + ';');
    }
  }
  return parts.join(' ');
}

const WRAPPED_VALUES = [
  'self',
  'unsafe-eval',
  'unsafe-inline',
  'none'
];

function toString(value) {
  value = String(value);
  if (WRAPPED_VALUES.indexOf(value) !== -1) {
    value = "'" + value + "'"; // catch if someone forgets to pass it as 'self'
  }
  return value;
}

module.exports = cspFactory;
