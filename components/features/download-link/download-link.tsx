import { Icon } from '@ui';

import css from './download-link.module.css';

export interface DownloadLinkProps {
  fileUrl: string;
  fileName?: string;
  label: string;
  iconName?: string;
  addClass?: string;
  ariaLabel?: string;
}

export const DownloadLink: React.FC<DownloadLinkProps> = ({
  fileUrl,
  fileName,
  label,
  iconName = 'arrow-right-button',
  addClass,
  ariaLabel
}) => {
  const downloadFileName = fileName || fileUrl.split('/').pop();

  return (
    <a
      href={fileUrl}
      download={downloadFileName}
      className={`${css.downloadLink} ${addClass ?? ''}`}
      aria-label={ariaLabel || `Descargar ${label}`}
    >
      {label}
      <Icon name={iconName} />
    </a>
  );
};