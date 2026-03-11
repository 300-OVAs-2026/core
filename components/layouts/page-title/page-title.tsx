import { useCallback, useEffect, useId, useState } from 'react';
import { motion } from 'motion/react';
import { useHashLocation } from 'wouter/use-hash-location';

import { EVENTS } from '@/shared/constants/events';
import { getPageIcon } from '@/shared/utils/get-page-icon';
import { useOvaStore } from '@/store/ova-store';

import { PATH_REGEX } from './lib/constant';

import css from './page-title.module.css';

export const PageTitle = () => {
  const [title, setTitle] = useState<{ title: string; number: string }>({ title: '', number: '' });
  const [index, setIndex] = useState(0);
  const uid = useId();

  const [location] = useHashLocation();
  const pages = useOvaStore((state) => state.pages);
  const visitedPages = useOvaStore((state) => state.visitedPages);

  // Función para actualizar el título de la página
  const updateTitle = useCallback(
    (newTitle: string) => {
      // Obtener el número de la página actual desde la URL
      const currentPageNumber = (location.match(PATH_REGEX) || ['0'])[1];

      setTitle((prev) => {
        if (prev.number === currentPageNumber) {
          // Solo actualizar el título si el número de la página no ha cambiado
          return { ...prev, title: newTitle };
        }

        // Actualizar tanto el título como el número de la página
        return {
          title: newTitle,
          number: currentPageNumber
        };
      });
    },
    [location]
  );

  useEffect(() => {
    if (pages.length === 0 ) return;

    // Encontrar el índice del título actual basado en la ubicación
    const titleIndex = pages.findIndex((page) => page.path === location);

    if (titleIndex >= 0) {
      const currentTitle = pages[titleIndex].title;
      setIndex(titleIndex);
      updateTitle(currentTitle);
    }
  }, [location, pages, updateTitle]);

  useEffect(() => {
    /**
     * Manejador para actualizar el título cuando se despacha el evento `OVATITLEUPDATE`.
     *
     * @param event - El evento personalizado que contiene el nuevo título en `detail`.
     */
    const handleUpdateTitle = ({ detail }: CustomEvent<{ title: string }>) => {
      const currentTitle = detail.title;
      updateTitle(currentTitle);
    };

    document.addEventListener(EVENTS.OVATITLEUPDATE, handleUpdateTitle as EventListener);

    return () => {
      document.removeEventListener(EVENTS.OVATITLEUPDATE, handleUpdateTitle as EventListener);
    };
  }, [updateTitle]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${css['title-slide']} u-wrapper u-mb-2`}>
      <div className={css['title-slide__title']} aria-live="polite">
        <span aria-hidden="true">
          {title.number}.
        </span>
        <h1 aria-describedby={uid} aria-hidden="true" dangerouslySetInnerHTML={{ __html: title.title }} />
        <h1 id={uid} className="u-sr-only">
          Página {title.number}, {title.title}
        </h1>
      </div>
      <div className={css['title-slide__indicator']}>
        <div className={css['page-indicator']}>
          {getPageIcon(pages[index].kind)}
         <span>{visitedPages.length}&nbsp;/&nbsp;{pages.length}</span>
        </div>
        <div
          className={css['progress-bar']}
          role="meter"
          aria-valuemin={0}
          aria-valuemax={pages.length}
          aria-valuenow={visitedPages.length}
          aria-label="Progreso de la unidad">
          <div style={{ width: `${(visitedPages.length / pages.length) * 100}%` }}></div>
        </div>
      </div>
    </motion.div>
  );
};
