import test from 'ava'

import { Ast } from '../src/parser'
import generate from '../src/generator'

// The generator...

test('generates empty code from an empty AST', t => {
    const ast: Ast = {
        body: [],
        type: 'PROGRAM'
    }
    const code = generate(ast)

    t.deepEqual(code, '')
})