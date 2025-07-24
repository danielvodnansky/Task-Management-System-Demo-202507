// @ts-check
import stylisticTs from '@stylistic/eslint-plugin'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['**/*.ts', '**/*.vue'],
    plugins: {
      '@stylistic/ts': stylisticTs,
    },

    ignores: ['.**service/*'],
    rules: {
      'no-console': 'off',
      'nuxt/nuxt-config-keys-order': 'off',

      '@stylistic/ts/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
          multilineDetection: 'brackets',
        },
      ],
      '@stylistic/space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'always',
          asyncArrow: 'always',
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'off',
      'import/newline-after-import': 'error',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/indent-binary-ops': 'off',
      '@stylistic/ts/indent': [
        'error',
        2,
        {
          ignoredNodes: ['ConditionalExpression'],
          SwitchCase: 1,
        },
      ],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@stylistic/quote-props': ['error', 'consistent-as-needed'],
      'space-in-parens': ['error', 'never'],
      'space-infix-ops': ['error', { int32Hint: false }],
      'vue/no-deprecated-v-on-native-modifier': 'off',
      'vue/multi-word-component-names': 'off',
      '@stylistic/array-element-newline': ['error', { minItems: 2 }],
      '@stylistic/array-bracket-newline': ['error', { multiline: true }],
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'CONDITIONALS',
            'LIST_RENDERING',
            'RENDER_MODIFIERS',
            'GLOBAL',
            ['UNIQUE', 'SLOT'],
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
          ],
          alphabetical: true,
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 1,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: 'ts',
          },
        },
      ],
      'vue/no-required-prop-with-default': [
        'error',
        {
          autofix: false,
        },
      ],
    },
  },
  {},
)
