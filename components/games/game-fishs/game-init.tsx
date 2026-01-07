import { Panel } from '@/shared/ui/components';

import type { initDataType, question_game } from './types/types';
import type { propsLevel } from './game-level';
import { GameLevel } from './game-level';
import { GameLevelStart } from './game-level-start';

interface props_GameFish extends propsLevel {
  questions: question_game[];
  initData?: initDataType;
  isInitData?: boolean;
  addClassBtnFish?: string;
  video_interpreter?: video_interpreter;
  showNumberQuestion?: boolean;
  fishTop?: number;
}
interface video_interpreter {
  a11yURL: string;
  contentURL: string;
}

export function GameFish({
  addClassBtnFish,
  questions,
  video_interpreter,
  initData,
  showNumberQuestion = false,
  isInitData = true,
  children,
  ...props
}: props_GameFish) {
  return (
    <Panel>
      {isInitData && initData && (
        <Panel.Section
          interpreter={{
            a11yURL: `${video_interpreter?.a11yURL}_1.mp4`,
            contentURL: `${video_interpreter?.contentURL}_1.mp4 `
          }}>
          <GameLevelStart data={initData} {...props} />
        </Panel.Section>
      )}
      {questions.map((quest, index) => (
        <Panel.Section
          key={index}
          interpreter={{
            a11yURL: `${video_interpreter?.a11yURL}_${index + (isInitData ? 2 : 1)}.mp4`,
            contentURL: `${video_interpreter?.contentURL}_${index + (isInitData ? 2 : 1)}.mp4 `
          }}>
          <GameLevel
            numberQuestion={showNumberQuestion ? index + 1 : null}
            addClassBtnFish={addClassBtnFish}
            question={quest}
            index={index + 1 === questions.length ? undefined : index + 1}
            {...props}
            questionsCount={questions.length}
          />
        </Panel.Section>
      ))}
      {children}
    </Panel>
  );
}
