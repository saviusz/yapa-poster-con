import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintReact from "@eslint-react/eslint-plugin";
import perfectionist from 'eslint-plugin-perfectionist';
import stylistic from '@stylistic/eslint-plugin'


export default tseslint.config(
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { ignores: ["**/node_modules/**", ".next/**"] },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
      globals: { ...globals.browser, ...globals.node }
    }
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  eslintReact.configs.recommended,
  {
    plugins: {
      perfectionist,
      "@stylistic": stylistic
    },
    rules: {
      "@stylistic/array-bracket-newline": [
        "error"
      ],
      "@stylistic/array-bracket-spacing": [
        "error",
        "always",
        {
          "arraysInArrays": false
        }
      ],
      "@stylistic/arrow-spacing": "error",
      "@stylistic/block-spacing": "warn",
      "@stylistic/brace-style": "error",
      "@stylistic/comma-dangle": [
        "error",
        "only-multiline"
      ],
      "@stylistic/comma-spacing": "error",
      "@stylistic/comma-style": "error",
      "@stylistic/dot-location": [
        "error",
        "property"
      ],
      "@stylistic/eol-last": "error",
      "@stylistic/func-call-spacing": "error",
      "@stylistic/function-call-argument-newline": [
        "error",
        "consistent"
      ],
      "@stylistic/function-paren-newline": [
        "error",
        "multiline-arguments"
      ],
      "@stylistic/indent": [
        "error",
        2,
        {
          "SwitchCase": 1,
          "VariableDeclarator": "first",
          "FunctionExpression": {
            "parameters": "first"
          },
          "CallExpression": {
            "arguments": "first"
          },
          "ArrayExpression": "first",
          "ObjectExpression": "first",
          "ImportDeclaration": "first",
          "flatTernaryExpressions": true,
          "offsetTernaryExpressions": true
        }
      ],
      "@stylistic/key-spacing": [
        "error",
        {
          "singleLine": {
            "beforeColon": false,
            "afterColon": true
          },
          "multiLine": {
            "beforeColon": false,
            "afterColon": true
          },
          "align": {
            "beforeColon": true,
            "afterColon": true,
            "on": "colon"
          }
        }
      ],
      "@stylistic/linebreak-style": "error",
      "@stylistic/lines-around-comment": "error",
      "@stylistic/lines-between-class-members": [
        "error",
        "always",
        {
          "exceptAfterSingleLine": true
        }
      ],
      "@stylistic/max-len": [
        "warn",
        {
          "code": 100,
          "comments": 80,
          "ignoreTrailingComments": true,
          "ignoreUrls": true,
          "ignoreTemplateLiterals": true
        }
      ],
      "@stylistic/max-statements-per-line": "error",
      "@stylistic/multiline-ternary": [
        "error",
        "always-multiline"
      ],
      "@stylistic/new-parens": "error",
      "@stylistic/newline-per-chained-call": "error",
      "@stylistic/no-confusing-arrow": [
        "error",
        {
          "onlyOneSimpleParam": true
        }
      ],
      "@stylistic/no-extra-parens": [
        "error",
        "all",
        {
          "nestedBinaryExpressions": false,
          "enforceForArrowConditionals": false
        }
      ],
      "@stylistic/no-extra-semi": "error",
      "@stylistic/no-floating-decimal": "error",
      "@stylistic/no-mixed-operators": "error",
      "@stylistic/no-mixed-spaces-and-tabs": "error",
      "@stylistic/no-multiple-empty-lines": "error",
      "@stylistic/no-tabs": "warn",
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/no-whitespace-before-property": "error",
      "@stylistic/nonblock-statement-body-position": "error",
      "@stylistic/object-curly-newline": [
        "error",
        {
          "consistent": true
        }
      ],
      "@stylistic/object-curly-spacing": [
        "error",
        "always"
      ],
      "@stylistic/one-var-declaration-per-line": "error",
      "@stylistic/operator-linebreak": [
        "error",
        "before"
      ],
      "@stylistic/padded-blocks": [
        "error",
        {
          "classes": "always"
        }
      ],
      "@stylistic/padding-line-between-statements": [
        "error",
        {
          "blankLine": "always",
          "prev": [
            "break",
            "return"
          ],
          "next": ["case", "default"]
        }
      ],
      "@stylistic/quote-props": [
        "error",
        "as-needed"
      ],
      "@stylistic/quotes": [
        "error",
        "double",
        {
          "allowTemplateLiterals": true
        }
      ],
      "@stylistic/rest-spread-spacing": "error",
      "@stylistic/semi": [
        "error",
        "always",
        {
          "omitLastInOneLineBlock": true,
          "omitLastInOneLineClassBody": true
        }
      ],
      "@stylistic/semi-spacing": "error",
      "@stylistic/semi-style": "error",
      "@stylistic/space-before-blocks": "error",
      "@stylistic/space-before-function-paren": [
        "error",
        {
          "anonymous": "always",
          "named": "never",
          "asyncArrow": "always"
        }
      ],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/space-unary-ops": "error",
      "@stylistic/spaced-comment": ["error", "always", { "markers": ["/"] }],
      "@stylistic/switch-colon-spacing": "error",
      "@stylistic/template-curly-spacing": "error",
      "@stylistic/template-tag-spacing": "error",
      "@stylistic/wrap-regex": "error",
      "@stylistic/yield-star-spacing": "error",
      "@stylistic/member-delimiter-style": "error",
      "perfectionist/sort-classes": [
        "warn", {
          "type": "natural",
          "groups": [
            "index-signature",
            "static-property",
            "private-property",
            "property",
            "constructor",
            "static-method",
            "private-method",
            "static-private-method",
            "method",
            ["get-method", "set-method"],
            "unknown"
          ]
        }
      ],
      "perfectionist/sort-imports": [
        "warn",
        {
          "type": "natural",
          "groups": [
            "style",
            "type",
            ["builtin", "external"],
            "internal-type",
            "internal",
            ["parent-type", "sibling-type", "index-type"],
            ["parent", "sibling", "index"],
            "object",
            "unknown"
          ],
          "newlinesBetween": "always",
          "internalPattern": [
            "@/.*"
          ]
        }
      ]
    }
  }
);