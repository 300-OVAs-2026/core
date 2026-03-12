import type { Rule } from 'unocss';

// ============================================
// DISPLAY UTILITIES
// ============================================
export const display: Rule[] = [
  ['u-d-flex', { display: 'flex' }],
  ['u-inline-flex', { display: 'inline-flex' }],
  ['u-d-grid', { display: 'grid' }],
  ['u-inline-grid', { display: 'inline-grid' }],
  ['u-block', { display: 'block' }],
  ['u-inline-block', { display: 'inline-block' }],
  ['u-inline', { display: 'inline' }],
  ['u-hidden', { display: 'none' }]
];

// ============================================
// FLEX UTILITIES
// ============================================
export const flexDirection: Rule[] = [
  ['u-flex-row', { 'flex-direction': 'row' }],
  ['u-flex-row-reverse', { 'flex-direction': 'row-reverse' }],
  ['u-flex-col', { 'flex-direction': 'column' }],
  ['u-flex-col-reverse', { 'flex-direction': 'column-reverse' }]
];

export const flexWrap: Rule[] = [
  ['u-flex-wrap', { 'flex-wrap': 'wrap' }],
  ['u-flex-wrap-reverse', { 'flex-wrap': 'wrap-reverse' }],
  ['u-flex-nowrap', { 'flex-wrap': 'nowrap' }]
];

export const flexGrow: Rule[] = [
  ['u-flex-grow-0', { 'flex-grow': '0' }],
  ['u-flex-grow', { 'flex-grow': '1' }],
  [/^u-flex-grow-(\d+)$/, ([, n]: string[]) => ({ 'flex-grow': n })]
];

export const flexShrink: Rule[] = [
  ['u-flex-shrink-0', { 'flex-shrink': '0' }],
  ['u-flex-shrink', { 'flex-shrink': '1' }],
  [/^u-flex-shrink-(\d+)$/, ([, n]: string[]) => ({ 'flex-shrink': n })]
];

export const flex: Rule[] = [
  ['u-flex-1', { flex: '1 1 0%' }],
  ['u-flex-auto', { flex: '1 1 auto' }],
  ['u-flex-initial', { flex: '0 1 auto' }],
  ['u-flex-none', { flex: 'none' }]
];

export const justifyContent: Rule[] = [
  ['u-justify-start', { 'justify-content': 'flex-start' }],
  ['u-justify-end', { 'justify-content': 'flex-end' }],
  ['u-justify-center', { 'justify-content': 'center' }],
  ['u-justify-between', { 'justify-content': 'space-between' }],
  ['u-justify-around', { 'justify-content': 'space-around' }],
  ['u-justify-evenly', { 'justify-content': 'space-evenly' }]
];

export const alignItems: Rule[] = [
  ['u-items-start', { 'align-items': 'flex-start' }],
  ['u-items-end', { 'align-items': 'flex-end' }],
  ['u-items-center', { 'align-items': 'center' }],
  ['u-items-baseline', { 'align-items': 'baseline' }],
  ['u-items-stretch', { 'align-items': 'stretch' }]
];

export const alignContent: Rule[] = [
  ['u-content-start', { 'align-content': 'flex-start' }],
  ['u-content-end', { 'align-content': 'flex-end' }],
  ['u-content-center', { 'align-content': 'center' }],
  ['u-content-between', { 'align-content': 'space-between' }],
  ['u-content-around', { 'align-content': 'space-around' }],
  ['u-content-evenly', { 'align-content': 'space-evenly' }]
];

export const alignSelf: Rule[] = [
  ['u-self-auto', { 'align-self': 'auto' }],
  ['u-self-start', { 'align-self': 'flex-start' }],
  ['u-self-end', { 'align-self': 'flex-end' }],
  ['u-self-center', { 'align-self': 'center' }],
  ['u-self-stretch', { 'align-self': 'stretch' }],
  ['u-self-baseline', { 'align-self': 'baseline' }]
];

// ============================================
// GRID UTILITIES
// ============================================
export const gridTemplateColumns: Rule[] = [
  ['u-grid-cols-1', { 'grid-template-columns': 'repeat(1, minmax(0, 1fr))' }],
  ['u-grid-cols-2', { 'grid-template-columns': 'repeat(2, minmax(0, 1fr))' }],
  ['u-grid-cols-3', { 'grid-template-columns': 'repeat(3, minmax(0, 1fr))' }],
  ['u-grid-cols-4', { 'grid-template-columns': 'repeat(4, minmax(0, 1fr))' }],
  ['u-grid-cols-5', { 'grid-template-columns': 'repeat(5, minmax(0, 1fr))' }],
  ['u-grid-cols-6', { 'grid-template-columns': 'repeat(6, minmax(0, 1fr))' }],
  ['u-grid-cols-7', { 'grid-template-columns': 'repeat(7, minmax(0, 1fr))' }],
  ['u-grid-cols-8', { 'grid-template-columns': 'repeat(8, minmax(0, 1fr))' }],
  ['u-grid-cols-9', { 'grid-template-columns': 'repeat(9, minmax(0, 1fr))' }],
  ['u-grid-cols-10', { 'grid-template-columns': 'repeat(10, minmax(0, 1fr))' }],
  ['u-grid-cols-11', { 'grid-template-columns': 'repeat(11, minmax(0, 1fr))' }],
  ['u-grid-cols-12', { 'grid-template-columns': 'repeat(12, minmax(0, 1fr))' }],
  ['u-grid-cols-none', { 'grid-template-columns': 'none' }],
  [/^u-grid-cols-(\d+)$/, ([, n]: string[]) => ({ 'grid-template-columns': `repeat(${n}, minmax(0, 1fr))` })]
];

export const gridTemplateRows: Rule[] = [
  ['u-grid-rows-1', { 'grid-template-rows': 'repeat(1, minmax(0, 1fr))' }],
  ['u-grid-rows-2', { 'grid-template-rows': 'repeat(2, minmax(0, 1fr))' }],
  ['u-grid-rows-3', { 'grid-template-rows': 'repeat(3, minmax(0, 1fr))' }],
  ['u-grid-rows-4', { 'grid-template-rows': 'repeat(4, minmax(0, 1fr))' }],
  ['u-grid-rows-5', { 'grid-template-rows': 'repeat(5, minmax(0, 1fr))' }],
  ['u-grid-rows-6', { 'grid-template-rows': 'repeat(6, minmax(0, 1fr))' }],
  ['u-grid-rows-none', { 'grid-template-rows': 'none' }],
  [/^u-grid-rows-(\d+)$/, ([, n]: string[]) => ({ 'grid-template-rows': `repeat(${n}, minmax(0, 1fr))` })]
];

export const gridColumn: Rule[] = [
  ['u-col-auto', { 'grid-column': 'auto' }],
  ['u-col-span-1', { 'grid-column': 'span 1 / span 1' }],
  ['u-col-span-2', { 'grid-column': 'span 2 / span 2' }],
  ['u-col-span-3', { 'grid-column': 'span 3 / span 3' }],
  ['u-col-span-4', { 'grid-column': 'span 4 / span 4' }],
  ['u-col-span-5', { 'grid-column': 'span 5 / span 5' }],
  ['u-col-span-6', { 'grid-column': 'span 6 / span 6' }],
  ['u-col-span-7', { 'grid-column': 'span 7 / span 7' }],
  ['u-col-span-8', { 'grid-column': 'span 8 / span 8' }],
  ['u-col-span-9', { 'grid-column': 'span 9 / span 9' }],
  ['u-col-span-10', { 'grid-column': 'span 10 / span 10' }],
  ['u-col-span-11', { 'grid-column': 'span 11 / span 11' }],
  ['u-col-span-12', { 'grid-column': 'span 12 / span 12' }],
  ['u-col-span-full', { 'grid-column': '1 / -1' }],
  [/^u-col-span-(\d+)$/, ([, n]: string[]) => ({ 'grid-column': `span ${n} / span ${n}` })],
  [/^u-col-start-(\d+)$/, ([, n]: string[]) => ({ 'grid-column-start': n })],
  [/^u-col-end-(\d+)$/, ([, n]: string[]) => ({ 'grid-column-end': n })]
];

export const gridRow: Rule[] = [
  ['u-row-auto', { 'grid-row': 'auto' }],
  ['u-row-span-1', { 'grid-row': 'span 1 / span 1' }],
  ['u-row-span-2', { 'grid-row': 'span 2 / span 2' }],
  ['u-row-span-3', { 'grid-row': 'span 3 / span 3' }],
  ['u-row-span-4', { 'grid-row': 'span 4 / span 4' }],
  ['u-row-span-5', { 'grid-row': 'span 5 / span 5' }],
  ['u-row-span-6', { 'grid-row': 'span 6 / span 6' }],
  ['u-row-span-full', { 'grid-row': '1 / -1' }],
  [/^u-row-span-(\d+)$/, ([, n]: string[]) => ({ 'grid-row': `span ${n} / span ${n}` })],
  [/^u-row-start-(\d+)$/, ([, n]: string[]) => ({ 'grid-row-start': n })],
  [/^u-row-end-(\d+)$/, ([, n]: string[]) => ({ 'grid-row-end': n })]
];

export const gridAutoFlow: Rule[] = [
  ['u-grid-flow-row', { 'grid-auto-flow': 'row' }],
  ['u-grid-flow-col', { 'grid-auto-flow': 'column' }],
  ['u-grid-flow-dense', { 'grid-auto-flow': 'dense' }],
  ['u-grid-flow-row-dense', { 'grid-auto-flow': 'row dense' }],
  ['u-grid-flow-col-dense', { 'grid-auto-flow': 'column dense' }]
];

export const placeContent: Rule[] = [
  ['u-place-content-center', { 'place-content': 'center' }],
  ['u-place-content-start', { 'place-content': 'start' }],
  ['u-place-content-end', { 'place-content': 'end' }],
  ['u-place-content-between', { 'place-content': 'space-between' }],
  ['u-place-content-around', { 'place-content': 'space-around' }],
  ['u-place-content-evenly', { 'place-content': 'space-evenly' }],
  ['u-place-content-stretch', { 'place-content': 'stretch' }]
];

export const placeItems: Rule[] = [
  ['u-place-items-center', { 'place-items': 'center' }],
  ['u-place-items-start', { 'place-items': 'start' }],
  ['u-place-items-end', { 'place-items': 'end' }],
  ['u-place-items-stretch', { 'place-items': 'stretch' }]
];

export const placeSelf: Rule[] = [
  ['u-place-self-auto', { 'place-self': 'auto' }],
  ['u-place-self-start', { 'place-self': 'start' }],
  ['u-place-self-end', { 'place-self': 'end' }],
  ['u-place-self-center', { 'place-self': 'center' }],
  ['u-place-self-stretch', { 'place-self': 'stretch' }]
];
