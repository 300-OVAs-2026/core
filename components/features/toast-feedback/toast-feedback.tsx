import { Toast, type ToastCoreProps } from '@ui';

import css from './toast-feedback.module.css';
import { Audio } from 'books-ui';
import { useOvaContext } from '@/context/ova-context';
import { i18n } from './lib/constant';

interface ToastFeedbackProps extends ToastCoreProps {
  addClass?: string;
  type?: 'wrong' | 'success';
  label?: string;
  audio?: string;
}

export const ToastFeedback: React.FC<ToastFeedbackProps> = ({ type = 'success', label, audio, children, ...props }) => {
  const { lang } = useOvaContext();

  return (
    <Toast {...props} addClass={`${css.toast} ${css[type]}`}>
      <div className={css.container}>
        <div className={css.icon}>{type === 'success' ? '✓' : '✕'}</div>
        <div className={`u-flow ${css['toast__response-wrapper']}`}>
          <p className={css['title']} data-title>
            {label || i18n[lang][type]}
          </p>
          {audio ? <Audio data-audio src={audio} addClass={`${css['modal__audio']} u-m-0`} size="small" /> : null}
          {children}
        </div>
      </div>

      {audio && <audio src={audio} autoPlay />}
    </Toast>
  );
};
