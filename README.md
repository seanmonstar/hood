# hood

[![Build Status](https://travis-ci.org/seanmonstar/hood.png?branch=master)](https://travis-ci.org/seanmonstar/hood)
[![NPM version](https://badge.fury.io/js/hood.png)](http://badge.fury.io/js/hood)

Cover your head.

Security headers middleware for [connect](https://npmjs.org/package/connect) or [express](https://npmjs.org/package/express).

Further readings on middlewares can be found [here](http://www.senchalabs.org/connect/)

![hood](https://github.com/seanmonstar/hood/raw/master/hood.png)

## Usage

```js
var hood = require('hood');
app.use(hood());
```

This will setup sane defaults for most apps. You can also pass options to configure each middleware.

```js
app.use(hood({
  csp: "default-src 'unsafe-inline'",
  hsts: false // pass false to disable a middlware
}));
```

Each middleware is also available individually.

### csp

```js
app.use(hood.csp());
app.use(hood.csp({
  policy: {
    'default-src': ['self', 'unsafe-inline']
  }
}));
app.use(hood.csp("default-src 'self';"));
```

### hsts

Only applies header if request is secure. Checks `req.connection.encrypted` and `req.connection.proxySecure`.

```js
app.use(hood.hsts());
app.use(hood.hsts({
  maxAge: 1000, // seconds
  includeSubdomains: true // default false
}));
app.use(hood.hsts(1000, true));
```

### xframe

```js
app.use(hood.xframe()) // DENY
app.use(hood.xframe({
  sameOrigin: true
}));
app.use(hood.xframe({
  allow: 'http://example.domain'
}));
app.use(hood.xframe('SAMEORIGIN'));
app.use(hood.xframe('ALLOW-FROM http://example.domain'));
```

### nosniff

```js
app.use(hood.nosniff());
```

### header

A convenience method when you need to add arbitrary headers to all requests.

```js
app.use(hood.header('x-foo', 'bar'));
app.use(hood.header({
  'x-foo': 'bar',
  'x-baz': 'quux'
}));
```
