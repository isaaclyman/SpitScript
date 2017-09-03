"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const generator_1 = require("../src/generator");
// The generator...
ava_1.default('generates empty code from an empty AST', t => {
    const ast = {
        body: [],
        type: 'PROGRAM'
    };
    const code = generator_1.default(ast);
    t.deepEqual(code, '');
});
//# sourceMappingURL=generator.spec.js.map