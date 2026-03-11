import { Icon } from '@ui';

import { useOvaStore } from '@/store/ova-store';

import { i18n } from './consts';

import css from './fullscreen-alert.module.css';

interface Props {
  addClass?: string;
}

export const FullScreenAlert: React.FC<Props> = ({ addClass, ...props }) => {
  const lang = useOvaStore((state) => state.lang);

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={`${css['alert']} ${addClass ?? ''}`}
      {...props}>
      <Icon addClass={css['alert__icon']} name="info" />
      <p>{i18n[lang].label}</p>
    </div>
  );
};
