import gameCircularCircle from './assets/images/game-circular-circle.webp';
import { useGameCircularQuizContext } from './game-circular-quiz-context';

import css from './game-circular-quiz.module.css';

type QuizWheelProps = {
  validatedQuestions: Record<number, 'success' | 'wrong'>;
  addClass?: string;
};

export const QuizWheel = ({ validatedQuestions, addClass }: QuizWheelProps) => {
  const { totalQuestions } = useGameCircularQuizContext();
  const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);
  const getStatusClass = (questionIndex: number) => {
    const questionNumber = questionIndex + 1;

    const status = validatedQuestions[questionNumber];

    if (!status) return '';

    return status === 'success' ? css.success : css.wrong;
  };

  const isValidatedQuestion = (questionIndex: number) => {
    const questionNumber = questionIndex + 1;

    return !!validatedQuestions[questionNumber];
  };

  return (
    <div className={`${css.wrapper} ${addClass ?? ''}`}>
      <div className={css.centerWheel}>
        <img src={gameCircularCircle} alt="" className={css.centerImage} width={200} />
      </div>

      {questions.map((question, index) => {
        const angle = (360 / questions.length) * index;
        const statusClass = getStatusClass(index);
        const hideNumber = isValidatedQuestion(index);

        return (
          <button
            tabIndex={-1}
            key={question}
            className={`${css.numberButton} ${statusClass}`}
            style={{
              transform: `
                rotate(${angle}deg)
                translateY(-135px)
                rotate(-${angle}deg)
              `
            }}>
            <span style={{ color: hideNumber ? 'transparent' : '#000' }}>{question}</span>
          </button>
        );
      })}
    </div>
  );
};
