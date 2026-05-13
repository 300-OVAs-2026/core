import { Children, cloneElement, isValidElement } from 'react';
import { Panel as PanelUI } from 'books-ui';

import { useInterpreter } from '@/shared/hooks';

import { usePanelCoreContext } from './panel-context';

import type { InterpreterSource } from './types/types';

interface PanelButtonProps {
  children: JSX.Element;
  section: number;
}

export const PanelButton: React.FC<PanelButtonProps> = ({ children, section }) => {
  const { interpreter } = usePanelCoreContext();
  const [updateVideoSources] = useInterpreter();

  /**
   * Maneja la actualización de los videos del intérprete según la sección seleccionada.
   *
   * @param section - La sección seleccionada.
   */
  const handleInterpreterSectionChange = (section: number) => {
    if (interpreter.length === 0) return;

    // Encontrar las fuentes de video del intérprete correspondientes a la sección actual
    const currentInterpreterVideoSources = interpreter[section] as InterpreterSource;

    if (currentInterpreterVideoSources) {
      const { a11yURL, contentURL } = currentInterpreterVideoSources;
      updateVideoSources({ mode: 'fixed', a11yURL, contentURL });
    }
  };

  return (
    <PanelUI.Button section={section}>
      {
        Children.map(children, (child) => {
          if (!isValidElement(child)) return child;
          // Clonamos el elemento hijo y agregamos un nuevo onClick que llama al onClick original y a handleInterpreterSectionChange
          return cloneElement(child as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
            ...(child.props as React.HTMLAttributes<HTMLElement>),
            onClick: (e: React.MouseEvent<HTMLElement>) => {
              if ((child.props as React.HTMLAttributes<HTMLElement>).onClick) {
                (child.props as React.HTMLAttributes<HTMLElement>).onClick!(e);
              }
              handleInterpreterSectionChange(section);
            }
          });
        }) as unknown as React.ReactElement
      }
    </PanelUI.Button>
  );
};
