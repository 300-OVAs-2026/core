import { Link } from 'wouter';

import css from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <div aria-hidden="true" className={css['figure-triangle']}></div>
      <div aria-hidden="true" className={css['figure-circle']}></div>
      <Link to="/menu" className={css.button}>
        <svg xmlns="http://www.w3.org/2000/svg" className={css['icon']} viewBox="0 0 400 400">
          <circle cx="200" className={css['icon__dash']} cy="200" r="115" />

          <circle cx="200" cy="200" r="110" fill="var(--primary-500)" />
          <circle cx="200" cy="200" r="70" fill="var(--primary-400)" />

          <rect className={css['icon__shadow']} x="163" y="163" width="33" height="33" fill="white" />
          <rect className={css['icon__shadow']} x="203" y="163" width="33" height="33" fill="white" />
          <rect className={css['icon__shadow']} x="163" y="203" width="33" height="33" fill="white" />
          <rect className={css['icon__shadow']} x="203" y="203" width="33" height="33" rx="12" fill="white" />
        </svg>
        <span className={css['button__text']}>Menu</span>
      </Link>
    </footer>
  );
};
