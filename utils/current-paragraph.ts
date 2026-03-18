export const currentParagraph = ({
  id,
  label,
  container
}: {
  id: string;
  label?: string;
  container: HTMLDivElement | null;
}): string | undefined => {
  if (!container) return;

  // Selecciona todos los elementos hijos de tipo 'p' y 'div' con un atributo 'data-type-component="droppable"'
  // que tienen o no tienen 'button' como hijo
  const listOfChildElements = container.querySelectorAll(
    'p, div[data-type-component="droppable"]:has(button), div[data-type-component="droppable"]:not(:has(button))'
  ) as NodeListOf<HTMLElement>;

  let paragraph = '';
  const EMPTY = ' espacio en blanco ';

  // Recorre la lista de elementos hijos
  listOfChildElements.forEach((element) => {
    // Si el elemento no es de tipo 'droppable', añade su texto al párrafo
    if (element.dataset.typeComponent !== 'droppable') {
      paragraph += element.textContent ?? EMPTY;
      return;
    }

    // Si el elemento es de tipo 'droppable', verifica si su id coincide con el id proporcionado
    // Añade el label proporcionado o el texto del elemento (o 'espacio en blanco' si no tiene texto)
    paragraph += element.id === id ? ` ${label} ` : `${element.textContent || EMPTY}`;
  });

  // Retorna el párrafo generado
  return paragraph;
};
