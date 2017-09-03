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
    var types = {
        'NEWLINE': /[\n\r]/,
        'NUMBER': /[0-9\.]/,
        'QUOTE': /['"]/,
        'TOKEN': /[^a-zA-Z0-9$_'"\s]/,
        'WHITESPACE': /\s/,
        'WORD': /[a-zA-Z0-9$_']/,
        'WORDSTART': /[a-zA-Z$_]/
    };
    var tokenize = function (input, isDebug) {
        /*
        Heavily inspired by @thejameskyle: https://github.com/thejameskyle/the-super-tiny-compiler/blob/master/super-tiny-compiler.js
        */
        if (isDebug === void 0) { isDebug = false; }
        var current = 0;
        var tokens = [];
        var char, value, endquote;
        if (isDebug) {
            console.log('TOKENIZER...');
        }
        while (current < input.length) {
            char = input[current];
            if (types.WHITESPACE.test(char)) {
                if (types.NEWLINE.test(char)) {
                    tokens.push(createToken('NEWLINE', null));
                }
                current++;
                continue;
            }
            if (types.NUMBER.test(char)) {
                value = '';
                while (types.NUMBER.test(char)) {
                    value += char;
                    char = input[++current];
                }
                tokens.push(createToken('NUMBER', value));
                continue;
            }
            if (types.QUOTE.test(char)) {
                endquote = char;
                value = char;
                char = input[++current];
                while (char !== endquote && char !== undefined) {
                    if (char == '\\') {
                        // If an escape slash is encountered, add it along with the subsequent character and do not test it to see if it is a quote.
                        value += char;
                        char = input[++current];
                    }
                    value += char;
                    char = input[++current];
                }
                value += char;
                current++;
                tokens.push(createToken('QUOTE', value));
                continue;
            }
            if (types.WORDSTART.test(char)) {
                value = '';
                while (types.WORD.test(char) && char !== undefined) {
                    value += char;
                    char = input[++current];
                }
                tokens.push(createToken('WORD', value));
                continue;
            }
            if (types.TOKEN.test(char)) {
                tokens.push(createToken('TOKEN', char));
                current++;
                continue;
            }
            throw new Error('Tokenizer had a problem. Unrecognized character: ' + char);
        }
        if (isDebug) {
            console.log('TOKENS: ', tokens);
        }
        return tokens;
    };
    var createToken = function (type, value) { return ({
        type: type,
        value: value
    }); };
    exports.default = tokenize;
});
//# sourceMappingURL=tokenizer.js.map