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
    ava_1.default('has no duplicate words', function (t) {
        var words = Object.keys(parser_1.wordTypes).reduce(function (acc, key) {
            acc = acc.concat(parser_1.wordTypes[key]);
            return acc;
        }, []);
        var grouped = words.reduce(function (acc, item) {
            if (acc[item]) {
                t.fail();
            }
            acc[item] = true;
            return acc;
        }, {});
        t.pass();
    });
});
//# sourceMappingURL=parser.spec.js.map