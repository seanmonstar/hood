const csp = require('./csp');
const header = require('./header');
const hsts = require('./hsts');
const nosniff = require('./nosniff');
const xframe = require('./xframe');

const MIDDLEWARE = ['csp', 'hsts', 'nosniff', 'xframe'];

const DEFAULT = {
  
};

function hood(options) {
  options = options || DEFAULT;

  var middleware = [];
  MIDDLEWARE.forEach(function(name) {
    if (options[name] === false) {
      return;
    } else {
      middleware.push(hood[name](options[name]));
    }
  });

  return function all(req, res, next) {
    var counter = 0;

    (function middle() {
      var ware = middleware[counter++];
      ware(req, res, function _next(err) {
        if (err) {
          return next(err);
        }
        if (counter < middleware.length) {
          middle();
        } else {
          next();
        }
      });
    })();

  };
}

hood.csp = csp;
hood.header = header;
hood.hsts = hsts;
hood.nosniff = nosniff;
hood.xframe = xframe;

module.exports = hood;
