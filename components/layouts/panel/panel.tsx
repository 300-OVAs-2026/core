import { useState } from 'react';
import type { PanelProps } from 'books-ui';
import { Panel as PanelUI } from 'books-ui';

import { PageTitle } from '../page-title';

import { PanelCoreProvider } from './panel-context';
import { PanelProgress } from './panel-progress';
import { PanelSection } from './panel-section';

import type { InterpreterSource } from './types/types';

import css from './panel.module.css';

interface Props extends PanelProps {
  addClass?: string;
  stars?: React.ReactNode;
}

type SubModules = {
  Section: typeof PanelSection;
};

const Panel: React.FC<Props> & SubModules = ({ addClass, children, stars, ...props }) => {
  const [sectionTitles, setSectionTitles] = useState<string[]>([]);
  const [interpreterSources, setInterpreterSources] = useState<InterpreterSource[]>([]);

  const addSectionTitle = (title: string): void => {
    if (!sectionTitles.includes(title)) {
      setSectionTitles((prev) => [...prev, title]);
    }
  };

  const addNewVideoSource = ({ uid, a11yURL, contentURL }: InterpreterSource) => {
    const videoExists = interpreterSources.some((video) => video.uid === uid);

    if (!videoExists) {
      setInterpreterSources((prev) => [...prev, { uid, a11yURL, contentURL }]);
    }
  };

  return (
    <PanelCoreProvider
      value={{
        titles: sectionTitles,
        addSectionTitle,
        interpreter: interpreterSources,
        addNewVideoSource
      }}>
      <PanelUI type="carrousel" addClass={`${css['panel']} ${addClass ?? ''}`} {...props}>
        <PageTitle stars={stars} />

        <PanelProgress />

        {children}
      </PanelUI>
    </PanelCoreProvider>
  );
};

Panel.Section = PanelSection;

export { Panel };
