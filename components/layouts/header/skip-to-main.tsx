import { focusMainElement } from '@shared/utils';
import { useOvaContext } from '@/context/ova-context';

import { i18n, KEYCODE } from './lib/constant';

import css from './header.module.css';

export const SkipToMain = () => {
  const { lang } = useOvaContext();

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
