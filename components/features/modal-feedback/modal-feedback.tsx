import type { ModalCoreProps } from '@ui';
import { Modal } from '@ui';
import { Audio } from 'books-ui';

import { useOvaStore } from '@/store/ova-store';

import { i18n } from './lib/constant';

import css from './modal-feedback.module.css';

interface Props extends ModalCoreProps {
  addClass?: string;
  type?: 'wrong' | 'success';
  label?: string;
  audio?: string;
}

export const ModalFeedback: React.FC<Props> = ({ type = 'success', label, addClass, audio, children, ...props }) => {
  const lang = useOvaStore((state) => state.lang);
  const imageURL = `assets/base/${type}.webp`;

  return (
    <Modal {...props} addClass={`${css['modal']} u-py-6 ${addClass ?? ''}`}>
      <div className={`u-flow ${css['modal__wrapper']}`} data-type={type}>
        <img className={css['modal__image']} src={imageURL} alt="" />
        <div className={`u-flow ${css['modal__response-wrapper']}`}>
          <p className={css['modal__title']} data-title>
            {label || i18n[lang][type]}
          </p>
          {audio ? <Audio data-audio src={audio} addClass={css['modal__audio']} /> : null}
          {children}
        </div>
      </div>
    </Modal>
  );
};
