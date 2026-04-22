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

// src/components/codeblock.js
var import_prismjs = __toESM(require_prism());
var import_components = __toESM(require_components2());
function initCodeblocks() {
  const blocks = document.querySelectorAll(".codeblock");
  blocks.forEach((block) => {
    const pre = block.querySelector("pre");
    const copyBtn = block.querySelector(".pre-copy-btn");
    const closeBtn = block.querySelector(".close-btn");
    const minimizeBtn = block.querySelector(".minimize-btn");
    const preContent = block.querySelector(".pre-content");
    if (!pre || !preContent) return;
    if (copyBtn && copyBtn.classList.contains("btn-in-pre")) {
      preContent.insertBefore(copyBtn, preContent.firstChild);
    }
    if (copyBtn && !copyBtn.dataset.bound) {
      copyBtn.dataset.bound = "true";
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(pre.innerText);
          const oldText = copyBtn.innerText;
          copyBtn.innerText = "Copied!";
          setTimeout(() => copyBtn.innerText = oldText, 1200);
        } catch (err) {
          console.error("Copy failed:", err);
        }
      });
    }
    const code = pre.textContent;
    const lang = (pre.dataset.language || "javascript").toLowerCase();
    if (!import_prismjs.default.languages[lang]) {
      console.warn(`Language '${lang}' not loaded in Prism, using plaintext fallback.`);
      pre.textContent = code;
    } else {
      pre.innerHTML = import_prismjs.default.highlight(code, import_prismjs.default.languages[lang], lang);
    }
    if (closeBtn) closeBtn.addEventListener("click", () => {
      block.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      block.style.opacity = 0;
      block.style.transform = "scale(0.95)";
      setTimeout(() => block.remove(), 300);
    });
    if (minimizeBtn) minimizeBtn.addEventListener("click", () => {
      preContent.classList.toggle("collapsed");
    });
    const maximizeBtn = block.querySelector(".maximize-btn");
    if (maximizeBtn) initMaximizeButton(block, maximizeBtn);
  });
}
function initMaximizeButton(block, maximizeBtn) {
  maximizeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    if (!block.dataset.origRect) {
      const rect = block.getBoundingClientRect();
      block.dataset.origRect = JSON.stringify({
        top: rect.top + scrollY,
        left: rect.left + scrollX,
        width: rect.width,
        height: rect.height
      });
    }
    void block.offsetWidth;
    if (block.dataset.isFullscreen !== "true") {
      const rect = block.getBoundingClientRect();
      const startRect = { top: rect.top + scrollY, left: rect.left + scrollX, width: rect.width, height: rect.height };
      Object.assign(block.style, {
        position: "fixed",
        top: `${startRect.top}px`,
        left: `${startRect.left}px`,
        width: `${startRect.width}px`,
        height: `${startRect.height}px`,
        margin: "0",
        zIndex: 9999,
        transition: "all 0.3s ease"
      });
      void block.offsetWidth;
      Object.assign(block.style, { top: "0", left: "0", width: "100%", height: "100%", borderRadius: "0" });
      block.dataset.isFullscreen = "true";
    } else {
      const origRect = JSON.parse(block.dataset.origRect);
      Object.assign(block.style, {
        transition: "all 0.3s ease",
        top: `${origRect.top}px`,
        left: `${origRect.left}px`,
        width: `${origRect.width}px`,
        height: "auto",
        borderRadius: "12px"
      });
      block.addEventListener("transitionend", () => {
        Object.assign(block.style, {
          transition: "",
          position: "",
          top: "",
          left: "",
          width: "",
          height: "",
          zIndex: ""
        });
        block.dataset.isFullscreen = "false";
      }, { once: true });
    }
  });
}

// src/components/dropdown.js
function initDropdowns() {
  if (typeof window === "undefined") return;
  document.querySelectorAll(".dropdown").forEach((drop) => {
    if (drop.dataset.initialized) return;
    drop.dataset.initialized = "true";
    const btn = drop.querySelector(".dropdown-btn");
    const content = drop.querySelector(".dropdown-content");
    if (!btn || !content) return;
    let hiddenInput = drop.querySelector('input[type="hidden"]');
    if (!hiddenInput) {
      hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.name = drop.dataset.name || "dropdown";
      drop.appendChild(hiddenInput);
    }
    const getItems = () => Array.from(content.querySelectorAll('.dropdown-item:not([aria-disabled="true"])'));
    const setValue = (item) => {
      if (item.getAttribute("aria-disabled") === "true") return;
      btn.innerHTML = item.innerHTML;
      content.querySelectorAll(".dropdown-item").forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
      hiddenInput.value = item.dataset.value ?? item.textContent.trim();
      drop.dispatchEvent(new CustomEvent("change", { detail: hiddenInput.value }));
    };
    const initialItem = content.querySelector(".dropdown-item.active") || content.querySelector('.dropdown-item:not([aria-disabled="true"])');
    if (initialItem) setValue(initialItem);
    const toggle = () => drop.classList.toggle("open");
    const close = () => drop.classList.remove("open");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
    });
    document.addEventListener("click", (e) => {
      if (!drop.contains(e.target)) close();
    });
    btn.addEventListener("keydown", (e) => {
      if (!["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) return;
      const items = getItems();
      let currentIndex = items.findIndex((i) => i.classList.contains("active"));
      e.preventDefault();
      drop.classList.add("open");
      if (e.key === "ArrowDown") {
        currentIndex = (currentIndex + 1) % items.length;
      } else if (e.key === "ArrowUp") {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
      } else if (e.key === "Enter") {
        if (currentIndex >= 0) setValue(items[currentIndex]);
        close();
        return;
      } else if (e.key === "Escape") {
        close();
        return;
      }
      items.forEach((i) => i.classList.remove("active"));
      items[currentIndex].classList.add("active");
      items[currentIndex].scrollIntoView({ block: "nearest" });
    });
    content.addEventListener("click", (e) => {
      const item = e.target.closest(".dropdown-item");
      if (item) {
        setValue(item);
        close();
      }
    });
    btn.setAttribute("tabindex", "0");
    btn.setAttribute("role", "combobox");
    btn.setAttribute("aria-haspopup", "listbox");
  });
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
    e.preventDefault();
    contextTarget = e.target;
    const selection = window.getSelection().toString().trim();
    const link = e.target.closest("a");
    const img = e.target.closest("img");
    const input = e.target.closest("input, textarea, [contenteditable]");
    const isEditable = input || e.target.isContentEditable;
    const isTextInput = input && (input.type === "text" || input.type === "search" || input.type === "email" || input.type === "password" || input.tagName === "TEXTAREA" || input.isContentEditable);
    let menuHtml = "";
    if (selection.length > 0) {
      menuHtml += `
                <div class="sol-menu-label">Selectie</div>
                <div class="sol-menu-item" data-action="copy">
                    Kopieer <span class="sol-menu-shortcut">\u2318C</span>
                </div>
                ${isEditable ? `
                <div class="sol-menu-item" data-action="cut">
                    Knippen <span class="sol-menu-shortcut">\u2318X</span>
                </div>` : ""}
                <div class="sol-menu-item" data-action="search-google">
                    Zoek op Google: <em>"${selection.slice(0, 20)}${selection.length > 20 ? "\u2026" : ""}"</em>
                </div>
                <div class="sol-menu-item" data-action="search-wiki">
                    Zoek op Wikipedia\u2026
                </div>
                <div class="sol-menu-item" data-action="translate">
                    Vertaal selectie\u2026
                </div>
                <div class="sol-menu-divider"></div>
            `;
    }
    if (isTextInput) {
      menuHtml += `
                <div class="sol-menu-label">Tekstveld</div>
                ${selection.length > 0 ? `
                <div class="sol-menu-item" data-action="cut">
                    Knippen <span class="sol-menu-shortcut">\u2318X</span>
                </div>
                <div class="sol-menu-item" data-action="copy">
                    Kopieer <span class="sol-menu-shortcut">\u2318C</span>
                </div>` : ""}
                <div class="sol-menu-item" data-action="paste">
                    Plakken <span class="sol-menu-shortcut">\u2318V</span>
                </div>
                <div class="sol-menu-item" data-action="select-all">
                    Alles selecteren <span class="sol-menu-shortcut">\u2318A</span>
                </div>
                <div class="sol-menu-item" data-action="clear-field">
                    Veld wissen
                </div>
                <div class="sol-menu-divider"></div>
            `;
    }
    if (img) {
      menuHtml += `
                <div class="sol-menu-label">Afbeelding</div>
                <div class="sol-menu-item" data-action="open-img" data-url="${img.src}">
                    Afbeelding openen in nieuw tabblad
                </div>
                <div class="sol-menu-item" data-action="copy-img-url" data-url="${img.src}">
                    Kopieer afbeeldings-URL
                </div>
                <div class="sol-menu-item" data-action="download-img" data-url="${img.src}" data-filename="${img.alt || "afbeelding"}">
                    Afbeelding opslaan\u2026
                </div>
                ${img.alt ? `
                <div class="sol-menu-item" data-action="copy-alt" data-text="${img.alt}">
                    Kopieer alt-tekst
                </div>` : ""}
                <div class="sol-menu-divider"></div>
            `;
    }
    if (link) {
      menuHtml += `
                <div class="sol-menu-label">Link</div>
                <div class="sol-menu-item" data-action="open-tab" data-url="${link.href}">
                    Open in nieuw tabblad
                </div>
                <div class="sol-menu-item" data-action="open-window" data-url="${link.href}">
                    Open in nieuw venster
                </div>
                <div class="sol-menu-item" data-action="copy-link" data-url="${link.href}">
                    Kopieer link-adres
                </div>
                <div class="sol-menu-divider"></div>
            `;
    }
    menuHtml += `
            <div class="sol-menu-label">Navigatie</div>
            <div class="sol-menu-item${!history.length || history.state === null ? " disabled" : ""}" data-action="go-back">
                \u2190 Vorige pagina
            </div>
            <div class="sol-menu-item" data-action="go-forward">
                \u2192 Volgende pagina
            </div>
            <div class="sol-menu-item" data-action="reload">
                Vernieuwen <span class="sol-menu-shortcut">\u2318R</span>
            </div>
            <div class="sol-menu-item" data-action="hard-reload">
                Geforceerd vernieuwen <span class="sol-menu-shortcut">\u21E7\u2318R</span>
            </div>
            <div class="sol-menu-divider"></div>
        `;
    menuHtml += `
            <div class="sol-menu-label">Pagina</div>
            <div class="sol-menu-item" data-action="copy-page-url">
                Kopieer pagina-URL
            </div>
            <div class="sol-menu-item" data-action="view-source">
                Bekijk paginabron <span class="sol-menu-shortcut">\u2318U</span>
            </div>
            <div class="sol-menu-item" data-action="print">
                Printen <span class="sol-menu-shortcut">\u2318P</span>
            </div>
            <div class="sol-menu-item" data-action="save-page">
                Pagina opslaan <span class="sol-menu-shortcut">\u2318S</span>
            </div>
            <div class="sol-menu-item" data-action="scroll-top">
                Naar boven scrollen
            </div>
            <div class="sol-menu-divider"></div>
        `;
    menuHtml += `
            <div class="sol-menu-label">Ontwikkelaar</div>
            <div class="sol-menu-item" data-action="inspect">
                Inspecteer element <span class="sol-menu-shortcut">\u2325\u2318I</span>
            </div>
            <div class="sol-menu-item" data-action="copy-selector">
                Kopieer CSS-selector
            </div>
            <div class="sol-menu-item" data-action="log-element">
                Log element in console
            </div>
        `;
    menu.innerHTML = menuHtml;
    menu.style.display = "block";
    let posX = e.clientX;
    let posY = e.clientY;
    const menuWidth = menu.offsetWidth;
    const menuHeight = menu.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    if (posX + menuWidth > windowWidth) {
      posX = posX - menuWidth;
    }
    if (posY + menuHeight > windowHeight) {
      posY = posY - menuHeight;
    }
    posX = Math.max(5, posX);
    posY = Math.max(5, posY);
    menu.style.left = `${posX}px`;
    menu.style.top = `${posY}px`;
    requestAnimationFrame(() => menu.classList.add("visible"));
  };
  const hideMenu = () => {
    menu.classList.remove("visible");
    setTimeout(() => {
      if (!menu.classList.contains("visible")) menu.style.display = "none";
    }, 150);
  };
  const getCssSelector = (el) => {
    if (!el) return "";
    const parts = [];
    while (el && el.nodeType === Node.ELEMENT_NODE) {
      let selector = el.nodeName.toLowerCase();
      if (el.id) {
        selector += `#${el.id}`;
        parts.unshift(selector);
        break;
      }
      if (el.className) {
        selector += "." + [...el.classList].join(".");
      }
      const siblings = el.parentNode ? [...el.parentNode.children].filter((s) => s.nodeName === el.nodeName) : [];
      if (siblings.length > 1) {
        selector += `:nth-of-type(${siblings.indexOf(el) + 1})`;
      }
      parts.unshift(selector);
      el = el.parentNode;
    }
    return parts.join(" > ");
  };
  document.addEventListener("contextmenu", showMenu);
  document.addEventListener("click", hideMenu);
  window.addEventListener("scroll", hideMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideMenu();
  });
  menu.addEventListener("click", (e) => {
    const item = e.target.closest(".sol-menu-item");
    if (!item || item.classList.contains("disabled")) return;
    const action = item.dataset.action;
    const url = item.dataset.url;
    const text = item.dataset.text;
    const filename = item.dataset.filename;
    const sel = window.getSelection().toString().trim();
    switch (action) {
      // Tekst
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
      case "clear-field":
        if (contextTarget?.closest("input, textarea")) contextTarget.closest("input, textarea").value = "";
        break;
      // Zoeken & vertalen
      case "search-google":
        window.open(`https://www.google.com/search?q=${encodeURIComponent(sel)}`, "_blank");
        break;
      case "search-wiki":
        window.open(`https://nl.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(sel)}`, "_blank");
        break;
      case "translate":
        window.open(`https://translate.google.com/?sl=auto&tl=nl&text=${encodeURIComponent(sel)}`, "_blank");
        break;
      // Afbeelding
      case "open-img":
        window.open(url, "_blank");
        break;
      case "copy-img-url":
        navigator.clipboard.writeText(url);
        break;
      case "copy-alt":
        navigator.clipboard.writeText(text);
        break;
      case "download-img": {
        const a = document.createElement("a");
        a.href = url;
        a.download = filename || "afbeelding";
        a.click();
        break;
      }
      // Link
      case "open-tab":
        window.open(url, "_blank");
        break;
      case "open-window":
        window.open(url, "_blank", "noopener,noreferrer");
        break;
      case "copy-link":
        navigator.clipboard.writeText(url);
        break;
      // Navigatie
      case "go-back":
        history.back();
        break;
      case "go-forward":
        history.forward();
        break;
      case "reload":
        location.reload();
        break;
      case "hard-reload":
        location.href = location.href;
        break;
      // Pagina
      case "copy-page-url":
        navigator.clipboard.writeText(location.href);
        break;
      case "view-source":
        window.open(`view-source:${location.href}`, "_blank");
        break;
      case "print":
        window.print();
        break;
      case "save-page":
        document.execCommand("SaveAs");
        break;
      case "scroll-top":
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      // Ontwikkelaar
      case "inspect":
        console.log("%c[Inspecteer element]", "color:#6c63ff;font-weight:bold", contextTarget);
        break;
      case "copy-selector":
        navigator.clipboard.writeText(getCssSelector(contextTarget));
        break;
      case "log-element":
        console.log("%c[Sol Context Menu] Geselecteerd element:", "color:#6c63ff", contextTarget);
        console.table({
          tag: contextTarget?.tagName,
          id: contextTarget?.id,
          classes: contextTarget?.className,
          selector: getCssSelector(contextTarget),
          innerText: contextTarget?.innerText?.slice(0, 80)
        });
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
  const slider = document.createElement("div");
  slider.className = "slider";
  switchElement.appendChild(input);
  switchElement.appendChild(slider);
  slider.addEventListener("click", () => {
    input.checked = !input.checked;
    switchElement.dispatchEvent(new Event("change", { bubbles: true }));
  });
  function updateColors() {
    const primary = switchElement.getAttribute("color-primary") || "#34c759";
    const secondary = switchElement.getAttribute("color-secondary") || "#d1d1d6";
    const bg = switchElement.getAttribute("color-bg") || "#e9e9ea";
    const text = switchElement.getAttribute("color-text") || "white";
    switchElement.style.setProperty("--color-primary", primary);
    switchElement.style.setProperty("--color-secondary", secondary);
    switchElement.style.setProperty("--color-bg", bg);
    switchElement.style.setProperty("--color-text", text);
  }
  updateColors();
  const observer = new MutationObserver(updateColors);
  observer.observe(switchElement, {
    attributes: true,
    attributeFilter: ["color-primary", "color-secondary", "color-bg", "color-text"]
  });
}

// src/index.js
function initAll() {
  initCodeblocks();
  initDropdowns();
  initSwitch();
  initContextMenu();
  initThemeToggle();
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
