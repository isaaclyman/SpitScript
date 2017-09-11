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
    ava_1.default('compiles every available word', function (t) {
        var ss = "\n    lot stuff\n    lotta stuff\n    big man be nah\n    lil boy is one\n    those kids be two\n    who gurl be man\n    then okay\n    piece okay\n    listen right\n    big boss be lotta one and two stuff\n    one like one\n    two more one\n    two mo one\n    one over one\n    one less two\n    one under one\n    one ain't two\n    one isn't two\n    sayin this one like one well then\n        gurl be 3\n    okay disagree sayin this one like two well then\n        gurl be two\n    okay disrespect then\n        gurl be one\n    okay\n    rid man\n    ridda gurl\n    business getcha these well then\n        kids be nothing\n        rep kids\n    okay\n    getcha these well\n    cool fool got he her hey him his hot i in me my of our say\n    says see she talk talks than that the their they think\n    thinks up us we ya yall yo you your\n    cuz getcha these well\n    so getcha these well\n    one also two\n    not getcha these well\n    one or two\n    rollin this big joint be nothin uh joint under one uh joint bigger bigger well then okay\n    rolling this big joint be nothin uh joint under one uh joint bigger bigger well then okay\n    always this two under one well then okay\n    keep this two under one well then okay\n    two smaller one\n    one bigger one\n    make getcha these well\n    big fella be piece\n        biz to one\n    okay\n    fella with 'biz' yeah like one\n    fella get biz like one\n    fella gotta biz like one\n    business deals these criminals well then\n        saying these criminals like nah well then\n            represent nah\n        okay\n        sayin these criminals over one well then\n            represent one\n        okay\n\n        crib get stacks be nah\n        here get ice be unreal\n    okay\n\n    ";
        var code = compiler_1.default(ss, false, true) || '';
        var expectedCode = "\n    []\n    []\n    var man = null\n    var boy = 1\n    var kids = 2\n    var gurl = man\n    {}\n    {}\n    /* */\n    var boss = [1,2]\n    1 === 1\n    2 > 1\n    2 > 1\n    1 >= 1\n    1 < 2\n    1 <= 1\n    1 !== 2\n    1 !== 2\n    if (1 === 1){\n        gurl = 3\n    }else if (1 === 2){\n        gurl = 2\n    }else {\n        gurl = 1\n    }\n    delete man\n    delete gurl\n    function getcha(){\n        kids = 0\n        return kids\n    }\n    getcha()\n    \n\n\n    // getcha these well\n    // getcha these well\n    1 && 2\n    !getcha()\n    1 || 2\n    for (var joint = 0;joint <= 1;joint++){}\n    for (var joint = 0;joint <= 1;joint++){}\n    while (2 <= 1){}\n    while (2 <= 1){}\n    2-1\n    1+1\n    new getcha()\n    var fella = {\n        biz: 1\n    }\n    fella['biz'] === 1\n    fella.biz === 1\n    fella.biz === 1\n    function deals(criminals){\n        if (criminals === null){\n            return null\n        }\n        if (criminals >= 1){\n            return 1\n        }\n\n        this.stacks = null\n        this.ice = undefined\n    }\n    ";
        assert_1.default.codeEquals(t, code, expectedCode);
    });
});
//# sourceMappingURL=allWords.spec.js.map