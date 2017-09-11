(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./tokenizer", "./parser", "./generator"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tokenizer_1 = require("./tokenizer");
    var parser_1 = require("./parser");
    var generator_1 = require("./generator");
    var compile = function (source, isDebug, isTest) {
        if (isDebug === void 0) { isDebug = false; }
        if (isTest === void 0) { isTest = false; }
        if (isDebug) {
            console.log('INPUT: ', source);
        }
        var tokens = tokenizer_1.default(source, isDebug);
        var ast = parser_1.default(tokens, isDebug);
        var code = generator_1.default(ast, isDebug);
        if (isDebug) {
            console.log('CODE: ', code);
        }
        if (isTest) {
            return code;
        }
        eval(code);
    };
    exports.default = compile;
});
//# sourceMappingURL=compiler.js.map