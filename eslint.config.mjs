import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
	{
		languageOptions: { globals: globals.node },
		rules: {
			'no-unused-vars': 'error',
			'no-undef': 'error',
		},
	},
	pluginJs.configs.recommended,
];
