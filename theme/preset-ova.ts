import { definePreset } from 'unocss';

import { rules } from './_rules/default';
import { theme } from './_theme/default';
import { preflights } from './preflights';

export const presetOVA = definePreset(() => {
  return {
    name: 'preset-ova',
    theme,
    rules,
    preflights
  };
});
