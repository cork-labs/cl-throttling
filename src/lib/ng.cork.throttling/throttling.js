(function (angular) {
    'use strict';

    var module = angular.module('ng.cork.throttling', []);

    /**
     * @ngdoc  service
     * @name   ng.cork.throttling.corkThrottling
     *
     * @description
     * Provides methods to throttle and debounce function calls.
     */
    module.service('corkThrottling', [
        '$timeout',
        '$q',
        function corkThrottling($timeout, $q) {
            var self = this;

            /**
             * Private debounce implementation.
             *
             * See http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
             * Adapted from angular's $timeout code.
             *
             * @param {Function} fn The function to debounce.
             * @param {number} waitMs The debounce period in miliseconds.
             * @param {object|Function=} scope Optional context for the debounced function.
             * @param {boolean=} doLeading If set to `true` the debounced function will be invoked on the "leading" instead of the "trailing".
             * @param {boolean=} andDoTrailing If set to `true` the debounced function will also be invoked on the "trailing" edge.
             * @returns {Function} The wrapper function.
             */
            function debounce(fn, waitMs, scope, doLeading, andDoTrailing) {
                waitMs = waitMs || 250;
                var laterTimeout;
                var resetLeadingTimeout;
                var isLeading = true;
                var isTrailingNeeded;
                // create a deferred for the first execution
                var deferred = $q.defer();
                return function () {
                    var context = scope || this;
                    var args = arguments;
                    // sets leading mode again
                    var resetLeading = function () {
                        isLeading = true;
                    };
                    // threshold expired
                    var later = function () {
                        // when in leading + trailing mode
                        // because we are triggering the fn() in this "trailing" edge...
                        if (doLeading && andDoTrailing && isTrailingNeeded) {
                            // ... we are not ready for the next "leading"
                            $timeout.cancel(resetLeadingTimeout);
                            resetLeadingTimeout = $timeout(resetLeading, waitMs);
                        }
                        // otherwise, flag as ready to trigger "leading" again
                        if (doLeading && !andDoTrailing) {
                            isLeading = true;
                        }
                        // trailing or andDoTrailing modes
                        if (!doLeading || andDoTrailing && isTrailingNeeded) {
                            // invoke, resolve and replace the deferred
                            deferred.resolve(fn.apply(context, args));
                            deferred = $q.defer();
                            // flag that we did the "andDoTrailing" call
                            isTrailingNeeded = false;
                        }
                    };
                    // flag that "andDoTrailing" call is needed
                    if (doLeading && andDoTrailing && !isLeading) {
                        isTrailingNeeded = true;
                        $timeout.cancel(resetLeadingTimeout);
                    }
                    // leading mode + ready
                    if (doLeading && isLeading) {
                        isLeading = false;
                        isTrailingNeeded = false;
                        // invoke, resolve and replace the deferred
                        deferred.resolve(fn.apply(context, args));
                        deferred = $q.defer();
                    }
                    // always replace the timeout (keep postponing the "trailing" edge)
                    if (laterTimeout) {
                        $timeout.cancel(laterTimeout);
                    }
                    laterTimeout = $timeout(later, waitMs);

                    return deferred.promise;
                };
            }

            // -- public API

            /**
             * @ngdoc method
             * @name debounce
             * @methodOf ng.cork.throttling.corkThrottling
             *
             * @description
             * Returns a wrapper function that, as long it is repeatedly invoked does not trigger
             * the provided function until the wrapper is not invoked for at least with "threhosldMs"
             *
             * In other words, "do it as late as possible, when they stop pasking for a while":
             * - ignores the "leading", i.e., "first call"
             * - ignores subsquent repeated fast calls within "thrsholdMs"
             * - triggers only on "trailing edge", i.e., when nothing happens for a period of `waitMs`
             * - always honours the threshold
             *
             * The wrapper function always returns a deferred, resolved on the execution of the debounced function.
             *
             * @param {Function} fn The function to debounce.
             * @param {number} waitMs The debounce period in miliseconds.
             * @param {object|Function=} scope Optional context for the debounced function.
             * @returns {Function} The wrapper function.
             */
            self.debounce = function (fn, waitMs, scope) {
                return debounce(fn, waitMs, scope);
            };

            /**
             * @ngdoc method
             * @name debounce
             * @methodOf ng.cork.throttling.corkThrottling
             *
             * @description
             * Returns a function that triggers the provided function immediately and then ignores all calls for
             * the next "waitMs".
             *
             * In other words, "do it as soon as possible, but then ignore them for a while":
             * - triggers on "leading edge", i.e., "first call"
             * - ignores subsquent repeated fast calls within "thrsholdMs"
             * - always honours the threshold
             *
             * The wrapper function always returns a deferred, resolved on the execution of the debounced function.
             *
             * @param {Function} fn The function to debounce.
             * @param {number} waitMs The debounce period in miliseconds.
             * @param {object|Function=} scope Optional context for the debounced function.
             * @returns {Function} The wrapper function.
             */
            self.debounceLeading = function (fn, waitMs, scope) {
                return debounce(fn, waitMs, scope, true);
            };

            /**
             * @ngdoc method
             * @name debounce
             * @methodOf ng.cork.throttling.corkThrottling
             *
             * @description
             * Returns a function that invokes the provided function immediately and, as long as there is at least a
             * second call to the wrapper within the threshold, triggers it again but only when the threshold expires.
             * Subsequent calls will be ignored if made within `thresoldMs` after the last trigger, but then treated as
             * "leading" or "first call" again after the thresold expires.
             *
             * In other words, "do it a.s.a.p., but if they ask again, do it again when they stop asking for a while":
             * - triggers on "leading edge", i.e., "first call"
             * - triggers on "trailing edge", i.e., "waitMs" time after "last call"
             * - ignores all subsquent calls unless nothing happens for a period of `waitMs`
             * - always honours the threshold
             *
             * The wrapper function always returns a deferred, resolved on the execution of the debounced function.
             *
             * @param {Function} fn The function to debounce.
             * @param {number} waitMs The debounce period in miliseconds.
             * @param {object|Function=} scope Optional context for the debounced function.
             * @returns {Function} The wrapper function.
             */
            self.debounceBoth = function (fn, waitMs, scope) {
                return debounce(fn, waitMs, scope, true, true);
            };

            /**
             * @ngdoc method
             * @name throttle
             * @methodOf ng.cork.throttling.corkThrottling
             *
             * @description
             * Returns a function that will never be triggered twice during "waitMs" miliseconds.
             *
             * The provided function will be triggered immediately, and then, as long as the wrapper function continues
             * to be invoked, it will never be called within the provided threshold.
             *
             * Additionally, the wrapper function always returns a deferred, invoked on the execution of the debounced function.
             *
             * See https://remysharp.com/2010/07/21/throttling-function-calls.
             *
             * @param {Function} fn The function to throttle.
             * @param {number} waitMs The throttle period in miliseconds.
             * @param {object|Function=} scope Optional context for the throttled function.
             * @returns {Function} The wrapper function.
             */
            self.throttle = function (fn, waitMs, scope) {
                waitMs = waitMs || 250;
                var last;
                var laterTimeout;
                // create a deferred for the first execution
                var deferred = $q.defer();
                return function () {
                    var context = scope || this;
                    var now = +new Date();
                    var args = arguments;
                    // threshold expired: invoke, resolve and replace the deferred
                    var later = function () {
                        last = now;
                        deferred.resolve(fn.apply(context, args));
                        deferred = $q.defer();
                    };
                    // too soon, hold on to it
                    if (last && now < last + waitMs) {
                        $timeout.cancel(laterTimeout);
                        laterTimeout = $timeout(later, waitMs);

                    }
                    // first call, or over threshold: invoke, resolve and replace the deferred
                    else {
                        last = now;
                        deferred.resolve(fn.apply(context, args));
                        deferred = $q.defer();
                    }
                    return deferred.promise;
                };
            };

        }
    ]);

})(angular);
