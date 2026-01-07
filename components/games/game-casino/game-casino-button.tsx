import { Row } from 'books-ui';

import { useOvaContext } from '@/context/ova-context';
import { Button } from '@/shared/ui/components';

import { i18n } from './const';

interface Props {
  disabledButton: { reset: boolean; activity: boolean };
  handleValidate: () => void;
  handleReset: () => void;
}

const GameCasinoButton = ({ disabledButton, handleValidate, handleReset }: Props) => {
  const { lang } = useOvaContext();
  return (
    <Row justifyContent="center" alignItems="center" addClass="u-gap-4">
      <Button disabled={disabledButton.activity} onClick={handleValidate} label={i18n[lang].check} />
      <Button disabled={disabledButton.reset} onClick={handleReset} label={i18n[lang].reset} />
    </Row>
  );
};

export default GameCasinoButton;
