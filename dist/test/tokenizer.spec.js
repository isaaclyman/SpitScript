"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const tokenizer_1 = require("../src/tokenizer");
// The tokenizer...
ava_1.default('tokenizes an empty string', t => {
    const tokens = tokenizer_1.default('');
    t.deepEqual(tokens, []);
});
//# sourceMappingURL=tokenizer.spec.js.map