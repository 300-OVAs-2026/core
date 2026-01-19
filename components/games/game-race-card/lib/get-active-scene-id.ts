export const getActiveSceneIdFromInputId = (inputId: string): string | null => {
  const el = document.getElementById(inputId);
  if (!el) return null;

  // Busca el contenedor de la escena por arriba (ajusta el selector a tu markup real)
  const wrapper = el.closest('[id^="question-svg-"]') as HTMLElement | null;
  return wrapper?.id ?? null;
};
