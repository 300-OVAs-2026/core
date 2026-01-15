import { useEffect, useId, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';

import { RadioStates } from './types/types';
import { BALL, RED } from './const';
import { useRadioBasketActivityContext } from './game-basketball-context';

import css from './game-basketball.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  addClass?: string;
  label: string;
  state: RadioStates;
}

export const GameBasketballRadio: React.FC<Props> = ({ id, addClass, state, label, name, ...props }) => {
  const reactId = useId();
  const { validation, addRadioElementsId, addRadiosValues, result, options } = useRadioBasketActivityContext();

  const uid = id || reactId;
  const radioName = `radio-group-basket-${name}`;

  const ballRef = useRef<HTMLImageElement>(null);
  const [showBall, setShowBall] = useState(false);

  const safeSrc = (rawSrc: string): string => rawSrc.replace(/\s/g, ''); // Elimina espacios en blanco accidentales
  const letter = label.split('.')[0].toUpperCase();
  const option = label.split('.')[1].trim();

  // ✅ seleccionado sale del CONTEXTO
  const isSelected = useMemo(() => {
    return options?.some((opt) => opt.name === radioName && opt.id === uid);
  }, [options, radioName, uid]);

  // cuando se valida y este item es el seleccionado, mostramos el ball
  useEffect(() => {
    if (validation && isSelected) setShowBall(true);
    if (!validation) setShowBall(false); // reset visual
  }, [validation, isSelected]);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!showBall) return;
    if (!ballRef.current) return;

    // Mata cualquier animación previa
    tlRef.current?.kill();
    gsap.killTweensOf(ballRef.current);

    // Estado inicial: viene desde arriba
    gsap.set(ballRef.current, {
      opacity: 1,
      x: 0,
      y: -90, // ✅ sale desde arriba (ajusta -70/-120 según tu UI)
      scale: 1
    });

    // ✅ CORRECTO: cae y entra (se hace pequeño y desaparece como “profundidad”)
    if (result) {
      tlRef.current = gsap.timeline({
        onComplete: () => setShowBall(false)
      });

      tlRef.current
        // cae hasta el aro (y=0)
        .to(ballRef.current, {
          y: 0,
          duration: 0.48,
          ease: 'power2.in'
        })
        // continúa hacia abajo como si atravesara la red
        .to(ballRef.current, {
          y: 85, // qué tanto “pasa de largo”
          duration: 0.32,
          ease: 'power1.in'
        })
        // se desvanece al final (no cambia size)
        .to(ballRef.current, {
          opacity: 0,
          duration: 0.18,
          ease: 'power1.out'
        });

      return;
    }

    // Timeline: cae -> rebota -> desaparece
    tlRef.current = gsap.timeline({
      onComplete: () => setShowBall(false)
    });

    tlRef.current
      // CAÍDA hacia el aro (y=0 es la posición base del aro por CSS)
      .to(ballRef.current, {
        y: 0,
        duration: 0.45,
        ease: 'power2.in' // caída acelerada
      })
      // REBOTE en el aro (sube)
      .to(ballRef.current, {
        y: -28,
        duration: 0.2,
        ease: 'power2.out'
      })
      // baja de nuevo (rebote secundario)
      .to(ballRef.current, {
        y: 6,
        duration: 0.14,
        ease: 'power2.in'
      })
      // micro-rebote final
      .to(ballRef.current, {
        y: -10,
        duration: 0.12,
        ease: 'power2.out'
      })
      .to(ballRef.current, {
        y: 0,
        duration: 0.1,
        ease: 'power2.inOut'
      })
      // DESAPARECER
      .to(ballRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.22,
        ease: 'power1.out'
      });

    return () => {
      tlRef.current?.kill();
    };
  }, [showBall, result]);

  /**
   * Maneja el evento onChange.
   */
  const handleChange = () => {
    addRadiosValues({ id: uid, name: radioName, state });
  };

  useEffect(() => {
    addRadioElementsId(uid); // Agrega este grupo de radios al contexto
  }, [uid, addRadioElementsId]);

  const getLabelClass = (state: 'success' | 'wrong') => {
    if (!validation || !isSelected) return css.button;
    return `${css.button} ${state === 'success' ? css.success : css.wrong}`;
  };

  return (
    <div className={`${css.radio__option} ${validation ? css.disabled : ''} ${addClass ?? ''}`}>
      <div className={css.radio_red}>
        <img src={safeSrc(RED)} alt="Red para encestar" className={css.net}/>
        <span>{letter}</span>

        {validation && isSelected && showBall && (
          <img ref={ballRef} src={safeSrc(BALL)} className={css.ball} alt="Balón" />
        )}
      </div>
      <div className={css.radio_button}>
        <input
          id={uid}
          type="radio"
          name={radioName}
          value={uid}
          disabled={validation}
          className={css.radioButton}
          checked={isSelected}
          onChange={handleChange}
          {...props}
        />
        <label htmlFor={uid} className={getLabelClass(state)} dangerouslySetInnerHTML={{ __html: option }} />
      </div>
    </div>
  );
};
