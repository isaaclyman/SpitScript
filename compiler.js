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

  window.ss.compile = function(source) {
    var tokens = window.ss.tokenize(source);
    var ast = window.ss.parse(tokens);
    var code = window.ss.generate(ast);
    window.eval(code);
  };

})(window);
