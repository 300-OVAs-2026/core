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

  return (
    <Content withOutTitle>
      <Row justifyContent="center" alignItems="center">
        <Col xs="11" mm="10" md="9" lg="5" hd="4">
          <Avatar
            variation={AvatarVariation.GREETING}
            size="28.125rem"
            title={i18nHelp[lang].avatar}
            addClass={css['help__avatar']}
            alt="Avatar."
          />
        </Col>
        <Col xs="11" mm="10" md="9" lg="6" hd="6">
          <div className={cn(css['help__header'], 'u-shadow-md')}>
            <div>
              <h2 className={css['help__header-title']}>{i18nHelp[lang].title}</h2>
              <p className={css['help__header-subtitle']}>{i18nHelp[lang].headerSubtitle}</p>
            </div>
            <span className={css['help__header-badge']}>
              <HelpCircle />
              <span>{i18nHelp[lang].headerBadge}</span>
            </span>
          </div>

          <div className={cn(css['help__body'], 'u-shadow-md')}>
            <div className={css['help__tip']} role="note">
              <span className={css['help__tip-icon']} aria-hidden="true">
                <Icon name="info" size="small" />
              </span>
              <div className={css['help__tip-body']}>
                <p>{i18nHelp[lang].tip}</p>
                <Button
                  variant="next"
                  label={i18nHelp[lang].tourButton}
                  addClass="u-text-upper"
                  onClick={() => {
                    (document.querySelector('.js-button-help') as HTMLElement)?.click();
                  }}
                />
              </div>
            </div>

            {/* Technical specifications */}
            <section>
              <h3 className={css['help__section-title']}>
                <Icon name="settings" size="small" aria-hidden="true" />
                {i18nHelp[lang].specsTitle}
              </h3>

              <div className={css['help__specs']}>
                <article className={css['help__spec-card']}>
                  <h4 className={css['help__spec-card-title']}>
                    <Icon name="keyboard" size="small" aria-hidden="true" />
                    {i18nHelp[lang].techReqs}
                  </h4>
                  <ul className={css['help__spec-list']}>
                    {i18nHelp[lang].techList.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className={css['help__spec-card']}>
                  <h4 className={css['help__spec-card-title']}>
                    <Icon name="settings" size="small" aria-hidden="true" />
                    {i18nHelp[lang].hardware}
                  </h4>
                  <ul className={css['help__spec-list']}>
                    {i18nHelp[lang].hardwareList.map((item, i) =>
                      i === i18nHelp[lang].hardwareList.length - 1 ? (
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

                <article className={css['help__spec-card']}>
                  <h4 className={css['help__spec-card-title']}>
                    <Icon name="globe" size="small" aria-hidden="true" />
                    {i18nHelp[lang].browsers}
                  </h4>
                  <ul className={css['help__spec-list']}>
                    {i18nHelp[lang].browserList.map((item) => (
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
