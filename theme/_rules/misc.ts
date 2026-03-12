import type { Rule } from 'unocss';

// ============================================
// VISIBILITY UTILITIES
// ============================================
export const visibility: Rule[] = [
  ['u-visible', { visibility: 'visible' }],
  ['u-invisible', { visibility: 'hidden' }],
  ['u-collapse', { visibility: 'collapse' }]
];

// ============================================
// ASPECT RATIO UTILITIES
// ============================================
export const aspectRatio: Rule[] = [
  ['u-aspect-auto', { 'aspect-ratio': 'auto' }],
  ['u-aspect-square', { 'aspect-ratio': '1 / 1' }],
  ['u-aspect-video', { 'aspect-ratio': '16 / 9' }],
  ['u-aspect-portrait', { 'aspect-ratio': '3 / 4' }],
  ['u-aspect-landscape', { 'aspect-ratio': '4 / 3' }],
  ['u-aspect-ultra', { 'aspect-ratio': '21 / 9' }],
  
  [/^u-aspect-(\d+)\/(\d+)$/, ([, w, h]: string[]) => {
    return { 'aspect-ratio': `${w} / ${h}` };
  }]
];

// ============================================
// OBJECT FIT UTILITIES
// ============================================
export const objectFit: Rule[] = [
  ['u-object-contain', { 'object-fit': 'contain' }],
  ['u-object-cover', { 'object-fit': 'cover' }],
  ['u-object-fill', { 'object-fit': 'fill' }],
  ['u-object-none', { 'object-fit': 'none' }],
  ['u-object-scale-down', { 'object-fit': 'scale-down' }]
];

// ============================================
// OBJECT POSITION UTILITIES
// ============================================
export const objectPosition: Rule[] = [
  ['u-object-bottom', { 'object-position': 'bottom' }],
  ['u-object-center', { 'object-position': 'center' }],
  ['u-object-left', { 'object-position': 'left' }],
  ['u-object-left-bottom', { 'object-position': 'left bottom' }],
  ['u-object-left-top', { 'object-position': 'left top' }],
  ['u-object-right', { 'object-position': 'right' }],
  ['u-object-right-bottom', { 'object-position': 'right bottom' }],
  ['u-object-right-top', { 'object-position': 'right top' }],
  ['u-object-top', { 'object-position': 'top' }]
];

// ============================================
// ISOLATION UTILITIES
// ============================================
export const isolation: Rule[] = [
  ['u-isolate', { isolation: 'isolate' }],
  ['u-isolation-auto', { isolation: 'auto' }]
];

// ============================================
// MIX BLEND MODE UTILITIES
// ============================================
export const mixBlendMode: Rule[] = [
  ['u-mix-blend-normal', { 'mix-blend-mode': 'normal' }],
  ['u-mix-blend-multiply', { 'mix-blend-mode': 'multiply' }],
  ['u-mix-blend-screen', { 'mix-blend-mode': 'screen' }],
  ['u-mix-blend-overlay', { 'mix-blend-mode': 'overlay' }],
  ['u-mix-blend-darken', { 'mix-blend-mode': 'darken' }],
  ['u-mix-blend-lighten', { 'mix-blend-mode': 'lighten' }],
  ['u-mix-blend-color-dodge', { 'mix-blend-mode': 'color-dodge' }],
  ['u-mix-blend-color-burn', { 'mix-blend-mode': 'color-burn' }],
  ['u-mix-blend-hard-light', { 'mix-blend-mode': 'hard-light' }],
  ['u-mix-blend-soft-light', { 'mix-blend-mode': 'soft-light' }],
  ['u-mix-blend-difference', { 'mix-blend-mode': 'difference' }],
  ['u-mix-blend-exclusion', { 'mix-blend-mode': 'exclusion' }],
  ['u-mix-blend-hue', { 'mix-blend-mode': 'hue' }],
  ['u-mix-blend-saturation', { 'mix-blend-mode': 'saturation' }],
  ['u-mix-blend-color', { 'mix-blend-mode': 'color' }],
  ['u-mix-blend-luminosity', { 'mix-blend-mode': 'luminosity' }],
  ['u-mix-blend-plus-darker', { 'mix-blend-mode': 'plus-darker' }],
  ['u-mix-blend-plus-lighter', { 'mix-blend-mode': 'plus-lighter' }]
];

// ============================================
// BACKGROUND BLEND MODE UTILITIES
// ============================================
export const backgroundBlendMode: Rule[] = [
  ['u-bg-blend-normal', { 'background-blend-mode': 'normal' }],
  ['u-bg-blend-multiply', { 'background-blend-mode': 'multiply' }],
  ['u-bg-blend-screen', { 'background-blend-mode': 'screen' }],
  ['u-bg-blend-overlay', { 'background-blend-mode': 'overlay' }],
  ['u-bg-blend-darken', { 'background-blend-mode': 'darken' }],
  ['u-bg-blend-lighten', { 'background-blend-mode': 'lighten' }],
  ['u-bg-blend-color-dodge', { 'background-blend-mode': 'color-dodge' }],
  ['u-bg-blend-color-burn', { 'background-blend-mode': 'color-burn' }],
  ['u-bg-blend-hard-light', { 'background-blend-mode': 'hard-light' }],
  ['u-bg-blend-soft-light', { 'background-blend-mode': 'soft-light' }],
  ['u-bg-blend-difference', { 'background-blend-mode': 'difference' }],
  ['u-bg-blend-exclusion', { 'background-blend-mode': 'exclusion' }],
  ['u-bg-blend-hue', { 'background-blend-mode': 'hue' }],
  ['u-bg-blend-saturation', { 'background-blend-mode': 'saturation' }],
  ['u-bg-blend-color', { 'background-blend-mode': 'color' }],
  ['u-bg-blend-luminosity', { 'background-blend-mode': 'luminosity' }]
];

// ============================================
// FILTER UTILITIES (Basic)
// ============================================
export const filter: Rule[] = [
  ['u-filter', { filter: 'var(--un-blur) var(--un-brightness) var(--un-contrast) var(--un-grayscale) var(--un-hue-rotate) var(--un-invert) var(--un-saturate) var(--un-sepia) var(--un-drop-shadow)' }],
  ['u-filter-none', { filter: 'none' }]
];

// ============================================
// BACKDROP FILTER UTILITIES
// ============================================
export const backdropFilter: Rule[] = [
  ['u-backdrop-filter', { 'backdrop-filter': 'var(--un-backdrop-blur) var(--un-backdrop-brightness) var(--un-backdrop-contrast) var(--un-backdrop-grayscale) var(--un-backdrop-hue-rotate) var(--un-backdrop-invert) var(--un-backdrop-opacity) var(--un-backdrop-saturate) var(--un-backdrop-sepia)' }],
  ['u-backdrop-filter-none', { 'backdrop-filter': 'none' }],
  
  // Backdrop blur
  ['u-backdrop-blur-none', { '--un-backdrop-blur': 'blur(0)' }],
  ['u-backdrop-blur-sm', { '--un-backdrop-blur': 'blur(4px)' }],
  ['u-backdrop-blur', { '--un-backdrop-blur': 'blur(8px)' }],
  ['u-backdrop-blur-md', { '--un-backdrop-blur': 'blur(12px)' }],
  ['u-backdrop-blur-lg', { '--un-backdrop-blur': 'blur(16px)' }],
  ['u-backdrop-blur-xl', { '--un-backdrop-blur': 'blur(24px)' }],
  ['u-backdrop-blur-2xl', { '--un-backdrop-blur': 'blur(40px)' }],
  ['u-backdrop-blur-3xl', { '--un-backdrop-blur': 'blur(64px)' }]
];

// ============================================
// BOX SIZING UTILITIES
// ============================================
export const boxSizing: Rule[] = [
  ['u-box-border', { 'box-sizing': 'border-box' }],
  ['u-box-content', { 'box-sizing': 'content-box' }]
];

// ============================================
// FLOAT UTILITIES
// ============================================
export const float: Rule[] = [
  ['u-float-right', { float: 'right' }],
  ['u-float-left', { float: 'left' }],
  ['u-float-none', { float: 'none' }]
];

export const clear: Rule[] = [
  ['u-clear-left', { clear: 'left' }],
  ['u-clear-right', { clear: 'right' }],
  ['u-clear-both', { clear: 'both' }],
  ['u-clear-none', { clear: 'none' }]
];

// ============================================
// TABLE UTILITIES
// ============================================
export const tableLayout: Rule[] = [
  ['u-table-auto', { 'table-layout': 'auto' }],
  ['u-table-fixed', { 'table-layout': 'fixed' }]
];

export const borderCollapse: Rule[] = [
  ['u-border-collapse', { 'border-collapse': 'collapse' }],
  ['u-border-separate', { 'border-collapse': 'separate' }]
];

export const borderSpacing: Rule[] = [
  ['u-border-spacing-0', { 'border-spacing': '0' }],
  ['u-border-spacing-1', { 'border-spacing': '0.25rem' }],
  ['u-border-spacing-2', { 'border-spacing': '0.5rem' }],
  ['u-border-spacing-4', { 'border-spacing': '1rem' }]
];

// ============================================
// BREAK AFTER/BEFORE/INSIDE UTILITIES
// ============================================
export const breakAfter: Rule[] = [
  ['u-break-after-auto', { 'break-after': 'auto' }],
  ['u-break-after-avoid', { 'break-after': 'avoid' }],
  ['u-break-after-all', { 'break-after': 'all' }],
  ['u-break-after-avoid-page', { 'break-after': 'avoid-page' }],
  ['u-break-after-page', { 'break-after': 'page' }],
  ['u-break-after-left', { 'break-after': 'left' }],
  ['u-break-after-right', { 'break-after': 'right' }],
  ['u-break-after-column', { 'break-after': 'column' }]
];

export const breakBefore: Rule[] = [
  ['u-break-before-auto', { 'break-before': 'auto' }],
  ['u-break-before-avoid', { 'break-before': 'avoid' }],
  ['u-break-before-all', { 'break-before': 'all' }],
  ['u-break-before-avoid-page', { 'break-before': 'avoid-page' }],
  ['u-break-before-page', { 'break-before': 'page' }],
  ['u-break-before-left', { 'break-before': 'left' }],
  ['u-break-before-right', { 'break-before': 'right' }],
  ['u-break-before-column', { 'break-before': 'column' }]
];

export const breakInside: Rule[] = [
  ['u-break-inside-auto', { 'break-inside': 'auto' }],
  ['u-break-inside-avoid', { 'break-inside': 'avoid' }],
  ['u-break-inside-avoid-page', { 'break-inside': 'avoid-page' }],
  ['u-break-inside-avoid-column', { 'break-inside': 'avoid-column' }]
];
