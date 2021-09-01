module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        }
    },
    settings: {
        react: {
            version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    },
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended' // Uses the recommended rules from @typescript-eslint/eslint-plugin
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-trailing-spaces': ['error'],

        // formatters
        'indent': ['warn', 4, { 'SwitchCase': 1 }],
        'no-else-return': 1,
        'semi': [1, 'always'],
        'space-unary-ops': 2
        //

        // 'space-in-brackets': ['error', 'never'],
        // 'sort-vars': ['error', { 'ignoreCase': true }]
    },
    ignorePatterns: ['/build/'],
};