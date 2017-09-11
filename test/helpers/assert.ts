const assert = {
    codeEquals (value: string, expected: string): boolean {
        // Remove tabs
        value = value.replace(/    /g, '')
        expected = expected.replace(/    /g, '')

        return value.trim() === expected.trim()
    }
}

export default assert