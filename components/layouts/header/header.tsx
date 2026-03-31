import { useState } from 'react';
import { useHashLocation } from 'wouter/use-hash-location';

import { A11yOverlay } from '@features/a11y-overlay';

import { Menu } from '../menu';

import { HeaderProvider } from './header-context';
import { HOME_PATH } from './lib/constant';
import { SkipToMain } from './skip-to-main';

import type { PropertyType } from './types/types';
import { type MenuExpanded, MenuOptions } from './types/types';

import css from './header.module.css';

export const Header = () => {
  const [location] = useHashLocation();
  const [expanded, setExpanded] = useState<MenuExpanded>({
    menu: false,
    help: false,
    a11y: false
  });

  /**
   * Función que permite controlar el valor
   * (true/false) de las propiedades del objeto extended.
   *
   * @param {string} property - Propiedad del objeto del extended.
   */
  const handleExpanded = (property: PropertyType) => {
    setExpanded((prev) => {
      // Colocamos todas las propiedades de extended en false.
      const newState: MenuExpanded = Object.keys(prev).reduce(
        (object, key) => ({ ...object, [key as keyof MenuExpanded]: false }),
        {} as MenuExpanded
      );

      if (property === MenuOptions.RESET) return newState;

      return {
        ...newState,
        [property]: !expanded[property]
      };
    });
  };

  return (
    <HeaderProvider value={{ expanded, handleExpanded }}>
      <header id="header" className={css['header']}>
        <SkipToMain/>
        <div className={css['header__container']}>
          <Menu />
          <div className={css['logo']}>
            <img
              src={`assets/base/${location === HOME_PATH ? 'logo-dark' : 'logo'}.svg`}
              alt="UNAD: Universidad Nacional Abierta y a Distancia"
              className="u-px-2"
              width={250}
              height={100}
            />
          </div>
        </div>
      </header>
      <A11yOverlay isOpen={expanded.a11y} onClose={() => handleExpanded(MenuOptions.A11Y)} />
    </HeaderProvider>
  );
};
