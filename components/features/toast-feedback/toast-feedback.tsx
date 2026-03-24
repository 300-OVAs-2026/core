import { Toast, type ToastCoreProps } from '@ui';
import { Audio } from 'books-ui';

import { useOvaStore } from '@/store/ova-store';

import { i18n } from './lib/constant';

import css from './toast-feedback.module.css';

interface ToastFeedbackProps extends ToastCoreProps {
  addClass?: string;
  type?: 'wrong' | 'success';
  label?: string;
  audio?: string;
}

export const ToastFeedback: React.FC<ToastFeedbackProps> = ({ type = 'success', label, audio, children, ...props }) => {
  const lang = useOvaStore((state) => state.lang);

  return (
    <Toast {...props} addClass={`${css.toast} ${css[type]}`} label={label ?? i18n[lang][type]}>
      <div className={css.container}>
        <div className={css.icon}>{type === 'success' ? '✓' : '✕'}</div>
        <div className={`${css['toast__response-wrapper']}`}>
          {audio ? <Audio data-audio src={audio} addClass={`${css['modal__audio']} u-m-0`} size="small" /> : null}
          <p className={css['title']} data-title>
            {label || i18n[lang][type]}
          </p>
          {children}
        </div>
      </div>

      {audio && <audio src={audio} autoPlay />}
    </Toast>
  );
};
