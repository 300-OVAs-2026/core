import { Button, Icon, Modal } from '@ui';

import { useGamificationStore } from '@/store/gamification-store';
import { useOvaStore } from '@/store/ova-store';

import { i18n } from './lib/constants';

import css from './gamification.module.css';

const MAX_STARS = 3;

interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  correct?: number;
  total?: number;
  onRestart?: () => void;
}

export const GamificationModal: React.FC<Props> = ({ id, isOpen, onClose, correct, total, onRestart }) => {
  const lang = useOvaStore((state) => state.lang);
  const activities = useGamificationStore((state) => state.activities);
  const activity = activities[id];
  const stars = activity?.stars ?? MAX_STARS;
  const medalIndex = activity?.medalIndex ?? 1;

  const t = i18n[lang];

  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose} addClass={css['modal']}>
      <div className={`u-flow ${css['modal__wrapper']}`}>
        <div className={css['modal__medal']} aria-hidden="true">
          <Icon name="award" />
        </div>

        <div className={css['modal__stars']} role="img" aria-label={t.starsLabel(stars)}>
          {Array.from({ length: MAX_STARS }, (_, i) => (
            <span key={i} className={css['star']} data-filled={i < stars} aria-hidden="true">
              {i < stars ? '★' : '☆'}
            </span>
          ))}
          <span className={css['stars__count']} aria-hidden="true">
            {stars}
          </span>
        </div>

        <p className={css['modal__title']}>{t.title}</p>
        <p>{t.subtitle}</p>

        {correct != null && total != null && (
          <p>
            <span className={css['modal__score']}>
              <strong>{correct}</strong> / {total}
            </span>
            <br />
            {t.correctLabel}
          </p>
        )}

        <p>
          <span className={css['modal__score']}>
            <strong>3</strong> / 4
          </span>
          <br />
          {t.correctLabel}
        </p>

        <p className={css['modal__medal-text']}>{t.medal(medalIndex)}</p>

        {onRestart && (
          <Button
            label={t.restart}
            uiType="reset"
            onClick={() => {
              onClose();
              onRestart();
            }}
          />
        )}
      </div>
    </Modal>
  );
};
