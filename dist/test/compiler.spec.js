"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const compiler_1 = require("../src/compiler");
// The compiler...
ava_1.default('compiles an empty string to an empty string', t => {
    const code = compiler_1.default('', false, true);
    t.deepEqual(code, '');
});
ava_1.default('compiles the example SpitScript program', t => {
    const ss = `
    big pusher
    lil bruh be hot, got lotta that stuff
    
    bruh he with nothin, yeah be nothin
    bruh he with the cool one, yeah be the fool one
    
    rollin these pusher be two uh pusher, under 10 uh pusher got bigger bigger well then
    
    bruh he with the pusher, yeah be bruh with the pusher, he smaller than two yeah bigger than bruh with the pusher, smaller than one, yeah
    
    console get log got this bruh with the pusher, yeah well
    okay    
    `;
    const code = compiler_1.default(ss, false, true) || '';
    const expectedCode = `var pusher
    var bruh = []
    
    bruh[0] = 0
    bruh[1] = 1
    
    for (pusher = 2;pusher <= 10;pusher++){
    
    bruh[pusher] = bruh[pusher-2]+bruh[pusher-1]
    
    console.log(bruh[pusher])
    }`.replace(/    /g, ''); // Strip out tabs before comparing
    t.deepEqual(code.trim(), expectedCode.trim());
});
//# sourceMappingURL=compiler.spec.js.map