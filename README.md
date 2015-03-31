# ng.cork.throttling
[![Build Status: Linux](http://img.shields.io/travis/cork-labs/ng.cork.throttling/master.svg?style=flat-square)](https://travis-ci.org/cork-labs/ng.cork.throttling)
[![Bower version](http://img.shields.io/bower/v/ng.cork.throttling.svg?style=flat-square)](https://github.com/cork-labs/ng.cork.throttling)

> AngularJS service providing helpers to debounce and throttle function calls.


## Getting Started

Add **ng.cork.throttling** to you project.

Via bower:

```
$ bower install --save ng.cork.throttling
```

Include the following JS files in your build:
- `dist/ng.cork.throttling.js` OR `dist/ng.cork.throttling.min.js`

Checkout the [full documentation](http://jarvis.cork-labs.org/ng.cork.throttling/current/docs).


## Documentation

Make sure to check the [official documentation](http://jarvis.cork-labs.org/ng.cork.throttling/current/docs) where you can find a
[guide](http://jarvis.cork-labs.org/ng.cork.throttling/current/docs/#/guide), a few [demos](http://jarvis.cork-labs.org/ng.cork.throttling/current/docs/#/demos) and the complete
[API reference](http://jarvis.cork-labs.org/ng.cork.throttling/current/docs/#/docs).


### Quick Guide

The ng.cork.throttling provides a service with 4 methods to suit all your throttling and debouncing needs in under 1K.

### var throttledFn = corkThrottling.throttle(fn)

Execute the throttled function as necessary, but never under M miliseconds after the previous execution.

### var debouncedFn = corkThrottling.debounce(fn)

Execute the debounced function only after M miliseconds of no calls.

### var debouncedFn = corkThrottling.debounceLeading(fn)

Execute the debounced function immediately, ignore any other calls as long as within M miliseconds from the previuous call.

If the actual "latest" value is relavant, don't use this function because as long as there are consecutive calls with 2
secs, the value is not updated again.

### var debouncedFn = corkThrottling.debounceBoth(fn)

Execute the debounced function immediately, ignore any other calls as long as within M miliseconds from the previous call
but also execute the function with the arguments of the last call, if at least another call is made within the M miliseconds.

Use this one instead of debounceLeading() if both the initial and latest value are important but you want to ignore all
activity in between.


## Contributing

We'd love for you to contribute to our source code and to make it even better than it is today!

Make sure you read the [Contributing Guide](CONTRIBUTING.md) first.


## Developing

Clone this repository, install the dependencies and simply run `grunt develop`.

```
$ npm install -g grunt-cli bower
$ npm install
$ bower install
$ ./bootstrap.sh
$ grunt develop
```

At this point, the source examples included were built into the `build/` directory and a simple webserver is launched so
that you can browse the documentation, the examples and the code coverage.

```
...
Running "serve:build" (serve) task
Started connect web server on http://0.0.0.0:8000

Running "watch" task
Waiting...
```

More info on the (Grunt based) tools can be found in the
[boilerplate documentation](http://jarvis.cork-labs.org/boilerplate-nglib/current/docs).


## Authors

**Andre Torgal (andrezero)**
+ <https://twitter.com/andrezero>
+ <https://github.com/andrezero>


## Acknowledgements

Debouncing by [John Hann](http://unscriptable.com/2009/03/20/debouncing-javascript-methods/)

Throttling by [Remy Sharp](https://remysharp.com/2010/07/21/throttling-function-calls)


## [MIT License](LICENSE-MIT)

[Copyright (c) 2015 Cork Labs](http://cork-labs.mit-license.org/2015)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
