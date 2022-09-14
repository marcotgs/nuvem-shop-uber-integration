module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'prettier',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'import',
	],
	env: {
		node: true,
		jest: true,
	},
	rules: {
		'class-methods-use-this': 'off',
		'import/prefer-default-export': 'off',
		'@typescript-eslint/no-unused-vars': ['error'],
		'@typescript-eslint/no-useless-constructor': ['error'],
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'no-useless-constructor': 'off',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
};
