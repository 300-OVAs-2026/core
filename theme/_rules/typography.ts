import type { Rule } from 'unocss';

// ============================================
// LINE HEIGHT UTILITIES
// ============================================
export const lineHeight: Rule[] = [
  ['u-leading-none', { 'line-height': '1' }],
  ['u-leading-tight', { 'line-height': '1.25' }],
  ['u-leading-snug', { 'line-height': '1.375' }],
  ['u-leading-normal', { 'line-height': '1.5' }],
  ['u-leading-relaxed', { 'line-height': '1.625' }],
  ['u-leading-loose', { 'line-height': '2' }],
  
  // Numeric line heights
  ['u-leading-3', { 'line-height': '.75rem' }],
  ['u-leading-4', { 'line-height': '1rem' }],
  ['u-leading-5', { 'line-height': '1.25rem' }],
  ['u-leading-6', { 'line-height': '1.5rem' }],
  ['u-leading-7', { 'line-height': '1.75rem' }],
  ['u-leading-8', { 'line-height': '2rem' }],
  ['u-leading-9', { 'line-height': '2.25rem' }],
  ['u-leading-10', { 'line-height': '2.5rem' }],
  
  [/^u-leading-(\d+)$/, ([, n]: string[]) => {
    const value = parseInt(n);
    return { 'line-height': `${value * 0.25}rem` };
  }]
];

// ============================================
// LETTER SPACING UTILITIES
// ============================================
export const letterSpacing: Rule[] = [
  ['u-tracking-tighter', { 'letter-spacing': '-0.05em' }],
  ['u-tracking-tight', { 'letter-spacing': '-0.025em' }],
  ['u-tracking-normal', { 'letter-spacing': '0em' }],
  ['u-tracking-wide', { 'letter-spacing': '0.025em' }],
  ['u-tracking-wider', { 'letter-spacing': '0.05em' }],
  ['u-tracking-widest', { 'letter-spacing': '0.1em' }]
];

// ============================================
// WORD SPACING UTILITIES
// ============================================
export const wordSpacing: Rule[] = [
  ['u-word-spacing-normal', { 'word-spacing': 'normal' }],
  ['u-word-spacing-wide', { 'word-spacing': '0.25em' }],
  ['u-word-spacing-wider', { 'word-spacing': '0.5em' }],
  ['u-word-spacing-widest', { 'word-spacing': '1em' }]
];

// ============================================
// TEXT DECORATION UTILITIES
// ============================================
export const textDecoration: Rule[] = [
  ['u-underline', { 'text-decoration-line': 'underline' }],
  ['u-overline', { 'text-decoration-line': 'overline' }],
  ['u-line-through', { 'text-decoration-line': 'line-through' }],
  ['u-no-underline', { 'text-decoration-line': 'none' }],
  
  // Text decoration style
  ['u-decoration-solid', { 'text-decoration-style': 'solid' }],
  ['u-decoration-double', { 'text-decoration-style': 'double' }],
  ['u-decoration-dotted', { 'text-decoration-style': 'dotted' }],
  ['u-decoration-dashed', { 'text-decoration-style': 'dashed' }],
  ['u-decoration-wavy', { 'text-decoration-style': 'wavy' }],
  
  // Text decoration thickness
  ['u-decoration-auto', { 'text-decoration-thickness': 'auto' }],
  ['u-decoration-from-font', { 'text-decoration-thickness': 'from-font' }],
  ['u-decoration-0', { 'text-decoration-thickness': '0' }],
  ['u-decoration-1', { 'text-decoration-thickness': '1px' }],
  ['u-decoration-2', { 'text-decoration-thickness': '2px' }],
  ['u-decoration-4', { 'text-decoration-thickness': '4px' }],
  ['u-decoration-8', { 'text-decoration-thickness': '8px' }],
  
  // Text underline offset
  ['u-underline-offset-auto', { 'text-underline-offset': 'auto' }],
  ['u-underline-offset-0', { 'text-underline-offset': '0' }],
  ['u-underline-offset-1', { 'text-underline-offset': '1px' }],
  ['u-underline-offset-2', { 'text-underline-offset': '2px' }],
  ['u-underline-offset-4', { 'text-underline-offset': '4px' }],
  ['u-underline-offset-8', { 'text-underline-offset': '8px' }]
];

// ============================================
// TEXT INDENT UTILITIES
// ============================================
export const textIndent: Rule[] = [
  [/^u-indent-(-?\d+)$/, ([, n]: string[]) => {
    const value = parseInt(n);
    return { 'text-indent': `${value * 0.25}rem` };
  }]
];

// ============================================
// WHITESPACE UTILITIES
// ============================================
export const whitespace: Rule[] = [
  ['u-whitespace-normal', { 'white-space': 'normal' }],
  ['u-whitespace-nowrap', { 'white-space': 'nowrap' }],
  ['u-whitespace-pre', { 'white-space': 'pre' }],
  ['u-whitespace-pre-line', { 'white-space': 'pre-line' }],
  ['u-whitespace-pre-wrap', { 'white-space': 'pre-wrap' }],
  ['u-whitespace-break-spaces', { 'white-space': 'break-spaces' }]
];

// ============================================
// WORD BREAK UTILITIES
// ============================================
export const wordBreak: Rule[] = [
  ['u-break-normal', { 'overflow-wrap': 'normal', 'word-break': 'normal' }],
  ['u-break-words', { 'overflow-wrap': 'break-word' }],
  ['u-break-all', { 'word-break': 'break-all' }],
  ['u-break-keep', { 'word-break': 'keep-all' }]
];

// ============================================
// HYPHENS UTILITIES
// ============================================
export const hyphens: Rule[] = [
  ['u-hyphens-none', { hyphens: 'none' }],
  ['u-hyphens-manual', { hyphens: 'manual' }],
  ['u-hyphens-auto', { hyphens: 'auto' }]
];

// ============================================
// TEXT OVERFLOW UTILITIES
// ============================================
export const textOverflow: Rule[] = [
  ['u-truncate', { overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }],
  ['u-text-ellipsis', { 'text-overflow': 'ellipsis' }],
  ['u-text-clip', { 'text-overflow': 'clip' }]
];

// ============================================
// VERTICAL ALIGN UTILITIES
// ============================================
export const verticalAlign: Rule[] = [
  ['u-align-baseline', { 'vertical-align': 'baseline' }],
  ['u-align-top', { 'vertical-align': 'top' }],
  ['u-align-middle', { 'vertical-align': 'middle' }],
  ['u-align-bottom', { 'vertical-align': 'bottom' }],
  ['u-align-text-top', { 'vertical-align': 'text-top' }],
  ['u-align-text-bottom', { 'vertical-align': 'text-bottom' }],
  ['u-align-sub', { 'vertical-align': 'sub' }],
  ['u-align-super', { 'vertical-align': 'super' }]
];

// ============================================
// LIST STYLE UTILITIES
// ============================================
export const listStyle: Rule[] = [
  ['u-list-none', { 'list-style-type': 'none' }],
  ['u-list-disc', { 'list-style-type': 'disc' }],
  ['u-list-decimal', { 'list-style-type': 'decimal' }],
  ['u-list-circle', { 'list-style-type': 'circle' }],
  ['u-list-square', { 'list-style-type': 'square' }],
  ['u-list-roman', { 'list-style-type': 'upper-roman' }],
  ['u-list-alpha', { 'list-style-type': 'lower-alpha' }],
  
  ['u-list-inside', { 'list-style-position': 'inside' }],
  ['u-list-outside', { 'list-style-position': 'outside' }]
];
