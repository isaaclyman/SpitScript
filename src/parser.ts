import { Token } from './tokenizer'

interface WordTypeDict {
  [type: string]: Array<string>
}

const wordTypes: WordTypeDict = {
  'ARRAY': ['lot', 'lotta'],          // [ (array)
  'ARRAYEND': ['stuff'],              // ]
  'ASSIGNMENT': ['be', 'is'],         // =
  'BLOCK': ['then', 'piece'],         // {
  'BLOCKEND': ['okay'],               // }
  'BLOCKCOMMENT': ['listen'],         // /*
  'BLOCKCOMMENTEND': ['right'],       // */
  'COMMA': ['and'],                   // ,
  'COMPEQ': ['like'],                 // ===
  'COMPGREATER': ['more', 'mo'],      // >
  'COMPGREATEREQ': ['over'],          // >=
  'COMPLESS': ['less'],               // <
  'COMPLESSEQ': ['under'],            // <=
  'COMPNOT': ['ain\'t', 'isn\'t'],    // !==
  'CONDITIONELSE': ['disagree', 'disrespect'],        // else
  'CONDITIONIF': ['sayin', 'saying'],                 // if
  'DECLARATION': ['big', 'lil', 'those', 'who'],      // var
  'DELETION': ['rid', 'ridda'],       // delete
  'FUNCTION': ['business'],           // function
  // Ignored tokens are not parsed:
  'IGNORED': ['cool', 'fool', 'got', 'he', 'her', 'hey', 'him', 'his', 'hot', 'i', 'in', 'me', 'my', 'of', 'our', 'say', 'says', 'see', 'she', 'talk', 'talks', 'than', 'that', 'the', 'their', 'they', 'think', 'thinks', 'up', 'us', 'we', 'ya', 'yall', 'yo', 'you', 'your'],
  'LINECOMMENT': ['cuz', 'so'],       // // (comment)
  'LOGICAND': ['also'],               // &&
  'LOGICNOT': ['not'],                // !
  'LOGICOR': ['or'],                  // ||
  'LOOPFOR': ['rollin', 'rolling'],   // for
  'LOOPWHILE': ['always', 'keep'],    // while
  'MATHMINUS': ['smaller'],           // -
  'MATHPLUS': ['bigger'],             // +
  'NEW': ['get', 'make'],             // new
  'PAREN': ['this', 'these'],         // (
  'PARENEND': ['well'],               // )
  'REFINE': ['with'],                 // [ (object property access)
  'REFINEEND': ['yeah'],              // ]
  'REFINEDOT': ['get', 'gotta'],      // . (object property access)
  'RETURN': ['rep', 'represent', 'show'],             // return
  'SEMICOLON': ['uh'],                // 
  'THIS': ['crib', 'here'],           // this
  'VALNULL': ['nah'],                 // null
  'VALONE': ['one'],                  // 1
  'VALTWO': ['two'],                  // 2
  'VALUNDEFINED': ['unreal'],         // undefined
  'VALZERO': ['nothin', 'nothing']    // 0
}

interface ChildDict {
  [type: string]: string
}

const childrenTypes: ChildDict = {
  'ARRAY': 'ARRAYEND',
  'BLOCK': 'BLOCKEND',
  'BLOCKCOMMENT': 'BLOCKCOMMENTEND',
  'LINECOMMENT': 'NEWLINE',
  'PAREN': 'PARENEND',
  'REFINE': 'REFINEEND'
}

interface WordDict {
  [word: string]: string
}

// Turn the normalized object wordTypes into a dictionary
//  where the keys are the words in the vocabulary and the
//  values are the types. This provides faster access by
//  word.
const words = (function (types) : WordDict {
  let wordsDict: WordDict = {}

  for (const key in types) {
    if (!types.hasOwnProperty(key)) continue

    for (const index in types[key]) {
      if (!types[key].hasOwnProperty(index)) continue

      wordsDict[types[key][index]] = key
    }
  }

  return wordsDict
})(wordTypes)

export interface Ast {
  body: Array<Node>
  type: string
}

const parse = function(tokens: Array<Token>, isDebug: boolean = false) {
  /*
  Heavily inspired by @thejameskyle: https://github.com/thejameskyle/the-super-tiny-compiler/blob/master/super-tiny-compiler.js
  */
  let current = 0

  if (isDebug) {
    console.log('PARSER...')
    console.log(`Parsing ${tokens.length} tokens.`)
  }

  function walk(): Node | void {
    // Types are: NEWLINE, QUOTE, NUMBER, TOKEN, WORD
    let token = tokens[current]

    if (isDebug) {
      console.log(`${current + 1}:`, token)
    }

    if (!token) {
      return
    }

    if (token.type === 'NEWLINE') {
      current++
      return createNode('NEWLINE', token.value)
    }

    if (token.type === 'SPACE') {
      current++
      return createNode('SPACE', token.value)
    }

    if (token.type === 'QUOTE') {
      current++
      return createNode('QUOTE', token.value)
    }

    if (token.type === 'NUMBER') {
      current++
      return createNode('NUMBER', token.value)
    }

    if (token.type == 'TOKEN') {
      current++
      return createNode('TOKEN', token.value)
    }

    if (token.type == 'WORD') {
      // If the word is not in our vocabulary, it must be
      //  a reference to a variable.
      if (!token.value || !words.hasOwnProperty(token.value)) {
        current++
        return createNode('NAME', token.value)
      }

      let type = words[token.value]

      // If this is an ignored word, add an ignored node
      // This will usually be skipped on the generation step
      if (type === 'IGNORED') {
        current++
        return createNode('IGNORED', token.value)
      }

      // If the word is in our vocabulary but is not a type
      //  that can have children, return it as-is.
      if (!childrenTypes.hasOwnProperty(type)) {
        current++
        return createNode(type, token.value)
      }

      // If the word is a type that can have children,
      //  recurse over them until the end token is reached.
      const node = createNode(type, token.value, true)
      const beginToken = token.value
      const endTokenType = childrenTypes[type]
      current++

      let innerToken
      while (type !== endTokenType) {
        innerToken = walk()

        if (!innerToken) {
          throw new Error(`Failed to discover end token of type [${endTokenType}] to match token [${words[beginToken]} ${beginToken}].`)
        }

        node.children = node.children || []
        node.children.push(innerToken)
        token = innerToken

        if (token.value) {
          type = words[token.value] || token.type
        } else {
          type = token.type
        }
      }

      return node
    }

    throw new Error(`Parser had a problem. Unrecognized token: ${token}`)
  }

  const ast: Ast = {
    type: 'PROGRAM',
    body: []
  }

  while (current < tokens.length) {
    const node = walk()

    if (!node) {
      break;
    }

    ast.body.push(node)
  }

  if (isDebug) {
    console.log('PARSED AST: ', ast)
  }

  return ast
}

export interface Node {
  children: Array<Node> | null
  type: string
  value: string | null
}

function createNode(type: string, value: string | null = null, hasChildren: boolean = false): Node {
  const node: Node = {
    children: null,
    type: type,
    value: value
  }

  if (hasChildren) node.children = []

  return node
}

export default parse