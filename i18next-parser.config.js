const injectAcornStaticClassPropertyInitializer = require("acorn-static-class-property-initializer/inject");
const injectAcornStage3 = require("acorn-stage3/inject");
const injectAcornEs7 = require("acorn-es7");
const injectAcornJsx = require("acorn-jsx/inject");

module.exports = {
  contextSeparator: "_",
  // Key separator used in your translation keys

  createOldCatalogs: true,
  // Save the \_old files

  defaultNamespace: "translation",
  // Default namespace used in your i18next config

  defaultValue: "",
  // Default value to give to empty keys

  indentation: 2,
  // Indentation of the catalog files

  keepRemoved: false,
  // Keep keys from the catalog that are no longer in code

  keySeparator: ".",
  // Key separator used in your translation keys
  // If you want to use plain english keys, separators such as `.` and `:` will conflict. You might want to set `keySeparator: false` and `namespaceSeparator: false`. That way, `t('Status: Loading...')` will not think that there are a namespace and three separator dots for instance.

  // see below for more details
  lexers: {
    js: [
      {
        lexer: "JavascriptLexer",
        functions: ["t"], // Array of functions to match

        // acorn config (for more information on the acorn options, see here: https://github.com/acornjs/acorn#main-parser)
        acorn: {
          injectors: [
            injectAcornStaticClassPropertyInitializer,
            injectAcornStage3,
            injectAcornEs7,
          ],
          plugins: {
            // The presence of these plugin options is important -
            // without them, the plugins will be available but not
            // enabled.
            staticClassPropertyInitializer: true,
            stage3: true,
            es7: true,
          },
          sourceType: "module",
          ecmaVersion: 9,
        },
      },
    ],
    jsx: [
      {
        lexer: "JsxLexer",
        attr: "i18nKey", // Attribute for the keys

        // acorn config (for more information on the acorn options, see here: https://github.com/acornjs/acorn#main-parser)
        acorn: {
          sourceType: "module",
          ecmaVersion: 9, // forward compatibility
          injectors: [injectAcornJsx],
          plugins: {
            jsx: true,
          },
        },
      },
    ],
    ts: [
      {
        lexer: "TypescriptLexer",
        attr: "i18nKey", // Attribute for the keys

        // compiler options (https://www.typescriptlang.org/docs/handbook/compiler-options.html)
        // note that jsx MUST be set to Preserve, or your strings will not be extracted.
        tsOptions: {
          jsx: "Preserve",
          target: "esnext",
        },
      },
    ],
    tsx: [
      {
        lexer: "TypescriptLexer",
        attr: "i18nKey", // Attribute for the keys

        // compiler options (https://www.typescriptlang.org/docs/handbook/compiler-options.html)
        // note that jsx MUST be set to Preserve, or your strings will not be extracted.
        tsOptions: {
          jsx: "Preserve",
          target: "esnext",
        },
      },
    ],
    default: ["JavascriptLexer"],
  },

  lineEnding: "auto",
  // Control the line ending. See options at https://github.com/ryanve/eol

  locales: ["en"],
  // An array of the locales in your applications

  namespaceSeparator: ":",
  // Namespace separator used in your translation keys
  // If you want to use plain english keys, separators such as `.` and `:` will conflict. You might want to set `keySeparator: false` and `namespaceSeparator: false`. That way, `t('Status: Loading...')` will not think that there are a namespace and three separator dots for instance.

  output: "src/i18n/$LOCALE/$NAMESPACE.json",
  // Supports $LOCALE and $NAMESPACE injection
  // Supports JSON (.json) and YAML (.yml) file formats
  // Where to write the locale files relative to process.cwd()

  input: undefined,
  // An array of globs that describe where to look for source files
  // relative to the location of the configuration file

  reactNamespace: false,
  // For react file, extract the defaultNamespace - https://react.i18next.com/components/translate-hoc.html
  // Ignored when parsing a `.jsx` file and namespace is extracted from that file.

  sort: false,
  // Whether or not to sort the catalog

  useKeysAsDefaultValue: false,
  // Whether to use the keys as the default value; ex. "Hello": "Hello", "World": "World"
  // The option `defaultValue` will not work if this is set to true

  verbose: false,
  // Display info about the parsing including some stats
};
