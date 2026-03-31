import { useState } from 'react';
import { Tour } from 'books-ui';

import { useOvaStore } from '@/store/ova-store';

import { Button } from '../../ui';

import { i18nHelp, i18nTour } from './lib/constant';

import css from './help.module.css';

export const HelpTour = () => {
  const lang = useOvaStore((state) => state.lang);

  const [openTour, setOpenTour] = useState<boolean>(false);

  const handleTour = (state: boolean) => {
    setOpenTour(!state);
  };

  const TOUR_STEPS = [
    {
      target: '.js-menu-button--hamburger',
      content: i18nTour[lang].hamburger
    },
    {
      target: '.js-button-audio-a11y',
      content: i18nTour[lang].a11y
    },
    {
      target: '.js-button-interpreter',
      content: i18nTour[lang].interpreter
    },
    {
      target: '.js-button-medals',
      content: i18nTour[lang].medals
    },
    {
      target: '.js-button-notes',
      content: i18nTour[lang].notes
    },
    {
      target: '.js-menu-navigation',
      content: i18nTour[lang].navigation
    }
  ];

  return (
    <>
      <Button variant="next" label={i18nHelp[lang].tourButton} addClass="u-text-upper" onClick={() => handleTour(openTour)} />
      <Tour steps={TOUR_STEPS} isOpen={openTour} onClose={() => handleTour(openTour)} finalFocusRef=".js-button-tour">
        <Tour.Layer addClass={css['tour__layer']} />
        <Tour.Modal addClass={css['tour__element']} />
      </Tour>
    </>
  );
};
