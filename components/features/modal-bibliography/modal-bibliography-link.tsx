import { useId } from 'react';

import css from './modal-bibliography.module.css';

interface Props {
  name: string;
  authors?: string;
  link?: string;
  addClass?: string;
}

export const ModalBibliographyLink: React.FC<Props> = ({ authors, name, link, addClass }) => {
  const uid = useId();

  return (
    <li className={`${css['bibliography-link']} ${addClass ?? ''}`}>
      {authors ?? <><span dangerouslySetInnerHTML={{ __html: !authors}}></span>&nbsp;</>}<span id={`bibliography-link-${uid}`} dangerouslySetInnerHTML={{ __html: name}}></span>&nbsp;
      {link ? (
        <a href={link} aria-labelledby={`bibliography-link-${uid}`} target="_blank" rel="noreferrer">
          {link}
        </a>
      ) : null}
    </li>
  );
};
