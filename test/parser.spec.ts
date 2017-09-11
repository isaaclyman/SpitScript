import test from 'ava'

import parse, { Ast, WordTypeDict, wordTypes } from '../src/parser'
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

test('has no duplicate words', t => {
    const words = Object.keys(wordTypes).reduce((acc, key) => {
        acc = [...acc, ...wordTypes[key]]
        return acc
    }, [] as Array<string>)

    interface groupedItemsDict {
        [word: string]: boolean
    }

    const grouped = words.reduce((acc, item) => {
        if (acc[item]) {
            t.fail()
        }

        acc[item] = true
        return acc
    }, {} as groupedItemsDict)

    t.pass()
})