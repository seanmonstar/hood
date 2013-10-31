/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const HEADER = 'Strict-Transport-Security';
const MAX_AGE = 15552000; // ~6months


// hsts({ maxAge, includeSubdomains })
// hsts(maxAge, includeSubdomains);
// hsts(includeSubdomains);
function hstsFactory(options/*, includeSubdomains*/) {
  options = options || {};
  if (arguments.length === 2) {
    options = {
      maxAge: arguments[0],
      includeSubdomains: arguments[1]
    };
  }
  if (options === true) {
    options = {
      includeSubdomains: true
    };
  }
  if (typeof options === 'number') {
    options = {
      maxAge: options
    };
  }


  var maxAge = options.maxAge || MAX_AGE;
  var subdomains = options.includeSubdomains || false;

  var str = 'max-age=' + maxAge;
  if (subdomains) {
    str += '; includeSubdomains';
  }
  return function hsts(req, res, next) {
    res.header(HEADER, str);
    next();
  };
}

module.exports = hstsFactory;
