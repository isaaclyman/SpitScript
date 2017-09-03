(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "ava", "../src/parser"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ava_1 = require("ava");
    var parser_1 = require("../src/parser");
    // The parser...
    ava_1.default('parses an empty list of tokens', function (t) {
        var tokens = [];
        var ast = parser_1.default(tokens);
        var expectedAst = {
            body: [],
            type: 'PROGRAM'
        };
        t.deepEqual(ast, expectedAst);
    });
});
//# sourceMappingURL=parser.spec.js.map