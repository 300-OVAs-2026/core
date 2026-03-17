import { Icon as IconUI } from 'books-ui';
import { BookOpenText, Check, Flag, Medal, MonitorPlay, Puzzle, Sparkles } from 'lucide-react';

import { OvaPageKind } from '@/types/types';

export const getPageIcon = (kind: OvaPageKind) => {
  switch (kind) {
    case OvaPageKind.START:
      return (
        <IconUI>
          <Check />
        </IconUI>
      );
    case OvaPageKind.OBJECTIVE:
      return (
        <IconUI>
          <Sparkles />
        </IconUI>
      );
    case OvaPageKind.VIDEO:
      return (
        <IconUI>
          <MonitorPlay />
        </IconUI>
      );
    case OvaPageKind.QUIZ:
      return (
        <IconUI>
          <Puzzle />
        </IconUI>
      );
    case OvaPageKind.CONTENT:
      return (
        <IconUI>
          <BookOpenText />
        </IconUI>
      );
    case OvaPageKind.RESUME:
      return (
        <IconUI>
          <Medal />
        </IconUI>
      );
    case OvaPageKind.FINISH:
      return (
        <IconUI>
          <Flag />
        </IconUI>
      );
  }
};
