module.exports = {
	env: {
		es2020: true,
		node: true,
	},
	plugins: ['simple-import-sort', 'chai-friendly', 'import'],
	extends: ['eslint:recommended', 'airbnb-base', 'prettier'],
	parserOptions: {
		ecmaVersion: 11,
		sourceType: 'module',
	},
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': 'off',
		'no-console': 'off',
		'no-unused-expressions': 0,
		'chai-friendly/no-unused-expressions': 2,
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'sort-imports': 'off',
		'import/order': 'off',
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [['~', './src']],
				extensions: ['.js', '.jsx'],
			},
		},
	},
};
