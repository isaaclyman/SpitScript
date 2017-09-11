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
  'SPACE': '', // Yes, this is an empty string. In most cases the space has no semantic meaning. When it does (i.e. in comments),
               //  the node value will contain a space.
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
      
      return (<Ast>node).body.map(el => generate(el, isDebug)).join('')
    case 'NEWLINE':
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
    if (node.type === 'BLOCKCOMMENT' || node.type === 'LINECOMMENT') {
      const childrenToGenerate = node.children.slice(0, -1)
      const childrenCode = childrenToGenerate.map(el => el.value).join('')
      const lastChild = node.children[node.children.length - 1]

      word += childrenCode + generate(lastChild, isDebug)
    } else {
      word += node.children.map(el => generate(el, isDebug)).join('')
    }
  }

  return word
}

export default generate