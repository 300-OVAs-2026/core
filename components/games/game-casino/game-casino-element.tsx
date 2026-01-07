// import { loadCSS } from '@core/utils';

import { GameCasinoStates, silverAmount } from './types/types';

import css from './game-casino.module.css';

// const css = await loadCSS({
//   ui: 'game-casino/game-casino.module.css',
//   local: 'game-casino/game-casino.module.css'
// });

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  label: string;
  id: string;
  name: string;
  state: GameCasinoStates | string;
  onValueChange: (id: string, amount: number, state: GameCasinoStates | string) => void;
  isSelected?: boolean;
  hasValidated?: boolean;
  selectedAmount?: number | null;
  disabled?: boolean;
}

const CasinoElement = ({
  label,
  id,
  name,
  state,
  isSelected,
  hasValidated,
  selectedAmount,
  disabled,

  onValueChange,
  ...rest
}: Props) => {
  const handleButtonClick = (id: string, amount: number, state: GameCasinoStates | string) => {
    onValueChange(id, amount, state);
  };

  return (
    <div className={css['casino-element']}>
      <article
        data-label={label.charAt(0).toUpperCase()}
        className={`
          ${isSelected && hasValidated && state === 'success' ? css['success'] : ''} 
          ${isSelected && hasValidated && state === 'wrong' ? css['wrong'] : ''}
        `}>
        <label htmlFor={id}>{label}</label>
        <input className={css['hidden-input']} type="radio" name={name} id={id} {...rest} />
        <div className={css['casino-element-amount']}>
          {silverAmount.map((amount, index) => (
            <button
              disabled={disabled || (isSelected && hasValidated)}
              className={isSelected && selectedAmount === amount ? css.selected : ''}
              type="button"
              key={amount + index}
              onClick={() => handleButtonClick(id, amount, state)}>
              <span>${amount}</span>
              {amount === 10 && <img width={30} height={30} src="assets/images/moneda-1.webp" alt="Moneda 1." />}
              {amount === 15 && <img width={30} height={30} src="assets/images/moneda-2.webp" alt="Moneda 2." />}
              {amount === 25 && <img width={30} height={30} src="assets/images/moneda-3.webp" alt="Moneda 3." />}
            </button>
          ))}
        </div>
      </article>
    </div>
  );
};

export default CasinoElement;
