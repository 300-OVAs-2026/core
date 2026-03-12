import type { Rule } from 'unocss';

// ============================================
// POSITION UTILITIES
// ============================================
export const position: Rule[] = [
  ['u-static', { position: 'static' }],
  ['u-fixed', { position: 'fixed' }],
  ['u-absolute', { position: 'absolute' }],
  ['u-relative', { position: 'relative' }],
  ['u-sticky', { position: 'sticky' }]
];

// ============================================
// INSET UTILITIES (top, right, bottom, left)
// ============================================
export const inset: Rule[] = [
  // All sides
  ['u-inset-0', { inset: '0' }],
  ['u-inset-auto', { inset: 'auto' }],
  ['u-inset-full', { inset: '100%' }],
  ['u-inset-1/2', { inset: '50%' }],
  
  // X axis
  ['u-inset-x-0', { left: '0', right: '0' }],
  ['u-inset-x-auto', { left: 'auto', right: 'auto' }],
  ['u-inset-x-full', { left: '100%', right: '100%' }],
  ['u-inset-x-1/2', { left: '50%', right: '50%' }],
  
  // Y axis
  ['u-inset-y-0', { top: '0', bottom: '0' }],
  ['u-inset-y-auto', { top: 'auto', bottom: 'auto' }],
  ['u-inset-y-full', { top: '100%', bottom: '100%' }],
  ['u-inset-y-1/2', { top: '50%', bottom: '50%' }],
  
  // Dynamic inset
  [/^u-inset-(-?\d+)$/, ([, n]: string[]) => {
    const value = parseInt(n);
    return { inset: `${value * 0.25}rem` };
  }],
  [/^u-inset-x-(-?\d+)$/, ([, n]: string[]) => {
    const value = parseInt(n);
    return { left: `${value * 0.25}rem`, right: `${value * 0.25}rem` };
  }],
  [/^u-inset-y-(-?\d+)$/, ([, n]: string[]) => {
    const value = parseInt(n);
    return { top: `${value * 0.25}rem`, bottom: `${value * 0.25}rem` };
  }]
];

// ============================================
// TOP UTILITIES
// ============================================
export const top: Rule[] = [
  ['u-top-0', { top: '0' }],
  ['u-top-auto', { top: 'auto' }],
  ['u-top-full', { top: '100%' }],
  ['u-top-1/2', { top: '50%' }],
  ['u-top-1/3', { top: '33.333333%' }],
  ['u-top-2/3', { top: '66.666667%' }],
  ['u-top-1/4', { top: '25%' }],
  ['u-top-3/4', { top: '75%' }],
  
  [/^u-top-(-?\d+)$/, ([, n]: string[]) => {
    const value = parseInt(n);
    return { top: `${value * 0.25}rem` };
  }]
];

// ============================================
// RIGHT UTILITIES
// ============================================
export const right: Rule[] = [
  ['u-right-0', { right: '0' }],
  ['u-right-auto', { right: 'auto' }],
  ['u-right-full', { right: '100%' }],
  ['u-right-1/2', { right: '50%' }],
  ['u-right-1/3', { right: '33.333333%' }],
  ['u-right-2/3', { right: '66.666667%' }],
  ['u-right-1/4', { right: '25%' }],
  ['u-right-3/4', { right: '75%' }],
  
  [/^u-right-(-?\d+)$/, ([, n]: string[]) => {
    const value = parseInt(n);
    return { right: `${value * 0.25}rem` };
  }]
];

// ============================================
// BOTTOM UTILITIES
// ============================================
export const bottom: Rule[] = [
  ['u-bottom-0', { bottom: '0' }],
  ['u-bottom-auto', { bottom: 'auto' }],
  ['u-bottom-full', { bottom: '100%' }],
  ['u-bottom-1/2', { bottom: '50%' }],
  ['u-bottom-1/3', { bottom: '33.333333%' }],
  ['u-bottom-2/3', { bottom: '66.666667%' }],
  ['u-bottom-1/4', { bottom: '25%' }],
  ['u-bottom-3/4', { bottom: '75%' }],
  
  [/^u-bottom-(-?\d+)$/, ([, n]: string[]) => {
    const value = parseInt(n);
    return { bottom: `${value * 0.25}rem` };
  }]
];

// ============================================
// LEFT UTILITIES
// ============================================
export const left: Rule[] = [
  ['u-left-0', { left: '0' }],
  ['u-left-auto', { left: 'auto' }],
  ['u-left-full', { left: '100%' }],
  ['u-left-1/2', { left: '50%' }],
  ['u-left-1/3', { left: '33.333333%' }],
  ['u-left-2/3', { left: '66.666667%' }],
  ['u-left-1/4', { left: '25%' }],
  ['u-left-3/4', { left: '75%' }],
  
  [/^u-left-(-?\d+)$/, ([, n]: string[]) => {
    const value = parseInt(n);
    return { left: `${value * 0.25}rem` };
  }]
];

// ============================================
// Z-INDEX UTILITIES
// ============================================
export const zIndex: Rule[] = [
  ['u-z-0', { 'z-index': '0' }],
  ['u-z-10', { 'z-index': '10' }],
  ['u-z-20', { 'z-index': '20' }],
  ['u-z-30', { 'z-index': '30' }],
  ['u-z-40', { 'z-index': '40' }],
  ['u-z-50', { 'z-index': '50' }],
  ['u-z-auto', { 'z-index': 'auto' }],
  
  [/^u-z-(-?\d+)$/, ([, n]: string[]) => {
    return { 'z-index': n };
  }]
];
