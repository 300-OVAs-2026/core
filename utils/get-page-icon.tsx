import { Icon as IconUI } from 'books-ui';
import { BookOpenText, Check, Flag, Medal, MonitorPlay, Puzzle, Sparkles } from 'lucide-react';

import { OvaPageKind } from '@/types/types';

export const getPageIcon = (kind: OvaPageKind) => {
  switch (kind) {
    case OvaPageKind.START:
      return (
        <IconUI>
          <Check className="u-fill-none" />
        </IconUI>
      );
    case OvaPageKind.OBJECTIVE:
      return (
        <IconUI>
          <Sparkles className="u-fill-none" />
        </IconUI>
      );
    case OvaPageKind.VIDEO:
      return (
        <IconUI>
          <MonitorPlay className="u-fill-none" />
        </IconUI>
      );
    case OvaPageKind.QUIZ:
      return (
        <IconUI>
          <Puzzle className="u-fill-none" />
        </IconUI>
      );
    case OvaPageKind.CONTENT:
      return (
        <IconUI>
          <BookOpenText className="u-fill-none" />
        </IconUI>
      );
    case OvaPageKind.RESUME:
      return (
        <IconUI>
          <Medal className="u-fill-none" />
        </IconUI>
      );
    case OvaPageKind.FINISH:
      return (
        <IconUI>
          <Flag className="u-fill-none" />
        </IconUI>
      );
  }
};
