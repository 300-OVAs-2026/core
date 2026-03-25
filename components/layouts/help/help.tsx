import { Avatar } from '@features/avatar';
import { Content } from '@layouts';
import { Button, Icon } from '@ui';
import { Col, Row } from 'books-ui';
import { HelpCircle } from 'lucide-react';

import { cn } from '@/shared/utils';
import { useOvaStore } from '@/store/ova-store';

import { i18nHelp } from './lib/constant';

import { AvatarVariation } from '@features/avatar/types/type';

import css from './help.module.css';

export const Help = () => {
  const lang = useOvaStore((state) => state.lang);
  const t = i18nHelp[lang as keyof typeof i18nHelp] ?? i18nHelp.es;

  return (
    <Content withOutTitle>
      <Row justifyContent="center" alignItems="center">
        <Col xs="11" mm="10" md="9" lg="5" hd="4">
          <Avatar
            variation={AvatarVariation.GREETING}
            size="28.125rem"
            title="Figure."
            addClass={css['avatar']}
            alt="Avatar."
          />
        </Col>
        <Col xs="11" mm="10" md="9" lg="6" hd="6">

          {/* ── Header ── */}
          <div className={cn(css['tableHeader'], 'u-shadow-md')}>
            <div>
              <h2 className={css['tableTitle']}>{t.title}</h2>
              <p className={css['tableSubtitle']}>{t.headerSubtitle}</p>
            </div>
            <span className={css['headerBadge']}>
              <HelpCircle />
              <span>{t.headerBadge}</span>
            </span>
          </div>

          <div className={cn(css['wrapper'], 'u-shadow-md')}>
            {/* Navigation tip */}
            <div className={css['tip']} role="note">
              <span className={css['tip__icon']} aria-hidden="true">
                <Icon name="info" size="small" />
              </span>
              <div className={css['tip__body']}>
                <p>{t.tip}</p>
                <Button
                  variant="next"
                  label={t.tourButton}
                  addClass="u-text-upper"
                  onClick={() => {
                    (document.querySelector('.js-button-help') as HTMLElement)?.click();
                  }}
                />
              </div>
            </div>

            {/* Technical specifications */}
            <section>
              <h3 className={css['section__title']}>
                <Icon name="settings" size="small" aria-hidden="true" />
                {t.specsTitle}
              </h3>

              <div className={css['specs']}>
                <article className={css['spec__card']}>
                  <h4 className={css['spec__card__title']}>
                    <Icon name="keyboard" size="small" aria-hidden="true" />
                    {t.techReqs}
                  </h4>
                  <ul className={css['spec__list']}>
                    {t.techList.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className={css['spec__card']}>
                  <h4 className={css['spec__card__title']}>
                    <Icon name="settings" size="small" aria-hidden="true" />
                    {t.hardware}
                  </h4>
                  <ul className={css['spec__list']}>
                    {t.hardwareList.map((item, i) =>
                      i === t.hardwareList.length - 1 ? (
                        <li key={item}>
                          {item}
                          <ul>
                            <li>Android 10</li>
                            <li>iOS 15</li>
                          </ul>
                        </li>
                      ) : (
                        <li key={item}>{item}</li>
                      )
                    )}
                  </ul>
                </article>

                <article className={css['spec__card']}>
                  <h4 className={css['spec__card__title']}>
                    <Icon name="globe" size="small" aria-hidden="true" />
                    {t.browsers}
                  </h4>
                  <ul className={css['spec__list']}>
                    {t.browserList.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>
          </div>
        </Col>
      </Row>
    </Content>
  );
};
