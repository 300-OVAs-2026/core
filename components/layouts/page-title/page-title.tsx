import { useCallback, useEffect, useId, useState } from 'react';
import { motion } from 'motion/react';
import { useHashLocation } from 'wouter/use-hash-location';

import { useOvaContext } from '@/context/ova-context';
import { EVENTS } from '@/shared/constants/events';

import { Icon } from '../../ui';

import { PATH_REGEX } from './lib/constant';

import css from './page-title.module.css';

export const PageTitle = () => {
  const [title, setTitle] = useState<{ title: string; number: string }>({ title: '', number: '' });
  const uid = useId();

  const [location] = useHashLocation();
  const { routes, titles } = useOvaContext();

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
    if (routes.length === 0 || titles.length === 0) return;

    // Encontrar el índice del título actual basado en la ubicación
    const titleIndex = routes.findIndex((route) => route === location);

    if (titleIndex >= 0) {
      const currentTitle = titles[titleIndex];
      updateTitle(currentTitle);
    }
  }, [location, routes, titles, updateTitle]);

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
          <Icon name="home" />
         <span>2&nbsp;/&nbsp;10</span>
        </div>
        <div
          className={css['progress-bar']}
          role="meter"
          aria-valuemin={1}
          aria-valuemax={100}
          aria-valuenow={5}
          aria-label="Progreso de la unidad">
          <div></div>
        </div>
      </div>
    </motion.div>
  );
};
