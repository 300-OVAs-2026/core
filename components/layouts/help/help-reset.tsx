import { useState } from 'react';

import { ToastFeedback } from '@features/toast-feedback';
import { useGamificationStore } from '@/store/gamification-store';
import { useOvaStore } from '@/store/ova-store';

import { Button } from '../../ui';

import { i18nHelp } from './lib/constant';

import css from './help.module.css';

export const HelpReset = () => {
  const lang = useOvaStore((state) => state.lang);
  const resetVisitedPages = useOvaStore((state) => state.resetVisitedPages);
  const resetGamification = useGamificationStore((state) => state.resetGamification);

  const [toast, setToast] = useState<{ isOpen: boolean; message: string }>({ isOpen: false, message: '' });

  const handleResetOva = () => {
    resetVisitedPages();
    setToast({ isOpen: true, message: i18nHelp[lang].resetOvaConfirm });
  };

  const handleResetActivities = () => {
    resetGamification();
    setToast({ isOpen: true, message: i18nHelp[lang].resetActivitiesConfirm });
  };

  return (
    <>
      <div className={css['help__reset-actions']}>
        <Button
          variant="reset"
          label={i18nHelp[lang].resetOvaButton}
          onClick={handleResetOva}
        />
        <Button
          variant="reset"
          label={i18nHelp[lang].resetActivitiesButton}
          onClick={handleResetActivities}
        />
      </div>

      <ToastFeedback
        type="success"
        isOpen={toast.isOpen}
        label={i18nHelp[lang].resetFeedbackLabel}
        onClose={() => setToast({ isOpen: false, message: '' })}
      >
        {toast.message}
      </ToastFeedback>
    </>
  );
};
