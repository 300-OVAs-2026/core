import type { Avatar } from '../types/type';
import { AvatarVariation } from '../types/type';

export const VARIATION_FALLBACK: Partial<Record<AvatarVariation, AvatarVariation>> = {
  [AvatarVariation.PRESENTING_RIGHT]: AvatarVariation.PRESENTING,
  [AvatarVariation.PRESENTING_LEFT]: AvatarVariation.PRESENTING,
  [AvatarVariation.CONCLUSIONS]: AvatarVariation.GREETING
};

export const AVATAR_TITLE: Record<string, Record<AvatarVariation, string>> = {
  es: {
    [AvatarVariation.PRESENTING]: 'Avatar presentando la información.',
    [AvatarVariation.PRESENTING_RIGHT]: 'Avatar presentando la información.',
    [AvatarVariation.PRESENTING_LEFT]: 'Avatar presentando la información.',
    [AvatarVariation.THINKING]: 'Avatar pensando.',
    [AvatarVariation.CONCLUSIONS]: 'Avatar presentando la información.',
    [AvatarVariation.GREETING]: 'Avatar saludando.'
  },
  en: {
    [AvatarVariation.PRESENTING]: 'Avatar presenting information.',
    [AvatarVariation.PRESENTING_RIGHT]: 'Avatar presenting information.',
    [AvatarVariation.PRESENTING_LEFT]: 'Avatar presenting information.',
    [AvatarVariation.THINKING]: 'Avatar thinking.',
    [AvatarVariation.CONCLUSIONS]: 'Avatar presenting information.',
    [AvatarVariation.GREETING]: 'Avatar greeting.'
  }
};

export const resolveVariation = (variations: AvatarVariation[], requested: AvatarVariation): AvatarVariation => {
  let current: AvatarVariation | undefined = requested;

  while (current !== undefined) {
    if (variations.includes(current)) return current;
    current = VARIATION_FALLBACK[current];
  }

  return AvatarVariation.GREETING;
};

export const AVATARS: Avatar[] = [
  {
    id: '01',
    name: 'albino',
    description: 'Avatar de un hombre joven de piel clara y cabello rubio corto, vestido con camiseta blanca tipo polo con logotipo institucional, jeans azules y zapatillas blancas. Está de pie, levantando una mano en señal de saludo y sosteniendo un bastón de apoyo con la otra mano.',
    variations: [
      AvatarVariation.GREETING,
      AvatarVariation.THINKING,
      AvatarVariation.CONCLUSIONS,
      AvatarVariation.PRESENTING_RIGHT,
      AvatarVariation.PRESENTING_LEFT
    ]
  },
  {
    id: '02',
    name: 'cafetero',
    description: 'Avatar de un hombre joven con sombrero y vestimenta tradicional campesina. Lleva camisa clara, pantalón claro, una mochila cruzada y una ruana o banda tejida sobre el hombro. Está de pie, sonriendo y levantando una mano en señal de saludo.',
    variations: [
      AvatarVariation.THINKING,
      AvatarVariation.GREETING,
      AvatarVariation.PRESENTING_RIGHT,
      AvatarVariation.PRESENTING_LEFT
    ]
  },
  {
    id: '03',
    name: 'campesina',
    description: 'Avatar de una mujer joven con sombrero de paja y trenzas. Lleva camiseta tipo polo con logotipo institucional y una falda negra con franjas de colores en la parte inferior. Está de pie, sonriendo y levantando una mano en señal de saludo.',
    variations: [AvatarVariation.GREETING, AvatarVariation.PRESENTING, AvatarVariation.THINKING]
  },
  {
    id: '04',
    name: 'campesino-abuelo',
    description: 'Avatar de un hombre mayor con sombrero oscuro y ruana. Lleva pantalón oscuro y botas de caucho. Está de pie, sonriendo y levantando una mano en señal de saludo.',
    variations: [
      AvatarVariation.THINKING,
      AvatarVariation.GREETING,
      AvatarVariation.PRESENTING_RIGHT,
      AvatarVariation.PRESENTING_LEFT
    ]
  },
  {
    id: '05',
    name: 'chica-indigena',
    description: 'Avatar de una mujer joven con cabello largo y oscuro. Lleva camiseta tipo polo con logotipo institucional, jeans azules y zapatillas blancas. Está de pie, sonriendo y levantando una mano en señal de saludo.',
    variations: [
      AvatarVariation.THINKING,
      AvatarVariation.GREETING,
      AvatarVariation.PRESENTING_RIGHT,
      AvatarVariation.PRESENTING_LEFT
    ]
  },
  {
    id: '06',
    name: 'chico-protesis',
    description: 'Avatar de un hombre joven con cabello corto y oscuro. Lleva camiseta tipo polo con logotipo institucional, jeans azules y zapatillas blancas. Tiene una prótesis en la pierna derecha. Está de pie, sonriendo y levantando una mano en señal de saludo.',
    variations: [
      AvatarVariation.THINKING,
      AvatarVariation.GREETING,
      AvatarVariation.PRESENTING_RIGHT,
      AvatarVariation.PRESENTING_LEFT
    ]
  },
  {
    id: '07',
    name: 'costeno',
    description: 'Avatar de un hombre joven con cabello corto y oscuro. Lleva camiseta tipo polo con logotipo institucional, jeans azules y zapatillas blancas. Está de pie, sonriendo y levantando una mano en señal de saludo.',
    variations: [AvatarVariation.GREETING, AvatarVariation.PRESENTING, AvatarVariation.THINKING]
  },
  {
    id: '08',
    name: 'cumbia',
    description: 'Avatar de un hombre con traje típico de cumbia saludando con sombrero vueltiao y mochila arhuaca. Está de pie, sonriendo y levantando una mano en señal de saludo.',
    variations: [
      AvatarVariation.THINKING,
      AvatarVariation.GREETING,
      AvatarVariation.PRESENTING_RIGHT,
      AvatarVariation.PRESENTING_LEFT
    ]
  },
  {
    id: '09',
    name: 'morena',
    description: 'Avatar de una mujer joven con cabello rizado y oscuro. Lleva camiseta tipo polo con logotipo institucional, jeans azules y zapatillas blancas. Está de pie, sonriendo y levantando una mano en señal de saludo.',
    variations: [
      AvatarVariation.THINKING,
      AvatarVariation.GREETING,
      AvatarVariation.PRESENTING_RIGHT,
      AvatarVariation.PRESENTING_LEFT
    ]
  },
  {
    id: '10',
    name: 'moreno',
    description: 'Avatar de un hombre afrodescendiente de complexión atlética y cabeza rapada, con una expresión amable y sonriente. Lleva camiseta con logotipo institucional y pantalon color caqui. Está de pie, sonriendo y levantando una mano en señal de saludo.',
    variations: [
      AvatarVariation.THINKING,
      AvatarVariation.GREETING,
      AvatarVariation.PRESENTING_RIGHT,
      AvatarVariation.PRESENTING_LEFT,
      AvatarVariation.CONCLUSIONS
    ]
  },
  {
    id: '11',
    name: 'pelirojo',
    description: 'Avatar de un hombre joven con cabello rojo y pecas. Lleva camiseta tipo polo con logotipo institucional, jeans azules y zapatillas blancas. Está de pie, sonriendo y levantando una mano en señal de saludo.',
    variations: [
      AvatarVariation.THINKING,
      AvatarVariation.GREETING,
      AvatarVariation.PRESENTING_RIGHT,
      AvatarVariation.PRESENTING_LEFT
    ]
  },
  {
    id: '12',
    name: 'wayuu',
    description: 'Avatar de una mujer indígena Wayúu con manta roja tradicional y pintura facial. Está de pie, sonriendo y levantando una mano en señal de saludo.',
    variations: [AvatarVariation.GREETING, AvatarVariation.PRESENTING, AvatarVariation.THINKING]
  }
];


export const i18n = {
  es: {
    select: 'Seleccionar',
    selected: 'Seleccionado',
    instruction: 'Selecciona un avatar para el transcurso del OVA. Puedes cambiarlo en cualquier momento. Una vez que selecciones un avatar, presiona el botón <strong>Contenido</strong> para continuar.'
  },
  en: {
    select: 'Select',
    selected: 'Selected',
    instruction: 'Select an avatar for the duration of the OVA. You can change it at any time. Once you select an avatar, press the <strong>Contents</strong> button to continue.'
  }
}