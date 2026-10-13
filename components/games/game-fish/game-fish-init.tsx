import { Panel } from '@layouts';
import { useOvaStore } from '@/store/ova-store';

import { GameParallax } from './game-parallax';
import { BG, i18n } from './lib/constant';

import css from './game-fish.module.css';

interface Props {
  labelButton?: string;
  labelInstruction?: string;
  section?: number;
}

export const GameFishInit: React.FC<Props> = ({ labelButton, labelInstruction, section = 1 }) => {
  const lang = useOvaStore((state) => state.lang);

  const buttonText = labelButton ?? i18n[lang]['start-button'];
  const instructionText = labelInstruction ?? i18n[lang]['start-instruction'];

  return (
    <div className={css['init-container']}>
      <GameParallax />
      <div className={css['init-content']}>
        <div className={css['init-message-box']}>
          <img src={BG.ancla} className={css['anchor-icon']} alt="" />
          <p className="u-text-center u-font-bold">{instructionText}</p>
          <img src={BG.ancla} className={css['anchor-icon']} alt="" />
        </div>
        <Panel.Button section={section}>
          {/* El aria-label conserva el texto visible al inicio (WCAG 2.5.3 Label in Name) */}
          <button className={css['btn-start']} aria-label={`${buttonText}, ${i18n[lang]['start-button-hint']}`}>
            <span>{buttonText}</span>
          </button>
        </Panel.Button>
      </div>
    </div>
  );
};
