import { TestContext } from 'ava'

const assert = {
    codeEquals (context: TestContext, value: string, expected: string) {
        // Remove tabs
        value = value.replace(/    /g, '')
        expected = expected.replace(/    /g, '')

        context.is(value.trim(), expected.trim())
    }
}

export default assert