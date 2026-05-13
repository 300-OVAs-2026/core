import { useCallback, useRef } from 'react';

import { eventChangeInterpreterVideo } from '@shared/utils';

import { useSessionStorage } from './use-session-storage';

type VideoStorageMode = 'fixed' | 'dynamic';

export interface VideoURLs {
  a11yURL?: string;
  contentURL?: string;
}

interface VideoSourceChange extends VideoURLs {
  mode?: VideoStorageMode;
}

const STORAGE_MODES = {
  FIXED: 'fixed',
  DYNAMIC: 'dynamic'
};

const INITIAL_VIDEO_STATE: VideoURLs = {
  a11yURL: undefined,
  contentURL: undefined
};

export const useInterpreter = (): [(videoSource: VideoSourceChange) => void, () => void, VideoURLs] => {
  const [sources, setSources, getCurrentValueFromSessionStorage] = useSessionStorage<VideoURLs>(
    'interpreter-video-source',
    INITIAL_VIDEO_STATE
  );
  const lastVideoSources = useRef<VideoURLs>({ ...INITIAL_VIDEO_STATE });

  /**
   * Actualiza las fuentes de video.
   * Guarda las fuentes en el almacenamiento de sesión si el modo es 'fixed' y envía un evento para notificar el cambio.
   *
   * @param videoSource - Objeto que contiene las nuevas URLs de los videos y el modo de almacenamiento.
   */
  const updateVideoSources = useCallback(({ mode, a11yURL, contentURL }: VideoSourceChange) => {
    const { a11yURL: lastA11yURL, contentURL: lastContentURL } = lastVideoSources.current;

    // Si las nuevas URLs son iguales a las últimas, no hacer nada
    if (lastA11yURL === a11yURL && lastContentURL === contentURL) return;

    // Actualizar las últimas fuentes de video
    lastVideoSources.current = { a11yURL, contentURL };

    const updatedPaths = {
      a11yURL,
      contentURL
    };

    // Si el modo es 'fixed', actualizar las fuentes en el estado y el almacenamiento de sesión
    if (mode === STORAGE_MODES.FIXED) {
      const fixedVideoSources = { ...updatedPaths };
      setSources(fixedVideoSources);
    }

    // Enviar evento para notificar el cambio de fuentes de video
    eventChangeInterpreterVideo({ ...updatedPaths });
  }, [setSources]);

  /**
   * Restaura las últimas fuentes de video guardadas en el estado.
   * Si las fuentes no son undefined, envía un evento para notificar el cambio.
   */
  const restoreLastVideoSources = useCallback(() => {
    const updatedSource = getCurrentValueFromSessionStorage();
    if (Object.values(updatedSource).some((url) => url !== undefined)) {
      const { a11yURL, contentURL } = updatedSource;

      // Actualizar las últimas fuentes de video
      lastVideoSources.current = { a11yURL, contentURL };

      // Enviar evento para notificar el cambio de fuentes de video
      eventChangeInterpreterVideo({ a11yURL, contentURL });
    }
  }, [getCurrentValueFromSessionStorage]);

  return [updateVideoSources, restoreLastVideoSources, sources];
};
