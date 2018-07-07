/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/random-js/lib/random.js":
/*!**********************************************!*\
  !*** ./node_modules/random-js/lib/random.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*jshint eqnull:true*/
(function (root) {
  "use strict";

  var GLOBAL_KEY = "Random";

  var imul = (typeof Math.imul !== "function" || Math.imul(0xffffffff, 5) !== -5 ?
    function (a, b) {
      var ah = (a >>> 16) & 0xffff;
      var al = a & 0xffff;
      var bh = (b >>> 16) & 0xffff;
      var bl = b & 0xffff;
      // the shift by 0 fixes the sign on the high part
      // the final |0 converts the unsigned value into a signed value
      return (al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0;
    } :
    Math.imul);

  var stringRepeat = (typeof String.prototype.repeat === "function" && "x".repeat(3) === "xxx" ?
    function (x, y) {
      return x.repeat(y);
    } : function (pattern, count) {
      var result = "";
      while (count > 0) {
        if (count & 1) {
          result += pattern;
        }
        count >>= 1;
        pattern += pattern;
      }
      return result;
    });

  function Random(engine) {
    if (!(this instanceof Random)) {
      return new Random(engine);
    }

    if (engine == null) {
      engine = Random.engines.nativeMath;
    } else if (typeof engine !== "function") {
      throw new TypeError("Expected engine to be a function, got " + typeof engine);
    }
    this.engine = engine;
  }
  var proto = Random.prototype;

  Random.engines = {
    nativeMath: function () {
      return (Math.random() * 0x100000000) | 0;
    },
    mt19937: (function (Int32Array) {
      // http://en.wikipedia.org/wiki/Mersenne_twister
      function refreshData(data) {
        var k = 0;
        var tmp = 0;
        for (;
          (k | 0) < 227; k = (k + 1) | 0) {
          tmp = (data[k] & 0x80000000) | (data[(k + 1) | 0] & 0x7fffffff);
          data[k] = data[(k + 397) | 0] ^ (tmp >>> 1) ^ ((tmp & 0x1) ? 0x9908b0df : 0);
        }

        for (;
          (k | 0) < 623; k = (k + 1) | 0) {
          tmp = (data[k] & 0x80000000) | (data[(k + 1) | 0] & 0x7fffffff);
          data[k] = data[(k - 227) | 0] ^ (tmp >>> 1) ^ ((tmp & 0x1) ? 0x9908b0df : 0);
        }

        tmp = (data[623] & 0x80000000) | (data[0] & 0x7fffffff);
        data[623] = data[396] ^ (tmp >>> 1) ^ ((tmp & 0x1) ? 0x9908b0df : 0);
      }

      function temper(value) {
        value ^= value >>> 11;
        value ^= (value << 7) & 0x9d2c5680;
        value ^= (value << 15) & 0xefc60000;
        return value ^ (value >>> 18);
      }

      function seedWithArray(data, source) {
        var i = 1;
        var j = 0;
        var sourceLength = source.length;
        var k = Math.max(sourceLength, 624) | 0;
        var previous = data[0] | 0;
        for (;
          (k | 0) > 0; --k) {
          data[i] = previous = ((data[i] ^ imul((previous ^ (previous >>> 30)), 0x0019660d)) + (source[j] | 0) + (j | 0)) | 0;
          i = (i + 1) | 0;
          ++j;
          if ((i | 0) > 623) {
            data[0] = data[623];
            i = 1;
          }
          if (j >= sourceLength) {
            j = 0;
          }
        }
        for (k = 623;
          (k | 0) > 0; --k) {
          data[i] = previous = ((data[i] ^ imul((previous ^ (previous >>> 30)), 0x5d588b65)) - i) | 0;
          i = (i + 1) | 0;
          if ((i | 0) > 623) {
            data[0] = data[623];
            i = 1;
          }
        }
        data[0] = 0x80000000;
      }

      function mt19937() {
        var data = new Int32Array(624);
        var index = 0;
        var uses = 0;

        function next() {
          if ((index | 0) >= 624) {
            refreshData(data);
            index = 0;
          }

          var value = data[index];
          index = (index + 1) | 0;
          uses += 1;
          return temper(value) | 0;
        }
        next.getUseCount = function() {
          return uses;
        };
        next.discard = function (count) {
          uses += count;
          if ((index | 0) >= 624) {
            refreshData(data);
            index = 0;
          }
          while ((count - index) > 624) {
            count -= 624 - index;
            refreshData(data);
            index = 0;
          }
          index = (index + count) | 0;
          return next;
        };
        next.seed = function (initial) {
          var previous = 0;
          data[0] = previous = initial | 0;

          for (var i = 1; i < 624; i = (i + 1) | 0) {
            data[i] = previous = (imul((previous ^ (previous >>> 30)), 0x6c078965) + i) | 0;
          }
          index = 624;
          uses = 0;
          return next;
        };
        next.seedWithArray = function (source) {
          next.seed(0x012bd6aa);
          seedWithArray(data, source);
          return next;
        };
        next.autoSeed = function () {
          return next.seedWithArray(Random.generateEntropyArray());
        };
        return next;
      }

      return mt19937;
    }(typeof Int32Array === "function" ? Int32Array : Array)),
    browserCrypto: (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function" && typeof Int32Array === "function") ? (function () {
      var data = null;
      var index = 128;

      return function () {
        if (index >= 128) {
          if (data === null) {
            data = new Int32Array(128);
          }
          crypto.getRandomValues(data);
          index = 0;
        }

        return data[index++] | 0;
      };
    }()) : null
  };

  Random.generateEntropyArray = function () {
    var array = [];
    var engine = Random.engines.nativeMath;
    for (var i = 0; i < 16; ++i) {
      array[i] = engine() | 0;
    }
    array.push(new Date().getTime() | 0);
    return array;
  };

  function returnValue(value) {
    return function () {
      return value;
    };
  }

  // [-0x80000000, 0x7fffffff]
  Random.int32 = function (engine) {
    return engine() | 0;
  };
  proto.int32 = function () {
    return Random.int32(this.engine);
  };

  // [0, 0xffffffff]
  Random.uint32 = function (engine) {
    return engine() >>> 0;
  };
  proto.uint32 = function () {
    return Random.uint32(this.engine);
  };

  // [0, 0x1fffffffffffff]
  Random.uint53 = function (engine) {
    var high = engine() & 0x1fffff;
    var low = engine() >>> 0;
    return (high * 0x100000000) + low;
  };
  proto.uint53 = function () {
    return Random.uint53(this.engine);
  };

  // [0, 0x20000000000000]
  Random.uint53Full = function (engine) {
    while (true) {
      var high = engine() | 0;
      if (high & 0x200000) {
        if ((high & 0x3fffff) === 0x200000 && (engine() | 0) === 0) {
          return 0x20000000000000;
        }
      } else {
        var low = engine() >>> 0;
        return ((high & 0x1fffff) * 0x100000000) + low;
      }
    }
  };
  proto.uint53Full = function () {
    return Random.uint53Full(this.engine);
  };

  // [-0x20000000000000, 0x1fffffffffffff]
  Random.int53 = function (engine) {
    var high = engine() | 0;
    var low = engine() >>> 0;
    return ((high & 0x1fffff) * 0x100000000) + low + (high & 0x200000 ? -0x20000000000000 : 0);
  };
  proto.int53 = function () {
    return Random.int53(this.engine);
  };

  // [-0x20000000000000, 0x20000000000000]
  Random.int53Full = function (engine) {
    while (true) {
      var high = engine() | 0;
      if (high & 0x400000) {
        if ((high & 0x7fffff) === 0x400000 && (engine() | 0) === 0) {
          return 0x20000000000000;
        }
      } else {
        var low = engine() >>> 0;
        return ((high & 0x1fffff) * 0x100000000) + low + (high & 0x200000 ? -0x20000000000000 : 0);
      }
    }
  };
  proto.int53Full = function () {
    return Random.int53Full(this.engine);
  };

  function add(generate, addend) {
    if (addend === 0) {
      return generate;
    } else {
      return function (engine) {
        return generate(engine) + addend;
      };
    }
  }

  Random.integer = (function () {
    function isPowerOfTwoMinusOne(value) {
      return ((value + 1) & value) === 0;
    }

    function bitmask(masking) {
      return function (engine) {
        return engine() & masking;
      };
    }

    function downscaleToLoopCheckedRange(range) {
      var extendedRange = range + 1;
      var maximum = extendedRange * Math.floor(0x100000000 / extendedRange);
      return function (engine) {
        var value = 0;
        do {
          value = engine() >>> 0;
        } while (value >= maximum);
        return value % extendedRange;
      };
    }

    function downscaleToRange(range) {
      if (isPowerOfTwoMinusOne(range)) {
        return bitmask(range);
      } else {
        return downscaleToLoopCheckedRange(range);
      }
    }

    function isEvenlyDivisibleByMaxInt32(value) {
      return (value | 0) === 0;
    }

    function upscaleWithHighMasking(masking) {
      return function (engine) {
        var high = engine() & masking;
        var low = engine() >>> 0;
        return (high * 0x100000000) + low;
      };
    }

    function upscaleToLoopCheckedRange(extendedRange) {
      var maximum = extendedRange * Math.floor(0x20000000000000 / extendedRange);
      return function (engine) {
        var ret = 0;
        do {
          var high = engine() & 0x1fffff;
          var low = engine() >>> 0;
          ret = (high * 0x100000000) + low;
        } while (ret >= maximum);
        return ret % extendedRange;
      };
    }

    function upscaleWithinU53(range) {
      var extendedRange = range + 1;
      if (isEvenlyDivisibleByMaxInt32(extendedRange)) {
        var highRange = ((extendedRange / 0x100000000) | 0) - 1;
        if (isPowerOfTwoMinusOne(highRange)) {
          return upscaleWithHighMasking(highRange);
        }
      }
      return upscaleToLoopCheckedRange(extendedRange);
    }

    function upscaleWithinI53AndLoopCheck(min, max) {
      return function (engine) {
        var ret = 0;
        do {
          var high = engine() | 0;
          var low = engine() >>> 0;
          ret = ((high & 0x1fffff) * 0x100000000) + low + (high & 0x200000 ? -0x20000000000000 : 0);
        } while (ret < min || ret > max);
        return ret;
      };
    }

    return function (min, max) {
      min = Math.floor(min);
      max = Math.floor(max);
      if (min < -0x20000000000000 || !isFinite(min)) {
        throw new RangeError("Expected min to be at least " + (-0x20000000000000));
      } else if (max > 0x20000000000000 || !isFinite(max)) {
        throw new RangeError("Expected max to be at most " + 0x20000000000000);
      }

      var range = max - min;
      if (range <= 0 || !isFinite(range)) {
        return returnValue(min);
      } else if (range === 0xffffffff) {
        if (min === 0) {
          return Random.uint32;
        } else {
          return add(Random.int32, min + 0x80000000);
        }
      } else if (range < 0xffffffff) {
        return add(downscaleToRange(range), min);
      } else if (range === 0x1fffffffffffff) {
        return add(Random.uint53, min);
      } else if (range < 0x1fffffffffffff) {
        return add(upscaleWithinU53(range), min);
      } else if (max - 1 - min === 0x1fffffffffffff) {
        return add(Random.uint53Full, min);
      } else if (min === -0x20000000000000 && max === 0x20000000000000) {
        return Random.int53Full;
      } else if (min === -0x20000000000000 && max === 0x1fffffffffffff) {
        return Random.int53;
      } else if (min === -0x1fffffffffffff && max === 0x20000000000000) {
        return add(Random.int53, 1);
      } else if (max === 0x20000000000000) {
        return add(upscaleWithinI53AndLoopCheck(min - 1, max - 1), 1);
      } else {
        return upscaleWithinI53AndLoopCheck(min, max);
      }
    };
  }());
  proto.integer = function (min, max) {
    return Random.integer(min, max)(this.engine);
  };

  // [0, 1] (floating point)
  Random.realZeroToOneInclusive = function (engine) {
    return Random.uint53Full(engine) / 0x20000000000000;
  };
  proto.realZeroToOneInclusive = function () {
    return Random.realZeroToOneInclusive(this.engine);
  };

  // [0, 1) (floating point)
  Random.realZeroToOneExclusive = function (engine) {
    return Random.uint53(engine) / 0x20000000000000;
  };
  proto.realZeroToOneExclusive = function () {
    return Random.realZeroToOneExclusive(this.engine);
  };

  Random.real = (function () {
    function multiply(generate, multiplier) {
      if (multiplier === 1) {
        return generate;
      } else if (multiplier === 0) {
        return function () {
          return 0;
        };
      } else {
        return function (engine) {
          return generate(engine) * multiplier;
        };
      }
    }

    return function (left, right, inclusive) {
      if (!isFinite(left)) {
        throw new RangeError("Expected left to be a finite number");
      } else if (!isFinite(right)) {
        throw new RangeError("Expected right to be a finite number");
      }
      return add(
        multiply(
          inclusive ? Random.realZeroToOneInclusive : Random.realZeroToOneExclusive,
          right - left),
        left);
    };
  }());
  proto.real = function (min, max, inclusive) {
    return Random.real(min, max, inclusive)(this.engine);
  };

  Random.bool = (function () {
    function isLeastBitTrue(engine) {
      return (engine() & 1) === 1;
    }

    function lessThan(generate, value) {
      return function (engine) {
        return generate(engine) < value;
      };
    }

    function probability(percentage) {
      if (percentage <= 0) {
        return returnValue(false);
      } else if (percentage >= 1) {
        return returnValue(true);
      } else {
        var scaled = percentage * 0x100000000;
        if (scaled % 1 === 0) {
          return lessThan(Random.int32, (scaled - 0x80000000) | 0);
        } else {
          return lessThan(Random.uint53, Math.round(percentage * 0x20000000000000));
        }
      }
    }

    return function (numerator, denominator) {
      if (denominator == null) {
        if (numerator == null) {
          return isLeastBitTrue;
        }
        return probability(numerator);
      } else {
        if (numerator <= 0) {
          return returnValue(false);
        } else if (numerator >= denominator) {
          return returnValue(true);
        }
        return lessThan(Random.integer(0, denominator - 1), numerator);
      }
    };
  }());
  proto.bool = function (numerator, denominator) {
    return Random.bool(numerator, denominator)(this.engine);
  };

  function toInteger(value) {
    var number = +value;
    if (number < 0) {
      return Math.ceil(number);
    } else {
      return Math.floor(number);
    }
  }

  function convertSliceArgument(value, length) {
    if (value < 0) {
      return Math.max(value + length, 0);
    } else {
      return Math.min(value, length);
    }
  }
  Random.pick = function (engine, array, begin, end) {
    var length = array.length;
    var start = begin == null ? 0 : convertSliceArgument(toInteger(begin), length);
    var finish = end === void 0 ? length : convertSliceArgument(toInteger(end), length);
    if (start >= finish) {
      return void 0;
    }
    var distribution = Random.integer(start, finish - 1);
    return array[distribution(engine)];
  };
  proto.pick = function (array, begin, end) {
    return Random.pick(this.engine, array, begin, end);
  };

  function returnUndefined() {
    return void 0;
  }
  var slice = Array.prototype.slice;
  Random.picker = function (array, begin, end) {
    var clone = slice.call(array, begin, end);
    if (!clone.length) {
      return returnUndefined;
    }
    var distribution = Random.integer(0, clone.length - 1);
    return function (engine) {
      return clone[distribution(engine)];
    };
  };

  Random.shuffle = function (engine, array, downTo) {
    var length = array.length;
    if (length) {
      if (downTo == null) {
        downTo = 0;
      }
      for (var i = (length - 1) >>> 0; i > downTo; --i) {
        var distribution = Random.integer(0, i);
        var j = distribution(engine);
        if (i !== j) {
          var tmp = array[i];
          array[i] = array[j];
          array[j] = tmp;
        }
      }
    }
    return array;
  };
  proto.shuffle = function (array) {
    return Random.shuffle(this.engine, array);
  };

  Random.sample = function (engine, population, sampleSize) {
    if (sampleSize < 0 || sampleSize > population.length || !isFinite(sampleSize)) {
      throw new RangeError("Expected sampleSize to be within 0 and the length of the population");
    }

    if (sampleSize === 0) {
      return [];
    }

    var clone = slice.call(population);
    var length = clone.length;
    if (length === sampleSize) {
      return Random.shuffle(engine, clone, 0);
    }
    var tailLength = length - sampleSize;
    return Random.shuffle(engine, clone, tailLength - 1).slice(tailLength);
  };
  proto.sample = function (population, sampleSize) {
    return Random.sample(this.engine, population, sampleSize);
  };

  Random.die = function (sideCount) {
    return Random.integer(1, sideCount);
  };
  proto.die = function (sideCount) {
    return Random.die(sideCount)(this.engine);
  };

  Random.dice = function (sideCount, dieCount) {
    var distribution = Random.die(sideCount);
    return function (engine) {
      var result = [];
      result.length = dieCount;
      for (var i = 0; i < dieCount; ++i) {
        result[i] = distribution(engine);
      }
      return result;
    };
  };
  proto.dice = function (sideCount, dieCount) {
    return Random.dice(sideCount, dieCount)(this.engine);
  };

  // http://en.wikipedia.org/wiki/Universally_unique_identifier
  Random.uuid4 = (function () {
    function zeroPad(string, zeroCount) {
      return stringRepeat("0", zeroCount - string.length) + string;
    }

    return function (engine) {
      var a = engine() >>> 0;
      var b = engine() | 0;
      var c = engine() | 0;
      var d = engine() >>> 0;

      return (
        zeroPad(a.toString(16), 8) +
        "-" +
        zeroPad((b & 0xffff).toString(16), 4) +
        "-" +
        zeroPad((((b >> 4) & 0x0fff) | 0x4000).toString(16), 4) +
        "-" +
        zeroPad(((c & 0x3fff) | 0x8000).toString(16), 4) +
        "-" +
        zeroPad(((c >> 4) & 0xffff).toString(16), 4) +
        zeroPad(d.toString(16), 8));
    };
  }());
  proto.uuid4 = function () {
    return Random.uuid4(this.engine);
  };

  Random.string = (function () {
    // has 2**x chars, for faster uniform distribution
    var DEFAULT_STRING_POOL = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";

    return function (pool) {
      if (pool == null) {
        pool = DEFAULT_STRING_POOL;
      }

      var length = pool.length;
      if (!length) {
        throw new Error("Expected pool not to be an empty string");
      }

      var distribution = Random.integer(0, length - 1);
      return function (engine, length) {
        var result = "";
        for (var i = 0; i < length; ++i) {
          var j = distribution(engine);
          result += pool.charAt(j);
        }
        return result;
      };
    };
  }());
  proto.string = function (length, pool) {
    return Random.string(pool)(this.engine, length);
  };

  Random.hex = (function () {
    var LOWER_HEX_POOL = "0123456789abcdef";
    var lowerHex = Random.string(LOWER_HEX_POOL);
    var upperHex = Random.string(LOWER_HEX_POOL.toUpperCase());

    return function (upper) {
      if (upper) {
        return upperHex;
      } else {
        return lowerHex;
      }
    };
  }());
  proto.hex = function (length, upper) {
    return Random.hex(upper)(this.engine, length);
  };

  Random.date = function (start, end) {
    if (!(start instanceof Date)) {
      throw new TypeError("Expected start to be a Date, got " + typeof start);
    } else if (!(end instanceof Date)) {
      throw new TypeError("Expected end to be a Date, got " + typeof end);
    }
    var distribution = Random.integer(start.getTime(), end.getTime());
    return function (engine) {
      return new Date(distribution(engine));
    };
  };
  proto.date = function (start, end) {
    return Random.date(start, end)(this.engine);
  };

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return Random;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this));

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var random_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! random-js */ "./node_modules/random-js/lib/random.js");
/* harmony import */ var random_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(random_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _custom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom.js */ "./src/custom.js");



/**
 * Class that acts as our primary application.
 */
class App {

    /**
     * Constructs the application by setting class properties, and properly binding class methods.
     * 
     * @param {object} config The application configuration.
     * @param {array} users The list of users among which the TOURNAMENT ARC will occur.
     * @param {HTMLElement} div The HTML element to attach the application too.
     */
    constructor(config, users, div) {
        //Setup dependencues
        this._config = config;
        this._div = div;
        this._wrapper = this._div.querySelector(".wrapper");
        this._random_engine = random_js__WEBPACK_IMPORTED_MODULE_0___default.a.engines.mt19937();
        //Seed the generator with the config value so that everything is repeatable.
        this._random_engine.seed(this._config.seed);
        this._random_generator = new random_js__WEBPACK_IMPORTED_MODULE_0___default.a(this._random_engine);

        //Setup round user data.
        this._round = [
            []
        ];
        //Randomize the order of the users.
        while (users.length > 0) {
            const random_user_index = this._random_generator.integer(0, users.length - 1);
            this._round[0].push(users[random_user_index]);
            users.splice(random_user_index, 1);
        }

        //Set method context bindings.
        this.start = this.start.bind(this);
        this.round_0 = this.round_0.bind(this);
        this.round_x = this.round_x.bind(this);
        this.determine_winner = this.determine_winner.bind(this);
        this.finish_round = this.finish_round.bind(this);
        this.fix_round_participants = this.fix_round_participants.bind(this);
        this.scroll_element_into_view = this.scroll_element_into_view.bind(this);
        this.create_group_div = this.create_group_div.bind(this);
        this.create_participant_div = this.create_participant_div.bind(this);
    }

    /**
     * Start running the application.
     */
    async start() {
        this.round_0();
    }

    /**
     * Setup round 0 (the round before the tournament starts).
     */
    async round_0() {
        this.fix_round_participants(0);

        //Setup the initial user group.
        const group_div = this.create_group_div();
        group_div.classList.remove("hide");
        group_div.classList.remove("right");
        this._wrapper.insertAdjacentElement("beforeend", group_div);
        this._round[0].forEach(user => {
            group_div.insertAdjacentElement("beforeend", this.create_participant_div(user));
        });

        Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
            scrollTo(0, 0);

            //Reveal each user in order one by one.
            let participant_div_index = 0;
            const participant_div_list = group_div.querySelectorAll(".participant.hide");
            participant_div_list.forEach(participant_div => {
                const this_obj = this;
                participant_div.addEventListener("transitionend", function hide_fn() {
                    this.removeEventListener("transitionend", hide_fn);

                    participant_div_index++;
                    if (participant_div_index >= participant_div_list.length) {
                        //All users in the initial group have been revealed, start round 1.
                        this_obj.round_x(1);
                        return;
                    }

                    this_obj.scroll_element_into_view(participant_div_list[participant_div_index]);
                    participant_div_list[participant_div_index].classList.remove("hide");
                });
            });
            participant_div_list[participant_div_index].classList.remove("hide");
        }, 50);
    }

    /**
     * Starts the round of the given index.
     * 
     * @param {int} round_index The round number.
     */
    async round_x(round_index) {
        await this.round_begin_message(round_index);

        //Get the initial participant data and group element.
        const initial_group_div = this._wrapper.querySelector(".group");
        const initial_participants = this._round[round_index - 1];

        //Setup the group for the new round.
        this._round[round_index] = [];
        const winner_group_div = this.create_group_div();
        this._wrapper.insertAdjacentElement("beforeend", winner_group_div);
        //This new round will have half of the remaining participants, so setup empty paritipant elements for the winners.
        for (let participant_index = 0; participant_index < (initial_participants.length / 2); participant_index++) {
            const participant_div = this.create_participant_div("?");
            winner_group_div.insertAdjacentElement("beforeend", participant_div);
        }
        winner_group_div.classList.remove("hide");

        Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
            scrollTo(0, 0);

            //Go through each contesting pair and select a winner for that round.
            const initial_participant_div_list = initial_group_div.querySelectorAll(".participant");
            const winner_participant_div_list = winner_group_div.querySelectorAll(".participant");
            let participant_index = 0;
            let winner_participant_div_index = 0;
            winner_participant_div_list.forEach(winner_participant_div => {
                const this_obj = this;
                winner_participant_div.addEventListener("transitionend", function show_fn() {
                    this.removeEventListener("transitionend", show_fn);

                    initial_participant_div_list[participant_index].classList.add("active");
                    initial_participant_div_list[participant_index + 1].classList.add("active");
                    winner_participant_div_list[winner_participant_div_index].classList.add("unknown");
                    this_obj.scroll_element_into_view(winner_participant_div_list[winner_participant_div_index]);

                    if (initial_participants[participant_index + 1] === "---") {
                        //If the second participant is a dummy one, just default to the first participant as a winner.
                        winner_participant_div_list[winner_participant_div_index].innerText = initial_participants[participant_index];
                        this_obj._round[round_index].push(initial_participants[participant_index]);

                        winner_participant_div_list[winner_participant_div_index].classList.add("winner");
                        winner_participant_div_list[winner_participant_div_index].classList.remove("unknown");

                        Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                            winner_participant_div_list[winner_participant_div_index].classList.remove("winner");
                            initial_participant_div_list[participant_index].classList.remove("active");
                            initial_participant_div_list[participant_index + 1].classList.remove("active");

                            participant_index += 2;
                            if (participant_index >= initial_participants.length) {
                                //Clean up the current round.
                                this_obj.finish_round(round_index);
                                return;
                            }
                        }, 1000);
                        return;
                    }

                    //Setup a name switcher that continuously switches between showing each participant name in the winner participant div.
                    let current_name_index_offset = 0;
                    const name_switch_interval_handle = Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestInterval"])(_ => {
                        winner_participant_div_list[winner_participant_div_index].innerText = initial_participants[participant_index + current_name_index_offset];
                        current_name_index_offset = (current_name_index_offset + 1) % 2;
                    }, 100);

                    Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                        //Determine the winner.
                        this_obj.determine_winner(initial_participants[participant_index], initial_participants[participant_index + 1]).then(random_index => {
                            Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                                //Stop name switching and set the name of the winner in the winner participant div.
                                Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["clearRequestInterval"])(name_switch_interval_handle);
                                winner_participant_div_list[winner_participant_div_index].innerText = initial_participants[participant_index + random_index];
                                this_obj._round[round_index].push(initial_participants[participant_index + random_index]);

                                winner_participant_div_list[winner_participant_div_index].classList.add("winner");
                                winner_participant_div_list[winner_participant_div_index].classList.remove("unknown");

                                Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                                    winner_participant_div_list[winner_participant_div_index].classList.remove("winner");
                                    initial_participant_div_list[participant_index].classList.remove("active");
                                    initial_participant_div_list[participant_index + 1].classList.remove("active");

                                    participant_index += 2;
                                    if (participant_index >= initial_participants.length) {
                                        //Clean up the current round.
                                        this_obj.finish_round(round_index);
                                        return;
                                    }

                                    winner_participant_div_index++;
                                    winner_participant_div_list[winner_participant_div_index].classList.remove("hide");
                                }, 500);
                            }, 750);
                        });
                    }, 750);
                });
            });
            winner_participant_div_list[winner_participant_div_index].classList.remove("hide");
        }, 50);
    }

    /**
     * Show a "round begin" message.
     * 
     * @param {int} round_index The round number.
     */
    round_begin_message(round_index) {
        return new Promise((resolve, _) => {
            const modal_wrapper = this._div.querySelector(".modal-wrapper");
            const modal_header = modal_wrapper.querySelector(".modal .header");
            const modal_text = modal_wrapper.querySelector(".modal .text");

            //Create a modal title stating the beginning of the round.
            const header = document.createElement("h2");
            header.classList.add("title");
            header.innerText = `Round ${round_index} Begins!`;
            modal_header.insertAdjacentElement("beforeend", header);

            //Set a modal text message wishing luck to the participants.
            modal_text.innerText = "Best of luck participants!";

            modal_wrapper.classList.remove("hide");

            Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                modal_wrapper.classList.add("hide");
                header.remove();
                modal_text.innerText = "";
                resolve(true);
            }, 2100);
        });
    }

    /**
     * Selects a random participant as the winner, while showing a modal box stating that a winner is being selected.
     * 
     * @param {string} name_1 The name of the first participant.
     * @param {string} name_2 The name of the second participant.
     * 
     * @return A promise to return the selected winner.
     */
    determine_winner(name_1, name_2) {
        return new Promise((resolve, _) => {
            const modal_wrapper = this._div.querySelector(".modal-wrapper");
            const modal_header = modal_wrapper.querySelector(".modal .header");
            const modal_text = modal_wrapper.querySelector(".modal .text");

            //Create two modal titles, one that says the fight is between which participants, one that will announce the winning participant.
            const header_deciding = document.createElement("h2");
            header_deciding.classList.add("title");
            const header_decided = document.createElement("h2");
            header_decided.classList.add("title");
            header_decided.classList.add("hide");

            header_deciding.innerText = `${name_1} VS ${name_2}`;
            modal_header.insertAdjacentElement("beforeend", header_deciding);
            modal_header.insertAdjacentElement("beforeend", header_decided);

            let dots_count = 1;
            //Set a modal text message stating the winner is being selected.
            modal_text.innerText = "Selecting winner.";

            //Have a dot style loader to show that the app is working to select a winner.
            const dot_loading_handle = Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestInterval"])(_ => {
                dots_count = (dots_count % 4) + 1;
                //Update the modal text message.
                modal_text.innerText = `Selecting Winner${new Array(dots_count).join(".")}`;
            }, 300);

            Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                //Stop the loader, select a participant at random, and announce the winner.
                Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["clearRequestInterval"])(dot_loading_handle);
                //State in the modal text message that a winner is selected.
                modal_text.innerText = "Winner Selected!";

                const random_index = this._random_generator.integer(0, 1);
                let name_winner = name_2;
                if (random_index % 2 === 0) {
                    name_winner = name_1;
                }
                header_decided.innerText = `${name_winner} is the winner!`;

                Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                    modal_header.classList.add("next");
                    header_deciding.classList.add("hide");
                    header_decided.classList.remove("hide");

                    modal_header.addEventListener("transitionend", function move_fn() {
                        modal_header.removeEventListener("transitionend", move_fn);

                        Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                            //Hide the modal and show the return the selected winner.
                            modal_wrapper.classList.add("hide");
                            modal_header.classList.remove("next");
                            header_deciding.remove();
                            header_decided.remove();
                            modal_text.innerText = "";

                            resolve(random_index);
                        }, 2000);
                    });
                }, 500);
            }, 3000);

            modal_wrapper.classList.remove("hide");
        });
    }

    /**
     * Cleans up the current round.
     * 
     * @param {int} round_index The round number.
     */
    async finish_round(round_index) {
        if (this._round[round_index].length <= 1) {
            //If only one participant remained after the completion of the current round, end the application and announce the winner.
            this.end(this._round[round_index][0]);
            return;
        }

        const group_div_list = this._wrapper.querySelectorAll(".group");

        group_div_list[0].addEventListener("transitionend", function hide_fn() {
            //When the first group is hidden, delete it and then push the second group to the left.
            group_div_list[0].removeEventListener("transitionend", hide_fn);

            group_div_list[0].remove();
            Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                group_div_list[1].classList.remove("right");
            }, 50);
        });

        const this_obj = this;

        group_div_list[1].addEventListener("transitionend", function move_fn() {
            //When the second group has been pushed to the left, we can start the next round.
            group_div_list[1].removeEventListener("transitionend", move_fn);

            const old_participant_size = this_obj._round[round_index].length;
            this_obj.fix_round_participants(round_index);
            const new_participant_size = this_obj._round[round_index].length;
            //If a dummy participant was added, then we should add a participant div for it in the group.
            if (new_participant_size > old_participant_size) {
                for (let extra_participant_index = old_participant_size; extra_participant_index < new_participant_size; extra_participant_index++) {
                    const participant_div = this_obj.create_participant_div(this_obj._round[round_index][extra_participant_index]);
                    participant_div.classList.remove("hide");
                    group_div_list[1].insertAdjacentElement("beforeend", participant_div);
                }
            }

            Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                //Start the next round.
                this_obj.round_x(round_index + 1);
            }, 1000);
        });

        //Hide the old group.
        group_div_list[0].classList.add("hide");
    }

    /**
     * End the application with a modal message stating the winner.
     * 
     * @param {string} name The name of the winner.
     */
    async end(name) {
        const modal_wrapper = this._div.querySelector(".modal-wrapper");
        const modal_header = modal_wrapper.querySelector(".modal .header");
        const modal_text = modal_wrapper.querySelector(".modal .text");

        //Create a modal title announcing the winner
        const header = document.createElement("h2");
        header.classList.add("title");
        header.innerText = `${name} IS THE WINNER!!!`;
        modal_header.insertAdjacentElement("beforeend", header);

        //Set a modal text message congratulating the winner.
        modal_text.innerText = "CONGRATULATIONS!";

        this._wrapper.classList.add("hide");
        modal_wrapper.classList.remove("hide");
    }

    /**
     * Add a dummy participant if odd number of participants are present.
     * 
     * @param {int} round_index The round number.
     */
    fix_round_participants(round_index) {
        if (this._round[round_index].length % 2 === 1) {
            this._round[round_index].push("---");
        }
    }

    /**
     * Smooth scrolls the given element into view.
     * 
     * @param {HTMLElement} el The element to scroll into view.
     */
    async scroll_element_into_view(el) {
        el.scrollIntoView({ behavior: "smooth" });
    }

    /**
     * Creates a group div element,
     * 
     * @return The created element.
     */
    create_group_div() {
        const group_div = document.createElement("div");
        group_div.classList.add("group");
        group_div.classList.add("right");
        group_div.classList.add("hide");
        return group_div;
    }

    /**
     * Creates a participant div element with the given participant name.
     * 
     * @param {string} name The participant name.
     * 
     * @return The created element.
     */
    create_participant_div(name) {
        const participant_div = document.createElement("div");
        participant_div.classList.add("participant");
        participant_div.classList.add("hide");
        participant_div.innerText = name;
        return participant_div;
    }
}

/***/ }),

/***/ "./src/custom.js":
/*!***********************!*\
  !*** ./src/custom.js ***!
  \***********************/
/*! exports provided: requestAnimFrame, requestTimeout, clearRequestTimeout, requestInterval, clearRequestInterval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestAnimFrame", function() { return requestAnimFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestTimeout", function() { return requestTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearRequestTimeout", function() { return clearRequestTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestInterval", function() { return requestInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearRequestInterval", function() { return clearRequestInterval; });
// requestAnimationFrame() shim by Paul Irish
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
const requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

/**
 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */

const requestTimeout = function(fn, delay) {
    if (!window.requestAnimationFrame &&
        !window.webkitRequestAnimationFrame &&
        !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
        !window.oRequestAnimationFrame &&
        !window.msRequestAnimationFrame)
        return window.setTimeout(fn, delay);

    var start = performance.now(),
        handle = new Object();

    function loop() {
        var current = performance.now(),
            delta = current - start;

        delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop);
    };

    handle.value = requestAnimFrame(loop);
    return handle;
};

/**
 * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
const clearRequestTimeout = function(handle) {
    window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
        window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
        window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
        window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
        window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
        window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
        clearTimeout(handle);
};

/**
 * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
const requestInterval = function(fn, delay) {
    if (!window.requestAnimationFrame &&
        !window.webkitRequestAnimationFrame &&
        !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
        !window.oRequestAnimationFrame &&
        !window.msRequestAnimationFrame)
        return window.setInterval(fn, delay);

    var start = performance.now(),
        handle = new Object();

    function loop() {
        var current = performance.now(),
            delta = current - start;

        if (delta >= delay) {
            fn.call();
            start = performance.now();
        }

        handle.value = requestAnimFrame(loop);
    };

    handle.value = requestAnimFrame(loop);
    return handle;
}

/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
const clearRequestInterval = function(handle) {
    window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
        window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
        window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
        window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
        window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
        window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
        clearInterval(handle);
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/App.js");


const handle_json_response = response => response.json();

Promise.all([
    fetch("./config.json").then(handle_json_response),
    fetch("./users.json").then(handle_json_response)
]).then(([config, users]) => {
    window.app = new _App__WEBPACK_IMPORTED_MODULE_0__["default"](config, users, document.querySelector("#app"));
    window.addEventListener("load", _ => app.start());
});

/***/ })

/******/ });
//# sourceMappingURL=index.js.map