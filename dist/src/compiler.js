"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenizer_1 = require("./tokenizer");
const parser_1 = require("./parser");
const generator_1 = require("./generator");
const compile = function (source, isDebug = false, isTest = false) {
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
//# sourceMappingURL=compiler.js.map