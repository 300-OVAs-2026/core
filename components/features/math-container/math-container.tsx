import { MathJax, MathJaxContext } from 'better-react-mathjax';

import { cn } from '@shared/utils';

import css from './math-container.module.css';

interface MathContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Configuración de MathJax para habilitar el paquete de colores
const config = {
  loader: { load: ['[tex]/color'] },
  tex: {
    packages: { '[+]': ['color'] }
  }
};

export const MathContainer: React.FC<MathContainerProps> = ({ children, className }) => {
  return (
    <MathJaxContext config={config}>
      <MathJax className={cn(css.mathContainer, className)} style={{ display: 'initial !important' }}>
        {typeof children === 'string' ? `\\(${children}\\)` : children}
      </MathJax>
    </MathJaxContext>
  );
};
