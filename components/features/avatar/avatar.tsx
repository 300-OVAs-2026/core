import { Image } from '@ui';

import { useOvaStore } from '@/store/ova-store';

import { AVATARS } from './lib/constants';

import type { AvatarVariation } from './types/type';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  variation: AvatarVariation;
  alt: string;
  title?: string;
  size: string;
  hasHtml?: boolean;
  addClass?: string;
  noCaption?: boolean;
}


export const Avatar: React.FC<Props> = ({ variation, title = '', alt = '', size, hasHtml, noCaption, ...props }) => {
  const selectedAvatarId = useOvaStore((state) => state.selectedAvatarId);

  const avatar = AVATARS.find(({ id }) => id === selectedAvatarId);
  const src = avatar ? `assets/base/avatars/${avatar.id}/${avatar.name}-${variation}.webp` : '';

  return <Image title={title} alt={alt} size={size} hasHtml={hasHtml} noCaption={noCaption} src={src} {...props} />;
};
