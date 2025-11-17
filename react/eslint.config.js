// TSのコード品質チェックはESLint + @typescript-eslintが担当
// 整形は完全にPrettierに委任(競合なし)
// PrettierエラーもESLintの警告として表示

import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    // .eslintignoreの代替
    ignores: ['dist/**', 'node_modules/**'],
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: {
			'@typescript-eslint': tseslint,
			prettier: prettierPlugin,
		},
		rules: {
			// extends廃止によって自分でルールを展開
			...tseslint.configs.recommended.rules,

			// Prettier競合無効化
			...prettierConfig.rules,

			// PrettierのフォーマットエラーをESLintに反映
			'prettier/prettier': 'warn',

			// 好みで追加
			// 未使用の変数に警告
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		},
	},
];
