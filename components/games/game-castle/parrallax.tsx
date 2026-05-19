import { useRef } from 'react';

import { useA11yAttribute, useReduceMotion } from '@/shared/hooks';

import fondoCielo from './images/Fondo_cielo.webp';
import fondoMontanas from './images/Fondo_montañas.webp';
import fondoNubes from './images/Fondo_nubes.webp';
import fondoPrimerPlano from './images/Fondo_primer_plano.webp';

import css from './styles/level.module.css';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const Parallax: React.FC<Props> = ({ children }) => {
  const cancelAnimation = useReduceMotion();
  const { stopAnimations } = useA11yAttribute();

  const refDeph2 = useRef<HTMLImageElement>(null);
  const refDeph3 = useRef<HTMLImageElement>(null);
  const refDeph4 = useRef<HTMLImageElement>(null);

  const handleDepthMove: React.MouseEventHandler = (e) => {
    if (!cancelAnimation && !stopAnimations) {
      const offsetX = window.innerWidth / 2 - e.nativeEvent.clientX;
      const offsetY = window.innerHeight / 2 - e.nativeEvent.clientY;

      if (refDeph2.current) refDeph2.current.style.left = offsetX / 100 + 'px';
      if (refDeph3.current) refDeph3.current.style.left = offsetX / 300 + 'px';
      if (refDeph4.current) refDeph4.current.style.left = offsetX / 100 + 'px';

      if (refDeph2.current) refDeph2.current.style.top = offsetY / 100 + 'px';
      if (refDeph3.current) refDeph3.current.style.top = offsetY / 300 + 'px';
      if (refDeph4.current) refDeph4.current.style.top = offsetY / 100 + 'px';
    }
  };

  return (
    <div className={css.wrapper_depths} onMouseMove={handleDepthMove}>
      <img src={fondoCielo} className={css.image_back} alt="" />
      <img src={fondoCielo} className={css.image_depth} ref={refDeph4} alt="" />
      <img src={fondoNubes} className={`${css.image_depth} ${css.image_cloud}`} alt="" />
      <img
        src={fondoNubes}
        className={`${css.image_depth} ${css.image_cloud}`}
        alt=""
        style={{ animationDelay: '9s' }}
      />
      <img src={fondoMontanas} className={css.image_depth} ref={refDeph3} alt="" />
      <img src={fondoPrimerPlano} className={css.image_depth} ref={refDeph2} alt="" />
      {children}
    </div>
  );
};
