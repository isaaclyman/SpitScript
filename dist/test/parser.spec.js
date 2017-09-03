"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const parser_1 = require("../src/parser");
// The parser...
ava_1.default('parses an empty list of tokens', t => {
    const tokens = [];
    const ast = parser_1.default(tokens);
    const expectedAst = {
        body: [],
        type: 'PROGRAM'
    };
    t.deepEqual(ast, expectedAst);
});
//# sourceMappingURL=parser.spec.js.map