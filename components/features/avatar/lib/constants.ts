import type { Avatar } from '../types/type';
import { AvatarVariation } from '../types/type';

export const VARIATION_FALLBACK: Partial<Record<AvatarVariation, AvatarVariation>> = {
  [AvatarVariation.PRESENTING_RIGHT]: AvatarVariation.PRESENTING,
  [AvatarVariation.PRESENTING_LEFT]: AvatarVariation.PRESENTING,
  [AvatarVariation.CONCLUSIONS]: AvatarVariation.GREETING
};

export const AVATAR_TITLE: Record<AvatarVariation, string> = {
  [AvatarVariation.PRESENTING]: 'Avatar presentando la información.',
  [AvatarVariation.PRESENTING_RIGHT]: 'Avatar presentando la información.',
  [AvatarVariation.PRESENTING_LEFT]: 'Avatar presentando la información.',
  [AvatarVariation.THINKING]: 'Avatar pensando.',
  [AvatarVariation.CONCLUSIONS]: 'Avatar presentando la información.',
  [AvatarVariation.GREETING]: 'Avatar saludando.'
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
    variations: [AvatarVariation.GREETING, AvatarVariation.PRESENTING, AvatarVariation.THINKING]
  },
  {
    id: '04',
    name: 'campesino-abuelo',
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
    variations: [AvatarVariation.GREETING, AvatarVariation.PRESENTING, AvatarVariation.THINKING]
  },
  {
    id: '08',
    name: 'cumbia',
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
    variations: [AvatarVariation.GREETING, AvatarVariation.PRESENTING, AvatarVariation.THINKING]
  }
];
