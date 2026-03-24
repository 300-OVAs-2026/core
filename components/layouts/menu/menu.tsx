import { useA11y } from '@features/a11y-overlay/hooks/useA11y';
import { Icon } from '@ui';
import { Icon as IconUI } from 'books-ui';
import { SquareUser } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'wouter';

import { useFocusTrap } from '@/shared/hooks';
import { cn } from '@/shared/utils';
import { useGamificationStore } from '@/store/gamification-store';
import { useOvaStore } from '@/store/ova-store';

import { useHeaderContext } from '../header/header-context';

import { i18n } from './lib/constant';
import { MenuButtonInterpreter } from './menu-button-interpreter';

import { MenuOptions } from '../header/types/types';

import css from './menu.module.css';

export const Menu = () => {
  const lang = useOvaStore((state) => state.lang);
  const medals = useGamificationStore((state) => state.totalMedals);

  const { expanded, handleExpanded } = useHeaderContext();
  const focusTrapRef = useFocusTrap<HTMLDivElement>(expanded.menu, () => handleExpanded(MenuOptions.MENU));

  const { config, setConfig } = useA11y();

  const setAudioDescription = (value: boolean) => {
    setConfig('audio', value);
  };

  return (
    <>
      <nav role="navigation" aria-label={i18n[lang].nav} className={css['menu']}>
        <div className={css['menu__controls']}>
          <button
            className={css['menu__button--hamburger']}
            aria-controls="main-menu"
            aria-label="Menú principal"
            aria-expanded={expanded.menu}
            aria-keyshortcuts="Escape"
            onClick={() => handleExpanded(MenuOptions.MENU)}>
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
                  x1: expanded.menu ? 10 : 5,
                  y1: expanded.menu ? 5 : 16,
                  x2: expanded.menu ? 70 : 40,
                  y2: expanded.menu ? 60 : 16
                }}
                transition={{ duration: 0.3, ease: [0.64, 0.01, 0.25, 1.0] }}
              />
              <motion.line
                initial={false}
                animate={{
                  x1: 5,
                  y1: 34.5,
                  x2: expanded.menu ? 5 : 55,
                  y2: 34.5,
                  opacity: expanded.menu ? 0 : 1
                }}
                transition={{ duration: 0.3, ease: [0.64, 0.01, 0.25, 1.0] }}
              />
              <motion.line
                initial={false}
                animate={{
                  x1: expanded.menu ? 10 : 5,
                  y1: expanded.menu ? 60 : 53,
                  x2: expanded.menu ? 70 : 40,
                  y2: expanded.menu ? 5 : 53
                }}
                transition={{ duration: 0.3, ease: [0.64, 0.01, 0.25, 1.0] }}
              />
            </svg>

            <span className="u-sr-only">Menu</span>
            {expanded.menu && (
              <span className="u-sr-only" aria-live="polite">
                {i18n[lang].menuEscHint}
              </span>
            )}
          </button>

          <button
            className={cn(css['menu__button'], css['menu__button--light-blue'], css['menu__button--diagonal-cut'])}
            aria-label={config.audio ? i18n[lang].audioActive : i18n[lang].audioPause}
            onClick={() => setAudioDescription(!config.audio)}>
            <span className={css['menu__button-content']}>
              {config.audio ? <Icon name="pause" /> : <Icon name="play" />}
              <span className={css['menu__button-label']}>
                {config.audio ? i18n[lang].audioActive : i18n[lang].audioPause}
              </span>
            </span>
          </button>

          <MenuButtonInterpreter />

          <Link
            to="/medals"
            aria-label="Ver mis medallas"
            className={cn(css['menu__button'], css['menu__button--yellow'], css['menu__button--double-diagonal-cut'])}>
            <span className={css['menu__button-content']}>
              <Icon name="award" />
              <span className={cn(css['menu__button-label'], css['menu__button-medal'])}>{medals}</span>
              <span className={css['menu__button-label']}>
                {medals} {i18n[lang].badges}
              </span>
            </span>
          </Link>
        </div>

        <div>
          <motion.div
            className={css['menu__overlay']}
            initial={false}
            animate={{ opacity: expanded.menu ? 1 : 0, pointerEvents: expanded.menu ? 'auto' : 'none' }}
            transition={{ duration: 0.4, ease: [0.64, 0.01, 0.25, 1.0] }}
          />
          <motion.div
            ref={focusTrapRef}
            className={css['menu__wrapper']}
            initial={false}
            {...(!expanded.menu && { inert: '' })}
            animate={{
              opacity: expanded.menu ? 1 : 0,
              y: expanded.menu ? 0 : -20,
              pointerEvents: expanded.menu ? 'auto' : 'none'
            }}
            transition={{
              duration: 0.4,
              ease: [0.64, 0.01, 0.25, 1.0]
            }}>
            <ul role="list" className={css['menu__list']}>
              <li className={css['menu__item']}>
                <Link to="/" className={cn(css['menu__link'], 'js-link-home')}>
                  <Icon name="home" />
                  <span>{i18n[lang].home}</span>
                </Link>
              </li>
              <li className={css['menu__item']}>
                <Link to="/menu" className={css['menu__link']}>
                  <Icon name="menu" />
                  <span>{i18n[lang].menu}</span>
                </Link>
              </li>
              <li className={css['menu__item']}>
                <button
                  className={cn(css['menu__link'], 'js-button-a11y')}
                  onClick={() => handleExpanded(MenuOptions.A11Y)}>
                  <Icon name="a11y" />
                  <span>{i18n[lang].a11y}</span>
                </button>
              </li>
              <li className={css['menu__item']}>
                <Link to="/avatar" className={cn(css['menu__link'], css['menu__link--avatar'])}>
                  <IconUI>
                    <SquareUser />
                  </IconUI>
                  <span>{i18n[lang].avatar}</span>
                </Link>
              </li>
              <li className={css['menu__item']}>
                <Link to="/notes" className={css['menu__link']}>
                  <Icon name="notes" />
                  <span>{i18n[lang].notes}</span>
                </Link>
              </li>
              <li className={css['menu__item']}>
                <Link to="/help" className={cn(css['menu__link'], 'js-button-help')}>
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
