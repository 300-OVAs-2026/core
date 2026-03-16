const ordinales = [
  'primera',
  'segunda',
  'tercera',
  'cuarta',
  'quinta',
  'sexta',
  'séptima',
  'octava',
  'novena',
  'décima'
];

const ordinals = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];

export const i18n = {
  es: {
    title: '¡BIEN!',
    subtitle: 'Has completado la actividad.',
    correct: (c: number, t: number) => `${c} / ${t}`,
    correctLabel: 'Respuestas correctas.',
    medal: (n: number) => `Has ganado tu ${ordinales[n - 1] ?? `${n}ª`} insignia.`,
    restart: 'REINICIAR',
    starsLabel: (n: number) => `${n} estrellas obtenidas`,
    gamificationStarsLabel: 'Estrellas de la actividad'
  },
  en: {
    title: 'GREAT!',
    subtitle: 'You completed the activity.',
    correct: (c: number, t: number) => `${c} / ${t}`,
    correctLabel: 'Correct answers.',
    medal: (n: number) => `You earned your ${ordinals[n - 1] ?? `${n}th`} badge.`,
    restart: 'RESTART',
    starsLabel: (n: number) => `${n} stars earned`,
    gamificationStarsLabel: 'Activity stars'
  }
};
