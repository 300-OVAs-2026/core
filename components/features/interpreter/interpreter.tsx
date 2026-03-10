import { useEffect, useId, useRef, useState } from 'react';
import type { DraggableEventHandler } from 'react-draggable';
import Draggable from 'react-draggable';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@/shared/utils';

import { VideoPlayer } from './interpreter-video-player';
import { EVENT, SHOW_VIDEO, ZOOM_LEVELS } from './lib/constants';

import type { InterpreterProps, InterpreterVideoProps, URLs } from './types/types';

import css from './interpreter.module.css';

export const Interpreter: React.FC<InterpreterProps> = ({ className, ...props }) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const [URLs, setURls] = useState<URLs>({
    accesibilityURL: undefined,
    contentURL: undefined
  });

  /**
   * Toggle function to change interpreter visibility.
   * Toggles the hidden state and dispatches a custom event.
   */
  const toggleHidden = () => {
    const newHiddenState = !hidden;
    setHidden(newHiddenState);
    
    // Dispatch custom event to notify other components
    const event = new CustomEvent(EVENT.VISIBILITY, {
      detail: { hidden: newHiddenState },
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(event);
  };

  useEffect(() => {
    /**
     * Function to handle interpreter visibility changes from external events.
     */
    const handleInterpreterVisibility = ({ detail }: CustomEvent<{ hidden: boolean}>): void => {
      // Only update if the new state is different from current state
      // This prevents infinite loops and unnecessary re-renders
      if (detail.hidden !== hidden) {
        setHidden(detail.hidden);
      }
    };

    // Listen for the custom event from accessibility menu
    document.addEventListener(EVENT.VISIBILITY, handleInterpreterVisibility as EventListener);

    return () => {
      // Remove listener when component unmounts
      document.removeEventListener(EVENT.VISIBILITY, handleInterpreterVisibility as EventListener);
    };
  }, [hidden]);

  useEffect(() => {
    /**
     * Custom event handler to update URLs.
     * @param {CustomEvent<URLs>} event - The event containing the updated URLs in its 'detail' property.
     */
    const handleUpdateURLs = ({ detail }: CustomEvent<URLs>) => {
      // Update state with the new URLs received from the event
      setURls({ ...detail });
    };

    // Add listener for the custom event defined by 'EVENT'
    document.addEventListener(EVENT.SOURCES, handleUpdateURLs as EventListener);

    return () => {
      // Remove listener when component unmounts
      document.removeEventListener(EVENT.SOURCES, handleUpdateURLs as EventListener);
    };
  }, []);

  return (
    <div className={cn(css['c-interpreter__container'], className)} {...props}>
      <Video URLs={URLs} show={hidden} onClose={toggleHidden} />
    </div>
  );
};

const Video: React.FC<InterpreterVideoProps> = ({ URLs, show, onClose, ...props }) => {
  const [zoomIn, setZoomIn] = useState<number>(ZOOM_LEVELS.BASE);
  const [displayVideo, setDisplayVideo] = useState<string | null>(null);
  const [positionDrag, setPositionDrag] = useState({
    deltaPosition: {
      x: 0,
      y: 0
    }
  });

  const uid = useId();
  const dragRef = useRef(null);

  const { accesibilityURL, contentURL } = URLs;

  /**
   * Function to increase zoom level.
   * If current zoom level is null, set to initial level.
   * Increases zoom level by 0.05, up to a specified maximum.
   */
  const increaseZoom = () => {
    setZoomIn((currentZoom) => {
      if (currentZoom === ZOOM_LEVELS.BASE) return ZOOM_LEVELS.INITIAL;

      const newZoomLevel = parseFloat((currentZoom + 0.05).toFixed(2));
      return newZoomLevel <= ZOOM_LEVELS.MAX ? newZoomLevel : ZOOM_LEVELS.BASE;
    });
  };

  /**
   * Function to handle drag event of an element.
   *
   * @param {Event} event - Drag event.
   * @param {object} data - Drag information.
   */
  const handleDrag: DraggableEventHandler = (_, data) => {
    // Get current coordinates of drag position
    const { x, y } = positionDrag.deltaPosition;

    // Update drag position by adding deltaX and deltaY changes
    setPositionDrag({
      deltaPosition: {
        x: x + data.deltaX,
        y: y + data.deltaY
      }
    });
  };

  /**
   * Function to reset dragged element position to (0, 0).
   */
  const resetDragPosition = () => {
    // Reset dragged element position to (0, 0)
    setPositionDrag({
      deltaPosition: {
        x: 0,
        y: 0
      }
    });
  };

  /**
   * Function to toggle video display.
   * Switches between available videos in SHOW_VIDEO object.
   *
   * @param {string | undefined} video - The video to switch to. If not provided, sets video to null.
   */
  const toggleDisplayVideo = (video?: string) => {
    // If a video is provided, set it as the new video to show,
    // otherwise, set video to null to hide it
    setDisplayVideo(video ?? null);
  };

  /**
   * Function to close the draggable element and hide the video.
   * Resets draggable element position and hides the video.
   * Dispatches a separate event to notify a11y menu.
   */
  const handleClose = () => {
    onClose();

    // Hide video by setting displayVideo to null
    toggleDisplayVideo();

    // Dispatch separate event to notify a11y menu that interpreter was closed
    const event = new CustomEvent(EVENT.CLOSED, {
      detail: { hidden: true },
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(event);
  };

  useEffect(() => {
    // If 'show' is active or no URLs are available, do nothing
    if (show || (!accesibilityURL && !contentURL)) return;

    // Determine video type to show based on available URL
    const currentVideo = accesibilityURL ? SHOW_VIDEO.ACCESIBILITY : contentURL ? SHOW_VIDEO.CONTENT : null;

    setDisplayVideo(currentVideo);
  }, [show, accesibilityURL, contentURL]);

  return (
    <Draggable
      handle=".js-c-interpreter-draggable"
      nodeRef={dragRef}
      position={positionDrag.deltaPosition}
      onDrag={handleDrag}>
      <div ref={dragRef}>
        <div className={css['c-interpreter__zoom']} style={{ '--scale': zoomIn } as React.CSSProperties}>
          <AnimatePresence initial={false} onExitComplete={resetDragPosition}>
            {!show ? (
              <motion.div
                key={uid}
                className={css['c-interpreter']}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}>
                <ul role="list" className={`${css['c-interpreter__list']}`}>
                  {/* Show the current video */}
                  <li hidden={!contentURL && !accesibilityURL} aria-hidden={!contentURL && !accesibilityURL}>
                    <div
                      className={cn(css['c-interpreter__button'], css['c-interpreter__button--fake'], {
                        [css['c-interpreter__button--hidden']]: !contentURL && !accesibilityURL
                      })}
                      aria-label={`Intérprete de lenguaje de señas, presentando video ${
                        displayVideo === SHOW_VIDEO.CONTENT ? '2 (contenido)' : '1 (descriptivo)'
                      }`}
                      aria-live="polite">
                      <svg width="24" height="24" viewBox="0 -960 960 960">
                        <path
                          fill="currentColor"
                          d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"
                        />
                      </svg>
                      <p>
                        <small>{displayVideo && (displayVideo === SHOW_VIDEO.CONTENT ? '2' : '1')}</small>
                      </p>
                    </div>
                  </li>

                  {/* Accessibility video */}
                  <li hidden={!accesibilityURL} aria-hidden={!accesibilityURL}>
                    <button
                      className={cn(css['c-interpreter__button'], {
                        [css['c-interpreter__button--hidden']]: !accesibilityURL
                      })}
                      aria-label="Video descriptivo"
                      onClick={() => toggleDisplayVideo(SHOW_VIDEO.ACCESIBILITY)}>
                      <small>1</small>
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M9.32 16.326H7.04V14.96H3.996l-.872 1.366H0l.189-.255l3.274-4.548l3.091-4.302l1.386-.006h1.38zm-2.181-6.08l-.996 1.46l-.995 1.464l.989.019c.225 0 .434.005.605.005a3.702 3.702 0 0 0 .424-.011l-.014.001c.012-.012.014-.566.006-1.483zm4.836 6.08h-1.874V7.215h1.939a13.496 13.496 0 0 1 2.419.106l-.069-.008a3.666 3.666 0 0 1 2.49 2.028l.009.023a4.464 4.464 0 0 1 .526 2.455l.001-.014a4.222 4.222 0 0 1-.191 1.527l.008-.03a4.024 4.024 0 0 1-1.979 2.586l-.021.01c-.781.381-1.146.429-3.258.429zm.274-6.919v4.654l.866-.026c.994-.033 1.238-.119 1.634-.579a2.282 2.282 0 0 0 .52-1.729l.001.01a1.943 1.943 0 0 0-.181-1.118l.005.011c-.428-.921-.79-1.132-2.037-1.191l-.81-.032zm10.329 6.913c-.096 0-.141-.009-.155-.03s0-.042.01-.074c.506-1.32.803-2.846.814-4.44v-.005a13.27 13.27 0 0 0-.844-4.537l.03.092c-.014-.035-.016-.055-.006-.07c.023-.034.114-.041.357-.041c.314 0 .405.024.455.124c.239.654.445 1.435.581 2.239l.011.081c.107.635.168 1.366.168 2.111c0 1.419-.221 2.785-.63 4.068l.026-.095l-.182.553l-.416.02c-.103.002-.169.005-.219.005zm-4.232 0c-.055 0-.115 0-.195-.006l-.436-.02l.234-.351a7.383 7.383 0 0 0 1.134-3.079l.004-.038a10.77 10.77 0 0 0-.138-2.947l.01.066a7.853 7.853 0 0 0-1.171-2.614l.017.026l-.104-.143h.924l.176.274a8.4 8.4 0 0 1 .812 1.95l.014.061c.188.676.295 1.453.295 2.255a8.719 8.719 0 0 1-.871 3.811l.023-.052c-.344.7-.4.807-.73.807zm2.024 0a.581.581 0 0 1-.252-.026l.004.001c0-.024.135-.309.195-.43c.13-.26.262-.577.374-.904l.017-.056c.296-.922.466-1.983.466-3.084c0-1.497-.315-2.92-.883-4.207l.026.067a5.112 5.112 0 0 1-.195-.43a.585.585 0 0 1 .25-.027h-.003c.06 0 .124 0 .188.006l.436.019l.247.615c.442 1.159.698 2.5.698 3.9c0 1.465-.28 2.864-.789 4.148l.027-.076l-.18.453l-.436.02c-.064 0-.127.005-.188.005z" />
                      </svg>
                    </button>
                  </li>

                  {/* Content video */}
                  <li hidden={!contentURL} aria-hidden={!contentURL}>
                    <button
                      className={cn(css['c-interpreter__button'], {
                        [css['c-interpreter__button--hidden']]: !contentURL
                      })}
                      aria-label="Video de contenido"
                      onClick={() => toggleDisplayVideo(SHOW_VIDEO.CONTENT)}>
                      <small>2</small>
                      <svg width="24" height="24" viewBox="0 0 19.61 13.13">
                        <g>
                          <path d="M5.12,3.96C5.12,3.96,5.13,3.96,5.12,3.96c0-1.11,0-2.23,0-3.34c0-0.1,0-0.21-0.03-0.31c-0.04-0.17-0.16-0.27-0.32-0.3C4.62-0.02,4.48,0.03,4.39,0.16c-0.04,0.05-0.07,0.1-0.1,0.15C3.74,1.12,3.07,1.81,2.25,2.36C1.68,2.75,1.11,2.84,0.47,2.58c-0.25-0.1-0.31-0.07-0.36,0.19C-0.04,3.52-0.03,4.28,0.1,5.04c0.06,0.32,0.11,0.34,0.4,0.2C1.04,5,1.54,5.05,2.03,5.38c0.48,0.32,0.93,0.68,1.33,1.1c0.36,0.37,0.66,0.78,0.97,1.18C4.46,7.82,4.6,7.92,4.82,7.85c0.22-0.07,0.29-0.23,0.3-0.44c0-0.07,0-0.15,0-0.22C5.12,6.11,5.12,5.04,5.12,3.96z" />
                          <path d="M6.33,4.41c0.15,0,0.3,0,0.44,0c0.44,0,0.43,0,0.42-0.43c0-0.16-0.07-0.2-0.21-0.2c-0.37,0.01-0.74,0-1.11,0c-0.43,0-0.42,0-0.4,0.44c0.01,0.14,0.05,0.2,0.19,0.19C5.88,4.41,6.1,4.41,6.33,4.41z" />
                          <path d="M5.49,3.31c0.11-0.02,0.17-0.1,0.25-0.16C6.05,2.9,6.36,2.64,6.67,2.37c0.31-0.26,0.3-0.26-0.01-0.54c-0.1-0.1-0.17-0.1-0.28-0.01c-0.26,0.22-0.54,0.42-0.8,0.63C5.53,2.5,5.46,2.54,5.47,2.63C5.47,2.85,5.45,3.08,5.49,3.31z" />
                          <path d="M5.47,5.3c0,0.36,0,0.36,0.27,0.57C5.9,6,6.06,6.13,6.23,6.26C6.56,6.51,6.55,6.5,6.84,6.21C6.95,6.1,6.92,6.05,6.82,5.97C6.49,5.7,6.16,5.42,5.83,5.15C5.74,5.07,5.65,4.93,5.54,4.98C5.41,5.03,5.48,5.2,5.47,5.3z" />
                        </g>
                        <rect x="0" y="10.51" width="19.61" height="2.62" />
                        <rect x="8.5" y="0.05" width="11.12" height="2.62" />
                        <rect x="8.5" y="5.28" width="11.12" height="2.62" />
                      </svg>
                    </button>
                  </li>

                  {/* Zoom button */}
                  <li>
                    <button
                      className={css['c-interpreter__button']}
                      aria-label="Incrementar zoom del interprete"
                      onClick={increaseZoom}>
                      <svg width="24" height="24" viewBox="0 -960 960 960">
                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Zm-40-60v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" />
                      </svg>
                    </button>
                  </li>

                  {/* Move button */}
                  <li>
                    <button
                      className={`${css['c-interpreter__button']} ${css['c-interpreter__button--drag']} js-c-interpreter-draggable`}
                      aria-label="Arrastrar video">
                      <svg width="24" height="24" viewBox="0 -960 960 960">
                        <path
                          fill="currentColor"
                          d="M440-234v-126q0-17 11.5-28.5T480-400q17 0 28.5 11.5T520-360v125l43-44q12-12 29-12t29 12q12 12 12 29t-12 29L508-108q-6 6-13 8.5T480-97q-8 0-15-2.5t-13-8.5L338-222q-12-12-11.5-28.5T339-279q12-12 28.5-12t28.5 12l44 45ZM235-440l44 43q12 12 12 29t-12 29q-12 12-29 12t-29-12L108-452q-6-6-8.5-13T97-480q0-8 2.5-15t8.5-13l113-113q12-12 28.5-12t28.5 12q12 12 12 28.5T278-564l-44 44h126q17 0 28.5 11.5T400-480q0 17-11.5 28.5T360-440H235Zm491 0H600q-17 0-28.5-11.5T560-480q0-17 11.5-28.5T600-520h125l-44-43q-12-12-12-29t12-29q12-12 29-12t29 12l113 113q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L738-338q-12 12-28 11.5T682-339q-12-12-12-28.5t12-28.5l44-44ZM440-726l-45 45q-12 12-28 12t-28-12q-12-12-12-28.5t12-28.5l113-114q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l114 114q12 12 12 28t-12 28q-12 12-28.5 12T565-682l-45-44v126q0 17-11.5 28.5T480-560q-17 0-28.5-11.5T440-600v-126Z"
                        />
                      </svg>
                    </button>
                  </li>

                  {/* Close button */}
                  <li>
                    <button
                      className={`${css['c-interpreter__button']} ${css['interpreter-btn--close']}`}
                      onClick={handleClose}
                      aria-label="Cerrar">
                      <svg width="24" height="24" viewBox="0 -960 960 960">
                        <path
                          fill="currentColor"
                          d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"
                        />
                      </svg>
                    </button>
                  </li>
                </ul>

                {/* Video container */}
                <VideoPlayer displayVideo={displayVideo} URLs={URLs} {...props} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </Draggable>
  );
};
