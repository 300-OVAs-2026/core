/**
 * Prefijo único de localStorage derivado del título inicial del documento.
 * Se captura una sola vez al cargar el módulo, antes de que React pueda
 * modificar `document.title`. Dado que cada OVA tiene su propio `<title>`
 * en index.html, este valor es único por OVA.
 *
 * Ejemplo: "OVA 301 - Filosofía" → "ova-301-filosofia"
 */
export const OVA_STORAGE_KEY = document.title
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '') // elimina diacríticos (tildes, ñ, etc.)
  .replace(/[^a-z0-9]+/g, '-')    // reemplaza caracteres no alfanuméricos por guión
  .replace(/^-|-$/g, '');          // elimina guiones al inicio y al final
