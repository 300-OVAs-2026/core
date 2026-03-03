import { fontSizeBase } from '../_rules/font';

import type { Theme } from '../types/types';

/**
 * Los colores ahora se cargan desde src/styles/global.css
 * Solo incluimos los font sizes en el preflight de UnoCSS
 */
export const preflightBase = {
  ...fontSizeBase
} satisfies Theme['preflightBase'];

export const preflightRoot = ':root' satisfies Theme['preflightRoot'];
