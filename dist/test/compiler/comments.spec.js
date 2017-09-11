(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "ava", "../helpers/assert", "../../src/compiler"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ava_1 = require("ava");
    var assert_1 = require("../helpers/assert");
    var compiler_1 = require("../../src/compiler");
    // The compiler...
    ava_1.default('compiles a single-line SpitScript comment to a JS comment', function (t) {
        var ss = "\n    so if y'all feel me, reach up toward the ceiling\n    ";
        var code = compiler_1.default(ss, false, true) || '';
        var expectedCode = "\n    // if y'all feel me, reach up toward the ceiling\n    ";
        assert_1.default.codeEquals(t, code, expectedCode);
    });
    ava_1.default('compiles two consecutive line comments with nesting words in them', function (t) {
        var ss = "\n    so if y'all feel these well\n    cuz reach up toward these make\n    ";
        var code = compiler_1.default(ss, false, true) || '';
        var expectedCode = "\n    // if y'all feel these well\n    // reach up toward these make\n    ";
        assert_1.default.codeEquals(t, code, expectedCode);
    });
    ava_1.default('compiles a block SpitScript comment to a JS comment, preserving whitespace', function (t) {
        var ss = "\n    listen\n    mo money, mo problems\n    right\n    ";
        var code = compiler_1.default(ss, false, true) || '';
        var expectedCode = "\n    /*\n    mo money, mo problems\n    */\n    ";
        assert_1.default.codeEquals(t, code, expectedCode);
    });
});
//# sourceMappingURL=comments.spec.js.map