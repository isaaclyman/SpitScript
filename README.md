# SpitScript
A rap vocabulary that transpiles to JavaScript.

## Introduction
We've all been there: it's Christmas dinner, the family is around a table piled high with celebratory dishes, and you're all having a good time. Then cousin Ernie asks about your plans for the next few years. Caught off guard, you fail to invent a suitable lie and instead mutter something about becoming a computer programmer.

The table goes silent. Everyone exchanges exasperated glances. Aunt Bertha pauses mid-chew and a glob of mashed potatoes falls from the corner of her mouth.

Grandma Janey tries to calm everyone down. "Now, now," she says. "He's still young." Then she turns to you. "Don't you think you should consider something more practical, like becoming a platinum rapper?"

Dad rubs his forehead with a tired hand. "We raised you with plenty of good role models," he says. "Drake, Cudi, Ye. What's wrong with them? Don't you want to be a provider, make a difference?"

You're holding back tears now. "I don't want to be a rapper," you say, but you know your protest will fall on deaf ears. "I don't care about rap music."

Someone gasps. Maybe everyone. "But dear," mother says kindly. "You're so *good* at rapping. Why, you've been spitting dope bars since you were hardly three years old. Just the other day I was talking to Great-Aunt Charlie about how ill your flow is."

You push yourself away from the table. "Excuse me," you say. "I'm not hungry any more." You tear yourself away from a sea of staring eyes and run to the bathroom.

It would be so easy to give up on your dreams, sign a record deal and spend the rest of your life dropping truth in the studio. But something inside of you says *no*. You were meant to be a programmer.

Well, **SpitScript is here for you.**

### What is SpitScript?
SpitScript is a transpiler. It transforms a special set of words common in rap music to JavaScript. Its lexical structure is identical to JavaScript and it's easy to learn.

### What is the purpose of SpitScript?
SpitScript allows you to write JavaScript that looks like rap lyrics. Finally, you can code to your heart's content regardless of the location -- everyone will think you're just writing a slightly incoherent rap song.

For example, the following SpitScript program prints the first ten Fibonacci numbers to the console:

```
big pusher
lil bruh be hot, got lotta that stuff

bruh he with nothin, yeah be nothin
bruh he with the cool one, yeah be the fool one

rollin these pusher be two uh pusher, under 10 uh pusher got bigger bigger well then

bruh he with the pusher, yeah be bruh with the pusher, he smaller than two yeah bigger than bruh with the pusher, smaller than one, yeah

console get log got this bruh with the pusher, yeah well
okay
```

### How do I run SpitScript?
SpitScript is written in TypeScript and compiled to ES5 with UMD module definitions. In a TypeScript project, you can do this:

```ts
import compile from 'src/compiler'
let spitScript: string = ... // The source text of your SpitScript
compile(spitScript) // Immediately compiles and evaluates your SpitScript
```

In a regular JavaScript project, you can use CommonJS `require()` syntax to load the compiler from the dist/src/ directory.

At present, there is no global fallback for Node or the browser.

### How do I run the unit tests?
You should have TypeScript and Ava installed globally, or run `npm install` and refer to them in their respective node_modules folders.

First, compile the test/ folder with TypeScript (this is done automatically when you run `tsc` from the root folder). Then run `ava` from the root folder.

### How does it work?
The transpiler is based on James Kyle's [Super Tiny Compiler](https://github.com/thejameskyle/the-super-tiny-compiler), licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). Perhaps 10% of my codebase at present is drawn directly from that project. If you haven't checked it out, you should do so right away. It's a superb introduction to what compilers and transpilers do. (James Kyle does not endorse SpitScript.)

Essentially, the transpiler takes the source text and reads it one character at a time, grouping words, numbers and symbols along the way. Then it transforms the list into a hierarchy of "nodes" (top-level code elements) and "children" (groups of nodes that fit inside of other elements, like commands inside a block). Finally, it reads the hierarchy recursively, generating JavaScript for each node.

## Language Quickstart
Assuming you know JavaScript, learning SpitScript will be easy. Most of the words and symbols that have special meaning in JavaScript (`{`, `this`, `null`, `<=` and so forth) are aliased in SpitScript using a single discrete word. String together a bunch of reserved words with spaces between them and you have a SpitScript program (which may or may not be valid. Don't forget to close your parentheses).

`parser.js` is the heart of the language spec. At the top of it (or in the Quick Reference at the bottom of this page) you'll find a simple dictionary where each key is a language feature and each value is an array of reserved words that map to that feature.

Most symbols are ignored. Numbers and unrecognized words are transcribed literally into the resulting syntax. Plenty of ignored words are provided in order for you to form grammatically complete (or incomplete) rap lyrics.

String literals can be created using either single or double quotes. In order to escape a single or double quote, prefix it with two backslashes. For example, the following short program prints `Elmo's world` to the browser console:

`console get log this 'Elmo\\'s world' well`

If you're having trouble getting your code to work, call `compile` with `true` as the second parameter. This will enable copious amounts of debugging output in the browser console.

If you'd like to examine the compilation output rather than evaluating it immediately, call `compile` with `true` as the third parameter. This will return the resulting JavaScript and will not evaluate it.

## FAQ

### Is SpitScript broken?
Yeah, some things are broken. I'm working on it.

- Comments (both line and block comments) may not work as expected.
- Not all language features have been tested, so your mileage may vary.

### How did this project come about?
I was bored. I'm a programmer by profession but I enjoy listening to and writing rap music. This is the collision of those worlds.

### Do you accept pull requests?
I will accept almost any pull request that adds incremental functionality, follows the style of the project, aligns with good coding practices, and does not introduce bugs. Patch away. Please make sure your commit message is less than 129340812408 characters and includes at least one "fire" emoji. 🔥

### Can I expand the language?
Sure, if you can make a case for your expansion. A bunch of new "IGNORED" terminals aren't likely to be accepted unless they add value.

### How hard would it be to implement a new language starting from a SpitScript fork?
Very, very easy. The language's reserved words are all defined at the very top of `parser.js`. You could easily create your own (similarly structured/obfuscated) language by modifying these words. For example, you could make a language that masquerades as sports commentary instead of rap lyrics. There are as many possibilities as there are stereotypical niche vocabularies.

Additionally, with a bit of under-the-hood work in the tokenizer and generator, you could transpile your source text to any number of different target languages.

### Does SpitScript implement a complete set of JavaScript language features?
Not currently. However, it's Turing-complete and covers most use cases.

### What is the target language?
JavaScript per the ES5 spec (as of this writing, the latest version of JavaScript with cross-browser support). ES6 features aren't on the roadmap at all.

## Quick reference
From `parser.js`:

```javascript
'ARRAY': ['lot', 'lotta'],          // [ (array)
'ARRAYEND': ['stuff'],              // ]
'ASSIGNMENT': ['be', 'is'],         // =
'BLOCK': ['then', 'piece'],         // {
'BLOCKEND': ['okay'],               // }
'BLOCKCOMMENT': ['listen'],         // /*
'BLOCKCOMMENTEND': ['right'],       // */
'COMMA': ['and'],                   // ,
'COMPEQ': ['like'],                 // ===
'COMPGREATER': ['more', 'mo'],      // >
'COMPGREATEREQ': ['over'],          // >=
'COMPLESS': ['less'],               // <
'COMPLESSEQ': ['under'],            // <=
'COMPNOT': ['ain\'t', 'isn\'t'],    // !==
'CONDITIONELSE': ['disagree', 'disrespect'],        // else
'CONDITIONIF': ['sayin', 'saying'],                 // if
'DECLARATION': ['big', 'lil', 'those', 'who'],      // var
'DELETION': ['rid', 'ridda'],       // delete
'DELIMIT': ['to'],                  // : (object literal definitions)
'FUNCTION': ['business'],           // function
// Ignored tokens are not parsed:
'IGNORED': ['cool', 'fool', 'got', 'he', 'her', 'hey', 'him', 'his', 'hot', 'i', 'in', 'me', 'my', 'of', 'our', 'say', 'says', 'see', 'she', 'talk', 'talks', 'than', 'that', 'the', 'their', 'they', 'think', 'thinks', 'up', 'us', 'we', 'ya', 'yall', 'yo', 'you', 'your'],
'LINECOMMENT': ['cuz', 'so'],       // // (comment)
'LOGICAND': ['also'],               // &&
'LOGICNOT': ['not'],                // !
'LOGICOR': ['or'],                  // ||
'LOOPFOR': ['rollin', 'rolling'],   // for
'LOOPWHILE': ['always', 'keep'],    // while
'MATHMINUS': ['smaller'],           // -
'MATHPLUS': ['bigger'],             // +
'NEW': ['get', 'make'],             // new
'PAREN': ['this', 'these'],         // (
'PARENEND': ['well'],               // )
'REFINE': ['with'],                 // [ (object property access)
'REFINEEND': ['yeah'],              // ]
'REFINEDOT': ['get', 'gotta'],      // . (object property access)
'RETURN': ['rep', 'represent', 'show'],             // return
'SEMICOLON': ['uh'],                // ;
'THIS': ['crib', 'here'],           // this
'VALNULL': ['nah'],                 // null
'VALONE': ['one'],                  // 1
'VALTWO': ['two'],                  // 2
'VALUNDEFINED': ['unreal'],         // undefined
'VALZERO': ['nothin', 'nothing']    // 0
```

## License
SpitScript by Isaac Lyman is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
