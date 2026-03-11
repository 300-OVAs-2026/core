

export type Avatar = {
  id: string;
  name: string;
  variations: AvatarVariation[];
};

export enum AvatarVariation {
  PRESENTING = 'presentando',
  PRESENTING_RIGHT = 'presentando-derecha',
  PRESENTING_LEFT = 'presentando-izquierda',
  THINKING = 'pensando',
  CONCLUSIONS = 'conclusiones',
  CONCLUSION_RIGHT = 'conclusion-derecha',
  CONCLUSION_LEFT = 'conclusion-izquierda',
  GREETING = 'saludando'
}
