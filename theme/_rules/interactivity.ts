import type { Rule } from 'unocss';

// ============================================
// CURSOR UTILITIES
// ============================================
export const cursor: Rule[] = [
  ['u-cursor-auto', { cursor: 'auto' }],
  ['u-cursor-default', { cursor: 'default' }],
  ['u-cursor-pointer', { cursor: 'pointer' }],
  ['u-cursor-wait', { cursor: 'wait' }],
  ['u-cursor-text', { cursor: 'text' }],
  ['u-cursor-move', { cursor: 'move' }],
  ['u-cursor-help', { cursor: 'help' }],
  ['u-cursor-not-allowed', { cursor: 'not-allowed' }],
  ['u-cursor-none', { cursor: 'none' }],
  ['u-cursor-context-menu', { cursor: 'context-menu' }],
  ['u-cursor-progress', { cursor: 'progress' }],
  ['u-cursor-cell', { cursor: 'cell' }],
  ['u-cursor-crosshair', { cursor: 'crosshair' }],
  ['u-cursor-vertical-text', { cursor: 'vertical-text' }],
  ['u-cursor-alias', { cursor: 'alias' }],
  ['u-cursor-copy', { cursor: 'copy' }],
  ['u-cursor-no-drop', { cursor: 'no-drop' }],
  ['u-cursor-grab', { cursor: 'grab' }],
  ['u-cursor-grabbing', { cursor: 'grabbing' }],
  ['u-cursor-all-scroll', { cursor: 'all-scroll' }],
  ['u-cursor-col-resize', { cursor: 'col-resize' }],
  ['u-cursor-row-resize', { cursor: 'row-resize' }],
  ['u-cursor-n-resize', { cursor: 'n-resize' }],
  ['u-cursor-e-resize', { cursor: 'e-resize' }],
  ['u-cursor-s-resize', { cursor: 's-resize' }],
  ['u-cursor-w-resize', { cursor: 'w-resize' }],
  ['u-cursor-ne-resize', { cursor: 'ne-resize' }],
  ['u-cursor-nw-resize', { cursor: 'nw-resize' }],
  ['u-cursor-se-resize', { cursor: 'se-resize' }],
  ['u-cursor-sw-resize', { cursor: 'sw-resize' }],
  ['u-cursor-ew-resize', { cursor: 'ew-resize' }],
  ['u-cursor-ns-resize', { cursor: 'ns-resize' }],
  ['u-cursor-nesw-resize', { cursor: 'nesw-resize' }],
  ['u-cursor-nwse-resize', { cursor: 'nwse-resize' }],
  ['u-cursor-zoom-in', { cursor: 'zoom-in' }],
  ['u-cursor-zoom-out', { cursor: 'zoom-out' }]
];

// ============================================
// USER SELECT UTILITIES
// ============================================
export const userSelect: Rule[] = [
  ['u-select-none', { 'user-select': 'none' }],
  ['u-select-text', { 'user-select': 'text' }],
  ['u-select-all', { 'user-select': 'all' }],
  ['u-select-auto', { 'user-select': 'auto' }]
];

// ============================================
// POINTER EVENTS UTILITIES
// ============================================
export const pointerEvents: Rule[] = [
  ['u-pointer-events-none', { 'pointer-events': 'none' }],
  ['u-pointer-events-auto', { 'pointer-events': 'auto' }]
];

// ============================================
// RESIZE UTILITIES
// ============================================
export const resize: Rule[] = [
  ['u-resize-none', { resize: 'none' }],
  ['u-resize', { resize: 'both' }],
  ['u-resize-x', { resize: 'horizontal' }],
  ['u-resize-y', { resize: 'vertical' }]
];

// ============================================
// TOUCH ACTION UTILITIES
// ============================================
export const touchAction: Rule[] = [
  ['u-touch-auto', { 'touch-action': 'auto' }],
  ['u-touch-none', { 'touch-action': 'none' }],
  ['u-touch-pan-x', { 'touch-action': 'pan-x' }],
  ['u-touch-pan-left', { 'touch-action': 'pan-left' }],
  ['u-touch-pan-right', { 'touch-action': 'pan-right' }],
  ['u-touch-pan-y', { 'touch-action': 'pan-y' }],
  ['u-touch-pan-up', { 'touch-action': 'pan-up' }],
  ['u-touch-pan-down', { 'touch-action': 'pan-down' }],
  ['u-touch-pinch-zoom', { 'touch-action': 'pinch-zoom' }],
  ['u-touch-manipulation', { 'touch-action': 'manipulation' }]
];

// ============================================
// APPEARANCE UTILITIES
// ============================================
export const appearance: Rule[] = [
  ['u-appearance-none', { appearance: 'none' }],
  ['u-appearance-auto', { appearance: 'auto' }]
];

// ============================================
// CARET COLOR UTILITIES
// ============================================
export const caretColor: Rule[] = [
  ['u-caret-transparent', { 'caret-color': 'transparent' }],
  ['u-caret-current', { 'caret-color': 'currentColor' }],
  ['u-caret-inherit', { 'caret-color': 'inherit' }]
];

// ============================================
// ACCENT COLOR UTILITIES
// ============================================
export const accentColor: Rule[] = [
  ['u-accent-auto', { 'accent-color': 'auto' }],
  ['u-accent-transparent', { 'accent-color': 'transparent' }],
  ['u-accent-current', { 'accent-color': 'currentColor' }],
  ['u-accent-inherit', { 'accent-color': 'inherit' }]
];

// ============================================
// WILL CHANGE UTILITIES
// ============================================
export const willChange: Rule[] = [
  ['u-will-change-auto', { 'will-change': 'auto' }],
  ['u-will-change-scroll', { 'will-change': 'scroll-position' }],
  ['u-will-change-contents', { 'will-change': 'contents' }],
  ['u-will-change-transform', { 'will-change': 'transform' }]
];
