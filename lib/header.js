/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

function headerFactory(key, value) {
  
  var headers = {};
  if (arguments.length === 2) {
    headers[key] = value;
  } else {
    headers = key;
  }
  return function header(req, res, next) {
    res.header(headers);
    next();
  };
}

module.exports = headerFactory;
