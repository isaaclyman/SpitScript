(function (window) {
  window.ss = window.ss || {};

  if (!window.ss.tokenize) {
    throw new Error('SpitScript Tokenizer has not been loaded.');
  }

  if (!window.ss.parse) {
    throw new Error('SpitScript Parser has not been loaded.');
  }

  if (!window.ss.generate) {
    throw new Error('SpitScript Generator has not been loaded.');
  }

  window.ss.compile = function(source, isDebug) {
    var tokens = window.ss.tokenize(source, isDebug);
    var ast = window.ss.parse(tokens, isDebug);
    var code = window.ss.generate(ast, isDebug);

    if (isDebug) {
      console.log('CODE: ', code);
    }

    window.eval(code);
  };

})(window);
