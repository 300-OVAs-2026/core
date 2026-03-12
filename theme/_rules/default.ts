import type { Rule } from 'unocss';

import {
  borderRadius,
  borderStyle,
  borderWidth,
  outline
} from './borders';
import {
  backgroundColor,
  borderColor,
  staticColorUtilities,
  textColor
} from './colors';
import { fontSize } from './font';
import {
  accentColor,
  appearance,
  caretColor,
  cursor,
  pointerEvents,
  resize,
  touchAction,
  userSelect,
  willChange
} from './interactivity';
import {
  alignContent,
  alignItems,
  alignSelf,
  display,
  flex,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  gridAutoFlow,
  gridColumn,
  gridRow,
  gridTemplateColumns,
  gridTemplateRows,
  justifyContent,
  placeContent,
  placeItems,
  placeSelf
} from './layout';
import {
  aspectRatio,
  backdropFilter,
  backgroundBlendMode,
  borderCollapse,
  borderSpacing,
  boxSizing,
  breakAfter,
  breakBefore,
  breakInside,
  clear,
  filter,
  float,
  isolation,
  mixBlendMode,
  objectFit,
  objectPosition,
  tableLayout,
  visibility
} from './misc';
import {
  overflow,
  overflowX,
  overflowY,
  overscrollBehavior,
  scrollBehavior,
  scrollSnap
} from './overflow';
import {
  bottom,
  inset,
  left,
  position,
  right,
  top,
  zIndex
} from './position';
import {
  boxShadow,
  dropShadow,
  shadowEffects
} from './shadows';
import {
  height,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  width
} from './sizing';
import { gap, margin, padding } from './spacing';
import { fontStyles, fontWeight, textAlignment, textTransforms, textWraps } from './static';
import {
  hyphens,
  letterSpacing,
  lineHeight,
  listStyle,
  textDecoration,
  textIndent,
  textOverflow,
  verticalAlign,
  whitespace,
  wordBreak,
  wordSpacing
} from './typography';

import type { Theme } from '../types/types';

export const rules: Rule<Theme>[] = [
  // Spacing
  padding,
  margin,
  gap,

  // Typography - Basic
  fontSize,
  fontStyles,
  fontWeight,
  textWraps,
  textTransforms,
  textAlignment,

  // Typography - Advanced
  lineHeight,
  letterSpacing,
  wordSpacing,
  textDecoration,
  textIndent,
  whitespace,
  wordBreak,
  hyphens,
  textOverflow,
  verticalAlign,
  listStyle,

  // Layout - Display
  display,

  // Layout - Flexbox
  flexDirection,
  flexWrap,
  flexGrow,
  flexShrink,
  flex,
  justifyContent,
  alignItems,
  alignContent,
  alignSelf,

  // Layout - Grid
  gridTemplateColumns,
  gridTemplateRows,
  gridColumn,
  gridRow,
  gridAutoFlow,
  placeContent,
  placeItems,
  placeSelf,

  // Sizing
  width,
  height,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,

  // Position
  position,
  inset,
  top,
  right,
  bottom,
  left,
  zIndex,

  // Colors
  textColor,
  backgroundColor,
  borderColor,
  staticColorUtilities,

  // Borders
  borderWidth,
  borderRadius,
  borderStyle,
  outline,

  // Shadows
  boxShadow,
  shadowEffects,
  dropShadow,

  // Overflow & Scroll
  overflow,
  overflowX,
  overflowY,
  overscrollBehavior,
  scrollBehavior,
  scrollSnap,

  // Interactivity
  cursor,
  userSelect,
  pointerEvents,
  resize,
  touchAction,
  appearance,
  caretColor,
  accentColor,
  willChange,

  // Misc
  visibility,
  aspectRatio,
  objectFit,
  objectPosition,
  isolation,
  mixBlendMode,
  backgroundBlendMode,
  filter,
  backdropFilter,
  boxSizing,
  float,
  clear,
  tableLayout,
  borderCollapse,
  borderSpacing,
  breakAfter,
  breakBefore,
  breakInside
].flat(1);
