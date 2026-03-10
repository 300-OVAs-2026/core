import { useLayoutEffect, useState } from 'react';
import { useA11y } from '@features/a11y-overlay/hooks/useA11y';
import { Icon } from '@ui';
import { motion } from 'motion/react';
import { Link } from 'wouter';

import { useOvaContext } from '@/context/ova-context';

import { i18n } from './lib/constant';

import css from './menu.module.css';

export const Menu = () => {
  const { lang } = useOvaContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const { updateHTMLAttributesFromLocalStorage } = useA11y();

  useLayoutEffect(() => {
    /**
     * Obtiene las opciones de accesiblidad que
     * están en el localStorage y las aplica en el elemento HTML.
     */
    updateHTMLAttributesFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <nav role="navigation" aria-label={i18n[lang].nav} className={css['menu']}>
        <div className={css['menu__controls']}>
          <button
            className={css['menu__button--hamburger']}
            aria-controls="main-menu"
            aria-label="Menú principal"
            aria-expanded={isOpen}
            onClick={handleOpen}>
            <svg viewBox="0 0 206.341 235.122" className={css['svg-background']} clipPathUnits="objectBoundingBox">
              <polygon points="0 0 205.414 0 205.414 148.231 79.562 219.324 0 173.945"></polygon>
              <path
                d="M 196.072 0 L 196.072 162.634 L 79.964 232.316 L 0 185.129"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"></path>
            </svg>
            <svg viewBox="0 0 80 64" className={css['svg-hamburger']}>
              <motion.line
                initial={false}
                animate={{
                  x1: isOpen ? 10 : 5,
                  y1: isOpen ? 5 : 16,
                  x2: isOpen ? 70 : 40,
                  y2: isOpen ? 60 : 16
                }}
                transition={{ duration: 0.3, ease: [0.64, 0.01, 0.25, 1.0] }}
              />
              <motion.line
                initial={false}
                animate={{
                  x1: 5,
                  y1: 34.5,
                  x2: isOpen ? 5 : 55,
                  y2: 34.5,
                  opacity: isOpen ? 0 : 1
                }}
                transition={{ duration: 0.3, ease: [0.64, 0.01, 0.25, 1.0] }}
              />
              <motion.line
                initial={false}
                animate={{
                  x1: isOpen ? 10 : 5,
                  y1: isOpen ? 60 : 53,
                  x2: isOpen ? 70 : 40,
                  y2: isOpen ? 5 : 53
                }}
                transition={{ duration: 0.3, ease: [0.64, 0.01, 0.25, 1.0] }}
              />
            </svg>

            <span className="u-sr-only">Menu</span>
          </button>
          <button className={css['menu__button--audio']} aria-label="Activar audio">
            <svg width="0" height="0" className={css['menu__button--audio_clip-path']}>
              <defs>
                <clipPath id="menu-diagonal-cut" clipPathUnits="objectBoundingBox">
                  <path d="M 0,0 L 1,0 L 0.93, 1 L 0, 1 Z" />
                </clipPath>
              </defs>
            </svg>
            <span className={css['menu__button-content']}>
              <Icon name="play" />
              <span>Activar Audio</span>
            </span>
          </button>
          <button className={css['menu__button--accessibility']} aria-label="Activar intérprete">
            <svg width="0" height="0" className={css['menu__button--audio_clip-path']}>
              <defs>
                <clipPath id="menu-doble-diagonal-cut" clipPathUnits="objectBoundingBox">
                  <path d="M 0.055,0 L 1,0 L 0.93, 1 L 0, 1 Z" />
                </clipPath>
              </defs>
            </svg>
            <span className={css['menu__button-content']}>
              <Icon name="hand-a11y" />
              <span>Activar Intérprete</span>
            </span>
          </button>
        </div>

        <div>
          <motion.div
            className={css['menu__overlay']}
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
            transition={{ duration: 0.4, ease: [0.64, 0.01, 0.25, 1.0] }}
          />
          <motion.div
            className={css['menu__wrapper']}
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : -20,
              pointerEvents: isOpen ? 'auto' : 'none'
            }}
            transition={{
              duration: 0.4,
              ease: [0.64, 0.01, 0.25, 1.0]
            }}>
            <ul role="list" className={css['menu__list']}>
              <li className={css['menu__item']}>
                <Link to="/" className={css['menu__link']}>
                  <Icon name="home" />
                  <span>{i18n[lang].home}</span>
                </Link>
              </li>
              <li className={css['menu__item']}>
                <Link to="/" className={css['menu__link']}>
                  <Icon name="menu" />
                  <span>{i18n[lang].menu}</span>
                </Link>
              </li>
              <li className={css['menu__item']}>
                <Link to="/" className={css['menu__link']}>
                  <Icon name="a11y" />
                  <span>{i18n[lang].a11y}</span>
                </Link>
              </li>
              <li className={css['menu__item']}>
                <Link to="/" className={css['menu__link']}>
                  <Icon name="notes" />
                  <span>{i18n[lang].notes}</span>
                </Link>
              </li>
              <li className={css['menu__item']}>
                <Link to="/" className={css['menu__link']}>
                  <Icon name="help" />
                  <span>{i18n[lang].help}</span>
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
      </nav>
    </>
  );
};
