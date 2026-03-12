/** Resultado de una sub-actividad: booleano directo o con metadatos de correctas/total. */
export type ActivityResult = boolean | { success: boolean; correct?: number; total?: number };

/** Versión normalizada de ActivityResult para uso interno. */
export interface ActivityResultData {
  success: boolean;
  correct?: number;
  total?: number;
}

export interface UseGamificationOptions {
  /** ID único de la actividad dentro de la OVA. Clave en el store. */
  id: string;
  /** Sub-actividades exitosas necesarias para completar el grupo. @default 1 */
  total?: number;
  /** Estrellas iniciales. @default 3 */
  maxStars?: number;
  /** URL de la imagen de medalla mostrada en el modal. */
  medalSrc?: string;
  /** Callback del botón REINICIAR dentro del modal de completado. */
  onRestart?: () => void;
}
