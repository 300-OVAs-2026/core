import { useCallback, useLayoutEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { useHashLocation } from 'wouter/use-hash-location';

import { DevToolbar } from '@features/dev-toolbar';
import { Interpreter } from '@features/interpreter';
import { FloatingNotes } from '@features/notes';
import { Footer, Header } from '@layouts';
import { useA11yAttribute, useReduceMotion } from '@shared/hooks';
import { REMOVE_HTML_TAGS_REGEX } from '@/shared/constants';
import { cn } from '@/shared/utils';
import { useOvaStore } from '@/store/ova-store';

import css from './layout.module.css';


const HOME_PATH = '/';
const PATH_REGEX = /\/page-(\d+)/;
interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [location] = useHashLocation();
  const pages = useOvaStore((state) => state.pages);
  const baseTitle = useOvaStore((state) => state.baseTitle);

  // Detecta si el usuario prefiere reducir la animación
  const reduceMotion = useReduceMotion();
  // Obtener el estado de la propiedad de accesibilidad 'stopAnimations'
  const { stopAnimations } = useA11yAttribute();

  /**
   * Actualiza el título de la página según la página actual.
   */
  const updatePageTitle = useCallback(() => {
    const currentPageTitle = pages[currentPage - 1]?.title; // Ajustar índice para obtener el título correcto

    if (currentPageTitle) {
      document.title = currentPageTitle.replace(REMOVE_HTML_TAGS_REGEX, '');
    } else {
      document.title = baseTitle.replace(REMOVE_HTML_TAGS_REGEX, '');
    }
  }, [pages, currentPage, baseTitle]);

  /**
   * Actualiza el estado de la página actual basado en la URL.
   * Se ejecuta después de que los cambios de diseño del DOM se han aplicado.
   */
  useLayoutEffect(() => {
    const currentPageNumber = (location.match(PATH_REGEX) || [null, '0'])[1];
    setCurrentPage(+currentPageNumber);
    updatePageTitle();
  }, [location, updatePageTitle]);

  return (
    <MotionConfig reducedMotion={`${stopAnimations || reduceMotion ? 'always' : 'never'}`}>
      <Header />
      <Interpreter />
      {location !== '/notas' && location !== HOME_PATH && <FloatingNotes currentPage={location} />}
      <main id="main" className={cn(css['main'], 'u-wrapper u-flex u-flex-1 u-px-2 u-py-2 h-full')} data-home={location === HOME_PATH} tabIndex={-1}>
        {children}
      </main>
      {location !== HOME_PATH ? <Footer /> : null}
      {import.meta.env.DEV && <DevToolbar />}
    </MotionConfig>
  );
};
