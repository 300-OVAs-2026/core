import type { BASIC_VALUES, CONTRAST } from '../lib/constant';

export type ContrastType =
  | 'high-contrast'
  | 'grayscale'
  | 'invert-colors'
  | 'yellow-on-black'
  | 'red-on-white'
  | 'green-on-blue'
  | 'yellow-on-blue'
  | 'white-on-black'
  | 'no-contrast';

export type BasicValuesType = (typeof BASIC_VALUES)[keyof typeof BASIC_VALUES];

export type ConfigA11y = {
  fontSize: BasicValuesType;
  contrast: ContrastType;
  lineHeight: BasicValuesType;
  letterSpacing: BasicValuesType;
  cursorSize: BasicValuesType;
  darkMode: boolean;
  dyslexiaFont: boolean;
  highlightLinks: boolean;
  focusIndicator: boolean;
  textAlign: boolean;
  keyboardShortcuts: boolean;
  stopAnimations: boolean;
  audio: boolean;
  interpreter: boolean;
};

export type ContrastValues = (typeof CONTRAST)[keyof typeof CONTRAST];

export enum ConfigA11yProperty {
  FontSize = 'fontSize',
  Contrast = 'contrast',
  LineHeight = 'lineHeight',
  LetterSpacing = 'letterSpacing',
  CursorSize = 'cursorSize',
  DarkMode = 'darkMode',
  DyslexiaFont = 'dyslexiaFont',
  HighlightLinks = 'highlightLinks',
  FocusIndicator = 'focusIndicator',
  TextAlign = 'textAlign',
  StopAnimations = 'stopAnimations',
  Audio = 'audio',
  KeyboardShortcuts = 'keyboardShortcuts',
  Interpreter = 'interpreter'
}

export interface useModalType {
  ref: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  onClose: () => void;
}
