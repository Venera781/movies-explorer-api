module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: ['eslint:recommended', 'airbnb-base', 'prettier'],

  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-console': 'off',
    'import/extensions': ['error', 'ignorePackages'],
    "sort-imports": [
      "error",
      {
        "ignoreCase": false,
        "ignoreDeclarationSort": true,
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
        "allowSeparatedGroups": true
      }
    ],
    // turn on errors for missing imports
    "import/no-unresolved": "error",
    "import/order": [
      "error",
      {
        "groups": [
          "builtin", // Built-in imports (come from NodeJS native) go first
          "external", // <- External imports
          "internal", // <- Absolute imports
          ["sibling", "parent"], // <- Relative imports, the sibling and parent types they can be mingled together
          "index", // <- index imports
          "unknown", // <- unknown
        ],
        "newlines-between": "always",
        "alphabetize": {
          /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
          "order": "asc",
          /* ignore case. Options: [true, false] */
          "caseInsensitive": true
        }
      }
    ]
  },
};
