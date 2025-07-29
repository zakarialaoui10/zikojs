module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "ignorePatterns": ["**/*.txt"],
    "rules": {
        // Disallow missing extensions
        'import/extensions': ['error', 'always', {
            js: 'always',
        }],
    }
}
