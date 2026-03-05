import { useEffect, useState } from 'react';

export const useBackground = (
  parentElement: HTMLElement | null = document.body
): [string | null, (image: string) => void] => {
  const [background, setBackground] = useState<string | null>(null);

  useEffect(() => {
    if (!background || !parentElement) return;
    parentElement.style.setProperty('--bg-image', `url(${background})`);

    return () => {
      parentElement.style.removeProperty('--bg-image');
    };
  }, [background, parentElement]);

  return [background, setBackground];
};
