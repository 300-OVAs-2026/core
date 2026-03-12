import { Icon } from '@ui';

import { OvaPageKind } from '@/types/types';

export const getPageIcon = (kind: OvaPageKind) => {
  switch (kind) {
    case OvaPageKind.START:
      return <Icon name="check" />;
    case OvaPageKind.OBJECTIVE:
      return <Icon name="sparkles" />;
    case OvaPageKind.VIDEO:
      return <Icon name="video" />;
    case OvaPageKind.QUIZ:
      return <Icon name="puzzle" />;
    case OvaPageKind.CONTENT:
      return <Icon name="book-open-text" />;
    case OvaPageKind.RESUME:
        return <Icon name="medal" />;
    case OvaPageKind.FINISH:
        return <Icon name="flag" />;
  }
};
