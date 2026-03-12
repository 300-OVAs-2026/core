import type { Rule } from 'unocss';

// ============================================
// BORDER WIDTH UTILITIES
// ============================================
export const borderWidth: Rule[] = [
  // All sides
  ['u-border-0', { 'border-width': '0' }],
  ['u-border', { 'border-width': '1px' }],
  ['u-border-2', { 'border-width': '2px' }],
  ['u-border-4', { 'border-width': '4px' }],
  ['u-border-8', { 'border-width': '8px' }],
  
  // Top
  ['u-border-t-0', { 'border-top-width': '0' }],
  ['u-border-t', { 'border-top-width': '1px' }],
  ['u-border-t-2', { 'border-top-width': '2px' }],
  ['u-border-t-4', { 'border-top-width': '4px' }],
  ['u-border-t-8', { 'border-top-width': '8px' }],
  
  // Right
  ['u-border-r-0', { 'border-right-width': '0' }],
  ['u-border-r', { 'border-right-width': '1px' }],
  ['u-border-r-2', { 'border-right-width': '2px' }],
  ['u-border-r-4', { 'border-right-width': '4px' }],
  ['u-border-r-8', { 'border-right-width': '8px' }],
  
  // Bottom
  ['u-border-b-0', { 'border-bottom-width': '0' }],
  ['u-border-b', { 'border-bottom-width': '1px' }],
  ['u-border-b-2', { 'border-bottom-width': '2px' }],
  ['u-border-b-4', { 'border-bottom-width': '4px' }],
  ['u-border-b-8', { 'border-bottom-width': '8px' }],
  
  // Left
  ['u-border-l-0', { 'border-left-width': '0' }],
  ['u-border-l', { 'border-left-width': '1px' }],
  ['u-border-l-2', { 'border-left-width': '2px' }],
  ['u-border-l-4', { 'border-left-width': '4px' }],
  ['u-border-l-8', { 'border-left-width': '8px' }],
  
  // X axis (left & right)
  ['u-border-x-0', { 'border-left-width': '0', 'border-right-width': '0' }],
  ['u-border-x', { 'border-left-width': '1px', 'border-right-width': '1px' }],
  ['u-border-x-2', { 'border-left-width': '2px', 'border-right-width': '2px' }],
  ['u-border-x-4', { 'border-left-width': '4px', 'border-right-width': '4px' }],
  
  // Y axis (top & bottom)
  ['u-border-y-0', { 'border-top-width': '0', 'border-bottom-width': '0' }],
  ['u-border-y', { 'border-top-width': '1px', 'border-bottom-width': '1px' }],
  ['u-border-y-2', { 'border-top-width': '2px', 'border-bottom-width': '2px' }],
  ['u-border-y-4', { 'border-top-width': '4px', 'border-bottom-width': '4px' }]
];

// ============================================
// BORDER RADIUS UTILITIES
// ============================================
export const borderRadius: Rule[] = [
  // All corners
  ['u-rounded-none', { 'border-radius': '0' }],
  ['u-rounded-sm', { 'border-radius': '0.125rem' }],
  ['u-rounded', { 'border-radius': '0.25rem' }],
  ['u-rounded-md', { 'border-radius': '0.375rem' }],
  ['u-rounded-lg', { 'border-radius': '0.5rem' }],
  ['u-rounded-xl', { 'border-radius': '0.75rem' }],
  ['u-rounded-2xl', { 'border-radius': '1rem' }],
  ['u-rounded-3xl', { 'border-radius': '1.5rem' }],
  ['u-rounded-full', { 'border-radius': '9999px' }],
  
  // Top
  ['u-rounded-t-none', { 'border-top-left-radius': '0', 'border-top-right-radius': '0' }],
  ['u-rounded-t-sm', { 'border-top-left-radius': '0.125rem', 'border-top-right-radius': '0.125rem' }],
  ['u-rounded-t', { 'border-top-left-radius': '0.25rem', 'border-top-right-radius': '0.25rem' }],
  ['u-rounded-t-md', { 'border-top-left-radius': '0.375rem', 'border-top-right-radius': '0.375rem' }],
  ['u-rounded-t-lg', { 'border-top-left-radius': '0.5rem', 'border-top-right-radius': '0.5rem' }],
  ['u-rounded-t-xl', { 'border-top-left-radius': '0.75rem', 'border-top-right-radius': '0.75rem' }],
  ['u-rounded-t-2xl', { 'border-top-left-radius': '1rem', 'border-top-right-radius': '1rem' }],
  ['u-rounded-t-full', { 'border-top-left-radius': '9999px', 'border-top-right-radius': '9999px' }],
  
  // Right
  ['u-rounded-r-none', { 'border-top-right-radius': '0', 'border-bottom-right-radius': '0' }],
  ['u-rounded-r-sm', { 'border-top-right-radius': '0.125rem', 'border-bottom-right-radius': '0.125rem' }],
  ['u-rounded-r', { 'border-top-right-radius': '0.25rem', 'border-bottom-right-radius': '0.25rem' }],
  ['u-rounded-r-md', { 'border-top-right-radius': '0.375rem', 'border-bottom-right-radius': '0.375rem' }],
  ['u-rounded-r-lg', { 'border-top-right-radius': '0.5rem', 'border-bottom-right-radius': '0.5rem' }],
  ['u-rounded-r-xl', { 'border-top-right-radius': '0.75rem', 'border-bottom-right-radius': '0.75rem' }],
  ['u-rounded-r-full', { 'border-top-right-radius': '9999px', 'border-bottom-right-radius': '9999px' }],
  
  // Bottom
  ['u-rounded-b-none', { 'border-bottom-left-radius': '0', 'border-bottom-right-radius': '0' }],
  ['u-rounded-b-sm', { 'border-bottom-left-radius': '0.125rem', 'border-bottom-right-radius': '0.125rem' }],
  ['u-rounded-b', { 'border-bottom-left-radius': '0.25rem', 'border-bottom-right-radius': '0.25rem' }],
  ['u-rounded-b-md', { 'border-bottom-left-radius': '0.375rem', 'border-bottom-right-radius': '0.375rem' }],
  ['u-rounded-b-lg', { 'border-bottom-left-radius': '0.5rem', 'border-bottom-right-radius': '0.5rem' }],
  ['u-rounded-b-xl', { 'border-bottom-left-radius': '0.75rem', 'border-bottom-right-radius': '0.75rem' }],
  ['u-rounded-b-full', { 'border-bottom-left-radius': '9999px', 'border-bottom-right-radius': '9999px' }],
  
  // Left
  ['u-rounded-l-none', { 'border-top-left-radius': '0', 'border-bottom-left-radius': '0' }],
  ['u-rounded-l-sm', { 'border-top-left-radius': '0.125rem', 'border-bottom-left-radius': '0.125rem' }],
  ['u-rounded-l', { 'border-top-left-radius': '0.25rem', 'border-bottom-left-radius': '0.25rem' }],
  ['u-rounded-l-md', { 'border-top-left-radius': '0.375rem', 'border-bottom-left-radius': '0.375rem' }],
  ['u-rounded-l-lg', { 'border-top-left-radius': '0.5rem', 'border-bottom-left-radius': '0.5rem' }],
  ['u-rounded-l-xl', { 'border-top-left-radius': '0.75rem', 'border-bottom-left-radius': '0.75rem' }],
  ['u-rounded-l-full', { 'border-top-left-radius': '9999px', 'border-bottom-left-radius': '9999px' }],
  
  // Individual corners
  ['u-rounded-tl-none', { 'border-top-left-radius': '0' }],
  ['u-rounded-tl', { 'border-top-left-radius': '0.25rem' }],
  ['u-rounded-tl-lg', { 'border-top-left-radius': '0.5rem' }],
  ['u-rounded-tl-full', { 'border-top-left-radius': '9999px' }],
  
  ['u-rounded-tr-none', { 'border-top-right-radius': '0' }],
  ['u-rounded-tr', { 'border-top-right-radius': '0.25rem' }],
  ['u-rounded-tr-lg', { 'border-top-right-radius': '0.5rem' }],
  ['u-rounded-tr-full', { 'border-top-right-radius': '9999px' }],
  
  ['u-rounded-br-none', { 'border-bottom-right-radius': '0' }],
  ['u-rounded-br', { 'border-bottom-right-radius': '0.25rem' }],
  ['u-rounded-br-lg', { 'border-bottom-right-radius': '0.5rem' }],
  ['u-rounded-br-full', { 'border-bottom-right-radius': '9999px' }],
  
  ['u-rounded-bl-none', { 'border-bottom-left-radius': '0' }],
  ['u-rounded-bl', { 'border-bottom-left-radius': '0.25rem' }],
  ['u-rounded-bl-lg', { 'border-bottom-left-radius': '0.5rem' }],
  ['u-rounded-bl-full', { 'border-bottom-left-radius': '9999px' }]
];

// ============================================
// BORDER STYLE UTILITIES
// ============================================
export const borderStyle: Rule[] = [
  ['u-border-solid', { 'border-style': 'solid' }],
  ['u-border-dashed', { 'border-style': 'dashed' }],
  ['u-border-dotted', { 'border-style': 'dotted' }],
  ['u-border-double', { 'border-style': 'double' }],
  ['u-border-hidden', { 'border-style': 'hidden' }],
  ['u-border-none', { 'border-style': 'none' }]
];

// ============================================
// OUTLINE UTILITIES
// ============================================
export const outline: Rule[] = [
  ['u-outline-none', { outline: '2px solid transparent', 'outline-offset': '2px' }],
  ['u-outline', { 'outline-style': 'solid' }],
  ['u-outline-dashed', { 'outline-style': 'dashed' }],
  ['u-outline-dotted', { 'outline-style': 'dotted' }],
  ['u-outline-double', { 'outline-style': 'double' }],
  
  // Outline width
  ['u-outline-0', { 'outline-width': '0' }],
  ['u-outline-1', { 'outline-width': '1px' }],
  ['u-outline-2', { 'outline-width': '2px' }],
  ['u-outline-4', { 'outline-width': '4px' }],
  ['u-outline-8', { 'outline-width': '8px' }],
  
  // Outline offset
  ['u-outline-offset-0', { 'outline-offset': '0' }],
  ['u-outline-offset-1', { 'outline-offset': '1px' }],
  ['u-outline-offset-2', { 'outline-offset': '2px' }],
  ['u-outline-offset-4', { 'outline-offset': '4px' }],
  ['u-outline-offset-8', { 'outline-offset': '8px' }]
];
