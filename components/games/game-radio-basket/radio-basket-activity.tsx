import { useEffect, useReducer, useRef } from 'react';

import type { InitialState, Option } from './types/types';
import { States } from './types/types';
import { RadioBasketButton } from './radio-basket-button';
import { RadioBasketActivityProvider } from './radio-basket-context';
import { RadioBasketElement } from './radio-basket-element';

const INITIAL_STATE = Object.freeze({
  validation: false,
  button: true,
  result: false,
  options: []
});

interface Props {
  children: JSX.Element | JSX.Element[];
  onResult?: ({ result, options }: { result: boolean; options: Option[] }) => void;
}

type SubComponents = {
  Radio: typeof RadioBasketElement;
  Button: typeof RadioBasketButton;
};

const RadiosBasket: React.FC<Props> & SubComponents = ({ children, onResult }) => {
  const [activity, updateActivity] = useReducer(
    (prev: InitialState, next: Partial<InitialState>) => ({ ...prev, ...next }),
    INITIAL_STATE
  );

  // Referencia mutable para almacenar los uid de cada componente <RadioElement/>
  const radioElementsId = useRef<string[]>([]);

  /**
   * Agrega el ID de un componente RadioElement
   * para realizar la validación de la actividad.
   * @param {string} uid - El ID del componente RadioElement.
   */
  const addRadioElementsId = (uid: string): void => {
    if (!radioElementsId.current.includes(uid)) {
      radioElementsId.current = [...radioElementsId.current, uid];
    }
  };

  /**
   * Creada para almacenar los radio seleccionados,
   * se crea un nuevo objecto con el id de la pregunta y el valor del radio.
   *
   * @param {String} id - id de la pregunta.
   * @param {Object} value - valor del radio seleccionado.
   */
  const addRadiosValues = ({ id, name, state }: Option) => {
    updateActivity({
      options: [...activity.options.filter((option) => option.id !== id), { id, name, state }]
    });
  };

  /**
   * Se usa para la validación de toda la actividad,
   * está se encarga de comprobrar que el número de opciones
   * seleccionadas se igual al total de las correctas.
   */
  const handleValidation = () => {
    updateActivity({ validation: true, button: true });

    const result = activity.options.every(({ state }) => state === States.SUCCESS);

    if (onResult) {
      onResult({ result, options: activity.options });
      console.log({ result, options: activity.options });
    }

    // Actualiza la actividad con el nuevo resultado
    updateActivity({ result: result });
  };

  /**
   * Reinicia la actividad a su estado inicial.
   */
  const handleReset = () => {
    activity.options.forEach(({ id }) => {
      // Busca el elemento del DOM correspondiente al nombre de opción y tipo de input 'radio'
      const element = document.querySelector(`input[type='radio'][id='${id}']`) as HTMLInputElement;

      if (element) {
        // Si se encuentra el elemento, establece su propiedad 'checked' en false para deseleccionarlo
        element.checked = false;
      }
    });
    updateActivity(INITIAL_STATE);
  };

  /**
   * Monitorea los cambios en las opciones seleccionadas.
   * Si hay opciones seleccionadas y la actividad no ha sido validada, activa el botón.
   * @returns void
   */
  useEffect(() => {
    if (!activity.options.length) return;

    if (!activity.validation) {
      updateActivity({ button: false });
    }
  }, [activity.options, activity.validation]);

  return (
    <RadioBasketActivityProvider
      value={{
        addRadiosValues,
        handleValidation,
        addRadioElementsId,
        handleReset,
        button: activity.button,
        result: activity.result,
        validation: activity.validation
      }}>
      {children}
    </RadioBasketActivityProvider>
  );
};

RadiosBasket.Radio = RadioBasketElement;
RadiosBasket.Button = RadioBasketButton;

export { RadiosBasket };
