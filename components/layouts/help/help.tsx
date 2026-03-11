import { Content } from '@layouts';
import { Button, Icon, Image } from '@ui';
import { Col, Row } from 'books-ui';

import { cn } from '@/shared/utils';
import { useOvaStore } from '@/store/ova-store';

import { SPANISH_LANGUAGE } from './lib/constant';

import css from './help.module.css';

export const Help = () => {
  const lang = useOvaStore((state) => state.lang);
  const isEs = lang === SPANISH_LANGUAGE;

  return (
    <Content withOutTitle>
      <Row justifyContent="center" alignItems="center">
        <Col xs="11" mm="10" md="9" lg="5" hd="4">
          <Image
            src="assets/images/Ova_041_sld_01.webp"
            size="37.5rem"
            title="Image 1."
            alt="Personas mirando una diana."
          />
        </Col>
        <Col xs="11" mm="10" md="9" lg="6" hd="6">
          <div className={cn(css['wrapper'], 'u-shadow-md')}>
            <h2 className={css['help__title']}>
              <Icon name="help" size="small" />
              {isEs ? 'Centro de ayuda' : 'Help Center'}
            </h2>

            {/* Navigation tip */}
            <div className={css['tip']} role="note">
              <span className={css['tip__icon']} aria-hidden="true">
                <Icon name="info" size="small" />
              </span>
              <div className={css['tip__body']}>
                <p>
                  {isEs
                    ? 'Para navegar por la plataforma, activa el recorrido guiado haciendo clic en el botón de abajo. Te guiará por las principales características y funciones.'
                    : 'To navigate the platform, activate the guided tour by clicking the button below. It will walk you through the main features and functions.'}
                </p>
                <Button
                  uiType="next"
                  label={isEs ? 'Iniciar recorrido' : 'Start tour'}
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
                <Icon name="settings" size="small" />
                {isEs ? 'Especificaciones técnicas' : 'Technical Specifications'}
              </h3>

              <div className={css['specs']}>
                {/* Technical requirements */}
                <article className={css['spec__card']}>
                  <h4 className={css['spec__card__title']}>
                    <Icon name="keyboard" size="small" />
                    {isEs ? 'Requisitos técnicos' : 'Technical Requirements'}
                  </h4>
                  <ul className={css['spec__list']}>
                    <li>{isEs ? 'Conexión a internet ≥ 3G.' : 'Internet connection ≥ 3G.'}</li>
                    <li>{isEs ? 'Asistencia: NVDA, JAWS, VoiceOver.' : 'Assistive: NVDA, JAWS, VoiceOver.'}</li>
                  </ul>
                </article>

                {/* Hardware requirements */}
                <article className={css['spec__card']}>
                  <h4 className={css['spec__card__title']}>
                    <Icon name="settings" size="small" />
                    {isEs ? 'Hardware' : 'Hardware'}
                  </h4>
                  <ul className={css['spec__list']}>
                    <li>{isEs ? 'RAM mínima 4 GB.' : 'Minimum 4 GB RAM.'}</li>
                    <li>{isEs ? 'Dispositivo con internet.' : 'Device with internet.'}</li>
                    <li>
                      {isEs ? 'Monitor SVGA, resolución WXGA o superior.' : 'SVGA monitor, WXGA resolution or higher.'}
                    </li>
                    <li>
                      {isEs ? 'Smartphone con SO ≥:' : 'Smartphone with OS ≥:'}
                      <ul>
                        <li>Android 10</li>
                        <li>iOS 15</li>
                      </ul>
                    </li>
                  </ul>
                </article>

                {/* Browser versions */}
                <article className={css['spec__card']}>
                  <h4 className={css['spec__card__title']}>
                    <Icon name="globe" size="small" />
                    {isEs ? 'Navegadores' : 'Browsers'}
                  </h4>
                  <ul className={css['spec__list']}>
                    <li>Google Chrome v131</li>
                    <li>Safari v18</li>
                    <li>Mozilla Firefox v133</li>
                    <li>Microsoft Edge v131</li>
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
