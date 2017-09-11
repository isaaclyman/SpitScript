import tokenize from './tokenizer'
import parse from './parser'
import generate from './generator'

const compile = function(source: string, isDebug: boolean = false, isTest: boolean = false): string | void {
  if (isDebug) {
    console.log('INPUT: ', source)
  }
  
  var tokens = tokenize(source, isDebug)
  var ast = parse(tokens, isDebug)
  var code = generate(ast, isDebug)

  if (isDebug) {
    console.log('CODE: ', code)
  }

  if (isTest) {
    return code
  }

  eval(code)
}

export default compile