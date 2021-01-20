(self["webpackChunkhost"] = self["webpackChunkhost"] || []).push([["src_bootstrap_js"], {
  "./src/App.js":
    ((module, exports, require) => {
      "use strict";
      require.r(exports);
      require.d(exports, {
        "default": () => DEFAULT_EXPORT
      });
      var react_0__ = require("./node_modules/react/index.js");
      var _Slides_1__ = require("./src/Slides.js");
      const RemoteNewList = /*#__PURE__*/react_0__.lazy(() => require.e("webpack_container_remote_remote_NewsList").then(require.t.bind(require, "webpack/container/remote/remote/NewsList", 23)));
      const App = () => /*#__PURE__*/react_0__.createElement("div", null, /*#__PURE__*/react_0__.createElement("h3", null, "\u672C\u5730\u7EC4\u4EF6Slides"), /*#__PURE__*/react_0__.createElement(_Slides_1__.default, null), /*#__PURE__*/react_0__.createElement("hr", null), /*#__PURE__*/react_0__.createElement("h3", null, "\u8FDC\u7A0B\u7EC4\u4EF6NewsList"), /*#__PURE__*/react_0__.createElement(react_0__.Suspense, {
        fallback: "Loading NewsList"
      }, /*#__PURE__*/react_0__.createElement(RemoteNewList, null)));
      const DEFAULT_EXPORT = (App);
    }),
  "./src/Slides.js":
    ((module, exports, require) => {
      "use strict";
      require.r(exports);
      require.d(exports, {
        "default": () => DEFAULT_EXPORT
      });
      var react_0__ = require("./node_modules/react/index.js");
      const Slides = () => /*#__PURE__*/react_0__.createElement("div", null, "Slides");
      const DEFAULT_EXPORT = (Slides);
    }),
  "./src/bootstrap.js":
    ((module, exports, require) => {
      "use strict";
      require.r(exports);
      var react_0__ = require("./node_modules/react/index.js");
      var react_dom_1__ = require("./node_modules/react-dom/index.js");
      var _App_2__ = require("./src/App.js");
      react_dom_1__.render( /*#__PURE__*/react_0__.createElement(_App_2__.default, null), document.getElementById('root'));
    })
}]);