import type { Rule } from 'unocss';

import { fontSizeValues } from '../utils/mapping';

export const fontSizeBase = {
  '--fs-100': fontSizeValues['100'],
  '--fs-200': fontSizeValues['200'],
  '--fs-300': fontSizeValues['300'],
  '--fs-400': fontSizeValues['400'],
  '--fs-500': fontSizeValues['500'],
  '--fs-600': fontSizeValues['600'],
  '--fs-700': fontSizeValues['700'],
  '--fs-800': fontSizeValues['800'],
  '--fs-900': fontSizeValues['900'],
  '--fs-1000': fontSizeValues['1000'],
  '--fs-1100': fontSizeValues['1100'],
  '--fs-1200': fontSizeValues['1200']
};

export const fontSize: Rule[] = [
  [
    /^u-fs-(\d+)$/,
    ([, size]) => {
      if (fontSizeValues[size]) {
        return { 'font-size': `${fontSizeValues[size]}` };
      }
    }
  ]
];
