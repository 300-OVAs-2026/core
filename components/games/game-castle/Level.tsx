import type { ReactNode } from 'react';
import { useId } from 'react';
import { Col, Panel, Row } from 'books-ui';

import { Box } from './box';
import { useGameCastleContext } from './game-castle-context';
import { Parallax } from './parrallax';

import css from './styles/level.module.css';

interface propsLevel {
  intro?: boolean;
  content?: ReactNode;
  title?: string;
  alt?: string;
  labelButton?: string;
  label?: string;
}

export default function Level({ intro, title, alt, content, labelButton = 'INICIO', label }: propsLevel) {
  const uid = useId();
  const { addSelectAnswer, selectAnswers, openModal, question } = useGameCastleContext();

  return (
    <>
      <Row id={uid} alignItems="center" justifyContent="center">
        <Col xs="11" mm="10" md="9" lg="8" hd="7" addClass="u-mb-2 u-flow">
          {content}
        </Col>
        <Col xs="11" mm="10" lg="9" hd="8" addClass="u-flow">
          <Parallax>
            <>
              <div
                className={`${css.container__question} u-py-1.5 u-px-0.5`}
                {...(openModal && {
                  style: { '--bg': openModal === 'success' ? '#CBE080' : '#FCB6B6' } as React.CSSProperties
                })}>
                <img src="assets/images/Ancla.webp" alt="" />
                <p className="u-font-bold u-text-center">{question?.question || (intro && label)}</p>
                <img src="assets/images/Ancla.webp" alt="" />
              </div>

              {intro && (
                <Panel.Button section={1}>
                  <button className={css.init_button}>{labelButton}</button>
                </Panel.Button>
              )}

              {question?.answers?.map((q, i) => (
                <Box
                  key={q + i}
                  id={i}
                  question={q}
                  isDisabled={!!openModal}
                  isPressed={q === selectAnswers}
                  isCorrect={openModal === 'success'}
                  totalQuestions={question?.answers?.length || 0}
                  addSelectAnswer={addSelectAnswer}
                />
              ))}
            </>
          </Parallax>

          <p className="u-text-center">
            <strong>{title}</strong> {alt}
          </p>
        </Col>
      </Row>
    </>
  );
}
