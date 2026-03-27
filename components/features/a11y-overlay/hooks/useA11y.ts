import { useCallback, useEffect, useState } from 'react';

import { KEY_LOCAL_STORAGE_A11Y } from '@/shared/constants';

import { INITIAL_STATE, INVALID_VALUES } from '../lib/constant';

import type { ConfigA11y } from '../types/types';

type toggleHTMLDataAttributeType = (property: keyof ConfigA11y, value?: string | boolean) => void;

type useA11y = {
  config: ConfigA11y;
  setConfig: toggleHTMLDataAttributeType;
};

const convertToDataAttribute = (property: string) => {
  return `data-${property
    .split(/(?<!^)(?=[A-Z])/)
    .map((str) => str.toLowerCase())
    .join('-')}`;
};


export const useA11y = (): useA11y => {
  const [config, setConfigState] = useState<ConfigA11y>(() => {
    if (typeof window === 'undefined') return INITIAL_STATE;
    
    const stored = localStorage.getItem(KEY_LOCAL_STORAGE_A11Y);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return INITIAL_STATE;
      }
    }
    return INITIAL_STATE;
  });

  // Aplicar configuración inicial al cargar
  useEffect(() => {
    const HTML_SELECTOR = document.querySelector('html');
    if (!HTML_SELECTOR) return;

    Object.keys(config).forEach((key) => {
      const property = key as keyof ConfigA11y;
      const value = config[property];
      
      if (INVALID_VALUES.includes(value)) return;

      const dataAttribute = convertToDataAttribute(property);
      HTML_SELECTOR.setAttribute(dataAttribute, String(value));
    });
  }, []);

  const setConfig: toggleHTMLDataAttributeType = useCallback((property: keyof ConfigA11y, value?: string | boolean) => {
    const HTML_SELECTOR = document.querySelector('html');
    if (!HTML_SELECTOR) return;

    let propertyValue = value !== undefined ? value : !config[property];

    // Reestablece al valor inicial si el valor actual es igual al almacenado
    if (value === config[property]) {
      propertyValue = INITIAL_STATE[property];
    }

    const propertyDataSet = convertToDataAttribute(property);

    // Establece o elimina el atributo data-* en <html> según el valor
    if (!INVALID_VALUES.includes(propertyValue)) {
      HTML_SELECTOR.setAttribute(propertyDataSet, String(propertyValue));
    } else {
      HTML_SELECTOR.removeAttribute(propertyDataSet);
    }

    const newConfig = { ...config, [property]: propertyValue };
    console.log('Updating config:', newConfig.interpreter);
    setConfigState(newConfig);
    
    // Guardar en localStorage
    localStorage.setItem(KEY_LOCAL_STORAGE_A11Y, JSON.stringify(newConfig));
  }, [config]);

  return {
    config,
    setConfig
  };
};

