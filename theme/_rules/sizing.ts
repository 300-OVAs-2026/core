import type { Rule } from 'unocss';

// ============================================
// WIDTH UTILITIES
// ============================================
export const width: Rule[] = [
  // Fixed values
  ['u-w-auto', { width: 'auto' }],
  ['u-w-full', { width: '100%' }],
  ['u-w-screen', { width: '100vw' }],
  ['u-w-min', { width: 'min-content' }],
  ['u-w-max', { width: 'max-content' }],
  ['u-w-fit', { width: 'fit-content' }],
  
  // Fractions
  ['u-w-1/2', { width: '50%' }],
  ['u-w-1/3', { width: '33.333333%' }],
  ['u-w-2/3', { width: '66.666667%' }],
  ['u-w-1/4', { width: '25%' }],
  ['u-w-2/4', { width: '50%' }],
  ['u-w-3/4', { width: '75%' }],
  ['u-w-1/5', { width: '20%' }],
  ['u-w-2/5', { width: '40%' }],
  ['u-w-3/5', { width: '60%' }],
  ['u-w-4/5', { width: '80%' }],
  ['u-w-1/6', { width: '16.666667%' }],
  ['u-w-5/6', { width: '83.333333%' }],
  
  // Numeric values (rem based)
  [/^u-w-(\d+)$/, ([, n]: string[]) => {
    const value = parseInt(n);
    return { width: `${value * 0.25}rem` };
  }]
];

// ============================================
// HEIGHT UTILITIES
// ============================================
export const height: Rule[] = [
  // Fixed values
  ['u-h-auto', { height: 'auto' }],
  ['u-h-full', { height: '100%' }],
  ['u-h-screen', { height: '100vh' }],
  ['u-h-min', { height: 'min-content' }],
  ['u-h-max', { height: 'max-content' }],
  ['u-h-fit', { height: 'fit-content' }],
  
  // Fractions
  ['u-h-1/2', { height: '50%' }],
  ['u-h-1/3', { height: '33.333333%' }],
  ['u-h-2/3', { height: '66.666667%' }],
  ['u-h-1/4', { height: '25%' }],
  ['u-h-3/4', { height: '75%' }],
  ['u-h-1/5', { height: '20%' }],
  ['u-h-2/5', { height: '40%' }],
  ['u-h-3/5', { height: '60%' }],
  ['u-h-4/5', { height: '80%' }],
  
  // Numeric values (rem based)
  [/^u-h-(\d+)$/, ([, n]: string[]) => {
    const value = parseInt(n);
    return { height: `${value * 0.25}rem` };
  }]
];

// ============================================
// MIN/MAX WIDTH UTILITIES
// ============================================
export const minWidth: Rule[] = [
  ['u-min-w-0', { 'min-width': '0' }],
  ['u-min-w-full', { 'min-width': '100%' }],
  ['u-min-w-min', { 'min-width': 'min-content' }],
  ['u-min-w-max', { 'min-width': 'max-content' }],
  ['u-min-w-fit', { 'min-width': 'fit-content' }],
  
  // Preset sizes
  ['u-min-w-xs', { 'min-width': '20rem' }],
  ['u-min-w-sm', { 'min-width': '24rem' }],
  ['u-min-w-md', { 'min-width': '28rem' }],
  ['u-min-w-lg', { 'min-width': '32rem' }],
  ['u-min-w-xl', { 'min-width': '36rem' }],
  ['u-min-w-2xl', { 'min-width': '42rem' }],
  ['u-min-w-3xl', { 'min-width': '48rem' }],
  ['u-min-w-4xl', { 'min-width': '56rem' }],
  ['u-min-w-5xl', { 'min-width': '64rem' }],
  ['u-min-w-6xl', { 'min-width': '72rem' }],
  ['u-min-w-7xl', { 'min-width': '80rem' }]
];

export const maxWidth: Rule[] = [
  ['u-max-w-none', { 'max-width': 'none' }],
  ['u-max-w-full', { 'max-width': '100%' }],
  ['u-max-w-min', { 'max-width': 'min-content' }],
  ['u-max-w-max', { 'max-width': 'max-content' }],
  ['u-max-w-fit', { 'max-width': 'fit-content' }],
  ['u-max-w-prose', { 'max-width': '65ch' }],
  ['u-max-w-screen', { 'max-width': '100vw' }],
  
  // Preset sizes
  ['u-max-w-xs', { 'max-width': '20rem' }],
  ['u-max-w-sm', { 'max-width': '24rem' }],
  ['u-max-w-md', { 'max-width': '28rem' }],
  ['u-max-w-lg', { 'max-width': '32rem' }],
  ['u-max-w-xl', { 'max-width': '36rem' }],
  ['u-max-w-2xl', { 'max-width': '42rem' }],
  ['u-max-w-3xl', { 'max-width': '48rem' }],
  ['u-max-w-4xl', { 'max-width': '56rem' }],
  ['u-max-w-5xl', { 'max-width': '64rem' }],
  ['u-max-w-6xl', { 'max-width': '72rem' }],
  ['u-max-w-7xl', { 'max-width': '80rem' }]
];

export const minHeight: Rule[] = [
  ['u-min-h-0', { 'min-height': '0' }],
  ['u-min-h-full', { 'min-height': '100%' }],
  ['u-min-h-screen', { 'min-height': '100vh' }],
  ['u-min-h-min', { 'min-height': 'min-content' }],
  ['u-min-h-max', { 'min-height': 'max-content' }],
  ['u-min-h-fit', { 'min-height': 'fit-content' }],
  
  [/^u-min-h-(\d+)$/, ([, n]: string[]) => {
    const value = parseInt(n);
    return { 'min-height': `${value * 0.25}rem` };
  }]
];

export const maxHeight: Rule[] = [
  ['u-max-h-none', { 'max-height': 'none' }],
  ['u-max-h-full', { 'max-height': '100%' }],
  ['u-max-h-screen', { 'max-height': '100vh' }],
  ['u-max-h-min', { 'max-height': 'min-content' }],
  ['u-max-h-max', { 'max-height': 'max-content' }],
  ['u-max-h-fit', { 'max-height': 'fit-content' }],
  
  [/^u-max-h-(\d+)$/, ([, n]: string[]) => {
    const value = parseInt(n);
    return { 'max-height': `${value * 0.25}rem` };
  }]
];
