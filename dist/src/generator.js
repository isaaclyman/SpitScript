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
        'COMMA': ',',
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
        'DELIMIT': ': ',
        'FUNCTION': 'function ',
        'IGNORED': '',
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
        'SPACE': '',
        //  the node value will contain a space.
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
            if (node.type === 'LINECOMMENT') {
                // For line comments, the last word is a newline, whose value is appropriate to use as-is
                word += node.children.map(function (el) { return el.value; }).join('');
            }
            else if (node.type === 'BLOCKCOMMENT') {
                // For block comments, the last word is a SpitScript token, whose value needs to be generated
                var commentLiteral = node.children.slice(0, -1).map(function (el) { return el.value; }).join('');
                var lastChild = node.children[node.children.length - 1];
                word += commentLiteral + generate(lastChild, isDebug);
            }
            else {
                word += node.children.map(function (el) { return generate(el, isDebug); }).join('');
            }
        }
        return word;
    };
    exports.default = generate;
});
//# sourceMappingURL=generator.js.map