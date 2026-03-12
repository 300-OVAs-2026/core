import type { Preflight } from '@unocss/core';
import { entriesToCss, toArray } from 'unocss';

import type { Theme } from './types/types';

export const preflights: Preflight<Theme>[] = [
  {
    layer: 'preflights',
    getCSS(ctx) {
      if (ctx.theme.preflightBase) {
        const css = entriesToCss(Object.entries(ctx.theme.preflightBase));
        const roots = toArray(ctx.theme.preflightRoot ?? ['*,::before,::after', '::backdrop']);
        return roots.map((root) => `${root}{${css}}`).join('');
      }
    }
  }
];
