module.exports = {
  "extends": ["airbnb-typescript"],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "plugins": [
    
    "react-hooks"
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off'
  }
};
