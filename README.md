# ng.cl.throttling [![Build Status: Linux](http://img.shields.io/travis/cork-labs/ng.cl.throttling/master.svg?style=flat-square)](https://travis-ci.org/cork-labs/ng.cl.throttling) [![Bower version](http://img.shields.io/bower/v/ng.cl.throttling?style=flat-square)]
 (https://github.com/cork-labs/ng.cl.throttling)

> Provides a service to debounce and throttle function calls.

## Getting started

```
// bower install (or clone)
bower install --save ng-cl-throttiling

// add the code to your (you're using grunt/gulp to do this for you, right?)
<script type="text/javascript" src="/vendor/ng.cl.throttling.min.js" />

// add the module dependency to modules where you use it
angular.module('your.module', ['ng.cl.throttling'])

// add the service dependency to the service, controller, directive where you need it
.controller('myController', ['clThrottling'], function (clThrottling) {

    // wrap your function to debounce or throttle
    var debouncedFn = clThrottling.throttle(function (arg1, arg2) {
        // perform that expensive arithmetics with args
        console.log(arg1 + arg2);
    });
});

```


## Usage

The ng.cl.throttling provides a service with 4 methods to suit all your throttling and debouncing needs in under 1K.

Please check the complete [documentation](http://jarvis.cork-labs.org/ng.cl.throttling/current/docs/#/api) and [examples](http://jarvis.cork-labs.org/ng.cl.throttling/current/docs/#/demos).

### var throttledFn = clThrottling.throttle(fn)

Execute the throttled function as necessary, but never under M miliseconds after the previous execution.

### var debouncedFn = clThrottling.debounce(fn)

Execute the debounced function only after M miliseconds of no calls.

### var debouncedFn = clThrottling.debounceLeading(fn)

Execute the debounced function immediately, ignore any other calls as long as within M miliseconds from the previuous call.

If the actual "latest" value is relavant, don't use this function because as long as there are consecutive calls with 2
secs, the value is not updated again.

### var debouncedFn = clThrottling.debounceBoth(fn)

Execute the debounced function immediately, ignore any other calls as long as within M miliseconds from the previous call
but also execute the function with the arguments of the last call, if at least another call is made within the M miliseconds.

Use this one instead of debounceLeading() if both the initial and latest value are important but you want to ignore all
activity in between.

## Changelog

## Todo

## Contributing

Setup your development environment.

```
$ sudo npm install -g grunt-cli bower
$ npm install
$ bower install
$ ./bootstrap.sh
$ grunt develop
```
Feel free to contribute with comments, issues and pull requests. Please follow the code style and make sure code is
commented, linted, beautified and tested before issuing a pull request.

If you have any doubts or rants also feel free to reach over to the authors.

More info on the (Grunt based) tools can be found in the
[boilerplate documentation](http://jarvis.cork-labs.org/nglib-boilerplate/current/docs).


## Authors

**Andre Torgal (andrezero)**
+ <https://twitter.com/andrezero>
+ <http://github.com/andrezero>


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
