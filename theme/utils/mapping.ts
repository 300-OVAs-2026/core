/**
 * Mapa de direcciones que traduce abreviaturas de dirección a sus equivalentes en CSS.
 * 
 * Abreviaturas:
 * - 'l': left (inline-start)
 * - 'r': right (inline-end)
 * - 't': top (block-start)
 * - 'b': bottom (block-end)
 * - 'x': horizontal (inline)
 * - 'y': vertical (block)
 * - '': sin dirección específica
 */
export const directionMap: Record<string, string[]> = {
  l: ['-inline-start'],
  r: ['-inline-end'],
  t: ['-block-start'],
  b: ['-block-end'],
  x: ['-inline'],
  y: ['-block'],
  '': ['']
};

/**
 * Mapa de direcciones para row y column que traduce abreviaturas de dirección a sus equivalentes en CSS.
 * 
 * Abreviaturas:
 * - 'x': column (columna)
 * - 'y': row (fila)
 * - '': sin dirección específica
 */
export const directionColumRowMap: Record<string, string> = {
  x: 'column',
  y: 'row',
};


/**
 * Objeto que define valores de tamaño de fuente utilizando una proporción de escala de tipo de 1.200.
 * Los valores se obtuvieron de https://www.fluid-type-scale.com/
 * La función `clamp` se utiliza para mantener los tamaños de fuente fluidos entre diferentes pantallas.
 */
export const fontSizeValues: Record<string, string> = {
  '100': 'clamp(0.67rem, 0.31vi + 0.6rem, 0.83rem)',
  '200': 'clamp(0.8rem, 0.34vi + 0.71rem, 0.99rem)',
  '300': 'clamp(1rem, 0.34vi + 0.91rem, 1.19rem)',
  '400': 'clamp(1.25rem, 0.32vi + 1.17rem, 1.43rem)',
  '500': 'clamp(1.56rem, 0.27vi + 1.5rem, 1.71rem)',
  '600': 'clamp(1.95rem, 0.18vi + 1.91rem, 2.05rem)',
  '700': 'clamp(2.44rem, 0.04vi + 2.43rem, 2.46rem)',
  '800': 'clamp(3.05rem, -0.18vi + 3.1rem, 2.95rem)',
  '900': 'clamp(3.81rem, -0.5vi + 3.92rem, 3.54rem)',
  '1000': 'clamp(4.77rem, -0.93vi + 4.96rem, 4.25rem)',
  '1100': 'clamp(5.96rem, -1.51vi + 6.27rem, 5.1rem)',
  '1200': 'clamp(7.45rem, -2.28vi + 7.92rem, 6.12rem)'
};
