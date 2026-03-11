import { focusMainElement } from '@shared/utils';
import { useOvaStore } from '@/store/ova-store';

import { i18n, KEYCODE } from './lib/constant';

import css from './header.module.css';

export const SkipToMain = () => {
  const lang = useOvaStore((state) => state.lang);

  const handleNullSpaceKey = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.keyCode === KEYCODE.SPACE) {
      event.preventDefault();
    }
  };

  return (
    <button
      role="link"
  
      className={css['skip-link']}
      onKeyUp={handleNullSpaceKey}
      onClick={focusMainElement}>
      {i18n[lang].skipToMain}
    </button>
  );
};
