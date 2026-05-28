import { QuizWheel } from './game-circular-wheel';

import css from './game-circular-quiz.module.css';

type GameCicrcularWrapperProps = {
  background?: string;
  addClass?: string;
  validatedQuestions: Record<number, 'success' | 'wrong'>;
  alt: string;
  children: React.ReactNode;
};

export const GameCircularWrapper = ({
  background,
  addClass,
  alt,
  validatedQuestions = {},
  children
}: GameCicrcularWrapperProps) => {
  return (
    <>
      <div
        style={{ '--background': background } as React.CSSProperties}
        className={`${css['game-circular-wrapper']} ${addClass ?? ''} `}>
        <QuizWheel validatedQuestions={validatedQuestions} />
        {children}
      </div>
      <p dangerouslySetInnerHTML={{ __html: alt }} className="u-text-center" />
    </>
  );
};
