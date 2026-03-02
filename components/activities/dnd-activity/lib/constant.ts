import { DndClasses, DndTypes } from '../types/types';

import css from './dnd.module.css';

export const INITIAL_STATE = Object.freeze({
  validation: false,
  button: true,
  result: false
});

export const DND_CLASSES: Record<DndTypes, DndClasses> = {
  draggable: { style: css['drag'], dragging: css['drag--dragging'] },
  droppable: { style: css['drop'], over: css['drop--over'] },
  'general-draggable': { style: css['general-drag'] }
};


