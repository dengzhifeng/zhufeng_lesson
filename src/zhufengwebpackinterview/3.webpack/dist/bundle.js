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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nError: Cannot find module 'babel-types'\nRequire stack:\n- C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\plugins\\babel-plugin-import.js\n- C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\@babel\\core\\lib\\config\\files\\plugins.js\n- C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\@babel\\core\\lib\\config\\files\\index.js\n- C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\@babel\\core\\lib\\index.js\n- C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\babel-loader\\lib\\index.js\n- C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\loader-runner\\lib\\loadLoader.js\n- C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\loader-runner\\lib\\LoaderRunner.js\n- C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\webpack\\lib\\NormalModule.js\n- C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\webpack\\lib\\NormalModuleFactory.js\n- C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\webpack\\lib\\Compiler.js\n- C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\webpack\\lib\\webpack.js\n- C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\webpack-cli\\bin\\utils\\validate-options.js\n- C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\webpack-cli\\bin\\utils\\convert-argv.js\n- C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\webpack-cli\\bin\\cli.js\n- C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\_webpack@4.44.1@webpack\\bin\\webpack.js\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:966:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:842:27)\n    at Module.require (internal/modules/cjs/loader.js:1026:19)\n    at require (C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\v8-compile-cache\\v8-compile-cache.js:161:20)\n    at Object.<anonymous> (C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\plugins\\babel-plugin-import.js:2:13)\n    at Module._compile (C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\v8-compile-cache\\v8-compile-cache.js:194:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1158:10)\n    at Module.load (internal/modules/cjs/loader.js:986:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:879:14)\n    at Module.require (internal/modules/cjs/loader.js:1026:19)\n    at require (C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\v8-compile-cache\\v8-compile-cache.js:161:20)\n    at requireModule (C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\@babel\\core\\lib\\config\\files\\plugins.js:165:12)\n    at loadPlugin (C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\@babel\\core\\lib\\config\\files\\plugins.js:68:17)\n    at createDescriptor (C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\@babel\\core\\lib\\config\\config-descriptors.js:154:9)\n    at C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\@babel\\core\\lib\\config\\config-descriptors.js:109:50\n    at Array.map (<anonymous>)\n    at createDescriptors (C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\@babel\\core\\lib\\config\\config-descriptors.js:109:29)\n    at createPluginDescriptors (C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\@babel\\core\\lib\\config\\config-descriptors.js:105:10)\n    at C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\@babel\\core\\lib\\config\\config-descriptors.js:63:53\n    at cachedFunction (C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\@babel\\core\\lib\\config\\caching.js:62:27)\n    at cachedFunction.next (<anonymous>)\n    at evaluateSync (C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\gensync\\index.js:244:28)\n    at sync (C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\gensync\\index.js:84:14)\n    at plugins (C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\@babel\\core\\lib\\config\\config-descriptors.js:28:77)\n    at mergeChainOpts (C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\@babel\\core\\lib\\config\\config-chain.js:383:26)\n    at C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\@babel\\core\\lib\\config\\config-chain.js:347:7\n    at Generator.next (<anonymous>)\n    at buildRootChain (C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\@babel\\core\\lib\\config\\config-chain.js:72:36)\n    at buildRootChain.next (<anonymous>)\n    at loadPrivatePartialConfig (C:\\aprepare\\zhufengwebpackinterview\\3.webpack\\node_modules\\@babel\\core\\lib\\config\\partial.js:99:62)");

/***/ })

/******/ });