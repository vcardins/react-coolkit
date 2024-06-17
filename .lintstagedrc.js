module.exports = {
  '**/*.css': ['stylelint'],
  '**/*.{js,ts,tsx}': [
    'eslint --cache --cache-location node_modules/.cache/eslint --cache-strategy content',
  ],
  '**/*.{md,mdx,yml}': ['prettier --check'],
  '**/*.{ts,tsx}': () => 'npm run lint:types'
};
