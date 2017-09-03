import { Ast, Node } from './parser'

interface SyntaxDict {
  [type: string]: string
}

const syntax: SyntaxDict = {
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
}

const generate = function(node: Ast | Node, isDebug: boolean = false): string {
  /*
  Heavily inspired by @thejameskyle: https://github.com/thejameskyle/the-super-tiny-compiler/blob/master/super-tiny-compiler.js
  */

  if (isDebug) {
    console.log(node)
  }

  switch (node.type) {
    case 'PROGRAM':
      if (isDebug) {
        console.log('GENERATOR...')
      }
      
      return (<Ast>node).body.map(function (el) { return generate(el, isDebug) }).join('')
    case 'NEWLINE':
      return '\n'
    case 'NAME':
    case 'NUMBER':
    case 'QUOTE':
      return (<Node>node).value || ''
    case 'TOKEN':
      return ''
  }

  var word = syntax[node.type]

  if (typeof word !== 'string') {
    throw new Error(`Generator had a problem. Unrecognized syntax element: ${node.type}`)
  }

  node = (<Node>node)
  if (node.children && node.children.length) {
    word += node.children.map(function (el) { return generate(el, isDebug) }).join('')
  }

  return word
}

export default generate