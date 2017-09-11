import test from 'ava'

import assert from '../helpers/assert'
import compile from '../../src/compiler'

// The compiler...

test('compiles an empty string to an empty string', t => {
    const code = compile('', false, true)
    t.deepEqual(code, '')
})

test('compiles the example SpitScript program', t => {
    const ss = `
    big pusher
    lil bruh be hot, got lotta that stuff
    
    bruh he with nothin, yeah be nothin
    bruh he with the cool one, yeah be the fool one
    
    rollin these pusher be two uh pusher, under 10 uh pusher got bigger bigger well then
    
    bruh he with the pusher, yeah be bruh with the pusher, he smaller than two yeah bigger than bruh with the pusher, smaller than one, yeah
    
    console get log got this bruh with the pusher, yeah well
    okay    
    `

    const code = compile(ss, false, true) || ''
    const expectedCode = `var pusher
    var bruh = []
    
    bruh[0] = 0
    bruh[1] = 1
    
    for (pusher = 2;pusher <= 10;pusher++){
    
    bruh[pusher] = bruh[pusher-2]+bruh[pusher-1]
    
    console.log(bruh[pusher])
    }`

    assert.codeEquals(t, code, expectedCode)
})