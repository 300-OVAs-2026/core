import * as React from 'react';
import { Image } from '@ui';

import { useOvaStore } from '@/store/ova-store';

import { AVATAR_TITLE, AVATARS, resolveVariation } from './lib/constants';

import type { AvatarVariation } from './types/type';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  variation: AvatarVariation;
  title?: string;
  size?: string;
  addClass?: string;
  noCaption?: boolean;
}

export const Avatar: React.FC<Props> = ({
  variation,
  title = '',
  size = '26.875rem',
  noCaption,
  ...props
}) => {
  const selectedAvatarId = useOvaStore((state) => state.selectedAvatarId);
  const lang = useOvaStore((state) => state.lang);

  const avatar = AVATARS.find(({ id }) => id === selectedAvatarId);
  const resolvedVariation = avatar ? resolveVariation(avatar.variations, variation) : variation;

  const src = avatar ? `assets/base/avatars/${avatar.id}/${avatar.name}-${resolvedVariation}.webp` : '';
  const alt = AVATAR_TITLE[lang]?.[variation] || 'Avatar.';

  return <Image {...props} title={title} size={size} noCaption={noCaption} src={src} alt={alt} />;
};
