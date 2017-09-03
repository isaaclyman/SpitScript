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
    var syntax = {
        'ARRAY': '[',
        'ARRAYEND': ']',
        'ASSIGNMENT': ' = ',
        'BLOCK': '{',
        'BLOCKEND': '}',
        'BLOCKCOMMENT': '/*',
        'BLOCKCOMMENTEND': '*/',
        'COMPEQ': ' === ',
        'COMPGREATER': ' > ',
        'COMPGREATEREQ': ' >= ',
        'COMPLESS': ' < ',
        'COMPLESSEQ': ' <= ',
        'COMPNOT': ' !== ',
        'CONDITIONELSE': 'else ',
        'CONDITIONIF': 'if ',
        'DECLARATION': 'var ',
        'DELETION': 'delete ',
        'FUNCTION': 'function ',
        'LINECOMMENT': '//',
        'LOGICAND': ' && ',
        'LOGICNOT': '!',
        'LOGICOR': ' || ',
        'LOOPFOR': 'for ',
        'LOOPWHILE': 'while ',
        'MATHMINUS': '-',
        'MATHPLUS': '+',
        'NEW': 'new ',
        'PAREN': '(',
        'PARENEND': ')',
        'REFINE': '[',
        'REFINEEND': ']',
        'REFINEDOT': '.',
        'RETURN': 'return ',
        'SEMICOLON': ';',
        'THIS': 'this',
        'VALNULL': 'null',
        'VALONE': '1',
        'VALTWO': '2',
        'VALUNDEFINED': 'undefined',
        'VALZERO': '0'
    };
    var generate = function (node, isDebug) {
        /*
        Heavily inspired by @thejameskyle: https://github.com/thejameskyle/the-super-tiny-compiler/blob/master/super-tiny-compiler.js
        */
        if (isDebug === void 0) { isDebug = false; }
        if (isDebug) {
            console.log(node);
        }
        switch (node.type) {
            case 'PROGRAM':
                if (isDebug) {
                    console.log('GENERATOR...');
                }
                return node.body.map(function (el) { return generate(el, isDebug); }).join('');
            case 'NEWLINE':
                return '\n';
            case 'NAME':
            case 'NUMBER':
            case 'QUOTE':
                return node.value || '';
            case 'TOKEN':
                return '';
        }
        var word = syntax[node.type];
        if (typeof word !== 'string') {
            throw new Error("Generator had a problem. Unrecognized syntax element: " + node.type);
        }
        node = node;
        if (node.children && node.children.length) {
            word += node.children.map(function (el) { return generate(el, isDebug); }).join('');
        }
        return word;
    };
    exports.default = generate;
});
//# sourceMappingURL=generator.js.map