import type { VideoURLs } from '@shared/hooks';

import { EVENTS } from '../constants/events';

const BASE_PATH = import.meta.env.VITE_INTERPRETER_URL || 'assets/videos/interprete/';

/**
 * Función para despachar un evento personalizado para cambiar las fuentes de video del intérprete.
 * @param {Object} param0 - Objeto que contiene las nuevas URLs de accesibilidad y de contenido.
 * @param {string} [param0.a11yURL] - URL del video de accesibilidad.
 * @param {string} [param0.contentURL] - URL del video de contenido.
 */
export const eventChangeInterpreterVideo = ({ a11yURL, contentURL }: VideoURLs) => {
  // Crear un evento personalizado con los nuevos videos como detalle
  // Si enviamos las URLs vacias el componente de interprete entenderá que debe ocultar el video correspondiente.
  const event = new CustomEvent(EVENTS.CHANGEINTERPRETEVIDEOSOURCES, {
    detail: {
      accesibilityURL: a11yURL ? `${BASE_PATH}${a11yURL}` : undefined,
      contentURL: contentURL ? `${BASE_PATH}${contentURL}` : undefined
    }
  });

  // Despachar el evento a nivel del documento
  document.dispatchEvent(event);
};
