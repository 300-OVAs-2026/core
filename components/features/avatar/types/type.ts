

export type Avatar = {
  id: string;
  name: string;
  description: string;
  variations: AvatarVariation[];
};

export enum AvatarVariation {
  PRESENTING = 'presentando',
  PRESENTING_RIGHT = 'presentando-derecha',
  PRESENTING_LEFT = 'presentando-izquierda',
  THINKING = 'pensando',
  CONCLUSIONS = 'conclusiones',
  GREETING = 'saludando'
}
