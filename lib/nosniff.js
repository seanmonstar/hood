/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const HEADER = 'X-Content-Type-Options';
const VALUE = 'nosniff';

function nosniffFactory() {
  return function nosniff(req, res, next) {
    res.setHeader(HEADER, VALUE);
    next();
  };
}

module.exports = nosniffFactory;
