import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { ModalFeedback } from '@core/components';
import { Button } from '@ui/components';

import { useOvaContext } from '@/context/ova-context';

import type { ActivityOptions, DriversType, ModalName, modalType } from './types/types';
import { i18n } from './const';
import { useGameContext } from './race-card-context';
import { Carts, Feedback,Road, Score, Sky } from './svg-parts';

import css from './svg-card.module.css';


interface Props {
  question: string;
  selected: string;
  toShowModal?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetSelected: () => void;
  modalFinal: modalType;
  drivers?: DriversType;
  id: string;
}

const POINTS_FOR_CORRECT_ANSWER = 100;
const MOVE_DISTANCE = Math.floor(Math.random() * (70 - 40 + 1)) + 40;
const HALF_DAY = 12;
const PASSING_PERCENTAGE = 0.6; 
const PLAYERS = Object.freeze({
  player1: 1,
  player2: 2
});

const RaceCard: React.FC<Props> = ({ id, question, selected, toShowModal = false, modalFinal, resetSelected, drivers }) => {
 const { lang } = useOvaContext();
  const { game, updateGame, questionCount } = useGameContext();
  const refQuestion = useRef<HTMLDivElement>(null);

  const [winner, setWinner] = useState<number | null>(null);
  const [modal, setModal] = useState<ModalName | null>(null);
  const [activity, setActivity] = useState<ActivityOptions>({
    validation: true,
    button: true,
    showFeedback: false,
    lastFeedback: false
  });

  const SKY_COLOR = new Date().getHours() < HALF_DAY ? '#AFCFF1' : '#ffb36b';

  /**
   * Updates the game state and determines the winner based on the player's action.
   *
   * @param {number} player - The player number (e.g., PLAYERS.player1 or PLAYERS.player2).
   * @param {string} dataState - The new state to be set for the data elements.
   * @param {(winner: number) => void} callback - A callback function that is called with the winner's number.
   */
  const updateStateAndWinner = (player: number, dataState: string, callback: (winner: number) => void) => {
    let winner;
    const dataElement = document.querySelectorAll('section:not([aria-hidden="true"]) input[type="radio"][data-state]');

    dataElement.forEach((element) => element.setAttribute('data-state', dataState));

    if (player === PLAYERS.player1) {
      updateGame({
        pointplayer1: game.pointplayer1 + POINTS_FOR_CORRECT_ANSWER,
        move1: game.move1 + MOVE_DISTANCE,
        answeredCount: game.answeredCount + 1,
        rightAnswers: game.rightAnswers + 1
      });
      winner = PLAYERS.player1;
    } else {
      updateGame({
        pointplayer2: game.pointplayer2 + POINTS_FOR_CORRECT_ANSWER,
        move2: game.move2 + MOVE_DISTANCE,
        answeredCount: game.answeredCount + 1
      });
      winner = PLAYERS.player2;
    }

    setWinner(winner);
    callback(winner);
  };

  /**
   * Determines the speed based on the selected state and updates the state and winner accordingly.
   *
   * If the selected state is 'success', it updates the state and winner for player1 as 'correct'.
   * Otherwise, it updates the state and winner for player2 as 'incorrect'.
   *
   * @function
   * @returns {void}
   */
  const speed = () => {
    if (selected === 'success') {
      updateStateAndWinner(PLAYERS.player1, 'correct', showResult);
    } else {
      updateStateAndWinner(PLAYERS.player2, 'incorrect', showResult);
    }
  };

  /**
   * Displays the result based on the winner.
   *
   * @param {number} winner - The winner of the race. Should be a number representing the player.
   * @returns {void} - Does not return anything.
   *
   * If the winner is not provided or the modal should not be shown, the function exits early.
   * If the winner is `PLAYERS.player1`, it sets the modal to 'correct', otherwise it sets it to 'incorrect'.
   */
  const showResult = (winner: number) => {
    if (!winner || !toShowModal) return;
    setModal(winner === PLAYERS.player1 ? 'correct' : 'incorrect');
  };

  /**
   * Disables all radio input elements within the currently visible section,
   * triggers the speed function, updates the activity state, and resets the selected state.
   *
   * @function validationActivity
   * @returns {void}
   */
  const validationActivity = () => {
    const inputElements = document.querySelectorAll(
      `section:not([aria-hidden="true"]) input[type="radio"][name="radio-svg-question-${id}"][data-input="svg"]`
    );

    inputElements.forEach((element) => {
      (element as HTMLInputElement).disabled = true;
    });

    speed();

    const newActivityState = {
      button: selected === 'success',
      validation: true,
      showFeedback: true
    };

    setActivity((prev) => ({
      ...prev,
      ...newActivityState
    }));

    resetSelected();
  };

  const closeModal = () => setModal(null);

  /**
   * Resets the activity state by closing the modal, enabling and unchecking all radio input elements,
   * updating the game state based on the winner, and resetting the activity state.
   *
   * - Enables and unchecks all radio input elements with a specific name and data attribute.
   * - Updates the game state by decrementing the move and points of the winning player.
   * - Resets the winner state to null.
   * - Resets the activity state to show feedback as false, button as true, and validation as true.
   */
  const resetActivity = () => {
    closeModal();

    const inputElements = document.querySelectorAll(
      `input[type="radio"][name="radio-svg-question-${id}"][data-input="svg"]`
    );

    inputElements.forEach((element) => {
      (element as HTMLInputElement).disabled = false;
      (element as HTMLInputElement).checked = false;
      (element as HTMLInputElement).setAttribute('data-state', '');
    });

    if (winner === PLAYERS.player1) {
      updateGame({
        move1: game.move1 - MOVE_DISTANCE,
        pointplayer1: game.pointplayer1 - POINTS_FOR_CORRECT_ANSWER,
        answeredCount: game.answeredCount > 0 ? game.answeredCount - 1 : 0
      });
    } else if (winner === PLAYERS.player2) {
      updateGame({
        move2: game.move2 - MOVE_DISTANCE,
        pointplayer2: game.pointplayer2 - POINTS_FOR_CORRECT_ANSWER,
        answeredCount: game.answeredCount > 0 ? game.answeredCount - 1 : 0,
      });
    }

    setWinner(null);
    setActivity((prev) => ({
      ...prev,
      showFeedback: false,
      button: true,
      validation: true,
      lastFeedback: false
    }));
  };

  const handleFinalFeedback = () => {
    setActivity((prev) => ({
      ...prev,
      lastFeedback: true
    }));
  };

  // Check if the last feedback should be shown
  const isReadyToShowLastFeedback = useMemo(
    () => game.answeredCount === questionCount && activity.validation,
    [game.answeredCount, questionCount, activity.validation]
  );

  // Calculate if the player has enough right answers to pass
  const isRight = game.rightAnswers / questionCount >= PASSING_PERCENTAGE;

  useEffect(() => {
    if (selected && activity.button) {
      setActivity((prev) => ({ ...prev, validation: false }));
    }
  }, [selected, activity.button]);

  useEffect(() => {
    if (isReadyToShowLastFeedback) {
      handleFinalFeedback();
    }
  }, [isReadyToShowLastFeedback]);

  return (
    <>
      <svg
        id="svg-sld14-game"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 777.6 500"
        style={{
          background: 'new 0 0 777.6 500'
        }}
        xmlSpace="preserve">
        <style type="text/css">
          {`
            #svg-sld14-game .st0 {
                fill: ${SKY_COLOR};
            }

            #svg-sld14-game .st1 {
                fill: #CCEAF8;
            }

            #svg-sld14-game .st2 {
                fill: #B8E6F6;
            }

            #svg-sld14-game .st3 {
                fill: #569E3A;
            }

            #svg-sld14-game .st4 {
                fill: #876132;
            }

            #svg-sld14-game .st5 {
                fill: #76AC2B;
            }

            #svg-sld14-game .st6 {
                fill: #6D961F;
            }

            #svg-sld14-game .st7 {
                fill: #72C628;
            }

            #svg-sld14-game .st8 {
                fill: #8EC15B;
            }

            #svg-sld14-game .st9 {
                fill: #D6D5CD;
            }

            #svg-sld14-game .st10 {
                fill: #E42D2C;
            }

            #svg-sld14-game .st11 {
                fill: #FDFDFD;
            }

            #svg-sld14-game .st12 {
                fill: #8E8D87;
            }

            #svg-sld14-game .st13 {
                fill: #696969;
            }

            #svg-sld14-game .st14 {
                fill: #6D6D68;
            }

            #svg-sld14-game .st15 {
                fill: #5B9B3D;
            }

            #svg-sld14-game .st16 {
                fill: #418338;
            }

            #svg-sld14-game .st17 {
                fill: #4A5147;
            }

            #svg-sld14-game .st18 {
                opacity: 0.3;
                fill: #1D1D1B;
                enable-background: new;
            }

            #svg-sld14-game .st19 {
                fill: #1D1D1B;
            }

            #svg-sld14-game .st20 {
                fill: #FFFFFF;
            }

            #svg-sld14-game .st21 {
                fill: #231F20;
            }

            #svg-sld14-game .st22 {
                fill: #191717;
            }

            #svg-sld14-game .st23 {
                fill: #76e0b3
            }


            #svg-sld14-game .st24 {
                fill: #FAB83A;
            }

            #svg-sld14-game .st25 {
                opacity: 0.31;
                fill: #FFFFFF;
                enable-background: new;
            }

            #svg-sld14-game .st26 {
                opacity: 0.29;
                fill: #1D1D1B;
                enable-background: new;
            }

            #svg-sld14-game .st27 {
                fill: #252024;
            }

            #svg-sld14-game .st28 {
                fill: #3E393D;
            }

            #svg-sld14-game .st29 {
                fill: #6C6D69;
            }

            #svg-sld14-game .st30 {
                fill: #257100;
            }

            #svg-sld14-game .st31 {
                fill: #4da623;
            }

            #svg-sld14-game .st32 {
                fill: #247000;
            }

            #svg-sld14-game .st33 {
                fill: #23ba76;
            }

            #svg-sld14-game .aleron-azul {
                fill: #006ec2;
            }


            #svg-sld14-game .st34 {
                fill: white;
            }

            #svg-sld14-game .st35 {
                fill: none;
                stroke: #646363;
                stroke-width: 1.9779;
                stroke-linecap: round;
                stroke-miterlimit: 10;
            }

            #svg-sld14-game .st36 {
                fill: #A9A8AD;
            }

            #svg-sld14-game .st37 {
                fill: #F8CD75;
            }

            #svg-sld14-game .st38 {
                fill: #231F20;
                stroke: #A9A8AD;
                stroke-width: 1.1228;
                stroke-miterlimit: 10;
            }

            #svg-sld14-game .st39 {
                fill: #DDDDDD;
            }

            #svg-sld14-game .st40 {
                fill: #327E8C;
            }

            #svg-sld14-game .st41 {
                fill: #4FBAAB;
            }

            #svg-sld14-game .st42 {
                fill: #41a9ff;
            }

            #svg-sld14-game .st43 {
                fill: #035b81;
            }

            #svg-sld14-game .st44 {
                fill: #018cd0;
            }

            #svg-sld14-game .st45 {
                fill: #025d83;
            }

            #svg-sld14-game .st46 {
                fill: #006ec2;
            }

            #svg-sld14-game .st47 {
                fill: #ADB6DE;
            }

            #svg-sld14-game .st48 {
                fill: #2C2054;
            }

            #svg-sld14-game .st49 {
                fill: #FCC13A;
            }

            #svg-sld14-game .st50 {
                fill: #585858;
            }

            #svg-sld14-game .st51 {
                fill: none;
                stroke: #1D1D1B;
                stroke-width: 2.0523;
                stroke-miterlimit: 10;
            }

            #svg-sld14-game .st52 {
                fill: #FDC537;
                stroke: #FFFFFF;
                stroke-width: 5.7906;
                stroke-miterlimit: 10;
            }

            #svg-sld14-game .st53 {
                fill: #771928;
            }

            #svg-sld14-game .st54 {
                fill: none;
                stroke: #646363;
                stroke-width: 1.3515;
                stroke-linecap: round;
                stroke-miterlimit: 10;
            }

            #svg-sld14-game .st55 {
                fill: #231F20;
                stroke: #A9A8AD;
                stroke-width: 0.7673;
                stroke-miterlimit: 10;
            }

            #svg-sld14-game .st56 {
                fill: #FFFBDA;
                stroke: #55539F;
                stroke-width: 3.2032;
                stroke-miterlimit: 10;
            }

            #svg-sld14-game .st57 {
                fill: #FFFBDA;
                stroke: #55539F;
                stroke-width: 5.6801;
                stroke-miterlimit: 10;
            }

            #svg-sld14-game .st58 {
                fill: none;
                stroke: #1D1D1B;
                stroke-width: 1.4849;
                stroke-miterlimit: 10;
            }

            #svg-sld14-game .st59 {
                fill: #80B74C;
                stroke: #FFFFFF;
                stroke-width: 4.1896;
                stroke-miterlimit: 10;
            }

            #svg-sld14-game .st60 {
                fill: #086F4C;
            }

            #svg-sld14-game .st61 {
                fill: none;
                stroke: #646363;
                stroke-width: 1.1183;
                stroke-linecap: round;
                stroke-miterlimit: 10;
            }

            #svg-sld14-game .st62 {
                fill: #231F20;
                stroke: #A9A8AD;
                stroke-width: 0.6348;
                stroke-miterlimit: 10;
            }

            #svg-sld14-game .st63 {
                fill: #E62A29;
                stroke: #FFFFFF;
                stroke-width: 4.1896;
                stroke-miterlimit: 10;
            }

            #svg-sld14-game .st64 {
                fill: #711912;
            }

            #svg-sld14-game .st65 {
                fill: #00495C;
                stroke: #FFFFFF;
                stroke-width: 2.8702;
                stroke-miterlimit: 10;
            }
          
          `}
        </style>

        <Sky />
        <Road />
        <Carts />
        <Score drivers={drivers}/>

        {/* Question */}
        <foreignObject x="150" y="10" width="500" height="200">
          <div className="u-flow">
            <div ref={refQuestion} className={`u-flow u-text-center ${css['box-questions']}`}>
              <p className="u-font-bold">{question}</p>
            </div>
            {/* Button check */}
            <div className={css['question__validation-buttons']}>
              <Button disabled={activity.validation} onClick={validationActivity} label={i18n[lang]['check-button']} />
              <Button disabled={activity.button} onClick={resetActivity} label={i18n[lang]['restar-button']} />
            </div>
          </div>
        </foreignObject>

         {/* Feedback */}
        <foreignObject x="150" y="200" width="500" height="280">
          {activity.lastFeedback && <Feedback isRight={isRight} />}
        </foreignObject>
      </svg>

      <ModalFeedback
        type="success"
        id="modal-sld14-correct"
        isOpen={modal === 'correct'}
        onClose={closeModal}
        finalFocusRef=".js-button-correct"
        audio={modalFinal?.audioSuccess}
        interpreter={{ contentURL: modalFinal?.interpreterSuccess }}>
        <p dangerouslySetInnerHTML={{ __html: modalFinal?.textSuccess }}></p>
      </ModalFeedback>

      <ModalFeedback
        type="wrong"
        id="modal-sld14-incorrect"
        isOpen={modal === 'incorrect'}
        onClose={closeModal}
        finalFocusRef=".js-button-incorrect"
        audio={modalFinal?.audioWrong}
        interpreter={{ contentURL: modalFinal?.interpreterWrong }}>
        <p dangerouslySetInnerHTML={{ __html: modalFinal.textWrong }}></p>
      </ModalFeedback>
    </>
  );
};

export const RaceCardScene = memo(RaceCard);
