import css from './game-circular-quiz.module.css';

type GameCircularQuizQuestion = {
  question: string;
  questionTitle: string;
  addClass?: string;
  children?: React.ReactNode;
};

export const GameCircularQuizQuestion = ({ question, questionTitle, addClass, children }: GameCircularQuizQuestion) => {
  return (
    <div className={`u-text-center u-flow ${css['game-circular-question']} ${addClass ?? ''} `}>
      <h2 className={`u-text-upper ${css['question-title']} `}>{questionTitle}</h2>
      <div className={css['question']}>
        <p dangerouslySetInnerHTML={{ __html: question }} />
      </div>
      {children}
    </div>
  );
};
