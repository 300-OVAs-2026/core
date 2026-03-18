import { Link } from 'wouter';

import { cn } from '@/shared/utils';

import css from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="mask0" clipPathUnits="objectBoundingBox">
            <path d="M0.31880 0.00234 H1 V0.96495 H0.31880 L0.00229 0.37617 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className={css['footer__shape-wrapper']}>
        <svg
          aria-hidden="true"
          className={css['footer__outline']}
          viewBox="0 0 297 214"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M285 2 L108.175 0.503967 L 0.675079 99.004 L 78.1751 213.504 H 285"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>

        <div className={css['footer__shape-container']}>
          <Link to="/menu" aria-label="Menu" className={cn(css.button, 'js-menu-navigation')}>
            <svg xmlns="http://www.w3.org/2000/svg" className={css['icon']} viewBox="60 60 280 280">
              <circle cx="200" className={css['icon__dash']} cy="200" r="115" />

              <circle cx="200" cy="200" r="110" fill="var(--primary-700)" />
              <circle cx="200" cy="200" r="70" fill="var(--primary-500)" />

              <rect className={css['icon__shadow']} x="163" y="163" width="33" height="33" fill="white" />
              <rect className={css['icon__shadow']} x="203" y="163" width="33" height="33" fill="white" />
              <rect className={css['icon__shadow']} x="163" y="203" width="33" height="33" fill="white" />
              <rect className={css['icon__shadow']} x="203" y="203" width="33" height="33" rx="12" fill="white" />
            </svg>
            <span className={css['button__text']}>Menu</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
