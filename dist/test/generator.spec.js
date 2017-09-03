(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "ava", "../src/generator"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ava_1 = require("ava");
    var generator_1 = require("../src/generator");
    // The generator...
    ava_1.default('generates empty code from an empty AST', function (t) {
        var ast = {
            body: [],
            type: 'PROGRAM'
        };
        var code = generator_1.default(ast);
        t.deepEqual(code, '');
    });
});
//# sourceMappingURL=generator.spec.js.map