import { Avatar } from '@features/avatar';
import { Content } from '@layouts';
import { Icon } from '@ui';
import { Col, Row } from 'books-ui';
import { Star } from 'lucide-react';

import { cn } from '@/shared/utils';
import { useGamificationStore } from '@/store/gamification-store';
import { useOvaStore } from '@/store/ova-store';

import { i18nMedals } from './lib/constant';

import { AvatarVariation } from '@features/avatar/types/type';

import css from './medals.module.css';

export const Medals = () => {
  const lang = useOvaStore((state) => state.lang);
  const t = i18nMedals[lang as keyof typeof i18nMedals] ?? i18nMedals.es;

  const activities = useGamificationStore((state) => state.activities);

  const activityEntries = Object.entries(activities);
  const completedCount = activityEntries.filter(([, a]) => a.completed).length;

  return (
    <Content withOutTitle>
      <Row justifyContent="center" alignItems="center">
        <Col xs="11" mm="10" md="9" lg="6" hd="6">
          <div className={cn(css['medals__header'], 'u-shadow-md')}>
            <div>
              <h2 className={css['medals__header-title']}>{t.title}</h2>
              <p className={css['medals__header-subtitle']}>{t.subtitle}</p>
            </div>
            <span className={css['medals__header-badge']}>
              <Icon name="award" aria-hidden="true" />
              <strong>{completedCount}</strong>
              <span>{t.badges}</span>
            </span>
          </div>

          <div className={cn(css['medals__table-wrapper'], 'u-shadow-md')}>
              <table className={css['medals__table']}>
              <caption className="u-sr-only">{t.title}</caption>
              <thead>
                <tr>
                  <th scope="col" className={css['medals__col--activity']}>
                    {t.colActivity}
                  </th>
                  <th scope="col" className={css['medals__col--medal']}>
                    {t.colBadge}
                  </th>
                  <th scope="col" className={css['medals__col--start']}>
                    {t.colStars}
                  </th>
                  <th scope="col" className={css['medals__col--completed']}>
                    {t.colCompleted}
                  </th>
                </tr>
              </thead>
              <tbody>
                {activityEntries.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>
                      {t.empty}
                    </td>
                  </tr>
                ) : (
                  activityEntries.map(([id, activity], index) => {
                    const maxStars = 3;

                    return (
                      <tr key={id}>
                        {/* Actividad */}
                        <td data-label={t.colActivity}>
                            <span className={css['medals__activity-name']}>
                            {t.activityLabel} {index + 1}
                          </span>
                        </td>

                        {/* Medallas */}
                        <td data-label={t.colBadge} className={css['medals__col--medal']}>
                          <span className={cn(css['medals__medal-icon'], activity.completed ? ' ' : css['medals__medal-icon--gray'])}>🏅</span>
                          <span className="u-sr-only">{activity.completed ? t.badgeEarned : t.badgeNotEarned}</span>
                        </td>

                        {/* Estrellas */}
                        {/* Estrellas */}
                        <td data-label={t.colStars}>
                          <span className={cn(css['medals__stars-badge'], !activity.completed && css['medals__stars-badge--gray'])}>
                            <span className={css['medals__star-icon']} aria-hidden="true">
                              <Star size={16} fill="currentColor" />
                            </span>
                            {activity.completed ? (activity.stars ?? maxStars) : 0}
                          </span>
                        </td>

                        {/* Completada */}
                        <td data-label={t.colCompleted}>
                          <span
                            className={cn(css['medals__completed-icon'], activity.completed ? css['medals__completed-icon--yes'] : css['medals__completed-icon--no'])}
                            aria-label={activity.completed ? `Completada` : `No completada`}>
                            {activity.completed ? '✓' : '✕'}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {activityEntries.length > 0 && (
            <div role="status" className={cn(css['medals__footer'], 'u-shadow-md')}>
              <span>
                {t.footerCompleted}{' '}
                <strong>
                  {completedCount}/{activityEntries.length}
                </strong>
              </span>
              <span>
                <Star size={16} fill="currentColor" />
                {t.footerStars}{' '}
                <strong>{activityEntries.reduce((acc, [, a]) => acc + (a.completed ? (a.stars ?? 3) : 0), 0)}</strong>
              </span>
            </div>
          )}
        </Col>
        <Col xs="11" mm="10" md="9" lg="5" hd="4">
          <Avatar
            variation={AvatarVariation.GREETING}
            size="28.125rem"
            title="Figure."
            addClass={css['medals__avatar']}
            alt="Avatar."
          />
        </Col>
      </Row>
    </Content>
  );
};
