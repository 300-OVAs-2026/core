import type { Rule } from 'unocss';

// ============================================
// OVERFLOW UTILITIES
// ============================================
export const overflow: Rule[] = [
  ['u-overflow-auto', { overflow: 'auto' }],
  ['u-overflow-hidden', { overflow: 'hidden' }],
  ['u-overflow-clip', { overflow: 'clip' }],
  ['u-overflow-visible', { overflow: 'visible' }],
  ['u-overflow-scroll', { overflow: 'scroll' }]
];

export const overflowX: Rule[] = [
  ['u-overflow-x-auto', { 'overflow-x': 'auto' }],
  ['u-overflow-x-hidden', { 'overflow-x': 'hidden' }],
  ['u-overflow-x-clip', { 'overflow-x': 'clip' }],
  ['u-overflow-x-visible', { 'overflow-x': 'visible' }],
  ['u-overflow-x-scroll', { 'overflow-x': 'scroll' }]
];

export const overflowY: Rule[] = [
  ['u-overflow-y-auto', { 'overflow-y': 'auto' }],
  ['u-overflow-y-hidden', { 'overflow-y': 'hidden' }],
  ['u-overflow-y-clip', { 'overflow-y': 'clip' }],
  ['u-overflow-y-visible', { 'overflow-y': 'visible' }],
  ['u-overflow-y-scroll', { 'overflow-y': 'scroll' }]
];

// ============================================
// OVERSCROLL BEHAVIOR
// ============================================
export const overscrollBehavior: Rule[] = [
  ['u-overscroll-auto', { 'overscroll-behavior': 'auto' }],
  ['u-overscroll-contain', { 'overscroll-behavior': 'contain' }],
  ['u-overscroll-none', { 'overscroll-behavior': 'none' }],
  
  ['u-overscroll-x-auto', { 'overscroll-behavior-x': 'auto' }],
  ['u-overscroll-x-contain', { 'overscroll-behavior-x': 'contain' }],
  ['u-overscroll-x-none', { 'overscroll-behavior-x': 'none' }],
  
  ['u-overscroll-y-auto', { 'overscroll-behavior-y': 'auto' }],
  ['u-overscroll-y-contain', { 'overscroll-behavior-y': 'contain' }],
  ['u-overscroll-y-none', { 'overscroll-behavior-y': 'none' }]
];

// ============================================
// SCROLLBAR UTILITIES
// ============================================
export const scrollBehavior: Rule[] = [
  ['u-scroll-auto', { 'scroll-behavior': 'auto' }],
  ['u-scroll-smooth', { 'scroll-behavior': 'smooth' }]
];

export const scrollSnap: Rule[] = [
  ['u-snap-none', { 'scroll-snap-type': 'none' }],
  ['u-snap-x', { 'scroll-snap-type': 'x var(--un-scroll-snap-strictness)' }],
  ['u-snap-y', { 'scroll-snap-type': 'y var(--un-scroll-snap-strictness)' }],
  ['u-snap-both', { 'scroll-snap-type': 'both var(--un-scroll-snap-strictness)' }],
  
  ['u-snap-mandatory', { '--un-scroll-snap-strictness': 'mandatory' }],
  ['u-snap-proximity', { '--un-scroll-snap-strictness': 'proximity' }],
  
  ['u-snap-start', { 'scroll-snap-align': 'start' }],
  ['u-snap-end', { 'scroll-snap-align': 'end' }],
  ['u-snap-center', { 'scroll-snap-align': 'center' }],
  ['u-snap-align-none', { 'scroll-snap-align': 'none' }],
  
  ['u-snap-normal', { 'scroll-snap-stop': 'normal' }],
  ['u-snap-always', { 'scroll-snap-stop': 'always' }]
];
