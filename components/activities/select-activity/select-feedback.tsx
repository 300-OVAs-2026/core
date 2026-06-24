import { useEffect, useId, useState } from 'react';
import { Audio } from 'books-ui';
import { AnimatePresence, motion } from 'motion/react';

import { useOvaStore } from '@/store/ova-store';

import { useSelectActivityContext } from './select-activity-context';

import css from './select.module.css';

interface Props {
  id: string;
  success: {
    feedback: string;
    audio: string;
    interpreter?: string;
  };
  wrong: {
    feedback: string;
    audio: string;
    interpreter?: string;
  };
  addClass?: string;
}

export const SelectFeedback: React.FC<Props> = ({ id, success, wrong, addClass }) => {
  const lang = useOvaStore((state) => state.lang);
  const { selectedOptions, validation } = useSelectActivityContext();

  const uid = useId();
  const [showInterpreter, setShowInterpreter] = useState<boolean>(false);

  // Busca el resultado de ESTE select por su id
  const selected = selectedOptions.find((option) => option.id === id);
  const result = selected?.state === 'success';

  useEffect(() => {
    const handleInterpreterVisibility = ({ detail }: CustomEvent<{ hidden: boolean }>) => {
      setShowInterpreter(!detail.hidden);
    };

    document.addEventListener('changeInterpreteVideoVisibility', handleInterpreterVisibility as EventListener);

    return () => {
      document.removeEventListener('changeInterpreteVideoVisibility', handleInterpreterVisibility as EventListener);
    };
  }, []);

  const i18n = { en: { success: 'CORRECT!', wrong: 'WRONG!' }, es: { success: '¡CORRECTO!', wrong: '¡INCORRECTO!' } };

  return (
    <AnimatePresence initial={false}>
      {validation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          data-result={result}
          className={`${css['feedback']} u-mt-2 u-mb-3 ${addClass ?? ''}`}
          aria-live="polite"
          aria-labelledby={uid}
          role="status">
          <div className={css.icon}>{result ? '✓' : '✕'}</div>
          <div className="u-flow">
            <h2 className={css['feedback__title']}>{i18n[lang][result ? 'success' : 'wrong']}</h2>
            <p id={uid} dangerouslySetInnerHTML={{ __html: result ? success.feedback : wrong.feedback }}></p>
            <Audio src={result ? success.audio : wrong.audio} />
          </div>
          {showInterpreter && (
            <video
              className={css['feedback__video-interpreter']}
              controls
              muted
              controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
              src={`assets/videos/interprete/${result ? success.interpreter : wrong.interpreter}`}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
