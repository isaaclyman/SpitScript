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
    window.eval(window.ss.generate(window.ss.parse(window.ss.tokenize(source))));
  };

})(window);
