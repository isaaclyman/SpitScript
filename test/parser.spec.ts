import test from 'ava'

import parse, { Ast } from '../src/parser'
import { Token } from '../src/tokenizer'

// The parser...

test('parses an empty list of tokens', t => {
    const tokens: Array<Token> = []
    const ast = parse(tokens)

    const expectedAst: Ast = {
        body: [],
        type: 'PROGRAM'
    }
    
    t.deepEqual(ast, expectedAst)
})