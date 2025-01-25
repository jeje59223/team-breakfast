import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import pluginVitest from '@vitest/eslint-plugin';
import pluginCypress from 'eslint-plugin-cypress/flat';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*']
  },

  {
    ...pluginCypress.configs.recommended,
    files: [
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}'
    ]
  },
  skipFormatting,
  {
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'never'],
      'max-len': ['error', { code: 120 }],
      'semi': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'quotes': ['error', 'single'],
      'vue/multi-word-component-names': 'off',
      'vue/html-indent': ['error', 2, {
        'attribute': 1,
        'baseIndent': 1,
        'closeBracket': 0,
        'alignAttributesVertically': true,
        'ignores': []
      }],

      'vue/max-attributes-per-line': ['error', {
        'singleline': 1,
        'multiline': 1
      }],

      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': ['error', {
        'allowEmptyLines': false
      }]
    }
  }
];
