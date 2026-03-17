import React, { useEffect } from 'react';
import { PageTitle } from '@layouts';
import { motion } from 'motion/react';

import type { VideoURLs } from '@shared/hooks';
import { useInterpreter } from '@shared/hooks';

import css from './content.module.css';

interface Props {
  addClass?: string;
  children: React.ReactNode;
  interpreter?: VideoURLs;
  withOutTitle?: boolean;
  stars?: React.ReactNode;
}

export const Content: React.FC<Props> = ({
  addClass,
  children,
  interpreter,
  stars,
  withOutTitle = false,
  ...props
}) => {
  const [updateVideoSources] = useInterpreter();

  useEffect(() => {
    if (!interpreter) return;
    updateVideoSources({ mode: 'fixed', ...interpreter });
  }, [interpreter, updateVideoSources]);

  return (
    <motion.section
      className={`${css['content']} ${addClass ?? ''}`}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeIn', type: 'spring', stiffness: 100 }}
      {...props}>
      {!withOutTitle && <PageTitle stars={stars} />}
      {children}
    </motion.section>
  );
};
