(function (window) {
  window.ss = window.ss || {};

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
    'NEW': 'new',
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

  window.ss.generate = function(node) {
    /*
    Heavily inspired by @thejameskyle: https://github.com/thejameskyle/the-super-tiny-compiler/blob/master/super-tiny-compiler.js
    */

    switch (node.type) {
      case 'PROGRAM':
        return node.body.map(window.ss.generate).join('');
      case 'NEWLINE':
        return '\n';
      case 'NAME':
      case 'NUMBER':
      case 'QUOTE':
        return node.value;
      case 'TOKEN':
        return '';
    }

    var word = syntax[node.type];

    if (!word) {
      throw new Error('Generator had a problem. Unrecognized syntax element: ' + node.type);
    }

    if (node.children && node.children.length) {
      word += node.children.map(window.ss.generate).join('');
    }

    return word;
  };

})(window);
