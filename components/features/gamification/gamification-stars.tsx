import { useOvaStore } from '@/store/ova-store';

import { i18n } from './lib/constants';

import css from './gamification.module.css';

interface Props {
  stars: number;
  maxStars?: number;
}

export const GamificationStars: React.FC<Props> = ({ stars, maxStars = 3 }) => {
  const lang = useOvaStore((state) => state.lang);

  return (
    <div className={css['stars']} role="img" aria-label={i18n[lang].starsLabel(stars)}>
      {Array.from({ length: maxStars }, (_, i) => (
        <span key={i} className={css['star']} data-filled={i < stars} aria-hidden="true">
          {i < stars ? '★' : '☆'}
        </span>
      ))}
      <span className={css['stars__count']} aria-hidden="true">
        {stars}
      </span>
    </div>
  );
};

