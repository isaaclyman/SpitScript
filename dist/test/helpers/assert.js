(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var assert = {
        codeEquals: function (context, value, expected) {
            // Remove tabs
            value = value.replace(/    /g, '');
            expected = expected.replace(/    /g, '');
            context.is(value.trim(), expected.trim());
        }
    };
    exports.default = assert;
});
//# sourceMappingURL=assert.js.map