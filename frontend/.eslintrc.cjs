module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react/prop-types": 0,
    "formatjs/no-offset": "error",
    "@typescript-eslint/no-shadow": [
      "error"
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn"
    ],
    "@typescript-eslint/no-magic-numbers": [
      "warn",
      {
        "ignoreEnums": true,
        "ignoreNumericLiteralTypes": true
      }
    ],
    "@typescript-eslint/no-use-before-define": [
      "error"
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        "allowExpressions": true
      }
    ],
    "no-shadow": "off",
    "no-alert": "error",
    "no-console": "warn",
    "no-debugger": "error",
    "no-plusplus": "error",
    "no-unused-vars": "off",
    "no-magic-numbers": "off",
    "default-param-last": "off",
    "no-use-before-define": "off",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "react/button-has-type": "off",
    "react/jsx-no-bind": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "off",
    "react/require-default-props": "off",
    "jsx-a11y/click-events-have-key-events": 0,
    "class-methods-use-this": "off",
    "no-return-await": "off",
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 2
      }
    ],
    "no-restricted-syntax": "off",
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],

    "react/display-name": "off",
    "react/react-in-jsx-scope": "off",
    "react/destructuring-assignment": "error",
    "react/forbid-prop-types": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx",
          ".tsx"
        ]
      }
    ],
    "react/function-component-definition": [
      2,
      {
        "namedComponents": "arrow-function",
        "unnamedComponents": "arrow-function"
      }
    ],
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "import/no-cycle": "off",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        "pathGroupsExcludedImportTypes": [
          "react"
        ],
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        },
        "groups": [
          "builtin",
          "external",
          "parent",
          "sibling",
          "index"
        ],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "external",
            "position": "before"
          }
        ]
      }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true,
        "optionalDependencies": true,
        "peerDependencies": true
      }
    ],
    "jsx-a11y/no-interactive-element-to-noninteractive-role": "off"
  },
}
