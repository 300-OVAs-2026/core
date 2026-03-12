import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { cn } from '@/shared/utils';

import { SHOW_VIDEO } from './lib/constants';
import { formatTime } from './lib/converter-time';

import type { InterpreterVideoPlayerProps, TooglePlayButtonProps } from './types/types';

import css from './interpreter.module.css';

export const VideoPlayer: React.FC<InterpreterVideoPlayerProps> = ({ displayVideo, URLs }) => {
  const { accesibilityURL, contentURL } = URLs;

  const uniqueProgressBarId = useId();

  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const refContentVideo = useRef<HTMLVideoElement>(null);
  const refAccesibilityVideo = useRef<HTMLVideoElement>(null);

  const previousVideo = useRef<HTMLVideoElement | null>(null); // Referencia al video previo

  /**
   * Hook personalizado para manejar el estado de reproducción de los videos.
   * Este hook retorna el video actual basado en el estado displayVideo.
   */
  const currentDisplayVideo = useMemo(
    () => (displayVideo === SHOW_VIDEO.CONTENT ? refContentVideo.current : refAccesibilityVideo.current),
    [displayVideo]
  );

  useEffect(() => {
    // Si había un video previo, pausarlo
    if (previousVideo.current) {
      const previousVideoElement = previousVideo.current as HTMLVideoElement;
      if (previousVideoElement !== currentDisplayVideo) {
        previousVideoElement.pause();
        setIsPlaying(false);
        previousVideoElement.currentTime = 0;
      }
    }

    // Guardar el video actual como el video previo
    previousVideo.current = currentDisplayVideo;
  }, [displayVideo, currentDisplayVideo]);

  /**
   * Función para alternar la reproducción del video actualmente en pantalla.
   * Esta función se llama cuando el usuario hace clic en el botón de reproducción/pausa.
   */
  const onTogglePlay = () => {
    // Obtener el elemento de video actualmente en pantalla
    const videoElement = currentDisplayVideo as HTMLVideoElement;

    if (!videoElement) return;

    // Si el video está reproduciéndose, pausarlo y establecer el estado de reproducción en falso
    if (isPlaying) {
      videoElement.pause();
      setIsPlaying(false);
      return;
    }

    // Iniciar la reproducción y establecer el estado de reproducción en verdadero
    videoElement.play();
    setIsPlaying(true);
  };

  /**
   * Función para manejar el cambio de tiempo de reproducción del video.
   * Esta función se llama cuando el usuario ajusta el tiempo de reproducción en el reproductor.
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const onPlayTimeChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    // Obtener el tiempo de reproducción deseado del evento
    const scrubbedTime = parseFloat(event.target.value);
    const currentVideo = currentDisplayVideo;

    // Establecer el tiempo de reproducción actual en el valor seleccionado
    setCurrentTime(scrubbedTime);

    // Actualizar el tiempo de reproducción del video al valor seleccionado
    if (currentVideo) {
      currentVideo.currentTime = scrubbedTime;
    }
  };

  /**
   * Efecto para manejar eventos del video actualmente en pantalla.
   * Este efecto se ejecuta cada vez que el video actual cambia.
   * Se encarga de actualizar el tiempo de reproducción y la duración del video,
   * así como de controlar el estado de reproducción al finalizar el video.
   */
  useEffect(() => {
    if (!currentDisplayVideo) return;

    // Función para manejar el evento de actualización del tiempo de reproducción
    const handleTimeUpdate = () => {
      // Redondear y establecer el tiempo de reproducción actual en el estado
      setCurrentTime(Math.round(currentDisplayVideo.currentTime));
    };

    // Función para manejar el evento de finalización del video
    const handleVideoEnded = () => {
      // Establecer el estado de reproducción en falso al finalizar el video
      setIsPlaying(false);
    };

    /**
     * Función para manejar el evento de carga de metadatos del video.
     * Establece la duración del video redondeada.
     */
    const handleLoadMetaData = () => {
      setDuration(Math.round(currentDisplayVideo.duration));
    };

    // Obtener el elemento de video actualmente en pantalla
    const videoElement = currentDisplayVideo;

    // Agregar oyentes de eventos al video
    videoElement.addEventListener('loadedmetadata', handleLoadMetaData);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('ended', handleVideoEnded);

    if (videoElement.duration) {
      setDuration(Math.round(videoElement.duration));
    }

    // Limpieza: remover oyentes de eventos y restablecer valores al desmontar el componente
    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('ended', handleVideoEnded);
      setCurrentTime(0);
      setDuration(0);
    };
  }, [currentDisplayVideo, setCurrentTime, setIsPlaying, setDuration]);

  return (
    <div className={css['c-video']} data-display={!!displayVideo}>
      <div className={css['c-video__group-video']}>
        <video
          ref={refContentVideo}
          preload="none"
          muted
          src={contentURL}
          className={cn({
            [css['c-video__video--hidden']]: displayVideo !== SHOW_VIDEO.CONTENT
          })}
        />

        <video
          ref={refAccesibilityVideo}
          preload="none"
          muted
          src={accesibilityURL}
          className={cn({
            [css['c-video__video--hidden']]: displayVideo !== SHOW_VIDEO.ACCESIBILITY
          })}
        />
      </div>

      <div className={`${css['c-video__controls']}`}>
        <TooglePlayButton isPlaying={isPlaying} disabled={!displayVideo} onPlay={onTogglePlay} />
        <label className="u-sr-only" htmlFor={uniqueProgressBarId}>
          Tiempo transcurrido
        </label>

        <div className={css['c-video__controls-progress']}>
          <input
            id={uniqueProgressBarId}
            value={currentTime}
            min={0}
            max={duration}
            type="range"
            aria-valuetext={`${formatTime(currentTime)}`}
            className={css['input-progress']}
            disabled={!displayVideo}
            onChange={onPlayTimeChange}
          />
        </div>
      </div>
    </div>
  );
};

const TooglePlayButton: React.FC<TooglePlayButtonProps> = ({ isPlaying, onPlay, ...props }) => {
  const label = isPlaying ? 'Pausar video' : 'Reproducir video';

  return (
    <button className={css['c-video__toggle-button']} aria-label={label} onClick={onPlay} {...props}>
      {isPlaying ? (
        <svg width="24" height="24" viewBox="0 -960 960 960">
          <path
            fill="currentColor"
            d="M640-200q-33 0-56.5-23.5T560-280v-400q0-33 23.5-56.5T640-760q33 0 56.5 23.5T720-680v400q0 33-23.5 56.5T640-200Zm-320 0q-33 0-56.5-23.5T240-280v-400q0-33 23.5-56.5T320-760q33 0 56.5 23.5T400-680v400q0 33-23.5 56.5T320-200Z"></path>
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 -960 960 960">
          <path
            fill="currentColor"
            d="M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Z"></path>
        </svg>
      )}
    </button>
  );
};
