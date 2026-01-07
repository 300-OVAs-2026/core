import { useId } from 'react';
import { Audio, Col, Row } from 'books-ui';

import { FullScreenAlert, FullScreenButton } from '@/shared/core/components';

import { initDataType } from './types/types';
import { GameButtonStart } from './game-button-start';
import { GameParallax } from './game-parallax';

import css from './game.module.css';

export interface propsLevel {
  data: initDataType;
  title?: string;
  alt?: string;
  introStatement?: string | JSX.Element;
}

export const GameLevelStart = ({ data, title, alt, introStatement }: propsLevel) => {
  console.log('🚀 ~ GameLevelStart ~ question:', data);
  const uid = useId();
  const fullscreenId = `fullscreen__section-${uid.replace(/:/g, '')}`;

  const { content, a11yURL, contentURL } = data;

  return (
    <>
      <Row alignItems="center" justifyContent="center">
        <Col xs="11" mm="10" md="9" lg="8" hd="7" addClass="u-mb-2 u-flow">
          <Audio src={a11yURL} a11y />
          <Audio src={contentURL} />
          <FullScreenAlert />
          {introStatement && introStatement}
        </Col>
        <Col xs="11" mm="10" lg="9" hd="8" addClass="u-flow u-mb-4">
          <div id={fullscreenId} className={`${css['fullscreen__section']} u-flow}`}>
            <div className={`${css['game__wrapper']} ${css['game__wrapper--start']}`} >
              <FullScreenButton elementId={fullscreenId} addClass={css.fullscreen__button} />
              <GameParallax />
              <div className={css.container__question}>
                <img src="assets/images/Ancla.webp" alt="" />
                <p className="u-font-bold u-text-center" dangerouslySetInnerHTML={{ __html: content }}></p>
                <img src="assets/images/Ancla.webp" alt="" />
              </div>

              <GameButtonStart />
            </div>
            <p className="u-text-center u-my-2 u-font-italic">
              <strong>{title} </strong>
              {alt}
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};
