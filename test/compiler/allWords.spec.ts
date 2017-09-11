import test from 'ava'

import assert from '../helpers/assert'
import compile from '../../src/compiler'

// The compiler...

test('compiles every available word', t => {
    const ss = `
    lot stuff
    lotta stuff
    big man be nah
    lil boy is one
    those kids be two
    who gurl be man
    then okay
    piece okay
    listen right
    big boss be lotta one and two stuff
    one like one
    two more one
    two mo one
    one over one
    one less two
    one under one
    one ain't two
    one isn't two
    sayin this one like one well then
        gurl be 3
    okay disagree sayin this one like two well then
        gurl be two
    okay disrespect then
        gurl be one
    okay
    rid man
    ridda gurl
    business getcha these well then
        kids be nothing
        rep kids
    okay
    getcha these well
    cool fool got he her hey him his hot i in me my of our say
    says see she talk talks than that the their they think
    thinks up us we ya yall yo you your
    cuz getcha these well
    so getcha these well
    one also two
    not getcha these well
    one or two
    rollin this big joint be nothin uh joint under one uh joint bigger bigger well then okay
    rolling this big joint be nothin uh joint under one uh joint bigger bigger well then okay
    always this two under one well then okay
    keep this two under one well then okay
    two smaller one
    one bigger one
    make getcha these well
    big fella be piece
        biz to one
    okay
    fella with 'biz' yeah like one
    fella get biz like one
    fella gotta biz like one
    business deals these criminals well then
        saying these criminals like nah well then
            represent nah
        okay
        sayin these criminals over one well then
            represent one
        okay

        crib get stacks be nah
        here get ice be unreal
    okay

    `

    const code = compile(ss, false, true) || ''
    const expectedCode = `
    []
    []
    var man = null
    var boy = 1
    var kids = 2
    var gurl = man
    {}
    {}
    /* */
    var boss = [1,2]
    1 === 1
    2 > 1
    2 > 1
    1 >= 1
    1 < 2
    1 <= 1
    1 !== 2
    1 !== 2
    if (1 === 1){
        gurl = 3
    }else if (1 === 2){
        gurl = 2
    }else {
        gurl = 1
    }
    delete man
    delete gurl
    function getcha(){
        kids = 0
        return kids
    }
    getcha()
    


    // getcha these well
    // getcha these well
    1 && 2
    !getcha()
    1 || 2
    for (var joint = 0;joint <= 1;joint++){}
    for (var joint = 0;joint <= 1;joint++){}
    while (2 <= 1){}
    while (2 <= 1){}
    2-1
    1+1
    new getcha()
    var fella = {
        biz: 1
    }
    fella['biz'] === 1
    fella.biz === 1
    fella.biz === 1
    function deals(criminals){
        if (criminals === null){
            return null
        }
        if (criminals >= 1){
            return 1
        }

        this.stacks = null
        this.ice = undefined
    }
    `

    assert.codeEquals(t, code, expectedCode)
})