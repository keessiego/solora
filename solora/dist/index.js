var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/prismjs/prism.js
var require_prism = __commonJS({
  "node_modules/prismjs/prism.js"(exports, module) {
    var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
    var Prism3 = (function(_self2) {
      var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
      var uniqueId = 0;
      var plainTextGrammar = {};
      var _ = {
        /**
         * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
         * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
         * additional languages or plugins yourself.
         *
         * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
         *
         * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.manual = true;
         * // add a new <script> to load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        manual: _self2.Prism && _self2.Prism.manual,
        /**
         * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
         * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
         * own worker, you don't want it to do this.
         *
         * By setting this value to `true`, Prism will not add its own listeners to the worker.
         *
         * You obviously have to change this value before Prism executes. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.disableWorkerMessageHandler = true;
         * // Load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
        /**
         * A namespace for utility methods.
         *
         * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
         * change or disappear at any time.
         *
         * @namespace
         * @memberof Prism
         */
        util: {
          encode: function encode(tokens) {
            if (tokens instanceof Token) {
              return new Token(tokens.type, encode(tokens.content), tokens.alias);
            } else if (Array.isArray(tokens)) {
              return tokens.map(encode);
            } else {
              return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
            }
          },
          /**
           * Returns the name of the type of the given value.
           *
           * @param {any} o
           * @returns {string}
           * @example
           * type(null)      === 'Null'
           * type(undefined) === 'Undefined'
           * type(123)       === 'Number'
           * type('foo')     === 'String'
           * type(true)      === 'Boolean'
           * type([1, 2])    === 'Array'
           * type({})        === 'Object'
           * type(String)    === 'Function'
           * type(/abc+/)    === 'RegExp'
           */
          type: function(o) {
            return Object.prototype.toString.call(o).slice(8, -1);
          },
          /**
           * Returns a unique number for the given object. Later calls will still return the same number.
           *
           * @param {Object} obj
           * @returns {number}
           */
          objId: function(obj) {
            if (!obj["__id"]) {
              Object.defineProperty(obj, "__id", { value: ++uniqueId });
            }
            return obj["__id"];
          },
          /**
           * Creates a deep clone of the given object.
           *
           * The main intended use of this function is to clone language definitions.
           *
           * @param {T} o
           * @param {Record<number, any>} [visited]
           * @returns {T}
           * @template T
           */
          clone: function deepClone(o, visited) {
            visited = visited || {};
            var clone;
            var id;
            switch (_.util.type(o)) {
              case "Object":
                id = _.util.objId(o);
                if (visited[id]) {
                  return visited[id];
                }
                clone = /** @type {Record<string, any>} */
                {};
                visited[id] = clone;
                for (var key in o) {
                  if (o.hasOwnProperty(key)) {
                    clone[key] = deepClone(o[key], visited);
                  }
                }
                return (
                  /** @type {any} */
                  clone
                );
              case "Array":
                id = _.util.objId(o);
                if (visited[id]) {
                  return visited[id];
                }
                clone = [];
                visited[id] = clone;
                /** @type {Array} */
                /** @type {any} */
                o.forEach(function(v, i) {
                  clone[i] = deepClone(v, visited);
                });
                return (
                  /** @type {any} */
                  clone
                );
              default:
                return o;
            }
          },
          /**
           * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
           *
           * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
           *
           * @param {Element} element
           * @returns {string}
           */
          getLanguage: function(element) {
            while (element) {
              var m = lang.exec(element.className);
              if (m) {
                return m[1].toLowerCase();
              }
              element = element.parentElement;
            }
            return "none";
          },
          /**
           * Sets the Prism `language-xxxx` class of the given element.
           *
           * @param {Element} element
           * @param {string} language
           * @returns {void}
           */
          setLanguage: function(element, language) {
            element.className = element.className.replace(RegExp(lang, "gi"), "");
            element.classList.add("language-" + language);
          },
          /**
           * Returns the script element that is currently executing.
           *
           * This does __not__ work for line script element.
           *
           * @returns {HTMLScriptElement | null}
           */
          currentScript: function() {
            if (typeof document === "undefined") {
              return null;
            }
            if (document.currentScript && document.currentScript.tagName === "SCRIPT" && 1 < 2) {
              return (
                /** @type {any} */
                document.currentScript
              );
            }
            try {
              throw new Error();
            } catch (err) {
              var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
              if (src) {
                var scripts = document.getElementsByTagName("script");
                for (var i in scripts) {
                  if (scripts[i].src == src) {
                    return scripts[i];
                  }
                }
              }
              return null;
            }
          },
          /**
           * Returns whether a given class is active for `element`.
           *
           * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
           * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
           * given class is just the given class with a `no-` prefix.
           *
           * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
           * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
           * ancestors have the given class or the negated version of it, then the default activation will be returned.
           *
           * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
           * version of it, the class is considered active.
           *
           * @param {Element} element
           * @param {string} className
           * @param {boolean} [defaultActivation=false]
           * @returns {boolean}
           */
          isActive: function(element, className, defaultActivation) {
            var no = "no-" + className;
            while (element) {
              var classList = element.classList;
              if (classList.contains(className)) {
                return true;
              }
              if (classList.contains(no)) {
                return false;
              }
              element = element.parentElement;
            }
            return !!defaultActivation;
          }
        },
        /**
         * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
         *
         * @namespace
         * @memberof Prism
         * @public
         */
        languages: {
          /**
           * The grammar for plain, unformatted text.
           */
          plain: plainTextGrammar,
          plaintext: plainTextGrammar,
          text: plainTextGrammar,
          txt: plainTextGrammar,
          /**
           * Creates a deep copy of the language with the given id and appends the given tokens.
           *
           * If a token in `redef` also appears in the copied language, then the existing token in the copied language
           * will be overwritten at its original position.
           *
           * ## Best practices
           *
           * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
           * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
           * understand the language definition because, normally, the order of tokens matters in Prism grammars.
           *
           * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
           * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
           *
           * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
           * @param {Grammar} redef The new tokens to append.
           * @returns {Grammar} The new language created.
           * @public
           * @example
           * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
           *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
           *     // at its original position
           *     'comment': { ... },
           *     // CSS doesn't have a 'color' token, so this token will be appended
           *     'color': /\b(?:red|green|blue)\b/
           * });
           */
          extend: function(id, redef) {
            var lang2 = _.util.clone(_.languages[id]);
            for (var key in redef) {
              lang2[key] = redef[key];
            }
            return lang2;
          },
          /**
           * Inserts tokens _before_ another token in a language definition or any other grammar.
           *
           * ## Usage
           *
           * This helper method makes it easy to modify existing languages. For example, the CSS language definition
           * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
           * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
           * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
           * this:
           *
           * ```js
           * Prism.languages.markup.style = {
           *     // token
           * };
           * ```
           *
           * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
           * before existing tokens. For the CSS example above, you would use it like this:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'cdata', {
           *     'style': {
           *         // token
           *     }
           * });
           * ```
           *
           * ## Special cases
           *
           * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
           * will be ignored.
           *
           * This behavior can be used to insert tokens after `before`:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'comment', {
           *     'comment': Prism.languages.markup.comment,
           *     // tokens after 'comment'
           * });
           * ```
           *
           * ## Limitations
           *
           * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
           * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
           * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
           * deleting properties which is necessary to insert at arbitrary positions.
           *
           * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
           * Instead, it will create a new object and replace all references to the target object with the new one. This
           * can be done without temporarily deleting properties, so the iteration order is well-defined.
           *
           * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
           * you hold the target object in a variable, then the value of the variable will not change.
           *
           * ```js
           * var oldMarkup = Prism.languages.markup;
           * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
           *
           * assert(oldMarkup !== Prism.languages.markup);
           * assert(newMarkup === Prism.languages.markup);
           * ```
           *
           * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
           * object to be modified.
           * @param {string} before The key to insert before.
           * @param {Grammar} insert An object containing the key-value pairs to be inserted.
           * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
           * object to be modified.
           *
           * Defaults to `Prism.languages`.
           * @returns {Grammar} The new grammar object.
           * @public
           */
          insertBefore: function(inside, before, insert, root) {
            root = root || /** @type {any} */
            _.languages;
            var grammar = root[inside];
            var ret = {};
            for (var token in grammar) {
              if (grammar.hasOwnProperty(token)) {
                if (token == before) {
                  for (var newToken in insert) {
                    if (insert.hasOwnProperty(newToken)) {
                      ret[newToken] = insert[newToken];
                    }
                  }
                }
                if (!insert.hasOwnProperty(token)) {
                  ret[token] = grammar[token];
                }
              }
            }
            var old = root[inside];
            root[inside] = ret;
            _.languages.DFS(_.languages, function(key, value) {
              if (value === old && key != inside) {
                this[key] = ret;
              }
            });
            return ret;
          },
          // Traverse a language definition with Depth First Search
          DFS: function DFS(o, callback, type, visited) {
            visited = visited || {};
            var objId = _.util.objId;
            for (var i in o) {
              if (o.hasOwnProperty(i)) {
                callback.call(o, i, o[i], type || i);
                var property = o[i];
                var propertyType = _.util.type(property);
                if (propertyType === "Object" && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, null, visited);
                } else if (propertyType === "Array" && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, i, visited);
                }
              }
            }
          }
        },
        plugins: {},
        /**
         * This is the most high-level function in Prism’s API.
         * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
         * each one of them.
         *
         * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
         *
         * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
         * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
         * @memberof Prism
         * @public
         */
        highlightAll: function(async, callback) {
          _.highlightAllUnder(document, async, callback);
        },
        /**
         * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
         * {@link Prism.highlightElement} on each one of them.
         *
         * The following hooks will be run:
         * 1. `before-highlightall`
         * 2. `before-all-elements-highlight`
         * 3. All hooks of {@link Prism.highlightElement} for each element.
         *
         * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
         * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
         * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
         * @memberof Prism
         * @public
         */
        highlightAllUnder: function(container, async, callback) {
          var env = {
            callback,
            container,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          _.hooks.run("before-highlightall", env);
          env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
          _.hooks.run("before-all-elements-highlight", env);
          for (var i = 0, element; element = env.elements[i++]; ) {
            _.highlightElement(element, async === true, env.callback);
          }
        },
        /**
         * Highlights the code inside a single element.
         *
         * The following hooks will be run:
         * 1. `before-sanity-check`
         * 2. `before-highlight`
         * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
         * 4. `before-insert`
         * 5. `after-highlight`
         * 6. `complete`
         *
         * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
         * the element's language.
         *
         * @param {Element} element The element containing the code.
         * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
         * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
         * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
         * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
         *
         * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
         * asynchronous highlighting to work. You can build your own bundle on the
         * [Download page](https://prismjs.com/download.html).
         * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
         * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
         * @memberof Prism
         * @public
         */
        highlightElement: function(element, async, callback) {
          var language = _.util.getLanguage(element);
          var grammar = _.languages[language];
          _.util.setLanguage(element, language);
          var parent = element.parentElement;
          if (parent && parent.nodeName.toLowerCase() === "pre") {
            _.util.setLanguage(parent, language);
          }
          var code = element.textContent;
          var env = {
            element,
            language,
            grammar,
            code
          };
          function insertHighlightedCode(highlightedCode) {
            env.highlightedCode = highlightedCode;
            _.hooks.run("before-insert", env);
            env.element.innerHTML = env.highlightedCode;
            _.hooks.run("after-highlight", env);
            _.hooks.run("complete", env);
            callback && callback.call(env.element);
          }
          _.hooks.run("before-sanity-check", env);
          parent = env.element.parentElement;
          if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
            parent.setAttribute("tabindex", "0");
          }
          if (!env.code) {
            _.hooks.run("complete", env);
            callback && callback.call(env.element);
            return;
          }
          _.hooks.run("before-highlight", env);
          if (!env.grammar) {
            insertHighlightedCode(_.util.encode(env.code));
            return;
          }
          if (async && _self2.Worker) {
            var worker = new Worker(_.filename);
            worker.onmessage = function(evt) {
              insertHighlightedCode(evt.data);
            };
            worker.postMessage(JSON.stringify({
              language: env.language,
              code: env.code,
              immediateClose: true
            }));
          } else {
            insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
          }
        },
        /**
         * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
         * and the language definitions to use, and returns a string with the HTML produced.
         *
         * The following hooks will be run:
         * 1. `before-tokenize`
         * 2. `after-tokenize`
         * 3. `wrap`: On each {@link Token}.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @param {string} language The name of the language definition passed to `grammar`.
         * @returns {string} The highlighted HTML.
         * @memberof Prism
         * @public
         * @example
         * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
         */
        highlight: function(text, grammar, language) {
          var env = {
            code: text,
            grammar,
            language
          };
          _.hooks.run("before-tokenize", env);
          if (!env.grammar) {
            throw new Error('The language "' + env.language + '" has no grammar.');
          }
          env.tokens = _.tokenize(env.code, env.grammar);
          _.hooks.run("after-tokenize", env);
          return Token.stringify(_.util.encode(env.tokens), env.language);
        },
        /**
         * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
         * and the language definitions to use, and returns an array with the tokenized code.
         *
         * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
         *
         * This method could be useful in other contexts as well, as a very crude parser.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @returns {TokenStream} An array of strings and tokens, a token stream.
         * @memberof Prism
         * @public
         * @example
         * let code = `var foo = 0;`;
         * let tokens = Prism.tokenize(code, Prism.languages.javascript);
         * tokens.forEach(token => {
         *     if (token instanceof Prism.Token && token.type === 'number') {
         *         console.log(`Found numeric literal: ${token.content}`);
         *     }
         * });
         */
        tokenize: function(text, grammar) {
          var rest = grammar.rest;
          if (rest) {
            for (var token in rest) {
              grammar[token] = rest[token];
            }
            delete grammar.rest;
          }
          var tokenList = new LinkedList();
          addAfter(tokenList, tokenList.head, text);
          matchGrammar(text, tokenList, grammar, tokenList.head, 0);
          return toArray(tokenList);
        },
        /**
         * @namespace
         * @memberof Prism
         * @public
         */
        hooks: {
          all: {},
          /**
           * Adds the given callback to the list of callbacks for the given hook.
           *
           * The callback will be invoked when the hook it is registered for is run.
           * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
           *
           * One callback function can be registered to multiple hooks and the same hook multiple times.
           *
           * @param {string} name The name of the hook.
           * @param {HookCallback} callback The callback function which is given environment variables.
           * @public
           */
          add: function(name, callback) {
            var hooks = _.hooks.all;
            hooks[name] = hooks[name] || [];
            hooks[name].push(callback);
          },
          /**
           * Runs a hook invoking all registered callbacks with the given environment variables.
           *
           * Callbacks will be invoked synchronously and in the order in which they were registered.
           *
           * @param {string} name The name of the hook.
           * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
           * @public
           */
          run: function(name, env) {
            var callbacks = _.hooks.all[name];
            if (!callbacks || !callbacks.length) {
              return;
            }
            for (var i = 0, callback; callback = callbacks[i++]; ) {
              callback(env);
            }
          }
        },
        Token
      };
      _self2.Prism = _;
      function Token(type, content, alias, matchedStr) {
        this.type = type;
        this.content = content;
        this.alias = alias;
        this.length = (matchedStr || "").length | 0;
      }
      Token.stringify = function stringify(o, language) {
        if (typeof o == "string") {
          return o;
        }
        if (Array.isArray(o)) {
          var s = "";
          o.forEach(function(e) {
            s += stringify(e, language);
          });
          return s;
        }
        var env = {
          type: o.type,
          content: stringify(o.content, language),
          tag: "span",
          classes: ["token", o.type],
          attributes: {},
          language
        };
        var aliases = o.alias;
        if (aliases) {
          if (Array.isArray(aliases)) {
            Array.prototype.push.apply(env.classes, aliases);
          } else {
            env.classes.push(aliases);
          }
        }
        _.hooks.run("wrap", env);
        var attributes = "";
        for (var name in env.attributes) {
          attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
        }
        return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
      };
      function matchPattern(pattern, pos, text, lookbehind) {
        pattern.lastIndex = pos;
        var match = pattern.exec(text);
        if (match && lookbehind && match[1]) {
          var lookbehindLength = match[1].length;
          match.index += lookbehindLength;
          match[0] = match[0].slice(lookbehindLength);
        }
        return match;
      }
      function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
        for (var token in grammar) {
          if (!grammar.hasOwnProperty(token) || !grammar[token]) {
            continue;
          }
          var patterns = grammar[token];
          patterns = Array.isArray(patterns) ? patterns : [patterns];
          for (var j = 0; j < patterns.length; ++j) {
            if (rematch && rematch.cause == token + "," + j) {
              return;
            }
            var patternObj = patterns[j];
            var inside = patternObj.inside;
            var lookbehind = !!patternObj.lookbehind;
            var greedy = !!patternObj.greedy;
            var alias = patternObj.alias;
            if (greedy && !patternObj.pattern.global) {
              var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
              patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
            }
            var pattern = patternObj.pattern || patternObj;
            for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
              if (rematch && pos >= rematch.reach) {
                break;
              }
              var str = currentNode.value;
              if (tokenList.length > text.length) {
                return;
              }
              if (str instanceof Token) {
                continue;
              }
              var removeCount = 1;
              var match;
              if (greedy) {
                match = matchPattern(pattern, pos, text, lookbehind);
                if (!match || match.index >= text.length) {
                  break;
                }
                var from = match.index;
                var to = match.index + match[0].length;
                var p = pos;
                p += currentNode.value.length;
                while (from >= p) {
                  currentNode = currentNode.next;
                  p += currentNode.value.length;
                }
                p -= currentNode.value.length;
                pos = p;
                if (currentNode.value instanceof Token) {
                  continue;
                }
                for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
                  removeCount++;
                  p += k.value.length;
                }
                removeCount--;
                str = text.slice(pos, p);
                match.index -= pos;
              } else {
                match = matchPattern(pattern, 0, str, lookbehind);
                if (!match) {
                  continue;
                }
              }
              var from = match.index;
              var matchStr = match[0];
              var before = str.slice(0, from);
              var after = str.slice(from + matchStr.length);
              var reach = pos + str.length;
              if (rematch && reach > rematch.reach) {
                rematch.reach = reach;
              }
              var removeFrom = currentNode.prev;
              if (before) {
                removeFrom = addAfter(tokenList, removeFrom, before);
                pos += before.length;
              }
              removeRange(tokenList, removeFrom, removeCount);
              var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
              currentNode = addAfter(tokenList, removeFrom, wrapped);
              if (after) {
                addAfter(tokenList, currentNode, after);
              }
              if (removeCount > 1) {
                var nestedRematch = {
                  cause: token + "," + j,
                  reach
                };
                matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                if (rematch && nestedRematch.reach > rematch.reach) {
                  rematch.reach = nestedRematch.reach;
                }
              }
            }
          }
        }
      }
      function LinkedList() {
        var head = { value: null, prev: null, next: null };
        var tail = { value: null, prev: head, next: null };
        head.next = tail;
        this.head = head;
        this.tail = tail;
        this.length = 0;
      }
      function addAfter(list, node, value) {
        var next = node.next;
        var newNode = { value, prev: node, next };
        node.next = newNode;
        next.prev = newNode;
        list.length++;
        return newNode;
      }
      function removeRange(list, node, count) {
        var next = node.next;
        for (var i = 0; i < count && next !== list.tail; i++) {
          next = next.next;
        }
        node.next = next;
        next.prev = node;
        list.length -= i;
      }
      function toArray(list) {
        var array = [];
        var node = list.head.next;
        while (node !== list.tail) {
          array.push(node.value);
          node = node.next;
        }
        return array;
      }
      if (!_self2.document) {
        if (!_self2.addEventListener) {
          return _;
        }
        if (!_.disableWorkerMessageHandler) {
          _self2.addEventListener("message", function(evt) {
            var message = JSON.parse(evt.data);
            var lang2 = message.language;
            var code = message.code;
            var immediateClose = message.immediateClose;
            _self2.postMessage(_.highlight(code, _.languages[lang2], lang2));
            if (immediateClose) {
              _self2.close();
            }
          }, false);
        }
        return _;
      }
      var script = _.util.currentScript();
      if (script) {
        _.filename = script.src;
        if (script.hasAttribute("data-manual")) {
          _.manual = true;
        }
      }
      function highlightAutomaticallyCallback() {
        if (!_.manual) {
          _.highlightAll();
        }
      }
      if (!_.manual) {
        var readyState = document.readyState;
        if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
          document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
        } else {
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(highlightAutomaticallyCallback);
          } else {
            window.setTimeout(highlightAutomaticallyCallback, 16);
          }
        }
      }
      return _;
    })(_self);
    if (typeof module !== "undefined" && module.exports) {
      module.exports = Prism3;
    }
    if (typeof global !== "undefined") {
      global.Prism = Prism3;
    }
    Prism3.languages.markup = {
      "comment": {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: true
      },
      "prolog": {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: true
      },
      "doctype": {
        // https://www.w3.org/TR/xml/#NT-doctypedecl
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: true,
        inside: {
          "internal-subset": {
            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
            lookbehind: true,
            greedy: true,
            inside: null
            // see below
          },
          "string": {
            pattern: /"[^"]*"|'[^']*'/,
            greedy: true
          },
          "punctuation": /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/i,
          "name": /[^\s<>'"]+/
        }
      },
      "cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: true
      },
      "tag": {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: true,
        inside: {
          "tag": {
            pattern: /^<\/?[^\s>\/]+/,
            inside: {
              "punctuation": /^<\/?/,
              "namespace": /^[^\s>\/:]+:/
            }
          },
          "special-attr": [],
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              "punctuation": [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                {
                  pattern: /^(\s*)["']|["']$/,
                  lookbehind: true
                }
              ]
            }
          },
          "punctuation": /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: {
              "namespace": /^[^\s>\/:]+:/
            }
          }
        }
      },
      "entity": [
        {
          pattern: /&[\da-z]{1,8};/i,
          alias: "named-entity"
        },
        /&#x?[\da-f]{1,8};/i
      ]
    };
    Prism3.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism3.languages.markup["entity"];
    Prism3.languages.markup["doctype"].inside["internal-subset"].inside = Prism3.languages.markup;
    Prism3.hooks.add("wrap", function(env) {
      if (env.type === "entity") {
        env.attributes["title"] = env.content.replace(/&amp;/, "&");
      }
    });
    Object.defineProperty(Prism3.languages.markup.tag, "addInlined", {
      /**
       * Adds an inlined language to markup.
       *
       * An example of an inlined language is CSS with `<style>` tags.
       *
       * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addInlined('style', 'css');
       */
      value: function addInlined(tagName, lang) {
        var includedCdataInside = {};
        includedCdataInside["language-" + lang] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: true,
          inside: Prism3.languages[lang]
        };
        includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
        var inside = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: includedCdataInside
          }
        };
        inside["language-" + lang] = {
          pattern: /[\s\S]+/,
          inside: Prism3.languages[lang]
        };
        var def = {};
        def[tagName] = {
          pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
            return tagName;
          }), "i"),
          lookbehind: true,
          greedy: true,
          inside
        };
        Prism3.languages.insertBefore("markup", "cdata", def);
      }
    });
    Object.defineProperty(Prism3.languages.markup.tag, "addAttribute", {
      /**
       * Adds an pattern to highlight languages embedded in HTML attributes.
       *
       * An example of an inlined language is CSS with `style` attributes.
       *
       * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addAttribute('style', 'css');
       */
      value: function(attrName, lang) {
        Prism3.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(
            /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
            "i"
          ),
          lookbehind: true,
          inside: {
            "attr-name": /^[^\s=]+/,
            "attr-value": {
              pattern: /=[\s\S]+/,
              inside: {
                "value": {
                  pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                  lookbehind: true,
                  alias: [lang, "language-" + lang],
                  inside: Prism3.languages[lang]
                },
                "punctuation": [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  /"|'/
                ]
              }
            }
          }
        });
      }
    });
    Prism3.languages.html = Prism3.languages.markup;
    Prism3.languages.mathml = Prism3.languages.markup;
    Prism3.languages.svg = Prism3.languages.markup;
    Prism3.languages.xml = Prism3.languages.extend("markup", {});
    Prism3.languages.ssml = Prism3.languages.xml;
    Prism3.languages.atom = Prism3.languages.xml;
    Prism3.languages.rss = Prism3.languages.xml;
    (function(Prism4) {
      var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      Prism4.languages.css = {
        "comment": /\/\*[\s\S]*?\*\//,
        "atrule": {
          pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
          inside: {
            "rule": /^@[\w-]+/,
            "selector-function-argument": {
              pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: true,
              alias: "selector"
            },
            "keyword": {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: true
            }
            // See rest below
          }
        },
        "url": {
          // https://drafts.csswg.org/css-values-3/#urls
          pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
          greedy: true,
          inside: {
            "function": /^url/i,
            "punctuation": /^\(|\)$/,
            "string": {
              pattern: RegExp("^" + string.source + "$"),
              alias: "url"
            }
          }
        },
        "selector": {
          pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
          lookbehind: true
        },
        "string": {
          pattern: string,
          greedy: true
        },
        "property": {
          pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: true
        },
        "important": /!important\b/i,
        "function": {
          pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
          lookbehind: true
        },
        "punctuation": /[(){};:,]/
      };
      Prism4.languages.css["atrule"].inside.rest = Prism4.languages.css;
      var markup = Prism4.languages.markup;
      if (markup) {
        markup.tag.addInlined("style", "css");
        markup.tag.addAttribute("style", "css");
      }
    })(Prism3);
    Prism3.languages.clike = {
      "comment": [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: true,
          greedy: true
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true
        }
      ],
      "string": {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: true,
        inside: {
          "punctuation": /[.\\]/
        }
      },
      "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
      "boolean": /\b(?:false|true)\b/,
      "function": /\b\w+(?=\()/,
      "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      "punctuation": /[{}[\];(),.:]/
    };
    Prism3.languages.javascript = Prism3.languages.extend("clike", {
      "class-name": [
        Prism3.languages.clike["class-name"],
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
          lookbehind: true
        }
      ],
      "keyword": [
        {
          pattern: /((?:^|\})\s*)catch\b/,
          lookbehind: true
        },
        {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: true
        }
      ],
      // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
      "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      "number": {
        pattern: RegExp(
          /(^|[^\w$])/.source + "(?:" + // constant
          (/NaN|Infinity/.source + "|" + // binary integer
          /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
          /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
          /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
          /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
          /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
        ),
        lookbehind: true
      },
      "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    });
    Prism3.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
    Prism3.languages.insertBefore("javascript", "keyword", {
      "regex": {
        pattern: RegExp(
          // lookbehind
          // eslint-disable-next-line regexp/no-dupe-characters-character-class
          /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
          // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
          // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
          // with the only syntax, so we have to define 2 different regex patterns.
          /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
          /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
          /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
        ),
        lookbehind: true,
        greedy: true,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: true,
            alias: "language-regex",
            inside: Prism3.languages.regex
          },
          "regex-delimiter": /^\/|\/$/,
          "regex-flags": /^[a-z]+$/
        }
      },
      // This must be declared before keyword because we use "function" inside the look-forward
      "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
      },
      "parameter": [
        {
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: true,
          inside: Prism3.languages.javascript
        },
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: true,
          inside: Prism3.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: true,
          inside: Prism3.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: true,
          inside: Prism3.languages.javascript
        }
      ],
      "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    });
    Prism3.languages.insertBefore("javascript", "string", {
      "hashbang": {
        pattern: /^#!.*/,
        greedy: true,
        alias: "comment"
      },
      "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: true,
        inside: {
          "template-punctuation": {
            pattern: /^`|`$/,
            alias: "string"
          },
          "interpolation": {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: true,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              },
              rest: Prism3.languages.javascript
            }
          },
          "string": /[\s\S]+/
        }
      },
      "string-property": {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: true,
        greedy: true,
        alias: "property"
      }
    });
    Prism3.languages.insertBefore("javascript", "operator", {
      "literal-property": {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: true,
        alias: "property"
      }
    });
    if (Prism3.languages.markup) {
      Prism3.languages.markup.tag.addInlined("script", "javascript");
      Prism3.languages.markup.tag.addAttribute(
        /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
        "javascript"
      );
    }
    Prism3.languages.js = Prism3.languages.javascript;
    (function() {
      if (typeof Prism3 === "undefined" || typeof document === "undefined") {
        return;
      }
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
      }
      var LOADING_MESSAGE = "Loading\u2026";
      var FAILURE_MESSAGE = function(status, message) {
        return "\u2716 Error " + status + " while fetching file: " + message;
      };
      var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
      var EXTENSIONS = {
        "js": "javascript",
        "py": "python",
        "rb": "ruby",
        "ps1": "powershell",
        "psm1": "powershell",
        "sh": "bash",
        "bat": "batch",
        "h": "c",
        "tex": "latex"
      };
      var STATUS_ATTR = "data-src-status";
      var STATUS_LOADING = "loading";
      var STATUS_LOADED = "loaded";
      var STATUS_FAILED = "failed";
      var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
      function loadFile(src, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", src, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (xhr.status < 400 && xhr.responseText) {
              success(xhr.responseText);
            } else {
              if (xhr.status >= 400) {
                error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
              } else {
                error(FAILURE_EMPTY_MESSAGE);
              }
            }
          }
        };
        xhr.send(null);
      }
      function parseRange(range) {
        var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
        if (m) {
          var start = Number(m[1]);
          var comma = m[2];
          var end = m[3];
          if (!comma) {
            return [start, start];
          }
          if (!end) {
            return [start, void 0];
          }
          return [start, Number(end)];
        }
        return void 0;
      }
      Prism3.hooks.add("before-highlightall", function(env) {
        env.selector += ", " + SELECTOR;
      });
      Prism3.hooks.add("before-sanity-check", function(env) {
        var pre = (
          /** @type {HTMLPreElement} */
          env.element
        );
        if (pre.matches(SELECTOR)) {
          env.code = "";
          pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
          var code = pre.appendChild(document.createElement("CODE"));
          code.textContent = LOADING_MESSAGE;
          var src = pre.getAttribute("data-src");
          var language = env.language;
          if (language === "none") {
            var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
            language = EXTENSIONS[extension] || extension;
          }
          Prism3.util.setLanguage(code, language);
          Prism3.util.setLanguage(pre, language);
          var autoloader = Prism3.plugins.autoloader;
          if (autoloader) {
            autoloader.loadLanguages(language);
          }
          loadFile(
            src,
            function(text) {
              pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
              var range = parseRange(pre.getAttribute("data-range"));
              if (range) {
                var lines = text.split(/\r\n?|\n/g);
                var start = range[0];
                var end = range[1] == null ? lines.length : range[1];
                if (start < 0) {
                  start += lines.length;
                }
                start = Math.max(0, Math.min(start - 1, lines.length));
                if (end < 0) {
                  end += lines.length;
                }
                end = Math.max(0, Math.min(end, lines.length));
                text = lines.slice(start, end).join("\n");
                if (!pre.hasAttribute("data-start")) {
                  pre.setAttribute("data-start", String(start + 1));
                }
              }
              code.textContent = text;
              Prism3.highlightElement(code);
            },
            function(error) {
              pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
              code.textContent = error;
            }
          );
        }
      });
      Prism3.plugins.fileHighlight = {
        /**
         * Executes the File Highlight plugin for all matching `pre` elements under the given container.
         *
         * Note: Elements which are already loaded or currently loading will not be touched by this method.
         *
         * @param {ParentNode} [container=document]
         */
        highlight: function highlight(container) {
          var elements = (container || document).querySelectorAll(SELECTOR);
          for (var i = 0, element; element = elements[i++]; ) {
            Prism3.highlightElement(element);
          }
        }
      };
      var logged = false;
      Prism3.fileHighlight = function() {
        if (!logged) {
          console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
          logged = true;
        }
        Prism3.plugins.fileHighlight.highlight.apply(this, arguments);
      };
    })();
  }
});

// node_modules/prismjs/components.js
var require_components = __commonJS({
  "node_modules/prismjs/components.js"(exports, module) {
    var components = { "core": { "meta": { "path": "components/prism-core.js", "option": "mandatory" }, "core": "Core" }, "themes": { "meta": { "path": "themes/{id}.css", "link": "index.html?theme={id}", "exclusive": true }, "prism": { "title": "Default", "option": "default" }, "prism-dark": "Dark", "prism-funky": "Funky", "prism-okaidia": { "title": "Okaidia", "owner": "ocodia" }, "prism-twilight": { "title": "Twilight", "owner": "remybach" }, "prism-coy": { "title": "Coy", "owner": "tshedor" }, "prism-solarizedlight": { "title": "Solarized Light", "owner": "hectormatos2011 " }, "prism-tomorrow": { "title": "Tomorrow Night", "owner": "Rosey" } }, "languages": { "meta": { "path": "components/prism-{id}", "noCSS": true, "examplesPath": "examples/prism-{id}", "addCheckAll": true }, "markup": { "title": "Markup", "alias": ["html", "xml", "svg", "mathml", "ssml", "atom", "rss"], "aliasTitles": { "html": "HTML", "xml": "XML", "svg": "SVG", "mathml": "MathML", "ssml": "SSML", "atom": "Atom", "rss": "RSS" }, "option": "default" }, "css": { "title": "CSS", "option": "default", "modify": "markup" }, "clike": { "title": "C-like", "option": "default" }, "javascript": { "title": "JavaScript", "require": "clike", "modify": "markup", "optional": "regex", "alias": "js", "option": "default" }, "abap": { "title": "ABAP", "owner": "dellagustin" }, "abnf": { "title": "ABNF", "owner": "RunDevelopment" }, "actionscript": { "title": "ActionScript", "require": "javascript", "modify": "markup", "owner": "Golmote" }, "ada": { "title": "Ada", "owner": "Lucretia" }, "agda": { "title": "Agda", "owner": "xy-ren" }, "al": { "title": "AL", "owner": "RunDevelopment" }, "antlr4": { "title": "ANTLR4", "alias": "g4", "owner": "RunDevelopment" }, "apacheconf": { "title": "Apache Configuration", "owner": "GuiTeK" }, "apex": { "title": "Apex", "require": ["clike", "sql"], "owner": "RunDevelopment" }, "apl": { "title": "APL", "owner": "ngn" }, "applescript": { "title": "AppleScript", "owner": "Golmote" }, "aql": { "title": "AQL", "owner": "RunDevelopment" }, "arduino": { "title": "Arduino", "require": "cpp", "alias": "ino", "owner": "dkern" }, "arff": { "title": "ARFF", "owner": "Golmote" }, "armasm": { "title": "ARM Assembly", "alias": "arm-asm", "owner": "RunDevelopment" }, "arturo": { "title": "Arturo", "alias": "art", "optional": ["bash", "css", "javascript", "markup", "markdown", "sql"], "owner": "drkameleon" }, "asciidoc": { "alias": "adoc", "title": "AsciiDoc", "owner": "Golmote" }, "aspnet": { "title": "ASP.NET (C#)", "require": ["markup", "csharp"], "owner": "nauzilus" }, "asm6502": { "title": "6502 Assembly", "owner": "kzurawel" }, "asmatmel": { "title": "Atmel AVR Assembly", "owner": "cerkit" }, "autohotkey": { "title": "AutoHotkey", "owner": "aviaryan" }, "autoit": { "title": "AutoIt", "owner": "Golmote" }, "avisynth": { "title": "AviSynth", "alias": "avs", "owner": "Zinfidel" }, "avro-idl": { "title": "Avro IDL", "alias": "avdl", "owner": "RunDevelopment" }, "awk": { "title": "AWK", "alias": "gawk", "aliasTitles": { "gawk": "GAWK" }, "owner": "RunDevelopment" }, "bash": { "title": "Bash", "alias": ["sh", "shell"], "aliasTitles": { "sh": "Shell", "shell": "Shell" }, "owner": "zeitgeist87" }, "basic": { "title": "BASIC", "owner": "Golmote" }, "batch": { "title": "Batch", "owner": "Golmote" }, "bbcode": { "title": "BBcode", "alias": "shortcode", "aliasTitles": { "shortcode": "Shortcode" }, "owner": "RunDevelopment" }, "bbj": { "title": "BBj", "owner": "hyyan" }, "bicep": { "title": "Bicep", "owner": "johnnyreilly" }, "birb": { "title": "Birb", "require": "clike", "owner": "Calamity210" }, "bison": { "title": "Bison", "require": "c", "owner": "Golmote" }, "bnf": { "title": "BNF", "alias": "rbnf", "aliasTitles": { "rbnf": "RBNF" }, "owner": "RunDevelopment" }, "bqn": { "title": "BQN", "owner": "yewscion" }, "brainfuck": { "title": "Brainfuck", "owner": "Golmote" }, "brightscript": { "title": "BrightScript", "owner": "RunDevelopment" }, "bro": { "title": "Bro", "owner": "wayward710" }, "bsl": { "title": "BSL (1C:Enterprise)", "alias": "oscript", "aliasTitles": { "oscript": "OneScript" }, "owner": "Diversus23" }, "c": { "title": "C", "require": "clike", "owner": "zeitgeist87" }, "csharp": { "title": "C#", "require": "clike", "alias": ["cs", "dotnet"], "owner": "mvalipour" }, "cpp": { "title": "C++", "require": "c", "owner": "zeitgeist87" }, "cfscript": { "title": "CFScript", "require": "clike", "alias": "cfc", "owner": "mjclemente" }, "chaiscript": { "title": "ChaiScript", "require": ["clike", "cpp"], "owner": "RunDevelopment" }, "cil": { "title": "CIL", "owner": "sbrl" }, "cilkc": { "title": "Cilk/C", "require": "c", "alias": "cilk-c", "owner": "OpenCilk" }, "cilkcpp": { "title": "Cilk/C++", "require": "cpp", "alias": ["cilk-cpp", "cilk"], "owner": "OpenCilk" }, "clojure": { "title": "Clojure", "owner": "troglotit" }, "cmake": { "title": "CMake", "owner": "mjrogozinski" }, "cobol": { "title": "COBOL", "owner": "RunDevelopment" }, "coffeescript": { "title": "CoffeeScript", "require": "javascript", "alias": "coffee", "owner": "R-osey" }, "concurnas": { "title": "Concurnas", "alias": "conc", "owner": "jasontatton" }, "csp": { "title": "Content-Security-Policy", "owner": "ScottHelme" }, "cooklang": { "title": "Cooklang", "owner": "ahue" }, "coq": { "title": "Coq", "owner": "RunDevelopment" }, "crystal": { "title": "Crystal", "require": "ruby", "owner": "MakeNowJust" }, "css-extras": { "title": "CSS Extras", "require": "css", "modify": "css", "owner": "milesj" }, "csv": { "title": "CSV", "owner": "RunDevelopment" }, "cue": { "title": "CUE", "owner": "RunDevelopment" }, "cypher": { "title": "Cypher", "owner": "RunDevelopment" }, "d": { "title": "D", "require": "clike", "owner": "Golmote" }, "dart": { "title": "Dart", "require": "clike", "owner": "Golmote" }, "dataweave": { "title": "DataWeave", "owner": "machaval" }, "dax": { "title": "DAX", "owner": "peterbud" }, "dhall": { "title": "Dhall", "owner": "RunDevelopment" }, "diff": { "title": "Diff", "owner": "uranusjr" }, "django": { "title": "Django/Jinja2", "require": "markup-templating", "alias": "jinja2", "owner": "romanvm" }, "dns-zone-file": { "title": "DNS zone file", "owner": "RunDevelopment", "alias": "dns-zone" }, "docker": { "title": "Docker", "alias": "dockerfile", "owner": "JustinBeckwith" }, "dot": { "title": "DOT (Graphviz)", "alias": "gv", "optional": "markup", "owner": "RunDevelopment" }, "ebnf": { "title": "EBNF", "owner": "RunDevelopment" }, "editorconfig": { "title": "EditorConfig", "owner": "osipxd" }, "eiffel": { "title": "Eiffel", "owner": "Conaclos" }, "ejs": { "title": "EJS", "require": ["javascript", "markup-templating"], "owner": "RunDevelopment", "alias": "eta", "aliasTitles": { "eta": "Eta" } }, "elixir": { "title": "Elixir", "owner": "Golmote" }, "elm": { "title": "Elm", "owner": "zwilias" }, "etlua": { "title": "Embedded Lua templating", "require": ["lua", "markup-templating"], "owner": "RunDevelopment" }, "erb": { "title": "ERB", "require": ["ruby", "markup-templating"], "owner": "Golmote" }, "erlang": { "title": "Erlang", "owner": "Golmote" }, "excel-formula": { "title": "Excel Formula", "alias": ["xlsx", "xls"], "owner": "RunDevelopment" }, "fsharp": { "title": "F#", "require": "clike", "owner": "simonreynolds7" }, "factor": { "title": "Factor", "owner": "catb0t" }, "false": { "title": "False", "owner": "edukisto" }, "firestore-security-rules": { "title": "Firestore security rules", "require": "clike", "owner": "RunDevelopment" }, "flow": { "title": "Flow", "require": "javascript", "owner": "Golmote" }, "fortran": { "title": "Fortran", "owner": "Golmote" }, "ftl": { "title": "FreeMarker Template Language", "require": "markup-templating", "owner": "RunDevelopment" }, "gml": { "title": "GameMaker Language", "alias": "gamemakerlanguage", "require": "clike", "owner": "LiarOnce" }, "gap": { "title": "GAP (CAS)", "owner": "RunDevelopment" }, "gcode": { "title": "G-code", "owner": "RunDevelopment" }, "gdscript": { "title": "GDScript", "owner": "RunDevelopment" }, "gedcom": { "title": "GEDCOM", "owner": "Golmote" }, "gettext": { "title": "gettext", "alias": "po", "owner": "RunDevelopment" }, "gherkin": { "title": "Gherkin", "owner": "hason" }, "git": { "title": "Git", "owner": "lgiraudel" }, "glsl": { "title": "GLSL", "require": "c", "owner": "Golmote" }, "gn": { "title": "GN", "alias": "gni", "owner": "RunDevelopment" }, "linker-script": { "title": "GNU Linker Script", "alias": "ld", "owner": "RunDevelopment" }, "go": { "title": "Go", "require": "clike", "owner": "arnehormann" }, "go-module": { "title": "Go module", "alias": "go-mod", "owner": "RunDevelopment" }, "gradle": { "title": "Gradle", "require": "clike", "owner": "zeabdelkhalek-badido18" }, "graphql": { "title": "GraphQL", "optional": "markdown", "owner": "Golmote" }, "groovy": { "title": "Groovy", "require": "clike", "owner": "robfletcher" }, "haml": { "title": "Haml", "require": "ruby", "optional": ["css", "css-extras", "coffeescript", "erb", "javascript", "less", "markdown", "scss", "textile"], "owner": "Golmote" }, "handlebars": { "title": "Handlebars", "require": "markup-templating", "alias": ["hbs", "mustache"], "aliasTitles": { "mustache": "Mustache" }, "owner": "Golmote" }, "haskell": { "title": "Haskell", "alias": "hs", "owner": "bholst" }, "haxe": { "title": "Haxe", "require": "clike", "optional": "regex", "owner": "Golmote" }, "hcl": { "title": "HCL", "owner": "outsideris" }, "hlsl": { "title": "HLSL", "require": "c", "owner": "RunDevelopment" }, "hoon": { "title": "Hoon", "owner": "matildepark" }, "http": { "title": "HTTP", "optional": ["csp", "css", "hpkp", "hsts", "javascript", "json", "markup", "uri"], "owner": "danielgtaylor" }, "hpkp": { "title": "HTTP Public-Key-Pins", "owner": "ScottHelme" }, "hsts": { "title": "HTTP Strict-Transport-Security", "owner": "ScottHelme" }, "ichigojam": { "title": "IchigoJam", "owner": "BlueCocoa" }, "icon": { "title": "Icon", "owner": "Golmote" }, "icu-message-format": { "title": "ICU Message Format", "owner": "RunDevelopment" }, "idris": { "title": "Idris", "alias": "idr", "owner": "KeenS", "require": "haskell" }, "ignore": { "title": ".ignore", "owner": "osipxd", "alias": ["gitignore", "hgignore", "npmignore"], "aliasTitles": { "gitignore": ".gitignore", "hgignore": ".hgignore", "npmignore": ".npmignore" } }, "inform7": { "title": "Inform 7", "owner": "Golmote" }, "ini": { "title": "Ini", "owner": "aviaryan" }, "io": { "title": "Io", "owner": "AlesTsurko" }, "j": { "title": "J", "owner": "Golmote" }, "java": { "title": "Java", "require": "clike", "owner": "sherblot" }, "javadoc": { "title": "JavaDoc", "require": ["markup", "java", "javadoclike"], "modify": "java", "optional": "scala", "owner": "RunDevelopment" }, "javadoclike": { "title": "JavaDoc-like", "modify": ["java", "javascript", "php"], "owner": "RunDevelopment" }, "javastacktrace": { "title": "Java stack trace", "owner": "RunDevelopment" }, "jexl": { "title": "Jexl", "owner": "czosel" }, "jolie": { "title": "Jolie", "require": "clike", "owner": "thesave" }, "jq": { "title": "JQ", "owner": "RunDevelopment" }, "jsdoc": { "title": "JSDoc", "require": ["javascript", "javadoclike", "typescript"], "modify": "javascript", "optional": ["actionscript", "coffeescript"], "owner": "RunDevelopment" }, "js-extras": { "title": "JS Extras", "require": "javascript", "modify": "javascript", "optional": ["actionscript", "coffeescript", "flow", "n4js", "typescript"], "owner": "RunDevelopment" }, "json": { "title": "JSON", "alias": "webmanifest", "aliasTitles": { "webmanifest": "Web App Manifest" }, "owner": "CupOfTea696" }, "json5": { "title": "JSON5", "require": "json", "owner": "RunDevelopment" }, "jsonp": { "title": "JSONP", "require": "json", "owner": "RunDevelopment" }, "jsstacktrace": { "title": "JS stack trace", "owner": "sbrl" }, "js-templates": { "title": "JS Templates", "require": "javascript", "modify": "javascript", "optional": ["css", "css-extras", "graphql", "markdown", "markup", "sql"], "owner": "RunDevelopment" }, "julia": { "title": "Julia", "owner": "cdagnino" }, "keepalived": { "title": "Keepalived Configure", "owner": "dev-itsheng" }, "keyman": { "title": "Keyman", "owner": "mcdurdin" }, "kotlin": { "title": "Kotlin", "alias": ["kt", "kts"], "aliasTitles": { "kts": "Kotlin Script" }, "require": "clike", "owner": "Golmote" }, "kumir": { "title": "KuMir (\u041A\u0443\u041C\u0438\u0440)", "alias": "kum", "owner": "edukisto" }, "kusto": { "title": "Kusto", "owner": "RunDevelopment" }, "latex": { "title": "LaTeX", "alias": ["tex", "context"], "aliasTitles": { "tex": "TeX", "context": "ConTeXt" }, "owner": "japborst" }, "latte": { "title": "Latte", "require": ["clike", "markup-templating", "php"], "owner": "nette" }, "less": { "title": "Less", "require": "css", "optional": "css-extras", "owner": "Golmote" }, "lilypond": { "title": "LilyPond", "require": "scheme", "alias": "ly", "owner": "RunDevelopment" }, "liquid": { "title": "Liquid", "require": "markup-templating", "owner": "cinhtau" }, "lisp": { "title": "Lisp", "alias": ["emacs", "elisp", "emacs-lisp"], "owner": "JuanCaicedo" }, "livescript": { "title": "LiveScript", "owner": "Golmote" }, "llvm": { "title": "LLVM IR", "owner": "porglezomp" }, "log": { "title": "Log file", "optional": "javastacktrace", "owner": "RunDevelopment" }, "lolcode": { "title": "LOLCODE", "owner": "Golmote" }, "lua": { "title": "Lua", "owner": "Golmote" }, "magma": { "title": "Magma (CAS)", "owner": "RunDevelopment" }, "makefile": { "title": "Makefile", "owner": "Golmote" }, "markdown": { "title": "Markdown", "require": "markup", "optional": "yaml", "alias": "md", "owner": "Golmote" }, "markup-templating": { "title": "Markup templating", "require": "markup", "owner": "Golmote" }, "mata": { "title": "Mata", "owner": "RunDevelopment" }, "matlab": { "title": "MATLAB", "owner": "Golmote" }, "maxscript": { "title": "MAXScript", "owner": "RunDevelopment" }, "mel": { "title": "MEL", "owner": "Golmote" }, "mermaid": { "title": "Mermaid", "owner": "RunDevelopment" }, "metafont": { "title": "METAFONT", "owner": "LaeriExNihilo" }, "mizar": { "title": "Mizar", "owner": "Golmote" }, "mongodb": { "title": "MongoDB", "owner": "airs0urce", "require": "javascript" }, "monkey": { "title": "Monkey", "owner": "Golmote" }, "moonscript": { "title": "MoonScript", "alias": "moon", "owner": "RunDevelopment" }, "n1ql": { "title": "N1QL", "owner": "TMWilds" }, "n4js": { "title": "N4JS", "require": "javascript", "optional": "jsdoc", "alias": "n4jsd", "owner": "bsmith-n4" }, "nand2tetris-hdl": { "title": "Nand To Tetris HDL", "owner": "stephanmax" }, "naniscript": { "title": "Naninovel Script", "owner": "Elringus", "alias": "nani" }, "nasm": { "title": "NASM", "owner": "rbmj" }, "neon": { "title": "NEON", "owner": "nette" }, "nevod": { "title": "Nevod", "owner": "nezaboodka" }, "nginx": { "title": "nginx", "owner": "volado" }, "nim": { "title": "Nim", "owner": "Golmote" }, "nix": { "title": "Nix", "owner": "Golmote" }, "nsis": { "title": "NSIS", "owner": "idleberg" }, "objectivec": { "title": "Objective-C", "require": "c", "alias": "objc", "owner": "uranusjr" }, "ocaml": { "title": "OCaml", "owner": "Golmote" }, "odin": { "title": "Odin", "owner": "edukisto" }, "opencl": { "title": "OpenCL", "require": "c", "modify": ["c", "cpp"], "owner": "Milania1" }, "openqasm": { "title": "OpenQasm", "alias": "qasm", "owner": "RunDevelopment" }, "oz": { "title": "Oz", "owner": "Golmote" }, "parigp": { "title": "PARI/GP", "owner": "Golmote" }, "parser": { "title": "Parser", "require": "markup", "owner": "Golmote" }, "pascal": { "title": "Pascal", "alias": "objectpascal", "aliasTitles": { "objectpascal": "Object Pascal" }, "owner": "Golmote" }, "pascaligo": { "title": "Pascaligo", "owner": "DefinitelyNotAGoat" }, "psl": { "title": "PATROL Scripting Language", "owner": "bertysentry" }, "pcaxis": { "title": "PC-Axis", "alias": "px", "owner": "RunDevelopment" }, "peoplecode": { "title": "PeopleCode", "alias": "pcode", "owner": "RunDevelopment" }, "perl": { "title": "Perl", "owner": "Golmote" }, "php": { "title": "PHP", "require": "markup-templating", "owner": "milesj" }, "phpdoc": { "title": "PHPDoc", "require": ["php", "javadoclike"], "modify": "php", "owner": "RunDevelopment" }, "php-extras": { "title": "PHP Extras", "require": "php", "modify": "php", "owner": "milesj" }, "plant-uml": { "title": "PlantUML", "alias": "plantuml", "owner": "RunDevelopment" }, "plsql": { "title": "PL/SQL", "require": "sql", "owner": "Golmote" }, "powerquery": { "title": "PowerQuery", "alias": ["pq", "mscript"], "owner": "peterbud" }, "powershell": { "title": "PowerShell", "owner": "nauzilus" }, "processing": { "title": "Processing", "require": "clike", "owner": "Golmote" }, "prolog": { "title": "Prolog", "owner": "Golmote" }, "promql": { "title": "PromQL", "owner": "arendjr" }, "properties": { "title": ".properties", "owner": "Golmote" }, "protobuf": { "title": "Protocol Buffers", "require": "clike", "owner": "just-boris" }, "pug": { "title": "Pug", "require": ["markup", "javascript"], "optional": ["coffeescript", "ejs", "handlebars", "less", "livescript", "markdown", "scss", "stylus", "twig"], "owner": "Golmote" }, "puppet": { "title": "Puppet", "owner": "Golmote" }, "pure": { "title": "Pure", "optional": ["c", "cpp", "fortran"], "owner": "Golmote" }, "purebasic": { "title": "PureBasic", "require": "clike", "alias": "pbfasm", "owner": "HeX0R101" }, "purescript": { "title": "PureScript", "require": "haskell", "alias": "purs", "owner": "sriharshachilakapati" }, "python": { "title": "Python", "alias": "py", "owner": "multipetros" }, "qsharp": { "title": "Q#", "require": "clike", "alias": "qs", "owner": "fedonman" }, "q": { "title": "Q (kdb+ database)", "owner": "Golmote" }, "qml": { "title": "QML", "require": "javascript", "owner": "RunDevelopment" }, "qore": { "title": "Qore", "require": "clike", "owner": "temnroegg" }, "r": { "title": "R", "owner": "Golmote" }, "racket": { "title": "Racket", "require": "scheme", "alias": "rkt", "owner": "RunDevelopment" }, "cshtml": { "title": "Razor C#", "alias": "razor", "require": ["markup", "csharp"], "optional": ["css", "css-extras", "javascript", "js-extras"], "owner": "RunDevelopment" }, "jsx": { "title": "React JSX", "require": ["markup", "javascript"], "optional": ["jsdoc", "js-extras", "js-templates"], "owner": "vkbansal" }, "tsx": { "title": "React TSX", "require": ["jsx", "typescript"] }, "reason": { "title": "Reason", "require": "clike", "owner": "Golmote" }, "regex": { "title": "Regex", "owner": "RunDevelopment" }, "rego": { "title": "Rego", "owner": "JordanSh" }, "renpy": { "title": "Ren'py", "alias": "rpy", "owner": "HyuchiaDiego" }, "rescript": { "title": "ReScript", "alias": "res", "owner": "vmarcosp" }, "rest": { "title": "reST (reStructuredText)", "owner": "Golmote" }, "rip": { "title": "Rip", "owner": "ravinggenius" }, "roboconf": { "title": "Roboconf", "owner": "Golmote" }, "robotframework": { "title": "Robot Framework", "alias": "robot", "owner": "RunDevelopment" }, "ruby": { "title": "Ruby", "require": "clike", "alias": "rb", "owner": "samflores" }, "rust": { "title": "Rust", "owner": "Golmote" }, "sas": { "title": "SAS", "optional": ["groovy", "lua", "sql"], "owner": "Golmote" }, "sass": { "title": "Sass (Sass)", "require": "css", "optional": "css-extras", "owner": "Golmote" }, "scss": { "title": "Sass (SCSS)", "require": "css", "optional": "css-extras", "owner": "MoOx" }, "scala": { "title": "Scala", "require": "java", "owner": "jozic" }, "scheme": { "title": "Scheme", "owner": "bacchus123" }, "shell-session": { "title": "Shell session", "require": "bash", "alias": ["sh-session", "shellsession"], "owner": "RunDevelopment" }, "smali": { "title": "Smali", "owner": "RunDevelopment" }, "smalltalk": { "title": "Smalltalk", "owner": "Golmote" }, "smarty": { "title": "Smarty", "require": "markup-templating", "optional": "php", "owner": "Golmote" }, "sml": { "title": "SML", "alias": "smlnj", "aliasTitles": { "smlnj": "SML/NJ" }, "owner": "RunDevelopment" }, "solidity": { "title": "Solidity (Ethereum)", "alias": "sol", "require": "clike", "owner": "glachaud" }, "solution-file": { "title": "Solution file", "alias": "sln", "owner": "RunDevelopment" }, "soy": { "title": "Soy (Closure Template)", "require": "markup-templating", "owner": "Golmote" }, "sparql": { "title": "SPARQL", "require": "turtle", "owner": "Triply-Dev", "alias": "rq" }, "splunk-spl": { "title": "Splunk SPL", "owner": "RunDevelopment" }, "sqf": { "title": "SQF: Status Quo Function (Arma 3)", "require": "clike", "owner": "RunDevelopment" }, "sql": { "title": "SQL", "owner": "multipetros" }, "squirrel": { "title": "Squirrel", "require": "clike", "owner": "RunDevelopment" }, "stan": { "title": "Stan", "owner": "RunDevelopment" }, "stata": { "title": "Stata Ado", "require": ["mata", "java", "python"], "owner": "RunDevelopment" }, "iecst": { "title": "Structured Text (IEC 61131-3)", "owner": "serhioromano" }, "stylus": { "title": "Stylus", "owner": "vkbansal" }, "supercollider": { "title": "SuperCollider", "alias": "sclang", "owner": "RunDevelopment" }, "swift": { "title": "Swift", "owner": "chrischares" }, "systemd": { "title": "Systemd configuration file", "owner": "RunDevelopment" }, "t4-templating": { "title": "T4 templating", "owner": "RunDevelopment" }, "t4-cs": { "title": "T4 Text Templates (C#)", "require": ["t4-templating", "csharp"], "alias": "t4", "owner": "RunDevelopment" }, "t4-vb": { "title": "T4 Text Templates (VB)", "require": ["t4-templating", "vbnet"], "owner": "RunDevelopment" }, "tap": { "title": "TAP", "owner": "isaacs", "require": "yaml" }, "tcl": { "title": "Tcl", "owner": "PeterChaplin" }, "tt2": { "title": "Template Toolkit 2", "require": ["clike", "markup-templating"], "owner": "gflohr" }, "textile": { "title": "Textile", "require": "markup", "optional": "css", "owner": "Golmote" }, "toml": { "title": "TOML", "owner": "RunDevelopment" }, "tremor": { "title": "Tremor", "alias": ["trickle", "troy"], "owner": "darach", "aliasTitles": { "trickle": "trickle", "troy": "troy" } }, "turtle": { "title": "Turtle", "alias": "trig", "aliasTitles": { "trig": "TriG" }, "owner": "jakubklimek" }, "twig": { "title": "Twig", "require": "markup-templating", "owner": "brandonkelly" }, "typescript": { "title": "TypeScript", "require": "javascript", "optional": "js-templates", "alias": "ts", "owner": "vkbansal" }, "typoscript": { "title": "TypoScript", "alias": "tsconfig", "aliasTitles": { "tsconfig": "TSConfig" }, "owner": "dkern" }, "unrealscript": { "title": "UnrealScript", "alias": ["uscript", "uc"], "owner": "RunDevelopment" }, "uorazor": { "title": "UO Razor Script", "owner": "jaseowns" }, "uri": { "title": "URI", "alias": "url", "aliasTitles": { "url": "URL" }, "owner": "RunDevelopment" }, "v": { "title": "V", "require": "clike", "owner": "taggon" }, "vala": { "title": "Vala", "require": "clike", "optional": "regex", "owner": "TemplarVolk" }, "vbnet": { "title": "VB.Net", "require": "basic", "owner": "Bigsby" }, "velocity": { "title": "Velocity", "require": "markup", "owner": "Golmote" }, "verilog": { "title": "Verilog", "owner": "a-rey" }, "vhdl": { "title": "VHDL", "owner": "a-rey" }, "vim": { "title": "vim", "owner": "westonganger" }, "visual-basic": { "title": "Visual Basic", "alias": ["vb", "vba"], "aliasTitles": { "vba": "VBA" }, "owner": "Golmote" }, "warpscript": { "title": "WarpScript", "owner": "RunDevelopment" }, "wasm": { "title": "WebAssembly", "owner": "Golmote" }, "web-idl": { "title": "Web IDL", "alias": "webidl", "owner": "RunDevelopment" }, "wgsl": { "title": "WGSL", "owner": "Dr4gonthree" }, "wiki": { "title": "Wiki markup", "require": "markup", "owner": "Golmote" }, "wolfram": { "title": "Wolfram language", "alias": ["mathematica", "nb", "wl"], "aliasTitles": { "mathematica": "Mathematica", "nb": "Mathematica Notebook" }, "owner": "msollami" }, "wren": { "title": "Wren", "owner": "clsource" }, "xeora": { "title": "Xeora", "require": "markup", "alias": "xeoracube", "aliasTitles": { "xeoracube": "XeoraCube" }, "owner": "freakmaxi" }, "xml-doc": { "title": "XML doc (.net)", "require": "markup", "modify": ["csharp", "fsharp", "vbnet"], "owner": "RunDevelopment" }, "xojo": { "title": "Xojo (REALbasic)", "owner": "Golmote" }, "xquery": { "title": "XQuery", "require": "markup", "owner": "Golmote" }, "yaml": { "title": "YAML", "alias": "yml", "owner": "hason" }, "yang": { "title": "YANG", "owner": "RunDevelopment" }, "zig": { "title": "Zig", "owner": "RunDevelopment" } }, "plugins": { "meta": { "path": "plugins/{id}/prism-{id}", "link": "plugins/{id}/" }, "line-highlight": { "title": "Line Highlight", "description": "Highlights specific lines and/or line ranges." }, "line-numbers": { "title": "Line Numbers", "description": "Line number at the beginning of code lines.", "owner": "kuba-kubula" }, "show-invisibles": { "title": "Show Invisibles", "description": "Show hidden characters such as tabs and line breaks.", "optional": ["autolinker", "data-uri-highlight"] }, "autolinker": { "title": "Autolinker", "description": "Converts URLs and emails in code to clickable links. Parses Markdown links in comments." }, "wpd": { "title": "WebPlatform Docs", "description": 'Makes tokens link to <a href="https://webplatform.github.io/docs/">WebPlatform.org documentation</a>. The links open in a new tab.' }, "custom-class": { "title": "Custom Class", "description": "This plugin allows you to prefix Prism's default classes (<code>.comment</code> can become <code>.namespace--comment</code>) or replace them with your defined ones (like <code>.editor__comment</code>). You can even add new classes.", "owner": "dvkndn", "noCSS": true }, "file-highlight": { "title": "File Highlight", "description": "Fetch external files and highlight them with Prism. Used on the Prism website itself.", "noCSS": true }, "show-language": { "title": "Show Language", "description": "Display the highlighted language in code blocks (inline code does not show the label).", "owner": "nauzilus", "noCSS": true, "require": "toolbar" }, "jsonp-highlight": { "title": "JSONP Highlight", "description": "Fetch content with JSONP and highlight some interesting content (e.g. GitHub/Gists or Bitbucket API).", "noCSS": true, "owner": "nauzilus" }, "highlight-keywords": { "title": "Highlight Keywords", "description": "Adds special CSS classes for each keyword for fine-grained highlighting.", "owner": "vkbansal", "noCSS": true }, "remove-initial-line-feed": { "title": "Remove initial line feed", "description": "Removes the initial line feed in code blocks.", "owner": "Golmote", "noCSS": true }, "inline-color": { "title": "Inline color", "description": "Adds a small inline preview for colors in style sheets.", "require": "css-extras", "owner": "RunDevelopment" }, "previewers": { "title": "Previewers", "description": "Previewers for angles, colors, gradients, easing and time.", "require": "css-extras", "owner": "Golmote" }, "autoloader": { "title": "Autoloader", "description": "Automatically loads the needed languages to highlight the code blocks.", "owner": "Golmote", "noCSS": true }, "keep-markup": { "title": "Keep Markup", "description": "Prevents custom markup from being dropped out during highlighting.", "owner": "Golmote", "optional": "normalize-whitespace", "noCSS": true }, "command-line": { "title": "Command Line", "description": "Display a command line with a prompt and, optionally, the output/response from the commands.", "owner": "chriswells0" }, "unescaped-markup": { "title": "Unescaped Markup", "description": "Write markup without having to escape anything." }, "normalize-whitespace": { "title": "Normalize Whitespace", "description": "Supports multiple operations to normalize whitespace in code blocks.", "owner": "zeitgeist87", "optional": "unescaped-markup", "noCSS": true }, "data-uri-highlight": { "title": "Data-URI Highlight", "description": "Highlights data-URI contents.", "owner": "Golmote", "noCSS": true }, "toolbar": { "title": "Toolbar", "description": "Attach a toolbar for plugins to easily register buttons on the top of a code block.", "owner": "mAAdhaTTah" }, "copy-to-clipboard": { "title": "Copy to Clipboard Button", "description": "Add a button that copies the code block to the clipboard when clicked.", "owner": "mAAdhaTTah", "require": "toolbar", "noCSS": true }, "download-button": { "title": "Download Button", "description": "A button in the toolbar of a code block adding a convenient way to download a code file.", "owner": "Golmote", "require": "toolbar", "noCSS": true }, "match-braces": { "title": "Match braces", "description": "Highlights matching braces.", "owner": "RunDevelopment" }, "diff-highlight": { "title": "Diff Highlight", "description": "Highlights the code inside diff blocks.", "owner": "RunDevelopment", "require": "diff" }, "filter-highlight-all": { "title": "Filter highlightAll", "description": "Filters the elements the <code>highlightAll</code> and <code>highlightAllUnder</code> methods actually highlight.", "owner": "RunDevelopment", "noCSS": true }, "treeview": { "title": "Treeview", "description": "A language with special styles to highlight file system tree structures.", "owner": "Golmote" } } };
    if (typeof module !== "undefined" && module.exports) {
      module.exports = components;
    }
  }
});

// node_modules/prismjs/dependencies.js
var require_dependencies = __commonJS({
  "node_modules/prismjs/dependencies.js"(exports, module) {
    "use strict";
    var getLoader = /* @__PURE__ */ (function() {
      var noop = function() {
      };
      function forEach(value, callbackFn) {
        if (Array.isArray(value)) {
          value.forEach(callbackFn);
        } else if (value != null) {
          callbackFn(value, 0);
        }
      }
      function toSet(array) {
        var set = {};
        for (var i = 0, l = array.length; i < l; i++) {
          set[array[i]] = true;
        }
        return set;
      }
      function createEntryMap(components) {
        var map = {};
        for (var categoryName in components) {
          var category = components[categoryName];
          for (var id in category) {
            if (id != "meta") {
              var entry = category[id];
              map[id] = typeof entry == "string" ? { title: entry } : entry;
            }
          }
        }
        return map;
      }
      function createDependencyResolver(entryMap) {
        var map = {};
        var _stackArray = [];
        function addToMap(id, stack) {
          if (id in map) {
            return;
          }
          stack.push(id);
          var firstIndex = stack.indexOf(id);
          if (firstIndex < stack.length - 1) {
            throw new Error("Circular dependency: " + stack.slice(firstIndex).join(" -> "));
          }
          var dependencies = {};
          var entry = entryMap[id];
          if (entry) {
            let handleDirectDependency = function(depId) {
              if (!(depId in entryMap)) {
                throw new Error(id + " depends on an unknown component " + depId);
              }
              if (depId in dependencies) {
                return;
              }
              addToMap(depId, stack);
              dependencies[depId] = true;
              for (var transitiveDepId in map[depId]) {
                dependencies[transitiveDepId] = true;
              }
            };
            forEach(entry.require, handleDirectDependency);
            forEach(entry.optional, handleDirectDependency);
            forEach(entry.modify, handleDirectDependency);
          }
          map[id] = dependencies;
          stack.pop();
        }
        return function(id) {
          var deps = map[id];
          if (!deps) {
            addToMap(id, _stackArray);
            deps = map[id];
          }
          return deps;
        };
      }
      function createAliasResolver(entryMap) {
        var map;
        return function(idOrAlias) {
          if (idOrAlias in entryMap) {
            return idOrAlias;
          } else {
            if (!map) {
              map = {};
              for (var id in entryMap) {
                var entry = entryMap[id];
                forEach(entry && entry.alias, function(alias) {
                  if (alias in map) {
                    throw new Error(alias + " cannot be alias for both " + id + " and " + map[alias]);
                  }
                  if (alias in entryMap) {
                    throw new Error(alias + " cannot be alias of " + id + " because it is a component.");
                  }
                  map[alias] = id;
                });
              }
            }
            return map[idOrAlias] || idOrAlias;
          }
        };
      }
      function loadComponentsInOrder(dependencyResolver, ids, loadComponent, chainer) {
        var series = chainer ? chainer.series : void 0;
        var parallel = chainer ? chainer.parallel : noop;
        var cache = {};
        var ends = {};
        function handleId(id2) {
          if (id2 in cache) {
            return cache[id2];
          }
          ends[id2] = true;
          var dependsOn = [];
          for (var depId in dependencyResolver(id2)) {
            if (depId in ids) {
              dependsOn.push(depId);
            }
          }
          var value;
          if (dependsOn.length === 0) {
            value = loadComponent(id2);
          } else {
            var depsValue = parallel(dependsOn.map(function(depId2) {
              var value2 = handleId(depId2);
              delete ends[depId2];
              return value2;
            }));
            if (series) {
              value = series(depsValue, function() {
                return loadComponent(id2);
              });
            } else {
              loadComponent(id2);
            }
          }
          return cache[id2] = value;
        }
        for (var id in ids) {
          handleId(id);
        }
        var endValues = [];
        for (var endId in ends) {
          endValues.push(cache[endId]);
        }
        return parallel(endValues);
      }
      function hasKeys(obj) {
        for (var key in obj) {
          return true;
        }
        return false;
      }
      function getLoader2(components, load, loaded) {
        var entryMap = createEntryMap(components);
        var resolveAlias = createAliasResolver(entryMap);
        load = load.map(resolveAlias);
        loaded = (loaded || []).map(resolveAlias);
        var loadSet = toSet(load);
        var loadedSet = toSet(loaded);
        load.forEach(addRequirements);
        function addRequirements(id) {
          var entry2 = entryMap[id];
          forEach(entry2 && entry2.require, function(reqId) {
            if (!(reqId in loadedSet)) {
              loadSet[reqId] = true;
              addRequirements(reqId);
            }
          });
        }
        var dependencyResolver = createDependencyResolver(entryMap);
        var loadAdditions = loadSet;
        var newIds;
        while (hasKeys(loadAdditions)) {
          newIds = {};
          for (var loadId in loadAdditions) {
            var entry = entryMap[loadId];
            forEach(entry && entry.modify, function(modId) {
              if (modId in loadedSet) {
                newIds[modId] = true;
              }
            });
          }
          for (var loadedId in loadedSet) {
            if (!(loadedId in loadSet)) {
              for (var depId in dependencyResolver(loadedId)) {
                if (depId in loadSet) {
                  newIds[loadedId] = true;
                  break;
                }
              }
            }
          }
          loadAdditions = newIds;
          for (var newId in loadAdditions) {
            loadSet[newId] = true;
          }
        }
        var loader = {
          getIds: function() {
            var ids = [];
            loader.load(function(id) {
              ids.push(id);
            });
            return ids;
          },
          load: function(loadComponent, chainer) {
            return loadComponentsInOrder(dependencyResolver, loadSet, loadComponent, chainer);
          }
        };
        return loader;
      }
      return getLoader2;
    })();
    if (typeof module !== "undefined") {
      module.exports = getLoader;
    }
  }
});

// node_modules/prismjs/components/index.js
var require_components2 = __commonJS({
  "node_modules/prismjs/components/index.js"(exports, module) {
    var components = require_components();
    var getLoader = require_dependencies();
    var loadedLanguages = /* @__PURE__ */ new Set();
    function loadLanguages(languages) {
      if (languages === void 0) {
        languages = Object.keys(components.languages).filter((l) => l != "meta");
      } else if (!Array.isArray(languages)) {
        languages = [languages];
      }
      const loaded = [...loadedLanguages, ...Object.keys(Prism.languages)];
      getLoader(components, languages, loaded).load((lang) => {
        if (!(lang in components.languages)) {
          if (!loadLanguages.silent) {
            console.warn("Language does not exist: " + lang);
          }
          return;
        }
        const pathToLanguage = "./prism-" + lang;
        delete __require.cache[__require.resolve(pathToLanguage)];
        delete Prism.languages[lang];
        __require(pathToLanguage);
        loadedLanguages.add(lang);
      });
    }
    loadLanguages.silent = false;
    module.exports = loadLanguages;
  }
});

// src/components/button.js
var SolButton = class extends HTMLElement {
  constructor() {
    super();
    this.button = document.createElement("button");
    this._observer = null;
  }
  connectedCallback() {
    if (!this.contains(this.button)) {
      this.appendChild(this.button);
    }
    this.syncChildren();
    this.updateAttributes();
    this.setupMutationObserver();
    if (this.hasAttribute("autofocus")) {
      requestAnimationFrame(() => {
        this.button.focus();
      });
    }
  }
  disconnectedCallback() {
    if (this._observer) {
      this._observer.disconnect();
    }
  }
  setupMutationObserver() {
    this._observer = new MutationObserver((mutations) => {
      let shouldSync = false;
      mutations.forEach((mutation) => {
        Array.from(mutation.addedNodes).forEach((node) => {
          if (node !== this.button) {
            shouldSync = true;
          }
        });
      });
      if (shouldSync) {
        this.syncChildren();
      }
    });
    this._observer.observe(this, { childList: true });
  }
  syncChildren() {
    if (this._observer) this._observer.disconnect();
    const nodesToMove = Array.from(this.childNodes).filter((node) => node !== this.button);
    if (!this.contains(this.button)) {
      this.appendChild(this.button);
    }
    this.button.innerHTML = "";
    nodesToMove.forEach((node) => {
      this.button.appendChild(node);
    });
    if (this._observer) {
      this._observer.observe(this, { childList: true });
    }
  }
  static get observedAttributes() {
    return ["disabled", "type", "variant", "size", "rounded", "autofocus", "bg"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (this.contains(this.button)) {
      this.updateAttributes();
    }
  }
  updateAttributes() {
    if (this.hasAttribute("disabled")) {
      this.button.setAttribute("disabled", "disabled");
    } else {
      this.button.removeAttribute("disabled");
    }
    if (this.hasAttribute("autofocus")) {
      this.button.setAttribute("autofocus", "autofocus");
    } else {
      this.button.removeAttribute("autofocus");
    }
    if (this.hasAttribute("type")) {
      this.button.setAttribute("type", this.getAttribute("type"));
    } else {
      this.button.setAttribute("type", "button");
    }
    const variant = this.getAttribute("variant") || this.getAttribute("color") || "primary";
    this.button.className = `btn btn-${variant}`;
    const bg = this.getAttribute("bg");
    if (bg) {
      this.button.classList.add("has-custom-bg");
      if (bg === "primary") {
        this.button.style.backgroundColor = "var(--color-primary, #0071e3)";
        this.button.style.color = "var(--color-text-light, #fff)";
      } else if (bg === "secondary") {
        this.button.style.backgroundColor = "var(--color-secondary, #f5f5f5)";
        this.button.style.color = "var(--color-text-dark, #000)";
      } else if (bg === "success") {
        this.button.style.backgroundColor = "var(--color-success, #28a745)";
        this.button.style.color = "var(--color-text-light, #fff)";
      } else if (bg === "warning") {
        this.button.style.backgroundColor = "var(--color-warning, #ffc107)";
        this.button.style.color = "var(--color-text-dark, #000)";
      } else if (bg === "danger") {
        this.button.style.backgroundColor = "var(--color-danger, #dc3545)";
        this.button.style.color = "var(--color-text-light, #fff)";
      } else {
        this.button.style.backgroundColor = bg;
      }
    } else {
      this.button.classList.remove("has-custom-bg");
      this.button.style.backgroundColor = "";
      this.button.style.color = "";
    }
    const size = this.getAttribute("size");
    if (size) {
      this.button.classList.add(`btn-${size}`);
    }
    if (this.hasAttribute("rounded")) {
      this.button.classList.add("btn-rounded");
    } else {
      this.button.classList.remove("btn-rounded");
    }
  }
};
function initButton() {
  if (!customElements.get("sol-button")) {
    customElements.define("sol-button", SolButton);
  }
}

// src/components/input.js
var SolInput = class extends HTMLElement {
  constructor() {
    super();
    this.initialized = false;
  }
  // Luister naar wijzigingen in deze attributen om live updates te ondersteunen
  static get observedAttributes() {
    return ["type", "placeholder", "value", "label", "disabled", "required", "autofocus", "min", "max", "name", "variant", "icon", "icon-pos", "multiple", "accept", "icon-bg", "toggle-password"];
  }
  connectedCallback() {
    if (this.initialized) return;
    this.initialized = true;
    this.labelEl = document.createElement("label");
    this.labelEl.className = "sol-label";
    this.containerEl = document.createElement("div");
    this.containerEl.className = "sol-input-container";
    this.wrapperEl = document.createElement("div");
    this.wrapperEl.className = "sol-input-wrapper";
    this.inputEl = document.createElement("input");
    this.inputEl.className = "sol-input";
    this.iconEl = document.createElement("sol-icon");
    this.iconEl.setAttribute("size", "18");
    this.iconEl.className = "sol-input-icon";
    this.toggleEl = document.createElement("button");
    this.toggleEl.type = "button";
    this.toggleEl.className = "sol-password-toggle";
    this.toggleEl.innerHTML = '<sol-icon name="eye" size="18"></sol-icon>';
    this.toggleEl.style.display = "none";
    this.toggleEl.onclick = () => this.togglePasswordVisibility();
    this.errorEl = document.createElement("span");
    this.errorEl.className = "sol-error-message";
    this.appendChild(this.labelEl);
    this.appendChild(this.containerEl);
    this.containerEl.appendChild(this.wrapperEl);
    this.wrapperEl.appendChild(this.inputEl);
    this.wrapperEl.appendChild(this.toggleEl);
    this.appendChild(this.errorEl);
    this.updateAttributes();
    this.bindEvents();
    if (this.hasAttribute("autofocus")) {
      requestAnimationFrame(() => {
        this.inputEl.focus();
      });
    }
  }
  togglePasswordVisibility() {
    if (this.inputEl.type === "password") {
      this.inputEl.type = "text";
      this.toggleEl.innerHTML = '<sol-icon name="eye-off" size="18"></sol-icon>';
    } else {
      this.inputEl.type = "password";
      this.toggleEl.innerHTML = '<sol-icon name="eye" size="18"></sol-icon>';
    }
  }
  attributeChangedCallback() {
    if (this.initialized) {
      this.updateAttributes();
    }
  }
  updateAttributes() {
    const props = ["type", "placeholder", "value", "name", "min", "max", "accept"];
    props.forEach((prop) => {
      if (this.hasAttribute(prop)) {
        this.inputEl.setAttribute(prop, this.getAttribute(prop));
      } else {
        this.inputEl.removeAttribute(prop);
      }
    });
    if (this.hasAttribute("toggle-password") && this.getAttribute("type") === "password") {
      this.toggleEl.style.display = "flex";
    } else {
      this.toggleEl.style.display = "none";
    }
    const variant = this.getAttribute("variant") || "default";
    this.dataset.variant = variant;
    const iconName = this.getAttribute("icon");
    const iconPos = this.getAttribute("icon-pos") || "start";
    const iconBg = this.getAttribute("icon-bg");
    if (iconName) {
      this.iconEl.setAttribute("name", iconName);
      this.dataset.iconPos = iconPos;
      if (iconBg) {
        this.dataset.iconBg = iconBg;
      } else {
        delete this.dataset.iconBg;
      }
      if (iconPos === "start") {
        this.wrapperEl.prepend(this.iconEl);
      } else if (iconPos === "end") {
        this.wrapperEl.appendChild(this.iconEl);
      } else if (iconPos === "start-outside") {
        this.containerEl.prepend(this.iconEl);
      } else if (iconPos === "end-outside") {
        this.containerEl.appendChild(this.iconEl);
      }
      this.iconEl.style.display = "inline-flex";
    } else {
      this.iconEl.style.display = "none";
      delete this.dataset.iconPos;
      delete this.dataset.iconBg;
    }
    if (this.getAttribute("type") === "file") {
      this.classList.add("is-file-input");
    } else {
      this.classList.remove("is-file-input");
    }
    if (this.hasAttribute("disabled")) this.inputEl.setAttribute("disabled", "disabled");
    else this.inputEl.removeAttribute("disabled");
    if (this.hasAttribute("required")) this.inputEl.setAttribute("required", "required");
    else this.inputEl.removeAttribute("required");
    if (this.hasAttribute("autofocus")) this.inputEl.setAttribute("autofocus", "autofocus");
    else this.inputEl.removeAttribute("autofocus");
    if (this.hasAttribute("multiple")) this.inputEl.setAttribute("multiple", "multiple");
    else this.inputEl.removeAttribute("multiple");
    if (this.hasAttribute("label")) {
      this.labelEl.textContent = this.getAttribute("label");
      this.labelEl.style.display = "block";
    } else {
      this.labelEl.style.display = "none";
    }
  }
  bindEvents() {
    this.inputEl.addEventListener("input", (e) => {
      if (this.getAttribute("type") === "tel") {
        this.inputEl.value = this.inputEl.value.replace(/[^0-9\s\+\-]/g, "");
      }
      if (this.inputEl.value !== this.getAttribute("value")) {
        this.setAttribute("value", this.inputEl.value);
      }
      if (this.inputEl.validity.valid) {
        this.hideError();
        this.inputEl.setCustomValidity("");
      }
      this.dispatchEvent(new Event("input", { bubbles: true }));
    });
    this.inputEl.addEventListener("change", () => {
      if (this.getAttribute("type") === "file" && this.hasAttribute("max")) {
        const max = parseInt(this.getAttribute("max"));
        if (this.inputEl.files.length > max) {
          const msg = `Maximaal ${max} bestanden toegestaan`;
          this.showError(msg);
          this.inputEl.setCustomValidity(msg);
          return;
        } else {
          this.hideError();
          this.inputEl.setCustomValidity("");
        }
      }
      this.dispatchEvent(new Event("change", { bubbles: true }));
    });
    this.inputEl.addEventListener("invalid", (e) => {
      e.preventDefault();
      this.showError();
    });
  }
  showError(customMessage) {
    let message = customMessage || "Ongeldige invoer";
    if (!customMessage) {
      if (this.inputEl.validity.valueMissing) {
        message = "Dit veld is verplicht";
      } else if (this.inputEl.validity.typeMismatch) {
        if (this.inputEl.type === "email") message = "Voer een geldig e-mailadres in";
        if (this.inputEl.type === "url") message = "Voer een geldige link in";
      } else if (this.inputEl.validity.rangeUnderflow) {
        message = `Minimum is ${this.inputEl.min}`;
      } else if (this.inputEl.validity.rangeOverflow) {
        message = `Maximum is ${this.inputEl.max}`;
      }
    }
    this.errorEl.textContent = message;
    this.errorEl.style.display = "block";
    this.inputEl.classList.add("is-invalid");
  }
  hideError() {
    this.errorEl.style.display = "none";
    this.inputEl.classList.remove("is-invalid");
  }
  // Maakt het mogelijk om de input in JS makkelijk aan te passen: myInput.value = "Test";
  get value() {
    return this.inputEl ? this.inputEl.value : this.getAttribute("value");
  }
  set value(val) {
    this.setAttribute("value", val);
    if (this.inputEl) this.inputEl.value = val;
  }
};
function initInput() {
  if (!customElements.get("sol-input")) {
    customElements.define("sol-input", SolInput);
  }
}

// src/components/textarea.js
var SolTextarea = class extends HTMLElement {
  constructor() {
    super();
    this.initialized = false;
  }
  static get observedAttributes() {
    return ["placeholder", "value", "label", "disabled", "required", "autofocus", "name", "variant", "rows", "cols", "resize"];
  }
  connectedCallback() {
    if (this.initialized) return;
    this.initialized = true;
    this.labelEl = document.createElement("label");
    this.labelEl.className = "sol-label";
    this.containerEl = document.createElement("div");
    this.containerEl.className = "sol-input-container sol-textarea-container";
    this.wrapperEl = document.createElement("div");
    this.wrapperEl.className = "sol-input-wrapper sol-textarea-wrapper";
    this.inputEl = document.createElement("textarea");
    this.inputEl.className = "sol-input sol-textarea";
    this.errorEl = document.createElement("span");
    this.errorEl.className = "sol-error-message";
    this.appendChild(this.labelEl);
    this.appendChild(this.containerEl);
    this.containerEl.appendChild(this.wrapperEl);
    this.wrapperEl.appendChild(this.inputEl);
    this.appendChild(this.errorEl);
    this.updateAttributes();
    this.bindEvents();
    if (this.hasAttribute("autofocus")) {
      requestAnimationFrame(() => {
        this.inputEl.focus();
      });
    }
  }
  attributeChangedCallback() {
    if (this.initialized) {
      this.updateAttributes();
    }
  }
  updateAttributes() {
    const props = ["placeholder", "value", "name", "rows", "cols"];
    props.forEach((prop) => {
      if (this.hasAttribute(prop)) {
        this.inputEl.setAttribute(prop, this.getAttribute(prop));
      } else {
        this.inputEl.removeAttribute(prop);
      }
    });
    if (!this.hasAttribute("value") && this.textContent.trim().length > 0) {
      this.inputEl.value = this.textContent.trim();
    } else if (this.hasAttribute("value")) {
      this.inputEl.value = this.getAttribute("value");
    }
    const variant = this.getAttribute("variant") || "default";
    this.dataset.variant = variant;
    const resize = this.getAttribute("resize") || "vertical";
    this.inputEl.style.resize = resize;
    if (this.hasAttribute("disabled")) this.inputEl.setAttribute("disabled", "disabled");
    else this.inputEl.removeAttribute("disabled");
    if (this.hasAttribute("required")) this.inputEl.setAttribute("required", "required");
    else this.inputEl.removeAttribute("required");
    if (this.hasAttribute("autofocus")) this.inputEl.setAttribute("autofocus", "autofocus");
    else this.inputEl.removeAttribute("autofocus");
    if (this.hasAttribute("label")) {
      this.labelEl.textContent = this.getAttribute("label");
      this.labelEl.style.display = "block";
    } else {
      this.labelEl.style.display = "none";
    }
  }
  bindEvents() {
    this.inputEl.addEventListener("input", (e) => {
      if (this.inputEl.value !== this.getAttribute("value")) {
        this.setAttribute("value", this.inputEl.value);
      }
      if (this.inputEl.validity.valid) {
        this.hideError();
        this.inputEl.setCustomValidity("");
      }
      this.dispatchEvent(new Event("input", { bubbles: true }));
    });
    this.inputEl.addEventListener("change", () => {
      this.dispatchEvent(new Event("change", { bubbles: true }));
    });
    this.inputEl.addEventListener("invalid", (e) => {
      e.preventDefault();
      this.showError();
    });
  }
  showError(customMessage) {
    let message = customMessage || "Ongeldige invoer";
    if (!customMessage && this.inputEl.validity.valueMissing) {
      message = "Dit veld is verplicht";
    }
    this.errorEl.textContent = message;
    this.errorEl.style.display = "block";
    this.inputEl.classList.add("is-invalid");
  }
  hideError() {
    this.errorEl.style.display = "none";
    this.inputEl.classList.remove("is-invalid");
  }
  get value() {
    return this.inputEl ? this.inputEl.value : this.getAttribute("value");
  }
  set value(val) {
    this.setAttribute("value", val);
    if (this.inputEl) this.inputEl.value = val;
  }
};
function initTextarea() {
  if (!customElements.get("sol-textarea")) {
    customElements.define("sol-textarea", SolTextarea);
  }
}

// src/components/codeblock.js
var import_prismjs = __toESM(require_prism());
var import_components = __toESM(require_components2());
var SolCodeblock = class extends HTMLElement {
  constructor() {
    super();
    this.initialized = false;
  }
  connectedCallback() {
    if (this.initialized) return;
    this.initialized = true;
    let rawCode = this.innerHTML.replace(/^\s*\n/, "").replace(/\n\s*$/, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    const lang = (this.getAttribute("language") || this.getAttribute("lang") || "javascript").toLowerCase();
    const label = this.getAttribute("label") || "";
    this.innerHTML = `
            <div class="pre-top">
                <div class="pre-top-btns">
                    <span class="pre-btn-red close-btn" title="Sluiten"></span>
                    <span class="pre-btn-orange minimize-btn" title="Minimaliseren"></span>
                    <span class="pre-btn-green maximize-btn" title="Volledig scherm"></span>
                </div>
                ${label ? `<div class="pre-label">${label}</div>` : ""}
            </div>
            <div class="pre-content">
                <button class="pre-copy-btn btn-in-pre" title="Kopi\xEBren">Kopieer</button>
                <pre><code class="language-${lang}"></code></pre>
            </div>
        `;
    this.preContent = this.querySelector(".pre-content");
    this.codeElement = this.querySelector("code");
    this.copyBtn = this.querySelector(".pre-copy-btn");
    this.closeBtn = this.querySelector(".close-btn");
    this.minimizeBtn = this.querySelector(".minimize-btn");
    this.maximizeBtn = this.querySelector(".maximize-btn");
    if (!import_prismjs.default.languages[lang]) {
      console.warn(`Language '${lang}' not loaded in Prism, using plaintext fallback.`);
      this.codeElement.textContent = rawCode;
    } else {
      this.codeElement.innerHTML = import_prismjs.default.highlight(rawCode, import_prismjs.default.languages[lang], lang);
    }
    this._rawCode = rawCode;
    this.bindEvents();
    this.checkSavedState();
  }
  setCode(newCode) {
    this._currentCode = newCode;
    const lang = (this.getAttribute("language") || this.getAttribute("lang") || "javascript").toLowerCase();
    if (this.codeElement) {
      if (!import_prismjs.default.languages[lang]) {
        this.codeElement.textContent = newCode;
      } else {
        this.codeElement.innerHTML = import_prismjs.default.highlight(newCode, import_prismjs.default.languages[lang], lang);
      }
    }
    this._rawCode = newCode;
  }
  checkSavedState() {
    const savedState = sessionStorage.getItem(this.storageKey);
    if (savedState) {
      this.dataset.origRect = savedState;
      this.dataset.isFullscreen = "true";
      Object.assign(this.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        margin: "0",
        borderRadius: "0",
        zIndex: "9999"
      });
    }
  }
  bindEvents() {
    this.copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(this._rawCode);
        const oldText = this.copyBtn.innerText;
        this.copyBtn.innerText = "Gekopieerd!";
        setTimeout(() => this.copyBtn.innerText = oldText, 1200);
      } catch (err) {
        console.error("Copy failed:", err);
      }
    });
    this.closeBtn.addEventListener("click", () => {
      this.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      this.style.opacity = "0";
      this.style.transform = "scale(0.95)";
      setTimeout(() => this.remove(), 300);
    });
    this.minimizeBtn.addEventListener("click", () => {
      this.preContent.classList.toggle("collapsed");
    });
    this.maximizeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this.dataset.isFullscreen !== "true") {
        const rect = this.getBoundingClientRect();
        this.dataset.origRect = JSON.stringify({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        });
        Object.assign(this.style, {
          position: "fixed",
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          margin: "0",
          zIndex: "9999",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        });
        void this.offsetWidth;
        Object.assign(this.style, { top: "0", left: "0", width: "100vw", height: "100vh", borderRadius: "0" });
        this.dataset.isFullscreen = "true";
      } else {
        const origRect = JSON.parse(this.dataset.origRect);
        Object.assign(this.style, {
          top: `${origRect.top - window.scrollY}px`,
          left: `${origRect.left - window.scrollX}px`,
          width: `${origRect.width}px`,
          height: `${origRect.height}px`,
          borderRadius: "12px"
        });
        this.addEventListener("transitionend", () => {
          Object.assign(this.style, { position: "", top: "", left: "", width: "", height: "", zIndex: "", transition: "", margin: "", borderRadius: "" });
          this.dataset.isFullscreen = "false";
        }, { once: true });
      }
    });
  }
};
function initCodeblocks() {
  if (!customElements.get("sol-codeblock")) {
    customElements.define("sol-codeblock", SolCodeblock);
  }
  if (!customElements.get("sol-code")) {
    customElements.define("sol-code", class extends SolCodeblock {
    });
  }
}

// src/utils/positioning.js
function calculatePosition(trigger, content, pos = "bottom-left", offset = 8) {
  const triggerRect = trigger.getBoundingClientRect();
  const contentWidth = content.offsetWidth;
  const contentHeight = content.offsetHeight;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  let top = 0;
  let left = 0;
  let [y, x] = pos.split("-");
  if (!x) {
    if (y === "top" || y === "bottom") x = "center";
    else {
      x = y;
      y = "center";
    }
  }
  switch (y) {
    case "top":
      top = triggerRect.top - contentHeight - offset;
      break;
    case "bottom":
      top = triggerRect.bottom + offset;
      break;
    case "center":
      top = triggerRect.top + triggerRect.height / 2 - contentHeight / 2;
      break;
  }
  switch (x) {
    case "left":
      left = triggerRect.left;
      if (y === "center") left = triggerRect.left - contentWidth - offset;
      break;
    case "right":
      left = triggerRect.right - contentWidth;
      if (y === "center") left = triggerRect.right + offset;
      break;
    case "center":
      left = triggerRect.left + triggerRect.width / 2 - contentWidth / 2;
      break;
  }
  if (left < 5) left = 5;
  if (left + contentWidth > viewportWidth - 5) left = viewportWidth - contentWidth - 5;
  if (top < 5) {
    if (y === "top") top = triggerRect.bottom + offset;
    else top = 5;
  }
  if (top + contentHeight > viewportHeight - 5) {
    if (y === "bottom") top = triggerRect.top - contentHeight - offset;
    else top = viewportHeight - contentHeight - 5;
  }
  return { top, left };
}

// src/components/dropdown.js
var SolDropdown = class extends HTMLElement {
  constructor() {
    super();
    this.initialized = false;
    this._handleOutsideClick = this.handleOutsideClick.bind(this);
    this._updatePosition = this.updatePosition.bind(this);
  }
  connectedCallback() {
    if (this.initialized) return;
    this.initialized = true;
    const fragment = document.createDocumentFragment();
    while (this.childNodes.length > 0) {
      fragment.appendChild(this.childNodes[0]);
    }
    const variant = this.getAttribute("variant") || "default";
    this.btn = document.createElement("div");
    this.btn.className = `dropdown-btn variant-${variant}`;
    this.btn.setAttribute("tabindex", "0");
    this.btn.setAttribute("role", "combobox");
    this.btn.setAttribute("aria-haspopup", "listbox");
    this.content = document.createElement("div");
    this.content.className = `dropdown-content variant-${variant}`;
    this.content.appendChild(fragment);
    this.hiddenInput = document.createElement("input");
    this.hiddenInput.type = "hidden";
    this.hiddenInput.name = this.getAttribute("name") || "dropdown";
    this.errorEl = document.createElement("div");
    this.errorEl.className = "sol-error-message sol-dropdown-error";
    this.errorEl.style.display = "none";
    this.appendChild(this.btn);
    this.appendChild(this.hiddenInput);
    this.appendChild(this.errorEl);
    this.placeholder = this.getAttribute("placeholder") || null;
    this.bindEvents();
    this.initSelection();
  }
  disconnectedCallback() {
    if (this.content && this.content.parentElement) {
      this.content.parentElement.removeChild(this.content);
    }
    document.removeEventListener("click", this._handleOutsideClick);
    window.removeEventListener("scroll", this._updatePosition, true);
    window.removeEventListener("resize", this._updatePosition);
  }
  showError(message = "Ongeldige invoer") {
    this.btn.classList.add("is-invalid");
    this.errorEl.textContent = message;
    this.errorEl.style.display = "block";
  }
  hideError() {
    this.btn.classList.remove("is-invalid");
    this.errorEl.style.display = "none";
  }
  getItems() {
    return Array.from(this.content.querySelectorAll('.dropdown-item:not([aria-disabled="true"]):not(.placeholder)'));
  }
  setValue(item) {
    if (!item || item.getAttribute("aria-disabled") === "true") return;
    this.btn.textContent = item.textContent.trim();
    this.content.querySelectorAll(".dropdown-item").forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    this.hiddenInput.value = item.dataset.value !== void 0 ? item.dataset.value : item.textContent.trim();
    this.hideError();
    this.dispatchEvent(new CustomEvent("change", { detail: this.hiddenInput.value, bubbles: true }));
  }
  static get observedAttributes() {
    return ["variant", "name", "placeholder", "pos"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "variant" && this.content) {
      const oldVariant = oldValue || "default";
      const newVariant = newValue || "default";
      this.content.classList.remove(`variant-${oldVariant}`);
      this.content.classList.add(`variant-${newVariant}`);
      if (this.btn) {
        this.btn.classList.remove(`variant-${oldVariant}`);
        this.btn.classList.add(`variant-${newVariant}`);
      }
    }
  }
  initSelection() {
    const activeItem = this.content.querySelector(".dropdown-item.active");
    if (activeItem) {
      this.setValue(activeItem);
    } else if (this.placeholder) {
      this.btn.innerHTML = this.placeholder;
    } else {
      const firstItem = this.getItems()[0];
      if (firstItem) this.setValue(firstItem);
    }
  }
  toggle() {
    if (this.classList.contains("open")) {
      this.close();
    } else {
      this.open();
    }
  }
  open() {
    if (this.content.parentElement !== document.body) {
      document.body.appendChild(this.content);
    }
    this.classList.add("open");
    this.content.classList.add("open");
    this.updatePosition();
    window.addEventListener("scroll", this._updatePosition, true);
    window.addEventListener("resize", this._updatePosition);
  }
  close() {
    this.classList.remove("open");
    this.content.classList.remove("open");
    window.removeEventListener("scroll", this._updatePosition, true);
    window.removeEventListener("resize", this._updatePosition);
  }
  updatePosition() {
    if (!this.classList.contains("open")) return;
    const pos = this.getAttribute("pos") || "bottom-left";
    this.content.style.position = "fixed";
    this.content.style.width = `${this.btn.offsetWidth}px`;
    this.content.style.minWidth = "10rem";
    const { top, left } = calculatePosition(this.btn, this.content, pos, 5);
    this.content.style.top = `${top}px`;
    this.content.style.left = `${left}px`;
  }
  handleOutsideClick(e) {
    if (!this.contains(e.target) && !this.content.contains(e.target)) {
      this.close();
    }
  }
  bindEvents() {
    this.btn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle();
    });
    document.addEventListener("click", this._handleOutsideClick);
    this.btn.addEventListener("keydown", (e) => {
      if (!["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) return;
      const items = this.getItems();
      if (items.length === 0) return;
      let currentIndex = items.findIndex((i) => i.classList.contains("active"));
      e.preventDefault();
      if (!this.classList.contains("open")) this.open();
      if (e.key === "ArrowDown") {
        currentIndex = (currentIndex + 1) % items.length;
      } else if (e.key === "ArrowUp") {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
      } else if (e.key === "Enter") {
        if (currentIndex >= 0) this.setValue(items[currentIndex]);
        this.close();
        return;
      } else if (e.key === "Escape") {
        this.close();
        return;
      }
      items.forEach((i) => i.classList.remove("active"));
      items[currentIndex].classList.add("active");
      items[currentIndex].scrollIntoView({ block: "nearest" });
    });
    this.content.addEventListener("click", (e) => {
      const item = e.target.closest(".dropdown-item");
      if (item) {
        this.setValue(item);
        this.close();
      }
    });
  }
};
function initDropdown() {
  if (!customElements.get("sol-dropdown")) {
    customElements.define("sol-dropdown", SolDropdown);
  }
}

// src/components/contextMenu.js
function initContextMenu() {
  let menu = document.querySelector(".sol-context-menu");
  if (!menu) {
    menu = document.createElement("div");
    menu.className = "sol-context-menu";
    document.body.appendChild(menu);
  }
  let contextTarget = null;
  const showMenu = (e) => {
    const contextEl = document.querySelector("sol-contextmenu");
    if (!contextEl) return;
    let activeVariant = contextEl.getAttribute("variant") || "default";
    e.preventDefault();
    e.stopPropagation();
    contextTarget = e.target;
    const isApple = /Mac|iPhone|iPod|iPad/.test(navigator.platform);
    const symbol = isApple ? "\u2318" : "Ctrl+";
    const alt = isApple ? "\u2325" : "Alt+";
    const shift = isApple ? "\u21E7" : "Shift+";
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const selection = window.getSelection().toString().trim();
    const link = e.target.closest("a");
    const img = e.target.closest("img");
    const input = e.target.closest("input, textarea, [contenteditable]");
    const isEditable = input || e.target.isContentEditable;
    const isTextInput = input && (input.type === "text" || input.type === "search" || input.type === "email" || input.type === "password" || input.tagName === "TEXTAREA" || input.isContentEditable);
    let menuHtml = "";
    const containers = [];
    let tempEl = e.target;
    while (tempEl && tempEl !== document) {
      if (tempEl.tagName && tempEl.tagName.toLowerCase() === "sol-context-options") {
        if (!containers.includes(tempEl)) {
          containers.unshift(tempEl);
        }
      }
      if (tempEl.children) {
        Array.from(tempEl.children).forEach((child) => {
          if (child.tagName && child.tagName.toLowerCase() === "sol-context-options") {
            if (!containers.includes(child)) {
              containers.unshift(child);
            }
          }
          if (child.tagName && child.tagName.toLowerCase() === "template") {
            const tplOpts = child.content.querySelector("sol-context-options");
            if (tplOpts && !containers.includes(tplOpts)) {
              containers.unshift(tplOpts);
            }
          }
        });
      }
      tempEl = tempEl.parentElement;
    }
    for (let i = containers.length - 1; i >= 0; i--) {
      if (containers[i].hasAttribute("variant")) {
        activeVariant = containers[i].getAttribute("variant");
        break;
      }
    }
    menu.classList.remove("variant-default", "variant-glass");
    menu.classList.add(`variant-${activeVariant}`);
    containers.forEach((customContainer) => {
      const children = Array.from(customContainer.children);
      if (children.length > 0) {
        const containerLabel = customContainer.getAttribute("label");
        const firstTag = children[0].tagName.toLowerCase();
        if (firstTag !== "sol-group-label") {
          menuHtml += `<div class="sol-menu-label">${containerLabel || "Opties"}</div>`;
        }
        children.forEach((child) => {
          const tag = child.tagName.toLowerCase();
          if (tag === "sol-item") {
            const isDisabled = child.hasAttribute("disabled");
            const isReadonly = child.hasAttribute("readonly");
            const type = child.getAttribute("type") || child.getAttribute("variant");
            const href = child.getAttribute("href");
            const target = child.getAttribute("target") || "_self";
            let actionAttr = "custom";
            let customAction = child.getAttribute("action") || "";
            let urlAttr = "";
            if (!customAction && child.hasAttribute("onclick")) {
              customAction = `js(${child.getAttribute("onclick")})`;
            } else if (!customAction && href) {
              actionAttr = target === "_blank" ? "open-tab" : "open-link";
              urlAttr = href;
            }
            menuHtml += `
                            <div class="sol-menu-item${isDisabled ? " disabled" : ""}${isReadonly ? " readonly" : ""}${type ? ` type-${type}` : ""}" 
                                 data-action="${actionAttr}" 
                                 data-url="${urlAttr.replace(/"/g, "&quot;")}"
                                 data-custom-action="${customAction.replace(/"/g, "&quot;")}">
                                ${child.getAttribute("label")}
                            </div>
                        `;
          } else if (tag === "sol-group-label") {
            menuHtml += `<div class="sol-menu-label">${child.getAttribute("label")}</div>`;
          } else if (tag === "sol-divider") {
            menuHtml += `<div class="sol-menu-divider"></div>`;
          }
        });
        menuHtml += `<div class="sol-menu-divider"></div>`;
      }
    });
    if (selection.length > 0) {
      menuHtml += `
                <div class="sol-menu-label">Selectie</div>
                <div class="sol-menu-item" data-action="copy">
                    Kopieer <span class="sol-menu-shortcut">${symbol}C</span>
                </div>
                ${isEditable ? `
                <div class="sol-menu-item" data-action="cut">
                    Knippen <span class="sol-menu-shortcut">${symbol}X</span>
                </div>` : ""}
                <div class="sol-menu-item" data-action="search-google">
                    Zoek op Google
                </div>
                <div class="sol-menu-item" data-action="translate">
                    Vertaal\u2026
                </div>
                <div class="sol-menu-divider"></div>
            `;
    }
    if (isTextInput) {
      menuHtml += `
                <div class="sol-menu-label">Tekstveld</div>
                ${selection.length > 0 ? `
                <div class="sol-menu-item" data-action="cut">
                    Knippen <span class="sol-menu-shortcut">${symbol}X</span>
                </div>
                <div class="sol-menu-item" data-action="copy">
                    Kopieer <span class="sol-menu-shortcut">${symbol}C</span>
                </div>` : ""}
                <div class="sol-menu-item" data-action="paste">
                    Plakken <span class="sol-menu-shortcut">${symbol}V</span>
                </div>
                <div class="sol-menu-item" data-action="select-all">
                    Alles selecteren <span class="sol-menu-shortcut">${symbol}A</span>
                </div>
                <div class="sol-menu-divider"></div>
            `;
    }
    if (img) {
      menuHtml += `
                <div class="sol-menu-label">Afbeelding</div>
                <div class="sol-menu-item" data-action="open-img" data-url="${img.src}">
                    Open afbeelding
                </div>
                <div class="sol-menu-item" data-action="copy-img-url" data-url="${img.src}">
                    Kopieer URL
                </div>
                <div class="sol-menu-divider"></div>
            `;
    }
    if (link) {
      const href = link.href;
      if (href.startsWith("mailto:")) {
        const email = href.replace("mailto:", "").split("?")[0];
        menuHtml += `
                    <div class="sol-menu-label">E-mail</div>
                    <div class="sol-menu-item" data-action="open-link" data-url="${href}">Stuur e-mail\u2026</div>
                    <div class="sol-menu-item" data-action="copy-text" data-text="${email}">Kopieer adres</div>
                `;
      } else if (href.startsWith("tel:")) {
        const phone = href.replace("tel:", "").split("?")[0];
        menuHtml += `
                    <div class="sol-menu-label">Telefoon</div>
                    <div class="sol-menu-item" data-action="open-link" data-url="${href}">Bellen\u2026</div>
                    <div class="sol-menu-item" data-action="copy-text" data-text="${phone}">Kopieer nummer</div>
                `;
      } else {
        menuHtml += `
                    <div class="sol-menu-label">Link</div>
                    <div class="sol-menu-item" data-action="open-tab" data-url="${href}">Open in nieuw tabblad</div>
                    <div class="sol-menu-item" data-action="copy-link" data-url="${href}">Kopieer link</div>
                `;
      }
      menuHtml += `<div class="sol-menu-divider"></div>`;
    }
    menuHtml += `
            <div class="sol-menu-label">Navigatie</div>
            <div class="sol-menu-item" data-action="reload">
                Vernieuwen <span class="sol-menu-shortcut">${symbol}R</span>
            </div>
            <div class="sol-menu-divider"></div>
            <div class="sol-menu-label">Pagina</div>
            <div class="sol-menu-item" data-action="copy-page-url">Kopieer pagina-URL</div>
            ${!isSafari ? `<div class="sol-menu-item" data-action="view-source">Paginabron <span class="sol-menu-shortcut">${symbol}U</span></div>` : ""}
            <div class="sol-menu-item" data-action="print">Printen <span class="sol-menu-shortcut">${symbol}P</span></div>
        `;
    menu.innerHTML = menuHtml;
    menu.style.display = "block";
    let posX = e.clientX;
    let posY = e.clientY;
    const menuWidth = menu.offsetWidth;
    const menuHeight = menu.offsetHeight;
    if (posX + menuWidth > window.innerWidth) posX -= menuWidth;
    if (posY + menuHeight > window.innerHeight) posY -= menuHeight;
    menu.style.left = `${Math.max(5, posX)}px`;
    menu.style.top = `${Math.max(5, posY)}px`;
    requestAnimationFrame(() => menu.classList.add("visible"));
  };
  const hideMenu = () => {
    menu.classList.remove("visible");
    setTimeout(() => {
      if (!menu.classList.contains("visible")) menu.style.display = "none";
    }, 150);
  };
  document.addEventListener("contextmenu", showMenu);
  document.addEventListener("click", hideMenu);
  window.addEventListener("scroll", hideMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideMenu();
  });
  menu.addEventListener("click", (e) => {
    const item = e.target.closest(".sol-menu-item");
    if (!item || item.classList.contains("disabled") || item.classList.contains("readonly")) return;
    const action = item.dataset.action;
    const url = item.dataset.url;
    const text = item.dataset.text;
    const sel = window.getSelection().toString().trim();
    switch (action) {
      case "custom": {
        const customAction = item.dataset.customAction;
        if (customAction.startsWith("js(")) {
          const code = customAction.slice(3, -1);
          try {
            new Function("target", code).call(contextTarget, contextTarget);
          } catch (err) {
            console.error(err);
          }
        } else if (customAction.startsWith("php(")) {
          const code = customAction.slice(4, -1);
          fetch(window.location.href, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded", "X-Solora-PHP-Action": "true" },
            body: new URLSearchParams({ "solora_exec_php": code })
          });
        }
        break;
      }
      case "copy":
        document.execCommand("copy");
        break;
      case "cut":
        document.execCommand("cut");
        break;
      case "paste":
        navigator.clipboard.readText().then((t) => document.execCommand("insertText", false, t));
        break;
      case "select-all":
        document.execCommand("selectAll");
        break;
      case "open-img":
        window.open(url, "_blank");
        break;
      case "copy-img-url":
        navigator.clipboard.writeText(url);
        break;
      case "open-tab":
        window.open(url, "_blank");
        break;
      case "copy-link":
        navigator.clipboard.writeText(url);
        break;
      case "open-link":
        window.location.href = url;
        break;
      case "copy-text":
        navigator.clipboard.writeText(text);
        break;
      case "reload":
        location.reload();
        break;
      case "copy-page-url":
        navigator.clipboard.writeText(location.href);
        break;
      case "view-source":
        window.open(`view-source:${location.href}`, "_blank");
        break;
      case "print":
        window.print();
        break;
      case "search-google":
        window.open(`https://www.google.com/search?q=${encodeURIComponent(sel)}`, "_blank");
        break;
      case "translate":
        window.open(`https://translate.google.com/?sl=auto&tl=nl&text=${encodeURIComponent(sel)}`, "_blank");
        break;
    }
    hideMenu();
  });
}

// src/components/darkToggle.js
function initThemeToggle(elementSelector = ".sol-theme-toggle") {
  const html = document.documentElement;
  const toggles = document.querySelectorAll(elementSelector);
  const STORAGE_KEY = "solora-theme";
  const applyTheme = (theme) => {
    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.add("light");
      html.classList.remove("dark");
    }
    toggles.forEach((btn) => {
      btn.innerHTML = `<span>${theme === "dark" ? "\u2600\uFE0F" : "\u{1F319}"}</span>`;
      btn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    });
    localStorage.setItem(STORAGE_KEY, theme);
  };
  const getInitialTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };
  applyTheme(getInitialTheme());
  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isDark = html.classList.contains("dark");
      applyTheme(isDark ? "light" : "dark");
    });
  });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
}

// src/components/switch.js
function initSwitch(target) {
  if (!target) {
    document.querySelectorAll("sol-switch").forEach((el) => initSwitch(el));
    return;
  }
  const switchElement = target;
  if (switchElement.dataset.initialized) return;
  switchElement.dataset.initialized = "true";
  switchElement.classList.add("sol-switch");
  const input = document.createElement("input");
  input.type = "checkbox";
  if (switchElement.hasAttribute("name")) {
    input.name = switchElement.getAttribute("name");
  }
  const slider = document.createElement("div");
  slider.className = "slider";
  const errorEl = document.createElement("div");
  errorEl.className = "sol-error-message sol-switch-error";
  errorEl.style.display = "none";
  switchElement.appendChild(input);
  switchElement.appendChild(slider);
  switchElement.appendChild(errorEl);
  slider.addEventListener("click", () => {
    input.checked = !input.checked;
    switchElement.hideError();
    switchElement.dispatchEvent(new Event("change", { bubbles: true }));
  });
  switchElement.showError = (message = "Ongeldige invoer") => {
    switchElement.classList.add("is-invalid");
    errorEl.textContent = message;
    errorEl.style.display = "block";
  };
  switchElement.hideError = () => {
    switchElement.classList.remove("is-invalid");
    errorEl.style.display = "none";
  };
  function updateColors() {
    const primary = switchElement.getAttribute("color-primary");
    const secondary = switchElement.getAttribute("color-secondary");
    const bg = switchElement.getAttribute("color-bg");
    const text = switchElement.getAttribute("color-text");
    if (primary) switchElement.style.setProperty("--color-primary", primary);
    if (secondary) switchElement.style.setProperty("--color-secondary", secondary);
    if (bg) switchElement.style.setProperty("--color-bg", bg);
    if (text) switchElement.style.setProperty("--color-text", text);
  }
  updateColors();
  const observer = new MutationObserver(updateColors);
  observer.observe(switchElement, {
    attributes: true,
    attributeFilter: ["color-primary", "color-secondary", "color-bg", "color-text"]
  });
}

// src/components/icon.js
var iconCache = /* @__PURE__ */ new Map();
var SolIcon = class extends HTMLElement {
  constructor() {
    super();
    this.initialized = false;
  }
  static get observedAttributes() {
    return ["name", "size", "color", "stroke-width"];
  }
  connectedCallback() {
    if (this.initialized) return;
    this.initialized = true;
    this.render();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (this.initialized && oldValue !== newValue) {
      this.render();
    }
  }
  async render() {
    const name = this.getAttribute("name");
    if (!name) {
      this.innerHTML = "";
      return;
    }
    const size = this.getAttribute("size") || "24";
    const color = this.getAttribute("color") || "currentColor";
    const strokeWidth = this.getAttribute("stroke-width") || "2";
    try {
      let svgText;
      if (iconCache.has(name)) {
        svgText = iconCache.get(name);
      } else {
        const response = await fetch(`https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/${name}.svg`);
        if (!response.ok) throw new Error(`Icon "${name}" not found`);
        svgText = await response.text();
        iconCache.set(name, svgText);
      }
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText, "image/svg+xml");
      const svg = doc.querySelector("svg");
      if (svg) {
        svg.setAttribute("width", size);
        svg.setAttribute("height", size);
        svg.setAttribute("stroke", color);
        svg.setAttribute("stroke-width", strokeWidth);
        this.innerHTML = "";
        this.appendChild(svg);
      }
    } catch (error) {
      console.error(`SolIcon: Fout bij laden van icoon "${name}":`, error);
      this.innerHTML = "";
    }
  }
};
function initIcon() {
  if (!customElements.get("sol-icon")) {
    customElements.define("sol-icon", SolIcon);
  }
}

// src/components/alert.js
function initAlert(config = {}) {
  let alertQueue = [];
  let isProcessing = false;
  const defaultTitle = config.title || window.location.hostname || "Alert";
  const processQueue = async () => {
    if (isProcessing || alertQueue.length === 0) return;
    isProcessing = true;
    const { options, resolve } = alertQueue.shift();
    const result = await renderAlert(options);
    resolve(result);
    isProcessing = false;
    processQueue();
  };
  const enqueue = (options) => {
    return new Promise((resolve) => {
      alertQueue.push({ options, resolve });
      processQueue();
    });
  };
  const renderAlert = (options) => {
    let { title, message, buttons, showInput, defaultValue, placeholder, variant } = options;
    if (!buttons || !Array.isArray(buttons)) {
      buttons = [{ text: "OK", value: true, bold: true }];
    }
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.className = "sol-alert-overlay";
      const container = document.createElement("div");
      container.className = "sol-alert-container";
      if (variant) {
        container.classList.add(`variant-${variant}`);
      }
      const content = document.createElement("div");
      content.className = "sol-alert-content";
      if (title) {
        const titleEl = document.createElement("div");
        titleEl.className = "sol-alert-title";
        titleEl.innerText = title;
        content.appendChild(titleEl);
      }
      const messageEl = document.createElement("div");
      messageEl.className = "sol-alert-message";
      messageEl.innerText = message;
      content.appendChild(messageEl);
      let inputEl;
      if (showInput) {
        inputEl = document.createElement("input");
        inputEl.type = "text";
        inputEl.className = "sol-alert-input";
        inputEl.value = defaultValue || "";
        inputEl.placeholder = placeholder || "";
        content.appendChild(inputEl);
        setTimeout(() => inputEl.focus(), 250);
      }
      const buttonsContainer = document.createElement("div");
      buttonsContainer.className = "sol-alert-buttons";
      const close = (value) => {
        overlay.classList.remove("visible");
        setTimeout(() => {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
          }
          resolve(value);
        }, 200);
      };
      buttons.forEach((btn) => {
        const button = document.createElement("button");
        button.className = "sol-alert-button";
        if (btn.bold) button.classList.add("bold");
        button.innerText = btn.text;
        button.onclick = () => {
          const value = showInput ? btn.value ? inputEl.value : null : btn.value;
          close(value);
        };
        buttonsContainer.appendChild(button);
      });
      container.appendChild(content);
      container.appendChild(buttonsContainer);
      overlay.appendChild(container);
      document.body.appendChild(overlay);
      overlay.offsetHeight;
      overlay.classList.add("visible");
    });
  };
  window.alert = function(message) {
    return enqueue({
      title: defaultTitle,
      message,
      buttons: [{ text: "OK", value: true, bold: true }]
    });
  };
  window.confirm = function(message) {
    return enqueue({
      title: defaultTitle,
      message,
      buttons: [
        { text: "Cancel", value: false },
        { text: "OK", value: true, bold: true }
      ]
    });
  };
  window.prompt = function(message, defaultValue) {
    return enqueue({
      title: defaultTitle,
      message,
      buttons: [
        { text: "Cancel", value: null },
        { text: "OK", value: true, bold: true }
      ],
      showInput: true,
      defaultValue
    });
  };
  window.solora = window.solora || {};
  window.solora.alert = (title, message, variant) => {
    if (typeof title === "object") {
      return enqueue({
        buttons: [{ text: "OK", value: true, bold: true }],
        ...title
      });
    }
    return enqueue({ title, message, variant, buttons: [{ text: "OK", value: true, bold: true }] });
  };
  window.solora.confirm = (title, message, variant) => {
    if (typeof title === "object") {
      return enqueue({
        buttons: [
          { text: "Cancel", value: false },
          { text: "OK", value: true, bold: true }
        ],
        ...title
      });
    }
    return enqueue({ title, message, variant, buttons: [
      { text: "Cancel", value: false },
      { text: "OK", value: true, bold: true }
    ] });
  };
  window.solora.prompt = (title, message, defaultValue, variant) => {
    if (typeof title === "object") {
      return enqueue({
        buttons: [{ text: "Cancel", value: null }, { text: "OK", value: true, bold: true }],
        showInput: true,
        ...title
      });
    }
    return enqueue({
      title,
      message,
      defaultValue,
      variant,
      buttons: [{ text: "Cancel", value: null }, { text: "OK", value: true, bold: true }],
      showInput: true
    });
  };
}

// src/components/card.js
var SolCard = class extends HTMLElement {
  static get observedAttributes() {
    return ["bg", "variant"];
  }
  constructor() {
    super();
  }
  show() {
    if (!this.hasAttribute("hidden")) return;
    const transition = this.getAttribute("transition");
    if (transition !== null) {
      const variant = transition || "fade";
      this.classList.add(`sol-animate-${variant}`);
      this.removeAttribute("hidden");
      const onAnimationEnd = () => {
        this.classList.remove(`sol-animate-${variant}`);
        this.removeEventListener("animationend", onAnimationEnd);
      };
      this.addEventListener("animationend", onAnimationEnd);
    } else {
      this.removeAttribute("hidden");
    }
  }
  hide() {
    if (this.hasAttribute("hidden")) return;
    const transition = this.getAttribute("transition");
    if (transition !== null) {
      const variant = transition || "fade";
      this.classList.add(`sol-animate-${variant}`, "sol-animate-reverse");
      const onAnimationEnd = () => {
        this.classList.remove(`sol-animate-${variant}`, "sol-animate-reverse");
        this.setAttribute("hidden", "");
        this.removeEventListener("animationend", onAnimationEnd);
      };
      this.addEventListener("animationend", onAnimationEnd);
    } else {
      this.setAttribute("hidden", "");
    }
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === "bg") {
      this.updateBackground(newValue);
    } else if (name === "variant") {
      this.updateVariant(oldValue, newValue);
    }
  }
  updateVariant(oldValue, newValue) {
    if (oldValue) {
      this.classList.remove(`variant-${oldValue}`);
    }
    this.classList.add(`variant-${newValue || "default"}`);
  }
  updateBackground(bg) {
    this.classList.remove("custom-bg");
    if (!bg || bg === "glass") {
      this.style.backgroundColor = "";
    } else if (bg.includes("/")) {
      const [color, opacity] = bg.split("/");
      const amount = parseFloat(opacity);
      if (!isNaN(amount)) {
        this.style.backgroundColor = `color-mix(in srgb, ${color}, transparent ${100 - amount}%)`;
      }
    } else {
      this.style.backgroundColor = bg;
      if (bg !== "transparent" && !bg.startsWith("rgba") && !bg.startsWith("hsla")) {
        this.classList.add("custom-bg");
      }
    }
  }
  render() {
    if (!this.classList.contains("sol-card")) {
      this.classList.add("sol-card");
    }
    const variant = this.getAttribute("variant") || "default";
    this.updateVariant(null, variant);
    const bg = this.getAttribute("bg");
    this.updateBackground(bg);
    if (!this.querySelector(".card-glass-highlight")) {
      const highlight = document.createElement("div");
      highlight.className = "card-glass-highlight";
      this.prepend(highlight);
    }
  }
};
function initCard() {
  if (!customElements.get("sol-card")) {
    customElements.define("sol-card", SolCard);
  }
}

// src/components/navbar.js
var SolNavbar = class extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
    this.observer = new MutationObserver(() => this.render());
    this.observer.observe(this, { childList: true, subtree: false });
  }
  disconnectedCallback() {
    if (this.observer) this.observer.disconnect();
  }
  static get observedAttributes() {
    return ["brand", "brand-href", "logo", "sticky"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
  render() {
    const brand = this.getAttribute("brand") || "Solora";
    const brandHref = this.getAttribute("brand-href") || "#";
    let items = Array.from(this.children).filter((item) => !item.classList.contains("sol-navbar"));
    const existingMenu = this.querySelector(".sol-navbar-menu");
    if (existingMenu) {
      const existingItems = Array.from(existingMenu.querySelectorAll("li > *"));
      items = [...items, ...existingItems];
    }
    if (this.observer) this.observer.disconnect();
    const oldNav = this.querySelector(".sol-navbar");
    const isOpen = oldNav ? oldNav.classList.contains("is-open") : false;
    this.buildNav(brand, brandHref, items, isOpen);
    if (this.observer) {
      this.observer.observe(this, { childList: true, subtree: false });
    }
  }
  buildNav(brand, brandHref, items, isOpen) {
    const existingNav = this.querySelector(".sol-navbar");
    if (existingNav) existingNav.remove();
    const nav = document.createElement("nav");
    nav.className = "sol-navbar" + (isOpen ? " is-open" : "");
    const container = document.createElement("div");
    container.className = "sol-navbar-container";
    const brandLink = document.createElement("a");
    brandLink.className = "sol-navbar-brand";
    brandLink.href = brandHref;
    const logo = this.getAttribute("logo");
    if (logo) {
      const logoImg = document.createElement("img");
      logoImg.src = logo;
      logoImg.alt = brand;
      logoImg.className = "sol-navbar-logo";
      brandLink.appendChild(logoImg);
      if (brand && brand !== "Solora" && this.getAttribute("brand") !== "") {
        const brandText = document.createElement("span");
        brandText.innerHTML = brand;
        brandLink.appendChild(brandText);
      }
    } else {
      brandLink.innerHTML = brand;
    }
    const toggle = document.createElement("button");
    toggle.className = "sol-navbar-toggle";
    toggle.setAttribute("aria-label", "Toggle menu");
    toggle.innerHTML = "<span></span><span></span><span></span>";
    const menu = document.createElement("ul");
    menu.className = "sol-navbar-menu";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.appendChild(item);
      menu.appendChild(li);
    });
    toggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
      if (nav.classList.contains("is-open")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });
    menu.addEventListener("click", (e) => {
      const isDropdownTrigger = e.target.closest("sol-nav-dropdown");
      if ((e.target.tagName === "A" || e.target.closest("a")) && !isDropdownTrigger) {
        nav.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });
    container.appendChild(brandLink);
    container.appendChild(menu);
    container.appendChild(toggle);
    nav.appendChild(container);
    this.appendChild(nav);
  }
};
function initNavbar() {
  if (!customElements.get("sol-navbar")) {
    customElements.define("sol-navbar", SolNavbar);
  }
}

// src/components/navbarDropdown.js
var SolNavDropdown = class extends HTMLElement {
  constructor() {
    super();
    this.initialized = false;
    this.isOpen = false;
    this._handleOutsideClick = this.handleOutsideClick.bind(this);
    this._updatePosition = this.updatePosition.bind(this);
  }
  connectedCallback() {
    if (this.initialized) return;
    this.initialized = true;
    const label = this.getAttribute("label") || "Menu";
    this.contentWrapper = document.createElement("div");
    this.contentWrapper.className = "sol-nav-dropdown-content";
    while (this.childNodes.length > 0) {
      this.contentWrapper.appendChild(this.childNodes[0]);
    }
    this.render(label);
    this.bindEvents();
  }
  render(label) {
    this.innerHTML = "";
    this.trigger = document.createElement("button");
    this.trigger.className = "sol-nav-dropdown-trigger";
    this.trigger.innerHTML = `<span>${label}</span><span class="chevron"></span>`;
    this.appendChild(this.trigger);
    this.appendChild(this.contentWrapper);
  }
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  open() {
    this.isOpen = true;
    this.classList.add("open");
    if (window.innerWidth > 768) {
      this.updatePosition();
      window.addEventListener("scroll", this._updatePosition, true);
      window.addEventListener("resize", this._updatePosition);
    }
    document.addEventListener("click", this._handleOutsideClick);
    this.dispatchEvent(new CustomEvent("open", { bubbles: true }));
  }
  close() {
    this.isOpen = false;
    this.classList.remove("open");
    window.removeEventListener("scroll", this._updatePosition, true);
    window.removeEventListener("resize", this._updatePosition);
    document.removeEventListener("click", this._handleOutsideClick);
    this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
  }
  updatePosition() {
    if (!this.isOpen || window.innerWidth <= 768) return;
  }
  handleOutsideClick(e) {
    if (!this.contains(e.target)) {
      this.close();
    }
  }
  bindEvents() {
    this.trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle();
    });
    this.contentWrapper.addEventListener("click", (e) => {
      if (e.target.tagName === "A" || e.target.closest("a")) {
        this.close();
      }
    });
  }
};
function initNavDropdown() {
  if (!customElements.get("sol-nav-dropdown")) {
    customElements.define("sol-nav-dropdown", SolNavDropdown);
  }
}

// src/components/checkbox.js
var SolCheck = class extends HTMLElement {
  constructor() {
    super();
    this.input = document.createElement("input");
    this.input.type = "checkbox";
    this.input.className = "sol-check-input";
  }
  connectedCallback() {
    if (this.contains(this.input)) return;
    const labelText = this.innerHTML;
    this.innerHTML = "";
    const box = document.createElement("div");
    box.className = "sol-check-box";
    box.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    const label = document.createElement("span");
    label.className = "sol-check-label";
    label.innerHTML = labelText;
    this.errorEl = document.createElement("div");
    this.errorEl.className = "sol-error-message sol-check-error";
    this.errorEl.style.display = "none";
    this.appendChild(this.input);
    this.appendChild(box);
    if (labelText.trim()) {
      this.appendChild(label);
    }
    this.appendChild(this.errorEl);
    this.input.checked = this.hasAttribute("checked");
    if (this.hasAttribute("disabled")) {
      this.input.disabled = true;
    }
    if (this.hasAttribute("name")) {
      this.input.name = this.getAttribute("name");
    }
    this.addEventListener("click", (e) => {
      if (this.hasAttribute("disabled")) return;
      if (e.target === this.input) return;
      this.input.checked = !this.input.checked;
      this.hideError();
      this.dispatchEvent(new CustomEvent("change", {
        detail: { checked: this.input.checked }
      }));
    });
    this.input.addEventListener("change", () => {
      this.hideError();
    });
  }
  static get observedAttributes() {
    return ["checked", "disabled", "name"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "checked") {
      this.input.checked = this.hasAttribute("checked");
    }
    if (name === "disabled") {
      this.input.disabled = this.hasAttribute("disabled");
    }
    if (name === "name") {
      this.input.name = newValue;
    }
  }
  get checked() {
    return this.input.checked;
  }
  set checked(val) {
    if (val) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }
  showError(message = "Ongeldige invoer") {
    this.classList.add("is-invalid");
    this.errorEl.textContent = message;
    this.errorEl.style.display = "block";
  }
  hideError() {
    this.classList.remove("is-invalid");
    this.errorEl.style.display = "none";
  }
};
function initCheckbox() {
  if (!customElements.get("sol-check")) {
    customElements.define("sol-check", SolCheck);
  }
}

// src/components/popover.js
var SolPopover = class extends HTMLElement {
  constructor() {
    super();
    this.initialized = false;
    this._handleOutsideClick = this.handleOutsideClick.bind(this);
    this._updatePosition = this.updatePosition.bind(this);
  }
  connectedCallback() {
    if (this.initialized) return;
    this.initialized = true;
    const triggerSlot = this.querySelector('[slot="trigger"]');
    const contentNodes = Array.from(this.childNodes).filter((node) => node !== triggerSlot);
    this.trigger = document.createElement("div");
    this.trigger.className = "sol-popover-trigger";
    if (triggerSlot) {
      this.trigger.appendChild(triggerSlot);
    } else {
      this.trigger.textContent = "Klik mij";
    }
    this.content = document.createElement("div");
    this.content.className = "popover-content";
    contentNodes.forEach((node) => this.content.appendChild(node));
    this.innerHTML = "";
    this.appendChild(this.trigger);
    this.bindEvents();
  }
  disconnectedCallback() {
    if (this.content && this.content.parentElement) {
      this.content.parentElement.removeChild(this.content);
    }
    document.removeEventListener("click", this._handleOutsideClick);
    window.removeEventListener("scroll", this._updatePosition, true);
    window.removeEventListener("resize", this._updatePosition);
  }
  toggle() {
    if (this.content.classList.contains("open")) {
      this.close();
    } else {
      this.open();
    }
  }
  open() {
    if (this.content.parentElement !== document.body) {
      document.body.appendChild(this.content);
    }
    this.classList.add("open");
    this.content.classList.add("open");
    this.updatePosition();
    window.addEventListener("scroll", this._updatePosition, true);
    window.addEventListener("resize", this._updatePosition);
  }
  close() {
    this.classList.remove("open");
    this.content.classList.remove("open");
    window.removeEventListener("scroll", this._updatePosition, true);
    window.removeEventListener("resize", this._updatePosition);
  }
  updatePosition() {
    if (!this.content.classList.contains("open")) return;
    const pos = this.getAttribute("pos") || "bottom-left";
    const { top, left } = calculatePosition(this.trigger, this.content, pos);
    this.content.style.top = `${top}px`;
    this.content.style.left = `${left}px`;
  }
  handleOutsideClick(e) {
    if (!this.contains(e.target) && !this.content.contains(e.target)) {
      this.close();
    }
  }
  bindEvents() {
    this.trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle();
    });
    this.content.addEventListener("click", (e) => {
      const newEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
        ...e
      });
      this.dispatchEvent(newEvent);
    });
    document.addEventListener("click", this._handleOutsideClick);
  }
};
function initPopover() {
  if (!customElements.get("sol-popover")) {
    customElements.define("sol-popover", SolPopover);
  }
}

// src/components/modal.js
var SolModal = class extends HTMLElement {
  constructor() {
    super();
    this.overlay = document.createElement("div");
    this.overlay.className = "sol-modal-overlay";
    this.container = document.createElement("div");
    this.container.className = "sol-modal-container";
    this.content = document.createElement("div");
    this.content.className = "sol-modal-content";
    this.footer = document.createElement("div");
    this.footer.className = "sol-modal-footer";
    this.overlay.appendChild(this.container);
    this.container.appendChild(this.content);
    this.container.appendChild(this.footer);
  }
  connectedCallback() {
    if (!document.body.contains(this.overlay)) {
      document.body.appendChild(this.overlay);
    }
    this.render();
    this.setupObservers();
  }
  setupObservers() {
    const observer = new MutationObserver(() => this.render());
    observer.observe(this, { childList: true, attributes: true, subtree: true });
  }
  static get observedAttributes() {
    return ["variant", "open", "size"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "open") {
      if (newValue !== null) {
        this.open();
      } else {
        this.close();
      }
    } else {
      this.render();
    }
  }
  open() {
    this.overlay.style.display = "flex";
    this.overlay.offsetHeight;
    this.overlay.classList.add("visible");
    document.body.style.overflow = "hidden";
  }
  close() {
    this.overlay.classList.remove("visible");
    setTimeout(() => {
      if (!this.overlay.classList.contains("visible")) {
        this.overlay.style.display = "none";
        document.body.style.overflow = "";
        this.removeAttribute("open");
      }
    }, 200);
  }
  render() {
    if (this._isRendering) return;
    this._isRendering = true;
    const variant = this.getAttribute("variant") || "default";
    const size = this.getAttribute("size") || "sm";
    this.container.className = `sol-modal-container variant-${variant} size-${size}`;
    const buttons = Array.from(this.querySelectorAll("sol-modal-button"));
    buttons.forEach((btn) => {
      if (!this.footer.contains(btn)) {
        this.footer.appendChild(btn);
      }
    });
    const children = Array.from(this.childNodes);
    children.forEach((node) => {
      if (node !== this.overlay) {
        this.content.appendChild(node);
      }
    });
    Array.from(this.footer.querySelectorAll("sol-modal-button")).forEach((btn) => {
      if (!btn._hasModalListener) {
        btn.addEventListener("click", () => {
          if (btn.hasAttribute("close-modal")) {
            this.close();
          }
        });
        btn._hasModalListener = true;
      }
    });
    this.overlay.onclick = (e) => {
      if (e.target === this.overlay) this.close();
    };
    this._isRendering = false;
  }
};
var SolModalButton = class extends HTMLElement {
  constructor() {
    super();
    this.button = document.createElement("button");
    this.initialized = false;
  }
  connectedCallback() {
    if (this.initialized) return;
    this.initialized = true;
    while (this.childNodes.length > 0) {
      this.button.appendChild(this.childNodes[0]);
    }
    this.appendChild(this.button);
    this.updateAttributes();
  }
  static get observedAttributes() {
    return ["variant", "bold", "type", "form"];
  }
  attributeChangedCallback() {
    this.updateAttributes();
  }
  updateAttributes() {
    const variant = this.getAttribute("variant") || "default";
    const isBold = this.hasAttribute("bold");
    this.button.className = `sol-modal-button variant-${variant}`;
    if (isBold) this.button.classList.add("bold");
    if (this.hasAttribute("type")) {
      this.button.setAttribute("type", this.getAttribute("type"));
    }
    if (this.hasAttribute("form")) {
      this.button.setAttribute("form", this.getAttribute("form"));
    }
  }
};
function initModal() {
  if (!customElements.get("sol-modal")) {
    customElements.define("sol-modal", SolModal);
  }
  if (!customElements.get("sol-modal-button")) {
    customElements.define("sol-modal-button", SolModalButton);
  }
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("sol-button[toggle-modal]");
    if (btn) {
      const modalId = btn.getAttribute("toggle-modal");
      const modal = document.getElementById(modalId);
      if (modal && modal.tagName === "SOL-MODAL") {
        modal.setAttribute("open", "");
      }
    }
  });
}

// src/components/window.js
var SolWindow = class extends HTMLElement {
  constructor() {
    super();
    this.initialized = false;
  }
  connectedCallback() {
    if (this.initialized) return;
    this.initialized = true;
    const title = this.getAttribute("title") || "";
    const content = this.innerHTML;
    this.innerHTML = `
            <div class="window-top">
                <div class="window-top-btns">
                    <span class="window-btn-red close-btn" title="Sluiten"></span>
                    <span class="window-btn-orange minimize-btn" title="Minimaliseren"></span>
                    <span class="window-btn-green maximize-btn" title="Volledig scherm"></span>
                </div>
                ${title ? `<div class="window-title">${title}</div>` : ""}
            </div>
            <div class="window-content">
                ${content}
            </div>
        `;
    this.windowContent = this.querySelector(".window-content");
    this.closeBtn = this.querySelector(".close-btn");
    this.minimizeBtn = this.querySelector(".minimize-btn");
    this.maximizeBtn = this.querySelector(".maximize-btn");
    this.bindEvents();
  }
  bindEvents() {
    this.closeBtn.addEventListener("click", () => {
      this.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      this.style.opacity = "0";
      this.style.transform = "scale(0.95)";
      setTimeout(() => this.remove(), 300);
    });
    this.minimizeBtn.addEventListener("click", () => {
      this.windowContent.classList.toggle("collapsed");
    });
    this.maximizeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this.dataset.isFullscreen !== "true") {
        const rect = this.getBoundingClientRect();
        this.dataset.origRect = JSON.stringify({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        });
        Object.assign(this.style, {
          position: "fixed",
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          margin: "0",
          zIndex: "9999",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        });
        void this.offsetWidth;
        Object.assign(this.style, { top: "0", left: "0", width: "100vw", height: "100vh", borderRadius: "0" });
        this.dataset.isFullscreen = "true";
      } else {
        const origRect = JSON.parse(this.dataset.origRect);
        Object.assign(this.style, {
          top: `${origRect.top - window.scrollY}px`,
          left: `${origRect.left - window.scrollX}px`,
          width: `${origRect.width}px`,
          height: `${origRect.height}px`,
          borderRadius: "12px"
        });
        this.addEventListener("transitionend", () => {
          Object.assign(this.style, { position: "", top: "", left: "", width: "", height: "", zIndex: "", transition: "", margin: "", borderRadius: "" });
          this.dataset.isFullscreen = "false";
        }, { once: true });
      }
    });
  }
};
if (!window._solFsListenerAdded) {
  window._solFsListenerAdded = true;
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "r") {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith("sol-fs-")) {
          sessionStorage.removeItem(key);
        }
      });
    }
  });
}
function initWindow() {
  if (!customElements.get("sol-window")) {
    customElements.define("sol-window", SolWindow);
  }
}

// src/components/table.js
var SolTable = class extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const table = this.querySelector("table");
    if (table && !table.classList.contains("sol-table")) {
      table.classList.add("sol-table");
    }
  }
};
function initTable() {
  if (!customElements.get("sol-table")) {
    customElements.define("sol-table", SolTable);
  }
}

// src/components/notification.js
function initNotification() {
  window.solora = window.solora || {};
  let area = document.querySelector(".sol-notification-area");
  if (!area) {
    area = document.createElement("div");
    area.className = "sol-notification-area";
    document.body.appendChild(area);
  }
  const notifyHandler = (options) => {
    if (typeof options === "string") {
      const el = document.getElementById(options);
      if (el && typeof el.show === "function") {
        el.show();
      } else {
        console.warn(`Solora: Notification with ID '${options}' not found or is not a sol-notification.`);
      }
      return;
    }
    let { title, message, variant, type, duration } = options;
    if (duration === void 0) duration = 5e3;
    const toast = document.createElement("div");
    toast.className = "sol-notification-toast";
    if (variant) toast.classList.add(`variant-${variant}`);
    if (type) toast.classList.add(`type-${type}`);
    toast.innerHTML = `
            <div class="sol-notification-header">
                <span class="sol-notification-title">${title || ""}</span>
                <button class="sol-notification-close">&times;</button>
            </div>
            <div class="sol-notification-message">${message || ""}</div>
        `;
    area.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });
    const closeToast = () => {
      toast.classList.remove("show");
      toast.addEventListener("transitionend", () => toast.remove());
    };
    toast.querySelector(".sol-notification-close").onclick = closeToast;
    if (duration > 0) {
      setTimeout(closeToast, duration);
    }
  };
  window.solora.notify = notifyHandler;
  window.solora.notificate = notifyHandler;
  class SolNotification extends HTMLElement {
    connectedCallback() {
      this.style.display = "none";
      if (this.hasAttribute("show")) {
        this.show();
      }
    }
    show() {
      window.solora.notify({
        title: this.getAttribute("title") || "",
        message: this.getAttribute("message") || this.innerHTML.trim() || "",
        variant: this.getAttribute("variant"),
        type: this.getAttribute("type"),
        duration: this.hasAttribute("duration") ? parseInt(this.getAttribute("duration")) : 5e3
      });
    }
  }
  if (!customElements.get("sol-notification")) {
    customElements.define("sol-notification", SolNotification);
  }
  class SolLaravelNotification extends HTMLElement {
    connectedCallback() {
      this.style.display = "none";
      const variant = this.getAttribute("variant");
      const duration = this.hasAttribute("duration") ? parseInt(this.getAttribute("duration")) : 5e3;
      const success = this.getAttribute("success");
      if (success) window.solora.notify({ title: "Succes", message: success, type: "success", variant, duration });
      const error = this.getAttribute("error");
      if (error) window.solora.notify({ title: "Fout", message: error, type: "error", variant, duration });
      const info = this.getAttribute("info");
      if (info) window.solora.notify({ title: "Info", message: info, type: "info", variant, duration });
      const warning = this.getAttribute("warning");
      if (warning) window.solora.notify({ title: "Let op", message: warning, type: "warning", variant, duration });
    }
  }
  if (!customElements.get("sol-laravel-notification")) {
    customElements.define("sol-laravel-notification", SolLaravelNotification);
  }
}

// src/components/sidebar.js
var SolSidebar = class extends HTMLElement {
  constructor() {
    super();
    this._navbarObserver = null;
    this._navbarResizeObserver = null;
  }
  connectedCallback() {
    this.updateActiveItem();
    this.setupNavbarObserver();
  }
  disconnectedCallback() {
    this.disconnectObservers();
  }
  static get observedAttributes() {
    return ["variant", "fixed", "sticky", "floating", "compact"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "sticky") {
      if (newValue !== null) {
        this.setupNavbarObserver();
      } else {
        this.disconnectObservers();
        this.style.removeProperty("--sol-sidebar-top");
      }
    }
  }
  setupNavbarObserver() {
    this.disconnectObservers();
    const updateTop = () => {
      const navbar2 = document.querySelector("sol-navbar[sticky]");
      let topValue = "0px";
      if (navbar2) {
        const rect = navbar2.getBoundingClientRect();
        const isVisible = rect.height > 0 && window.getComputedStyle(navbar2).display !== "none" && !navbar2.hasAttribute("hidden");
        if (isVisible) {
          topValue = rect.height + "px";
        }
      }
      this.style.setProperty("--sol-sidebar-top", topValue);
    };
    updateTop();
    const navbar = document.querySelector("sol-navbar");
    if (navbar) {
      this._navbarResizeObserver = new ResizeObserver(updateTop);
      this._navbarResizeObserver.observe(navbar);
      this._navbarObserver = new MutationObserver(updateTop);
      this._navbarObserver.observe(navbar, {
        attributes: true,
        attributeFilter: ["hidden", "style", "class", "sticky"]
      });
    } else {
      this._bodyObserver = new MutationObserver((mutations) => {
        if (document.querySelector("sol-navbar")) {
          this.setupNavbarObserver();
          this._bodyObserver.disconnect();
          this._bodyObserver = null;
        }
      });
      this._bodyObserver.observe(document.body, { childList: true, subtree: true });
    }
  }
  disconnectObservers() {
    if (this._navbarObserver) {
      this._navbarObserver.disconnect();
      this._navbarObserver = null;
    }
    if (this._navbarResizeObserver) {
      this._navbarResizeObserver.disconnect();
      this._navbarResizeObserver = null;
    }
    if (this._bodyObserver) {
      this._bodyObserver.disconnect();
      this._bodyObserver = null;
    }
  }
  updateActiveItem() {
    const currentPath = window.location.pathname;
    const items = this.querySelectorAll(".sol-sidebar-item");
    items.forEach((item) => {
      const href = item.getAttribute("href");
      if (href && (currentPath === href || currentPath.endsWith(href) || currentPath === "/" && (href === "/index.php" || href === "index.php"))) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }
};
function initSidebar() {
  if (!customElements.get("sol-sidebar")) {
    customElements.define("sol-sidebar", SolSidebar);
  }
}

// src/components/layout.js
var SolPage = class extends HTMLElement {
  constructor() {
    super();
  }
};
var SolMain = class extends HTMLElement {
  constructor() {
    super();
  }
};
function initLayout() {
  if (!customElements.get("sol-page")) {
    customElements.define("sol-page", SolPage);
  }
  if (!customElements.get("sol-main")) {
    customElements.define("sol-main", SolMain);
  }
}

// src/components/hr.js
var SolHr = class extends HTMLElement {
  static get observedAttributes() {
    return ["color", "opacity", "weight", "vertical", "inset", "variant"];
  }
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.render();
  }
  render() {
    const color = this.getAttribute("color");
    const opacity = this.getAttribute("opacity");
    if (color) {
      this.style.setProperty("--sol-hr-color", color);
    } else {
      this.style.removeProperty("--sol-hr-color");
    }
    if (opacity) {
      this.style.opacity = opacity;
    } else {
      this.style.opacity = "";
    }
    if (!this.getAttribute("role")) {
      this.setAttribute("role", "separator");
    }
    if (this.hasAttribute("vertical")) {
      this.setAttribute("aria-orientation", "vertical");
    } else {
      this.setAttribute("aria-orientation", "horizontal");
    }
  }
};
function initHr() {
  if (!customElements.get("sol-hr")) {
    customElements.define("sol-hr", SolHr);
  }
}

// src/components/laravelSupport.js
function initLaravelSupport() {
  const applyErrors = (errors) => {
    const allSolInputs = document.querySelectorAll("sol-input, sol-textarea, sol-check, sol-dropdown, sol-switch");
    allSolInputs.forEach((el) => {
      if (typeof el.hideError === "function") el.hideError();
    });
    if (!errors || typeof errors !== "object") return;
    Object.keys(errors).forEach((field) => {
      const nameBracket = field.replace(/\.(\w+)/g, "[$1]");
      const messages = Array.isArray(errors[field]) ? errors[field] : [errors[field]];
      const message = messages[0];
      const elements = document.querySelectorAll(`
                [name="${field}"], [name="${field}[]"],
                [name="${nameBracket}"], [name="${nameBracket}[]"],
                [data-name="${field}"]
            `);
      elements.forEach((el) => {
        const solComponent = el.closest("sol-input, sol-textarea, sol-check, sol-dropdown, sol-switch") || el;
        if (solComponent && typeof solComponent.showError === "function") {
          solComponent.showError(message);
        }
      });
    });
  };
  const originalFetch = window.fetch;
  if (originalFetch) {
    window.fetch = async function(...args) {
      try {
        const response = await originalFetch.apply(this, args);
        if (response.status === 422) {
          const clone = response.clone();
          clone.json().then((data) => {
            if (data && data.errors) {
              applyErrors(data.errors);
            }
          }).catch(() => {
          });
        }
        return response;
      } catch (error) {
        throw error;
      }
    };
  }
  if (typeof window !== "undefined" && window.XMLHttpRequest) {
    const originalXHRSend = window.XMLHttpRequest.prototype.send;
    if (originalXHRSend) {
      window.XMLHttpRequest.prototype.send = function(...args) {
        this.addEventListener("load", function() {
          if (this.status === 422) {
            try {
              const data = JSON.parse(this.responseText);
              if (data && data.errors) {
                applyErrors(data.errors);
              }
            } catch (e) {
            }
          }
        });
        return originalXHRSend.apply(this, args);
      };
    }
  }
  document.addEventListener("submit", (e) => {
    const form = e.target;
    const allSolInputs = form.querySelectorAll("sol-input, sol-textarea, sol-check, sol-dropdown, sol-switch");
    allSolInputs.forEach((el) => {
      if (typeof el.hideError === "function") el.hideError();
    });
  });
  document.addEventListener("inertia:invalid", (event) => {
    if (event.detail && event.detail.errors) {
      applyErrors(event.detail.errors);
    }
  });
  document.addEventListener("inertia:start", () => {
    applyErrors({});
  });
  document.addEventListener("livewire:initialized", () => {
    window.Livewire.hook("commit", ({ component, commit, respond, succeed, fail }) => {
      succeed(({ snapshot, effect }) => {
        if (snapshot.memo && snapshot.memo.errors) {
          applyErrors(snapshot.memo.errors);
        } else {
          applyErrors({});
        }
      });
      fail(() => {
      });
    });
  });
  document.addEventListener("livewire:load", () => {
    window.Livewire.hook("message.processed", (message, component) => {
      if (message.response && message.response.serverMemo && message.response.serverMemo.errors) {
        applyErrors(message.response.serverMemo.errors);
      } else {
        applyErrors({});
      }
    });
  });
  const checkMetaErrors = () => {
    const metaErrors = document.querySelector('meta[name="laravel-errors"]');
    if (metaErrors && metaErrors.content) {
      try {
        const parsedErrors = JSON.parse(metaErrors.content);
        setTimeout(() => applyErrors(parsedErrors), 50);
      } catch (e) {
        console.error("Solora: Kon laravel-errors meta tag niet parsen.", e);
      }
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkMetaErrors);
  } else {
    checkMetaErrors();
  }
}

// src/index.js
function initAll(config = {}) {
  initButton();
  initInput();
  initTextarea();
  initCodeblocks();
  initDropdown();
  initSwitch();
  initContextMenu();
  initThemeToggle();
  initIcon();
  initAlert(config.alert || {});
  initCard();
  initNavbar();
  initNavDropdown();
  initCheckbox();
  initPopover();
  initModal();
  initWindow();
  initTable();
  initNotification();
  initSidebar();
  initLayout();
  initHr();
  initLaravelSupport();
}
export {
  initAll
};
/*! Bundled license information:

prismjs/prism.js:
  (**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   *)
*/
