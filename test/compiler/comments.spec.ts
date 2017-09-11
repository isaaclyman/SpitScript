import test from 'ava'

import assert from '../helpers/assert'
import compile from '../../src/compiler'

// The compiler...

test('compiles a single-line SpitScript comment to a JS comment', t => {
    const ss = `
    so if y'all feel me, reach up toward the ceiling
    `

    const code = compile(ss, false, true) || ''
    const expectedCode = `
    // if y'all feel me, reach up toward the ceiling
    `

    t.true(assert.codeEquals(code, expectedCode))
})

test('compiles two consecutive line comments with nesting words in them', t => {
    const ss = `
    so if y'all feel these well
    cuz reach up toward these make
    `

    const code = compile(ss, false, true) || ''
    const expectedCode = `
    // if y'all feel these well
    // reach up toward these make
    `

    t.true(assert.codeEquals(code, expectedCode))
})

test('compiles a block SpitScript comment to a JS comment, preserving whitespace', t => {
    const ss = `
    listen
    mo money, mo problems
    right
    `

    const code = compile(ss, false, true) || ''
    const expectedCode = `
    /*
    mo money, mo problems
    */
    `

    t.true(assert.codeEquals(code, expectedCode))
})
