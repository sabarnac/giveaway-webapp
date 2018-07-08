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

/***/ "./node_modules/css-loader/index.js!./src/css/font/font.css":
/*!*********************************************************!*\
  !*** ./node_modules/css-loader!./src/css/font/font.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* cyrillic-ext */\n\n@font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: 400;\n    font-display: swap;\n    src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFWJ0bbck.woff2) format('woff2');\n    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n\n\n/* cyrillic */\n\n@font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: 400;\n    font-display: swap;\n    src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFUZ0bbck.woff2) format('woff2');\n    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n\n/* greek-ext */\n\n@font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: 400;\n    font-display: swap;\n    src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFWZ0bbck.woff2) format('woff2');\n    unicode-range: U+1F00-1FFF;\n}\n\n\n/* greek */\n\n@font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: 400;\n    font-display: swap;\n    src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVp0bbck.woff2) format('woff2');\n    unicode-range: U+0370-03FF;\n}\n\n\n/* vietnamese */\n\n@font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: 400;\n    font-display: swap;\n    src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFWp0bbck.woff2) format('woff2');\n    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;\n}\n\n\n/* latin-ext */\n\n@font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: 400;\n    font-display: swap;\n    src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFW50bbck.woff2) format('woff2');\n    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n\n/* latin */\n\n@font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: 400;\n    font-display: swap;\n    src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVZ0b.woff2) format('woff2');\n    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n\n\n/* cyrillic-ext */\n\n@font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: 600;\n    font-display: swap;\n    src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'), url(https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UNirkOX-hpOqc.woff2) format('woff2');\n    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n\n\n/* cyrillic */\n\n@font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: 600;\n    font-display: swap;\n    src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'), url(https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UNirkOVuhpOqc.woff2) format('woff2');\n    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n\n\n/* greek-ext */\n\n@font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: 600;\n    font-display: swap;\n    src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'), url(https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UNirkOXuhpOqc.woff2) format('woff2');\n    unicode-range: U+1F00-1FFF;\n}\n\n\n/* greek */\n\n@font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: 600;\n    font-display: swap;\n    src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'), url(https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UNirkOUehpOqc.woff2) format('woff2');\n    unicode-range: U+0370-03FF;\n}\n\n\n/* vietnamese */\n\n@font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: 600;\n    font-display: swap;\n    src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'), url(https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UNirkOXehpOqc.woff2) format('woff2');\n    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;\n}\n\n\n/* latin-ext */\n\n@font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: 600;\n    font-display: swap;\n    src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'), url(https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UNirkOXOhpOqc.woff2) format('woff2');\n    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n\n\n/* latin */\n\n@font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: 600;\n    font-display: swap;\n    src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'), url(https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UNirkOUuhp.woff2) format('woff2');\n    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/css/index.css":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader!./src/css/index.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.i(__webpack_require__(/*! -!../../node_modules/css-loader!./font/font.css */ "./node_modules/css-loader/index.js!./src/css/font/font.css"), "");

// module
exports.push([module.i, "* {\n    box-sizing: border-box;\n}\n\nhtml {\n    width: 100%;\n    height: 100%;\n}\n\nbody {\n    padding: 0;\n    margin: 0;\n    width: 100%;\n    overflow-x: auto;\n    overflow-y: auto;\n    font-family: \"Open Sans\", sans-serif;\n    font-display: swap;\n    font-weight: 400;\n    overflow-x: hidden;\n    color: #333;\n    background: #fff;\n}\n\n.title {\n    padding-top: 15px;\n    font-size: 2rem;\n    font-weight: 600;\n    text-align: center;\n}\n\n#app {\n    width: 100%;\n}\n\n#app .wrapper {\n    width: 100%;\n    font-size: 0;\n    padding: 20px 15px;\n    display: flex;\n    overflow-x: hidden;\n    transition: opacity 200ms ease-in-out;\n}\n\n#app .wrapper.hide {\n    opacity: 0.00001;\n}\n\n#app .wrapper .group {\n    min-width: 50%;\n    max-width: 50%;\n    display: flex;\n    transition: opacity 200ms ease-in-out, transform 500ms ease-in-out;\n    flex-direction: column;\n    justify-content: space-around;\n    transform: translateX(0%);\n    opacity: 0.99999;\n}\n\n#app .wrapper .group.right {\n    transform: translateX(100%);\n    transition: opacity 200ms ease-in-out;\n}\n\n#app .wrapper .group:nth-child(2).right {\n    transform: translateX(0%);\n    transition: opacity 200ms ease-in-out;\n}\n\n#app .wrapper .group.hide {\n    opacity: 0.00001;\n}\n\n#app .wrapper .group .participant {\n    text-align: center;\n    width: 100%;\n    padding: 20px 15px;\n    font-size: 1.2rem;\n    border-right-width: 2px;\n    border-right-style: dashed;\n    border-bottom-width: 2px;\n    border-bottom-style: solid;\n    border-color: #333;\n    transition: opacity 200ms ease-in-out, background-color 200ms ease-in-out, border-color 200ms ease-in-out;\n    opacity: 0.99999;\n}\n\n#app .wrapper .group .participant.hide {\n    opacity: 0.00001;\n}\n\n#app .wrapper .group .participant.active {\n    background: #00b;\n    color: #fff;\n    border-color: #00b;\n}\n\n#app .wrapper .group .participant.active:nth-child(2n - 1) {\n    border-bottom-color: #fff;\n}\n\n#app .wrapper .group .participant.winner {\n    background: #0b0;\n    color: #fff;\n    border-color: #0b0;\n}\n\n#app .wrapper .group .participant.unknown {\n    background: #b00;\n    color: #fff;\n    border-color: #b00;\n}\n\n#app .wrapper .group .participant:first-child,\n#app .wrapper .group:nth-child(2).right .participant {\n    border-top-width: 2px;\n    border-top-style: solid;\n}\n\n#app .modal-wrapper {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 100%;\n    width: 100%;\n    background: rgba(0, 0, 0, 0.85);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 1;\n    transition: opacity 200ms ease-in-out;\n}\n\n#app .modal-wrapper.hide {\n    opacity: 0.00001;\n}\n\n#app .modal-wrapper .modal {\n    padding: 20px 15px;\n    background: #fff;\n    min-width: 50%;\n    max-width: 85%;\n    height: 45%;\n    display: flex;\n    justify-content: space-evenly;\n    flex-direction: column;\n    align-items: center;\n    font-size: 1rem;\n    border-radius: 10px;\n    text-align: center;\n    overflow: hidden;\n}\n\n#app .modal-wrapper .modal .header {\n    white-space: nowrap;\n    width: 200%;\n    text-align: left;\n    transform: translateX(25%);\n    transition: transform 500ms ease-in-out;\n}\n\n#app .modal-wrapper .modal .header.next {\n    transform: translateX(-25%);\n}\n\n#app .modal-wrapper .modal .header .title {\n    display: inline-block;\n    width: 50%;\n    font-size: 1.8rem;\n    text-align: center;\n    transition: opacity 500ms ease-in-out;\n    opacity: 0.99999;\n}\n\n#app .modal-wrapper .modal .header .title.hide {\n    opacity: 0.00001;\n}\n\n#app .modal-wrapper .modal .header .title:nth-child(2).hide {\n    opacity: 0.00001;\n}\n\n#app .modal-wrapper .modal .text {\n    font-style: italic;\n    transition: opacity 500ms ease-in-out;\n    opacity: 0.99999;\n}\n\n#app .modal-wrapper .modal .name {\n    transition: opacity 500ms ease-in-out;\n    opacity: 0.99999;\n}\n\n#app .modal-wrapper .modal .name.hide {\n    opacity: 0.00001;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/offline-plugin/runtime.js":
/*!************************************************!*\
  !*** ./node_modules/offline-plugin/runtime.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var appCacheIframe;

function hasSW() {
  
    return 'serviceWorker' in navigator && (
      window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname.indexOf('127.') === 0
    );
  
}

function install(options) {
  options || (options = {});

  
    if (hasSW()) {
      var registration = navigator.serviceWorker
        .register(
          "sw.js", {
            
            
          }
        );

      

      return;
    }
  

  
}

function applyUpdate(callback, errback) {
  

  
}

function update() {
  
    if (hasSW()) {
      navigator.serviceWorker.getRegistration().then(function(registration) {
        if (!registration) return;
        return registration.update();
      });
    }
  

  
}


  setInterval(update, 3600000);


exports.install = install;
exports.applyUpdate = applyUpdate;
exports.update = update;


/***/ }),

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

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


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
     * @param {array} users The list of users among which the tournament will occur.
     * @param {HTMLElement} div The HTML element to attach the application too.
     */
    constructor(config, users, div) {
        console.log("Constructing application.");

        //Setup dependencues
        console.log("Setting up dependencies.");
        this._config = config;
        this._div = div;
        this._wrapper = this._div.querySelector(".wrapper");
        this._random_engine = random_js__WEBPACK_IMPORTED_MODULE_0___default.a.engines.mt19937();
        //Seed the generator with the config value so that everything is repeatable.
        console.log(`Seed: ${this._config.seed}`);
        this._random_engine.seed(this._config.seed);
        this._random_generator = new random_js__WEBPACK_IMPORTED_MODULE_0___default.a(this._random_engine);
        console.log("Dependencies setup complete.");

        //Setup round user data.
        console.log("Setting up data.");
        this._round = [
            []
        ];
        //Randomize the order of the users.
        while (users.length > 0) {
            const random_user_index = this._random_generator.integer(0, users.length - 1);
            this._round[0].push(users[random_user_index]);
            users.splice(random_user_index, 1);
        }
        console.log("Users: ");
        console.table(this._round[0]);
        this._original_messages = this._config.messages;
        console.log("Messages: ");
        console.table(this._config.messages);
        this._messages = [...this._original_messages];
        console.log("Data setup complete.");

        //Set method context bindings.
        console.log("Setting up method context bindings.");
        this.start = this.start.bind(this);
        this.round_0 = this.round_0.bind(this);
        this.show_participants = this.show_participants.bind(this);
        this.round_x = this.round_x.bind(this);
        this.round_begin_message = this.round_begin_message.bind(this);
        this.begin_round_matches = this.begin_round_matches.bind(this);
        this.participant_match = this.participant_match.bind(this);
        this.default_participant_match = this.default_participant_match.bind(this);
        this.determine_winner = this.determine_winner.bind(this);
        this.finish_round = this.finish_round.bind(this);
        this.round_end_message = this.round_end_message.bind(this);
        this.show_losing_participant = this.show_losing_participant.bind(this);
        this.end = this.end.bind(this);
        this.pad_participants_list = this.pad_participants_list.bind(this);
        this.unpad_participants_list = this.unpad_participants_list.bind(this);
        this.scroll_element_into_view = this.scroll_element_into_view.bind(this);
        this.create_group_div = this.create_group_div.bind(this);
        this.create_participant_div = this.create_participant_div.bind(this);
        console.log("Method context bindings setup complete.");
    }

    /**
     * Start running the application.
     */
    async start() {
        console.log("Starting the tournament!!!");
        this.round_0();
    }

    /**
     * Setup round 0 (the round before the tournament starts).
     */
    async round_0() {
        console.log("Starting Round 0");

        console.log("Padding participants list.");
        this.pad_participants_list(0);
        console.log("Padded participants list.");

        //Setup the initial user group.
        console.log("Creating initial participants group.");
        const group_div = this.create_group_div();
        group_div.classList.remove("hide");
        group_div.classList.remove("right");
        this._wrapper.insertAdjacentElement("beforeend", group_div);
        this._round[0].forEach(user => {
            console.log(`Adding participant: ${user}`);
            group_div.insertAdjacentElement("beforeend", this.create_participant_div(user));
            console.log("Added participant.");
        });
        console.log("Created initial participants group.");

        Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
            this.show_participants(group_div);
        }, 50);
    }

    /**
     * Shows each participant in the group one by one.
     * 
     * @param {HTMLElement} group_div The round group element.
     */
    show_participants(group_div) {
        console.log("Showing initial participants group list.");
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
                    console.log("All participants visible.");
                    this_obj.round_x(1);
                    return;
                }

                console.log(`Showing participant, (Index: ${participant_div_index})`);
                this_obj.scroll_element_into_view(participant_div_list[participant_div_index]);
                participant_div_list[participant_div_index].classList.remove("hide");
            });
        });
        participant_div_list[participant_div_index].classList.remove("hide");
    }

    /**
     * Starts the round of the given index.
     * 
     * @param {number} round_index The round number.
     */
    async round_x(round_index) {
        console.log(`Starting Round ${round_index}.`);
        await this.round_begin_message(round_index);

        //Get the initial participant data and group element.
        console.log(`Retrieving initial participants list from Round ${round_index - 1}.`);
        const initial_group_div = this._wrapper.querySelector(".group");
        const initial_participants = this._round[round_index - 1];
        console.log(`Retrieved initial participants list from Round ${round_index - 1}.`);

        //Setup the group for the new round.
        console.log(`Setting up for winners of Round ${round_index}.`);
        this._round[round_index] = [];
        const winner_group_div = this.create_group_div();
        this._wrapper.insertAdjacentElement("beforeend", winner_group_div);
        //This new round will have half of the remaining participants, so setup empty paritipant elements for the winners.
        for (let participant_index = 0; participant_index < (initial_participants.length / 2); participant_index++) {
            console.log(`Setting up block for potential winner. (Index: ${participant_index})`);
            const participant_div = this.create_participant_div("?");
            winner_group_div.insertAdjacentElement("beforeend", participant_div);
            console.log(`Setup block for potential winner complete.`);
        }
        winner_group_div.classList.remove("hide");
        console.log(`Setup for winners of Round ${round_index} complete.`);

        Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
            this.begin_round_matches(round_index, initial_group_div, winner_group_div, initial_participants);
        }, 50);
    }

    /**
     * Show a message stating the round is about to begin.
     * 
     * @param {number} round_index The round number.
     */
    round_begin_message(round_index) {
        return new Promise((resolve, _) => {
            console.log(`Show a message stating Round ${round_index} is gonna begin.`);

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
                console.log("Begin round message is shown. We can now start the round.");
                resolve(true);
            }, 2500);
        });
    }

    /**
     * Start the matches in the round.
     * 
     * @param {HTMLElement} initial_group_div The initial participant round group element.
     * @param {HTMLElement} winner_group_div The winner round group element.
     */
    async begin_round_matches(round_index, initial_group_div, winner_group_div, initial_participants) {
        console.log(`Starting matches for Round ${round_index}.`);

        scrollTo(0, 0);

        //Go through each contesting pair and select a winner for that round.
        console.log("Retrieving initial particpant and final participant div lists.");
        const initial_participant_div_list = initial_group_div.querySelectorAll(".participant");
        const winner_participant_div_list = winner_group_div.querySelectorAll(".participant");
        let participant_index = 0;
        let winner_participant_div_index = 0;
        winner_participant_div_list.forEach(winner_participant_div => {
            const this_obj = this;
            winner_participant_div.addEventListener("transitionend", async function show_fn() {
                this.removeEventListener("transitionend", show_fn);

                initial_participant_div_list[participant_index].classList.add("active");
                initial_participant_div_list[participant_index + 1].classList.add("active");
                winner_participant_div_list[winner_participant_div_index].classList.add("unknown");
                this_obj.scroll_element_into_view(winner_participant_div_list[winner_participant_div_index]);

                if (initial_participants[participant_index + 1] === "---") {
                    //If the second participant is a dummy one, just default to the first participant as a winner.
                    console.log("One of the participants is a dummy. Selecting the only actual participant as the default winner.");
                    this_obj.default_participant_match(round_index, winner_participant_div_list, winner_participant_div_index, initial_participant_div_list, initial_participants, participant_index);
                    return;
                }

                console.log("Start the match between the two participants.");
                await this_obj.participant_match(round_index, winner_participant_div_list, winner_participant_div_index, initial_participant_div_list, initial_participants, participant_index);

                participant_index += 2;
                if (participant_index >= initial_participants.length) {
                    //Clean up the current round.
                    console.log(`All matches in Round ${round_index} are complete.`);
                    this_obj.finish_round(round_index);
                    return;
                }

                winner_participant_div_index++;
                console.log(`Showing the next participant div. (Index: ${winner_participant_div_index})`);
                winner_participant_div_list[winner_participant_div_index].classList.remove("hide");
            });
        });
        console.log(`Showing the participant div. (Index: ${winner_participant_div_index})`);
        winner_participant_div_list[winner_participant_div_index].classList.remove("hide");
    }

    /**
     * Starts a match between two participants.
     * 
     * @param {number} round_index The round number.
     * @param {HTMLElement[]} winner_participant_div_list The winner participant elements list.
     * @param {number} winner_participant_div_index The current winner participant elements list index.
     * @param {HTMLElement[]} initial_participant_div_list The initial participant elements list.
     * @param {number} initial_participants The current initial participant elements list index.
     * @param {number} participant_index The current participant index.
     */
    participant_match(round_index, winner_participant_div_list, winner_participant_div_index, initial_participant_div_list, initial_participants, participant_index) {
        return new Promise((resolve, _) => {
            console.log(`Starting participant match in Round ${round_index}. (Participant index: ${participant_index})`);

            //Setup a name switcher that continuously switches between showing each participant name in the winner participant div.
            let current_name_index_offset = 0;
            console.log("Setting up a name switcher.");
            const name_switch_interval_handle = Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestInterval"])(_ => {
                winner_participant_div_list[winner_participant_div_index].innerText = initial_participants[participant_index + current_name_index_offset];
                current_name_index_offset = (current_name_index_offset + 1) % 2;
            }, 100);

            Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                //Determine the winner.
                console.log("Get a randomly selected winner.");
                this.determine_winner(initial_participants[participant_index], initial_participants[participant_index + 1]).then(random_index_offset => {
                    Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                        console.log(`Show the winner name in the winner participant div. (Participant index offset: ${random_index_offset})`);
                        //Stop name switching and set the name of the winner in the winner participant div.
                        Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["clearRequestInterval"])(name_switch_interval_handle);
                        winner_participant_div_list[winner_participant_div_index].innerText = initial_participants[participant_index + random_index_offset];
                        this._round[round_index].push(initial_participants[participant_index + random_index_offset]);

                        winner_participant_div_list[winner_participant_div_index].classList.add("winner");
                        winner_participant_div_list[winner_participant_div_index].classList.remove("unknown");

                        Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                            winner_participant_div_list[winner_participant_div_index].classList.remove("winner");
                            initial_participant_div_list[participant_index].classList.remove("active");
                            initial_participant_div_list[participant_index + 1].classList.remove("active");

                            console.log(`Match is complete. The winner is: ${winner_participant_div_list[winner_participant_div_index].innerText}`);
                            resolve(true);
                        }, 500);
                    }, 750);
                });
            }, 750);
        });
    }

    /**
     * Starts a match with a default participant winner.
     * 
     * @param {number} round_index The round number.
     * @param {HTMLElement[]} winner_participant_div_list The winner participant elements list.
     * @param {number} winner_participant_div_index The current winner participant elements list index.
     * @param {HTMLElement[]} initial_participant_div_list The initial participant elements list.
     * @param {number} initial_participants The current initial participant elements list index.
     * @param {number} participant_index The current participant index.
     */
    async default_participant_match(round_index, winner_participant_div_list, winner_participant_div_index, initial_participant_div_list, initial_participants, participant_index) {
        console.log(`Only one actual participant in the list. Selecting that participant as the winner by default. (Index: ${participant_index})`);

        //Set the participant as the default winner.
        winner_participant_div_list[winner_participant_div_index].innerText = initial_participants[participant_index];
        this._round[round_index].push(initial_participants[participant_index]);

        winner_participant_div_list[winner_participant_div_index].classList.add("winner");
        winner_participant_div_list[winner_participant_div_index].classList.remove("unknown");

        Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
            winner_participant_div_list[winner_participant_div_index].classList.remove("winner");
            initial_participant_div_list[participant_index].classList.remove("active");
            initial_participant_div_list[participant_index + 1].classList.remove("active");

            //Clean up the current round.
            console.log(`Round ${round_index} is complete.`);
            this.finish_round(round_index);
        }, 1000);
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
            console.log(`Determine winner between: ${name_1} & ${name_2}`);

            const modal_wrapper = this._div.querySelector(".modal-wrapper");
            const modal_header = modal_wrapper.querySelector(".modal .header");
            const modal_text = modal_wrapper.querySelector(".modal .text");

            //Create two modal titles, one that says the fight is between which participants, one that will announce the winning participant.
            console.log("Showing a modal stating that the winner is being selected and the match is between which participants.");
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
            modal_text.innerText = "Selecting Winner.";

            //Have a dot style loader to show that the app is working to select a winner.
            const dot_loading_handle = Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestInterval"])(_ => {
                dots_count = (dots_count % 4) + 1;
                //Update the modal text message.
                modal_text.innerText = `Selecting Winner${new Array(dots_count).join(".")}`;
            }, 300);

            Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                //Stop the loader, select a participant at random, and announce the winner.
                Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["clearRequestInterval"])(dot_loading_handle);
                modal_text.innerText = "Winner Selected.";

                //Select the winner at random.
                console.log("Selecting a random winner.");
                const random_index_offset = this._random_generator.integer(0, 1);
                let name_winner = name_2;
                let name_loser = name_1
                if (random_index_offset % 2 === 0) {
                    name_winner = name_1;
                    name_loser = name_2;
                }
                console.log(`Selected winner: ${name_winner}`);
                console.log(`Selected loser: ${name_loser}`);
                header_decided.innerText = `${name_winner} is the winner!`;

                const this_obj = this;
                header_decided.addEventListener("transitionend", function move_fn() {
                    header_decided.removeEventListener("transitionend", move_fn);

                    Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                        //Set a random winner-loser message and the title to the name of the winner.
                        if (this_obj._messages.length === 0) {
                            console.log("Ran out of winner-loser messages. Refilling the list.");
                            this_obj._message = [...this_obj._original_messages];
                        }
                        const random_message = this_obj._random_generator.integer(0, this_obj._messages.length - 1);
                        console.log("Showing random winner-loser message and removing it from the messages list.");
                        modal_text.innerHTML = this_obj._messages.splice(random_message, 1)[0].replace(/\#winner/g, name_winner).replace(/\#loser/g, name_loser);

                        Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                            //Hide the modal and show the return the selected winner.
                            modal_wrapper.classList.add("hide");
                            modal_header.classList.remove("next");
                            header_deciding.remove();
                            header_decided.remove();
                            modal_text.innerText = "";

                            console.log(`Returning the selected winner. (Index offset: ${random_index_offset})`);
                            resolve(random_index_offset);
                        }, 2500);
                    }, 500);
                });

                modal_header.classList.add("next");
                header_deciding.classList.add("hide");
                header_decided.classList.remove("hide");
            }, 3000);

            modal_wrapper.classList.remove("hide");
        });
    }

    /**
     * Cleans up the current round.
     * 
     * @param {number} round_index The round number.
     */
    async finish_round(round_index) {
        console.log(`Round ${round_index} is complete.`);

        this.unpad_participants_list(round_index - 1);

        if (this._round[round_index].length <= 1) {
            //If only one participant remained after the completion of the current round, end the application and announce the winner.
            console.log("This was the final round.");
            this.end(this._round[round_index][0]);
            return;
        }

        await this.round_end_message(round_index);

        const group_div_list = this._wrapper.querySelectorAll(".group");

        group_div_list[0].addEventListener("transitionend", function hide_fn() {
            //When the first group is hidden, delete it and then push the second group to the left.
            group_div_list[0].removeEventListener("transitionend", hide_fn);

            console.log("Initial participants group is hidden. Delete it.");
            group_div_list[0].remove();
            Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                console.log("Push the results participants group to the left, making it the new initial participants div.");
                group_div_list[1].classList.remove("right");
            }, 50);
        });

        const this_obj = this;

        group_div_list[1].addEventListener("transitionend", function move_fn() {
            //When the second group has been pushed to the left, we can start the next round.
            group_div_list[1].removeEventListener("transitionend", move_fn);

            console.log("Pushed the results participants group to the left.");
            const old_participant_size = this_obj._round[round_index].length;
            console.log("Padding the new participants list.");
            this_obj.pad_participants_list(round_index);
            const new_participant_size = this_obj._round[round_index].length;
            //If a dummy participant was added, then we should add a participant div for it in the group.
            if (new_participant_size > old_participant_size) {
                console.log("Participants list was padded. Add the dummy participant(s) to the group participants list.");
                for (let extra_participant_index = old_participant_size; extra_participant_index < new_participant_size; extra_participant_index++) {
                    const participant_div = this_obj.create_participant_div(this_obj._round[round_index][extra_participant_index]);
                    participant_div.classList.remove("hide");
                    group_div_list[1].insertAdjacentElement("beforeend", participant_div);
                }
            }

            Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                //Start the next round.
                console.log("Start the next round.");
                this_obj.round_x(round_index + 1);
            }, 1000);
        });

        //Hide the old group.
        console.log("Hide the initial participants group.");
        group_div_list[0].classList.add("hide");
    }

    /**
     * Show a message stating the round has ended, and noting the lost participants.
     * 
     * @param {number} round_index The round number.
     */
    round_end_message(round_index) {
        return new Promise((resolve, _) => {
            console.log(`Show a message stating Round ${round_index} has ended.`);

            const modal_wrapper = this._div.querySelector(".modal-wrapper");
            const modal_header = modal_wrapper.querySelector(".modal .header");
            const modal_text = modal_wrapper.querySelector(".modal .text");
            const modal_text_2 = modal_wrapper.querySelector(".modal .name");

            //Create a modal title stating the beginning of the round.
            const header = document.createElement("h2");
            header.classList.add("title");
            header.innerText = `Round ${round_index} Ends!`;
            modal_header.insertAdjacentElement("beforeend", header);

            //Set a modal text message wishing luck to the participants.
            modal_text.innerText = "Casualties";

            const this_obj = this;
            modal_wrapper.addEventListener("transitionend", async function show_fn() {
                modal_wrapper.removeEventListener("transitionend", show_fn);

                //Modal is visible, start scrolling through the casualties.
                const old_participants = this_obj._round[round_index - 1];
                const new_participants = this_obj._round[round_index];

                for (let participant_index = 0; participant_index < old_participants.length; participant_index++) {
                    if (new_participants.indexOf(old_participants[participant_index]) == -1) {
                        await this_obj.show_losing_participant(modal_text_2, old_participants[participant_index]);
                    }
                }

                Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                    //Hide the message and go back.
                    console.log("Hiding modal box.");
                    modal_wrapper.classList.add("hide");
                    header.remove();
                    modal_text.innerText = "";
                    console.log("Begin round message is shown. We can now start the round.");
                    resolve(true);
                }, 500);
            });

            modal_wrapper.classList.remove("hide");
        });
    }

    /**
     * Shows the and hides the given name in the given modal text div,
     * 
     * @param {HTMLElement} modal_text_2 The div to show the name in.
     * @param {HTMLElement} name The name to show.
     */
    show_losing_participant(modal_text_2, name) {
        return new Promise((resolve, _) => {
            modal_text_2.innerText = name;

            modal_text_2.addEventListener("transitionend", function show_fn() {
                modal_text_2.removeEventListener("transitionend", show_fn);

                modal_text_2.addEventListener("transitionend", function hide_fn() {
                    modal_text_2.removeEventListener("transitionend", hide_fn);

                    //Done showing the name. Go back.
                    console.log("Losing participant name shown");
                    resolve(true);
                });

                Object(_custom_js__WEBPACK_IMPORTED_MODULE_1__["requestTimeout"])(_ => {
                    //Hide the name,
                    console.log("Hide the losing participant name.");
                    modal_text_2.classList.add("hide");
                }, 500);
            });

            //Show the name.
            console.log(`Show the losing participant name. (Name: ${name})`);
            modal_text_2.classList.remove("hide");
        });
    }

    /**
     * End the application with a modal message stating the winner.
     * 
     * @param {string} name The name of the winner.
     */
    async end(name) {
        console.log(`Tournament complete! We have a winner: ${name}`);

        console.log("Announce the winner in the modal.");
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

        console.log("The tournament ends here.");
    }

    /**
     * Add a dummy participant if odd number of participants are present.
     * 
     * @param {number} round_index The round number.
     */
    pad_participants_list(round_index) {
        if (this._round[round_index].length % 2 === 1) {
            console.log(`Odd number of participants in Round ${round_index}. Pad the list with a dummy participant.`);
            this._round[round_index].push("---");
            console.log("Padded participants list.");
        }
    }

    /**
     * Add a dummy participant if odd number of participants are present.
     * 
     * @param {number} round_index The round number.
     */
    unpad_participants_list(round_index) {
        const total_participants = this._round[round_index].length;
        if (this._round[round_index][total_participants - 1] === "---") {
            console.log(`Removing dummy participant in participants list.`);
            this._round[round_index].splice(total_participants - 1, 1);
            console.log(`Removed dummy participant in participants list.`);
        }
    }

    /**
     * Smooth scrolls the given element into view.
     * 
     * @param {HTMLElement} el The element to scroll into view.
     */
    async scroll_element_into_view(el) {
        console.log("Scrolling element into view: ");
        console.log(el);
        el.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "end"
        });
        console.log("Scrolled element into view.");
    }

    /**
     * Creates a group div element,
     * 
     * @return The created element.
     */
    create_group_div() {
        console.log("Creating new round group div element.");
        const group_div = document.createElement("div");
        group_div.classList.add("group");
        group_div.classList.add("right");
        group_div.classList.add("hide");
        console.log("Created new round group div element.");
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
        console.log(`Creating new round participant div element for participant: ${name}`);
        const participant_div = document.createElement("div");
        participant_div.classList.add("participant");
        participant_div.classList.add("hide");
        participant_div.innerText = name;
        console.log("Created new round participant div element.");
        return participant_div;
    }
}

/***/ }),

/***/ "./src/css/index.css":
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./index.css */ "./node_modules/css-loader/index.js!./src/css/index.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

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

/***/ "./src/data/config.json":
/*!******************************!*\
  !*** ./src/data/config.json ***!
  \******************************/
/*! exports provided: seed, messages, default */
/***/ (function(module) {

module.exports = {"seed":1,"messages":["#winner likes to kick gum and chew ass, and they're all out of gum.","#loser lost to #winner? How disappointing.","#winner bribed the tournament creator. It was extermely effective.","#loser browses 9GAG. That's an automatic loss.","Womble is a faggot, and so is #loser.","#loser liked The Emoji Movie.","#loser be dead. Looks like the work of an enemy 「ＳＴＡＮＤ」！！.","#loser seems to be the protagonist of School Days.","\"Don't lewd the lolis\" - #winner","Has #winner achieved Ultra Instinct???","#loser doesn't have enough badges to tame #winner.","#loser thinks Pokemon is better than Digimon.","#loser thinks One Piece is the best anime.","#loser doesn't realize Dark Souls is a Berserk reference.","#loser needs to GIT GUD.","#winner donated to Wikipedia.","#loser thinks Communism doesn't work.","#loser is blind to the concerns of the working class.","#loser is a member of the Axis cult. This is an Eris-sanctioned tournament.","#loser says Eris pads her chest.","#loser isn't a regular on Discord. Probably.","#loser though he won, but it was #winner!","This was a mistake.","#loser lost because of server failure.","#loser thinks if she breathes, she a thot.","#winner be THICC.","#winner streams on Chaturbate. That's a win in my eyes.","#winner shared their premium Brazzers account.","#loser plays Fortnite, and not even the Battle Royale mode.","#winner won, but the princess is in the other castle.","#loser thinks Evanglion had an original ending.","HAL 9000 chose #winner.","#winner can't Hasta la Vista.","#loser lost because he thought he could win the tournament.","#loser isn't a harem MC.","|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||<br /><br />||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_","#loser thinks K-Pop is real music.","\"And now this dialogue box will say that I've won.\" - #winner","#winner's knees hurt, but it was all worth it.","#winner actually bough WinRAR."]};

/***/ }),

/***/ "./src/data/users.json":
/*!*****************************!*\
  !*** ./src/data/users.json ***!
  \*****************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, default */
/***/ (function(module) {

module.exports = ["FOO","BAR","FAZ","BAZ","FOX","BOZ","FAR","BOO","JOHN","JANE","DANE"];

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
/* harmony import */ var _data_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/config */ "./src/data/config.json");
var _data_config__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./data/config */ "./src/data/config.json", 1);
/* harmony import */ var _data_users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/users */ "./src/data/users.json");
var _data_users__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./data/users */ "./src/data/users.json", 1);
/* harmony import */ var offline_plugin_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! offline-plugin/runtime */ "./node_modules/offline-plugin/runtime.js");
/* harmony import */ var offline_plugin_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(offline_plugin_runtime__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./css/index.css */ "./src/css/index.css");
/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_css_index_css__WEBPACK_IMPORTED_MODULE_4__);








offline_plugin_runtime__WEBPACK_IMPORTED_MODULE_3__["install"]();

const handle_json_response = response => response.json();

window.app = new _App__WEBPACK_IMPORTED_MODULE_0__["default"](_data_config__WEBPACK_IMPORTED_MODULE_1__, _data_users__WEBPACK_IMPORTED_MODULE_2__, document.querySelector("#app"));
setTimeout(_ => app.start(), 500);

/***/ })

/******/ });
//# sourceMappingURL=index.18afb0c79094dc76d2b9.js.map