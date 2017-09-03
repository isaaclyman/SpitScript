(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "ava", "../src/tokenizer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ava_1 = require("ava");
    var tokenizer_1 = require("../src/tokenizer");
    // The tokenizer...
    ava_1.default('tokenizes an empty string', function (t) {
        var tokens = tokenizer_1.default('');
        t.deepEqual(tokens, []);
    });
});
//# sourceMappingURL=tokenizer.spec.js.map