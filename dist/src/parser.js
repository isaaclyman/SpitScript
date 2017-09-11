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
    var wordTypes = {
        'ARRAY': ['lot', 'lotta'],
        'ARRAYEND': ['stuff'],
        'ASSIGNMENT': ['be', 'is'],
        'BLOCK': ['then', 'piece'],
        'BLOCKEND': ['okay'],
        'BLOCKCOMMENT': ['listen'],
        'BLOCKCOMMENTEND': ['right'],
        'COMMA': ['and'],
        'COMPEQ': ['like'],
        'COMPGREATER': ['more', 'mo'],
        'COMPGREATEREQ': ['over'],
        'COMPLESS': ['less'],
        'COMPLESSEQ': ['under'],
        'COMPNOT': ['ain\'t', 'isn\'t'],
        'CONDITIONELSE': ['disagree', 'disrespect'],
        'CONDITIONIF': ['sayin', 'saying'],
        'DECLARATION': ['big', 'lil', 'those', 'who'],
        'DELETION': ['rid', 'ridda'],
        'FUNCTION': ['business'],
        // Ignored tokens are not parsed:
        'IGNORED': ['cool', 'fool', 'got', 'he', 'her', 'hey', 'him', 'his', 'hot', 'i', 'in', 'me', 'my', 'of', 'our', 'say', 'says', 'see', 'she', 'talk', 'talks', 'than', 'that', 'the', 'their', 'they', 'think', 'thinks', 'up', 'us', 'we', 'ya', 'yall', 'yo', 'you', 'your'],
        'LINECOMMENT': ['cuz', 'so'],
        'LOGICAND': ['also'],
        'LOGICNOT': ['not'],
        'LOGICOR': ['or'],
        'LOOPFOR': ['rollin', 'rolling'],
        'LOOPWHILE': ['always', 'keep'],
        'MATHMINUS': ['smaller'],
        'MATHPLUS': ['bigger'],
        'NEW': ['get', 'make'],
        'PAREN': ['this', 'these'],
        'PARENEND': ['well'],
        'REFINE': ['with'],
        'REFINEEND': ['yeah'],
        'REFINEDOT': ['get', 'gotta'],
        'RETURN': ['rep', 'represent', 'show'],
        'SEMICOLON': ['uh'],
        'THIS': ['crib', 'here'],
        'VALNULL': ['nah'],
        'VALONE': ['one'],
        'VALTWO': ['two'],
        'VALUNDEFINED': ['unreal'],
        'VALZERO': ['nothin', 'nothing'] // 0
    };
    var childrenTypes = {
        'ARRAY': 'ARRAYEND',
        'BLOCK': 'BLOCKEND',
        'BLOCKCOMMENT': 'BLOCKCOMMENTEND',
        'LINECOMMENT': 'NEWLINE',
        'PAREN': 'PARENEND',
        'REFINE': 'REFINEEND'
    };
    // Turn the normalized object wordTypes into a dictionary
    //  where the keys are the words in the vocabulary and the
    //  values are the types. This provides faster access by
    //  word.
    var words = (function (types) {
        var wordsDict = {};
        for (var key in types) {
            if (!types.hasOwnProperty(key))
                continue;
            for (var index in types[key]) {
                if (!types[key].hasOwnProperty(index))
                    continue;
                wordsDict[types[key][index]] = key;
            }
        }
        return wordsDict;
    })(wordTypes);
    var parse = function (tokens, isDebug) {
        if (isDebug === void 0) { isDebug = false; }
        /*
        Heavily inspired by @thejameskyle: https://github.com/thejameskyle/the-super-tiny-compiler/blob/master/super-tiny-compiler.js
        */
        var current = 0;
        if (isDebug) {
            console.log('PARSER...');
            console.log("Parsing " + tokens.length + " tokens.");
        }
        function walk() {
            // Types are: NEWLINE, QUOTE, NUMBER, TOKEN, WORD
            var token = tokens[current];
            if (isDebug) {
                console.log(current + 1 + ":", token);
            }
            if (!token) {
                return;
            }
            if (token.type === 'NEWLINE') {
                current++;
                return createNode('NEWLINE', token.value);
            }
            if (token.type === 'SPACE') {
                current++;
                return createNode('SPACE', token.value);
            }
            if (token.type === 'QUOTE') {
                current++;
                return createNode('QUOTE', token.value);
            }
            if (token.type === 'NUMBER') {
                current++;
                return createNode('NUMBER', token.value);
            }
            if (token.type == 'TOKEN') {
                current++;
                return createNode('TOKEN', token.value);
            }
            if (token.type == 'WORD') {
                // If the word is not in our vocabulary, it must be
                //  a reference to a variable.
                if (!token.value || !words.hasOwnProperty(token.value)) {
                    current++;
                    return createNode('NAME', token.value);
                }
                var type = words[token.value];
                // If this is an ignored word, add an ignored node
                // This will usually be skipped on the generation step
                if (type === 'IGNORED') {
                    current++;
                    return createNode('IGNORED', token.value);
                }
                // If the word is in our vocabulary but is not a type
                //  that can have children, return it as-is.
                if (!childrenTypes.hasOwnProperty(type)) {
                    current++;
                    return createNode(type, token.value);
                }
                // If the word is a type that can have children,
                //  recurse over them until the end token is reached.
                var node = createNode(type, token.value, true);
                var beginToken = token.value;
                var endTokenType = childrenTypes[type];
                current++;
                var innerToken = void 0;
                while (type !== endTokenType) {
                    innerToken = walk();
                    if (!innerToken) {
                        throw new Error("Failed to discover end token of type [" + endTokenType + "] to match token [" + words[beginToken] + " " + beginToken + "].");
                    }
                    node.children = node.children || [];
                    node.children.push(innerToken);
                    token = innerToken;
                    if (token.value) {
                        type = words[token.value] || token.type;
                    }
                    else {
                        type = token.type;
                    }
                }
                return node;
            }
            throw new Error("Parser had a problem. Unrecognized token: " + token);
        }
        var ast = {
            type: 'PROGRAM',
            body: []
        };
        while (current < tokens.length) {
            var node = walk();
            if (!node) {
                break;
            }
            ast.body.push(node);
        }
        if (isDebug) {
            console.log('PARSED AST: ', ast);
        }
        return ast;
    };
    function createNode(type, value, hasChildren) {
        if (value === void 0) { value = null; }
        if (hasChildren === void 0) { hasChildren = false; }
        var node = {
            children: null,
            type: type,
            value: value
        };
        if (hasChildren)
            node.children = [];
        return node;
    }
    exports.default = parse;
});
//# sourceMappingURL=parser.js.map