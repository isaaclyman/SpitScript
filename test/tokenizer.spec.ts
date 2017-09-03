import test from 'ava'

import tokenize from '../src/tokenizer'

// The tokenizer...

test('tokenizes an empty string', t => {
    const tokens = tokenize('')
    t.deepEqual(tokens, [])
})