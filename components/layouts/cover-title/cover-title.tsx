import { useEffect } from 'react';
import { Icon } from '@ui';
import { Audio } from 'books-ui';
import { motion } from 'motion/react';
import { Link } from 'wouter';

import type { VideoURLs } from '@shared/hooks';
import { useBackground, useInterpreter } from '@shared/hooks';
import { focusMainElement } from '@shared/utils';
import { useOvaContext } from '@/context/ova-context';

import { i18n } from './lib/constant';

import css from './cover-title.module.css';

interface Props {
  addClass?: string;
  title: string;
  url?: string;
  interpreter?: VideoURLs;
  audio?: {
    a11y: string;
    title: string;
  };
}

export const CoverTitle: React.FC<Props> = ({
  addClass,
  title,
  url = 'assets/base/background-cover.webp',
  audio,
  interpreter
}) => {
  const [, setBackground] = useBackground();
  const [updateVideoSources] = useInterpreter();
  const { lang, selectedAvatarId } = useOvaContext();

  const path = selectedAvatarId ? `/page-1` : '/avatar';

  useEffect(() => {
    setBackground(url);
  }, [url, setBackground]);

  useEffect(() => {
    if (!interpreter) return;
    updateVideoSources({ mode: 'fixed', ...interpreter });
  }, [interpreter, updateVideoSources]);

  return (
    <>
      <div className={css['cover-image-wrapper']}></div>
      <motion.section
        className={`${css['cover-title']} ${addClass ?? ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}>
        <div className={css['cover-title__audio']}>{audio ? <Audio a11y src={audio.a11y} /> : null}</div>
        <div className={`${css['cover-title__title']} u-px-9`}>
          {audio ? <Audio src={audio.title} /> : null}
          <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
          <Link
            to={path}
            className={css['cover-title__link']}
            aria-label={i18n[lang].label}
            onClick={focusMainElement}>
            {i18n[lang].label} <Icon name="arrow-right-home-link" />
          </Link>
        </div>
      </motion.section>
    </>
  );
};
