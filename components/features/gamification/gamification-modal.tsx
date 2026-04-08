import { Audio } from 'books-ui';

import { Button, Icon, Modal } from '@ui';
import type { VideoURLs } from '@/shared/hooks';
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
  audio?: string;
  interpreter?: VideoURLs;
}

export const GamificationModal: React.FC<Props> = ({
  id,
  isOpen,
  onClose,
  correct,
  total,
  onRestart,
  audio,
  interpreter
}) => {
  const lang = useOvaStore((state) => state.lang);
  const markPageVisited = useOvaStore((state) => state.markPageVisited);

  const activities = useGamificationStore((state) => state.activities);

  const activity = activities[id];
  const stars = activity?.stars ?? MAX_STARS;
  const medalIndex = activity?.medalIndex ?? 1;

  const t = i18n[lang];

  /**
   * Function to handle modal close,
   * which also marks the page as visited in the OVA store.
   * This ensures that when the user closes the gamification modal,
   * the current page is marked as visited, allowing for proper tracking of user progress through the OVA.
   */
  const handleClose = () => {
    onClose();
    markPageVisited();
  };

  return (
    <Modal size="sm" isOpen={isOpen} onClose={handleClose} addClass={css['modal']} interpreter={interpreter}>
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

        <p className={css['modal__medal-text']}>{t.medal(medalIndex)}</p>

        {audio && <Audio src={audio} />}

        {onRestart && (
          <Button
            label={t.restart}
            variant="reset"
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
