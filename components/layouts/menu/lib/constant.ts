// Constantes para las etiquetas de navegación en múltiples idiomas
export const i18n = {
  es: {
    nav: 'Menú principal',
    skipToMain: 'Ir a contenido',
    audioPause: 'Activar audio',
    audioActive: 'Desactivar audio',
    a11y: 'Accesibilidad',
    home: 'Inicio',
    menu: 'Menú',
    help: 'Ayuda',
    notes: 'Notas',
    shortcuts: 'Atajos de teclado',
    specifications: 'Especificaciones técnicas',
    btnCloseMenu: 'Cerrar modal'
  },
  en: {
    nav: 'Main menu',
    skipToMain: 'Skip to main content',
    audioPause: 'To activate audio',
    audioActive: 'Deactivate audio',
    a11y: 'Accessibility',
    home: 'Home',
    menu: 'Menu',
    help: 'Help',
    notes: 'Notes',
    shortcuts: 'Keyboard shortcuts',
    specifications: 'Technical specifications',
    btnCloseMenu: 'Close modal'
  }
};

export const i18nTour = {
  es: {
    start: 'Comienza el recorrido interactivo del OVA para explorar sus funcionalidades.',
    a11yAudio: 'Activa los audios descriptivos del OVA para facilitar la comprensión del contenido visual.',
    a11y: 'Explora todas las opciones de accesibilidad disponibles para mejorar tu experiencia.',
    home: 'Regresa a la página de inicio del OVA para comenzar de nuevo.',
    menu: 'Accede al menú para explorar y navegar por todas las secciones del OVA.',
    help: 'Consulta las opciones de ayuda del OVA para resolver tus dudas o problemas.',
    previous: 'Ve a la página anterior del OVA para revisar el contenido previo.',
    next: 'Avanza a la siguiente página del OVA para continuar aprendiendo.',
    navigation: 'Utiliza esta barra para desplazarte fácilmente por las diferentes secciones del OVA.'
  },
  en: {
    start: 'Start the interactive tour of the OVA to explore its features.',
    a11yAudio: 'Enable descriptive audio in the OVA to better understand visual content.',
    a11y: 'Explore all available accessibility options to enhance your experience.',
    home: 'Return to the OVA homepage to start over.',
    menu: 'Access the menu to explore and navigate through all sections of the OVA.',
    help: 'Check the OVA help options to resolve any questions or issues.',
    previous: 'Go to the previous page of the OVA to review earlier content.',
    next: 'Proceed to the next page of the OVA to continue learning.',
    navigation: 'Use this bar to easily navigate through the different sections of the OVA.'
  }
};

// Expresión regular para extraer el número de la página de la URL
export const PATH_REGEX = /\/page-(\d+)/;

export const HOME_PATH = '/';

export const SPANISH_LANGUAGE = 'es';

export const MODAL = Object.freeze({
  ESPECIFICATION: 'especification'
});

export const KEYCODE = {
  TAB: 9,
  ESC: 27,
  SPACE: 32
};
