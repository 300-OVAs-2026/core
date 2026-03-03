import type { Rule } from 'unocss';

import { colorNames } from '../_theme/colors';

/**
 * Utilities de colores que usan las CSS custom properties definidas en global.css
 * Los colores se cargan desde el archivo CSS, no desde JavaScript
 */

/**
 * Genera reglas dinámicas para text color utilizando las CSS custom properties.
 * Ejemplos: u-text-color-brand, u-text-color-accent, u-text-color-highlight
 */
export const textColor: Rule[] = [
  [
    /^u-text-color-(.+)$/,
    ([, color]: string[]) => {
      if (colorNames.includes(color)) {
        return { color: `var(--clr-${color})` };
      }
    }
  ]
];

/**
 * Genera reglas dinámicas para background color utilizando las CSS custom properties.
 * Ejemplos: u-bg-brand, u-bg-accent, u-bg-highlight
 */
export const backgroundColor: Rule[] = [
  [
    /^u-bg-(.+)$/,
    ([, color]: string[]) => {
      if (colorNames.includes(color)) {
        return { 'background-color': `var(--clr-${color})` };
      }
    }
  ]
];

/**
 * Genera reglas dinámicas para border color utilizando las CSS custom properties.
 * Ejemplos: u-border-brand, u-border-accent, u-border-highlight
 */
export const borderColor: Rule[] = [
  [
    /^u-border-(.+)$/,
    ([, color]: string[]) => {
      if (colorNames.includes(color)) {
        return { 'border-color': `var(--clr-${color})` };
      }
    }
  ]
];

/**
 * Utilidades estáticas para colores comunes.
 * Estas proporcionan acceso directo a colores frecuentemente utilizados.
 */
export const staticColorUtilities: Rule[] = [
  // Text colors
  ['u-text-inherit', { color: 'inherit' }],
  ['u-text-current', { color: 'currentColor' }],
  ['u-text-transparent', { color: 'transparent' }],
  
  // Background colors
  ['u-bg-inherit', { 'background-color': 'inherit' }],
  ['u-bg-current', { 'background-color': 'currentColor' }],
  ['u-bg-transparent', { 'background-color': 'transparent' }],
  
  // Border colors
  ['u-border-inherit', { 'border-color': 'inherit' }],
  ['u-border-current', { 'border-color': 'currentColor' }],
  ['u-border-transparent', { 'border-color': 'transparent' }]
];
