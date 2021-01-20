var remote; remote =
	(() => {
		"use strict";
		var modules = ({
			"webpack/container/entry/remote":
				((module, exports, require) => {
					var moduleMap = {
						"./NewsList": () => {
							return Promise.all([require.e("vendors-node_modules_react_index_js"), require.e("src_NewsList_js")]).then(() => () => (require("./src/NewsList.js")));
						}
					};
					var get = (module, getScope) => {
						require.R = getScope;
						getScope = (
							require.o(moduleMap, module)
								? moduleMap[module]()
								: Promise.resolve().then(() => {
									throw new Error('Module "' + module + '" does not exist in container.');
								})
						);
						require.R = undefined;
						return getScope;
					};
					var init = (shareScope, initScope) => {
						if (!require.S) return;
						var oldScope = require.S["default"];
						var name = "default"
						if (oldScope && oldScope !== shareScope) throw new Error("Container initialization failed as it has already been initialized with a different share scope");
						require.S[name] = shareScope;
						return require.I(name, initScope);
					};
					require.d(exports, {
						get: () => get,
						init: () => init
					});
				})
		});
		var cache = {};
		function require(moduleId) {
			if (cache[moduleId]) {
				return cache[moduleId].exports;
			}
			var module = cache[moduleId] = {
				exports: {}
			};
			modules[moduleId](module, module.exports, require);
			return module.exports;
		}
		require.m = modules;
		(() => {
			require.d = (exports, definition) => {
				for (var key in definition) {
					if (require.o(definition, key) && !require.o(exports, key)) {
						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
					}
				}
			};
		})();
		(() => {
			require.f = {};
			require.e = (chunkId) => {
				return Promise.all(Object.keys(require.f).reduce((promises, key) => {
					require.f[key](chunkId, promises);
					return promises;
				}, []));
			};
		})();
		(() => {
			require.u = (chunkId) => {
				return "" + chunkId + ".js";
			};
		})();
		(() => {
			require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
		})();
		(() => {
			var inProgress = {};
			var dataWebpackPrefix = "remote:";
			require.l = (url, done, key) => {
				if (inProgress[url]) { inProgress[url].push(done); return; }
				var script, needAttach;
				if (key !== undefined) {
					var scripts = document.getElementsByTagName("script");
					for (var i = 0; i < scripts.length; i++) {
						var s = scripts[i];
						if (s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
					}
				}
				if (!script) {
					needAttach = true;
					script = document.createElement('script');
					script.charset = 'utf-8';
					script.timeout = 120;
					if (require.nc) {
						script.setAttribute("nonce", require.nc);
					}
					script.setAttribute("data-webpack", dataWebpackPrefix + key);
					script.src = url;
				}
				inProgress[url] = [done];
				var onScriptComplete = (prev, event) => {
					script.onerror = script.onload = null;
					clearTimeout(timeout);
					var doneFns = inProgress[url];
					delete inProgress[url];
					script.parentNode && script.parentNode.removeChild(script);
					doneFns && doneFns.forEach((fn) => fn(event));
					if (prev) return prev(event);
				}
					;
				var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
				script.onerror = onScriptComplete.bind(null, script.onerror);
				script.onload = onScriptComplete.bind(null, script.onload);
				needAttach && document.head.appendChild(script);
			};
		})();
		(() => {
			require.r = (exports) => {
				if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
					Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
				}
				Object.defineProperty(exports, '__esModule', { value: true });
			};
		})();
		(() => {
			require.p = "http://localhost:8080/";
		})();
		(() => {
			var installedChunks = {
				"remote": 0
			};
			require.f.j = (chunkId, promises) => {
				var installedChunkData = require.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
				if (installedChunkData !== 0) {
					if (installedChunkData) {
						promises.push(installedChunkData[2]);
					} else {
						if (true) {
							var promise = new Promise((resolve, reject) => {
								installedChunkData = installedChunks[chunkId] = [resolve, reject];
							});
							promises.push(installedChunkData[2] = promise);
							var url = require.p + require.u(chunkId);
							var error = new Error();
							var loadingEnded = (event) => {
								if (require.o(installedChunks, chunkId)) {
									installedChunkData = installedChunks[chunkId];
									if (installedChunkData !== 0) installedChunks[chunkId] = undefined;
									if (installedChunkData) {
										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
										var realSrc = event && event.target && event.target.src;
										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
										error.name = 'ChunkLoadError';
										error.type = errorType;
										error.request = realSrc;
										installedChunkData[1](error);
									}
								}
							};
							require.l(url, loadingEnded, "chunk-" + chunkId);
						} else installedChunks[chunkId] = 0;
					}
				}
			};
			var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
				var [chunkIds, moreModules, runtime] = data;
				var moduleId, chunkId, i = 0, resolves = [];
				for (; i < chunkIds.length; i++) {
					chunkId = chunkIds[i];
					if (require.o(installedChunks, chunkId) && installedChunks[chunkId]) {
						resolves.push(installedChunks[chunkId][0]);
					}
					installedChunks[chunkId] = 0;
				}
				for (moduleId in moreModules) {
					if (require.o(moreModules, moduleId)) {
						require.m[moduleId] = moreModules[moduleId];
					}
				}
				if (runtime) runtime(require);
				if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
				while (resolves.length) {
					resolves.shift()();
				}
			}
			var chunkLoadingGlobal = self["webpackChunkremote"] = self["webpackChunkremote"] || [];
			chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
			chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
		})();
		return require("webpack/container/entry/remote");
	})()
	;