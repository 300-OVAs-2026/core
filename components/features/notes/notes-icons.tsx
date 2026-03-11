import css from './floating-notes.module.css';

export const NotesIcon = ({ ...props }) => (
<svg data-name="Capa 2" viewBox="0 0 65.7 62.04" {...props}>
      <path
        className={css['prefix__cls-1-fill']}
        d="M58.69 26.98v18.36c0 8.67-7.03 15.7-15.7 15.7H1V19.05c0-8.67 7.03-15.7 15.7-15.7h26.29"
      />
      <path
        className={css['prefix__cls-2-stroke']}
        d="M62.9 14.1L27.5 49.51l-12.45 1.15 1.15-12.45L51.6 2.8C54.03.37 58.53.93 61.65 4.05c3.12 3.12 3.68 7.62 1.25 10.05z"
      />
    </svg>
);

export const CloseIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    fill="currentColor"
    {...props}>
    <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
  </svg>
);

export const MoveArrowIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    fill="currentColor"
    {...props}>
    <path d="M440-234v-126q0-17 11.5-28.5T480-400q17 0 28.5 11.5T520-360v125l43-44q12-12 29-12t29 12q12 12 12 29t-12 29L508-108q-6 6-13 8.5T480-97q-8 0-15-2.5t-13-8.5L338-222q-12-12-11.5-28.5T339-279q12-12 28.5-12t28.5 12l44 45ZM235-440l44 43q12 12 12 29t-12 29q-12 12-29 12t-29-12L108-452q-6-6-8.5-13T97-480q0-8 2.5-15t8.5-13l113-113q12-12 28.5-12t28.5 12q12 12 12 28.5T278-564l-44 44h126q17 0 28.5 11.5T400-480q0 17-11.5 28.5T360-440H235Zm491 0H600q-17 0-28.5-11.5T560-480q0-17 11.5-28.5T600-520h125l-44-43q-12-12-12-29t12-29q12-12 29-12t29 12l113 113q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L738-338q-12 12-28 11.5T682-339q-12-12-12-28.5t12-28.5l44-44ZM440-726l-45 45q-12 12-28 12t-28-12q-12-12-12-28.5t12-28.5l113-114q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l114 114q12 12 12 28t-12 28q-12 12-28.5 12T565-682l-45-44v126q0 17-11.5 28.5T480-560q-17 0-28.5-11.5T440-600v-126Z" />
  </svg>
);

export const NewNoteIcon = ({ ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path>
  </svg>
);

export const EditIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    <path d="m15 5 4 4" />
  </svg>
);

export const TrashIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export const ClockIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M12 6v6l4 2" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

// Editor Icons

export const TextCenterIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M21 5H3" />
    <path d="M17 12H7" />
    <path d="M19 19H5" />
  </svg>
);

export const TextStartIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M21 5H3" />
    <path d="M15 12H3" />
    <path d="M17 19H3" />
  </svg>
);

export const TextEndIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M21 5H3" />
    <path d="M21 12H9" />
    <path d="M21 19H7" />
  </svg>
);

export const TextJustifyIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M3 5h18" />
    <path d="M3 12h18" />
    <path d="M3 19h18" />
  </svg>
);

export const BoldIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
  </svg>
);

export const ItalicIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <line x1="19" x2="10" y1="4" y2="4" />
    <line x1="14" x2="5" y1="20" y2="20" />
    <line x1="15" x2="9" y1="4" y2="20" />
  </svg>
);

export const UnderlineIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M6 4v6a6 6 0 0 0 12 0V4" />
    <line x1="4" x2="20" y1="20" y2="20" />
  </svg>
);

export const BulletListIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M3 5h.01" />
    <path d="M3 12h.01" />
    <path d="M3 19h.01" />
    <path d="M8 5h13" />
    <path d="M8 12h13" />
    <path d="M8 19h13" />
  </svg>
);

export const NumberedListIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M11 5h10" />
    <path d="M11 12h10" />
    <path d="M11 19h10" />
    <path d="M4 4h1v5" />
    <path d="M4 9h2" />
    <path d="M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02" />
  </svg>
);

export const BlockquoteIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
    <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
  </svg>
);

export const HorizontalRuleIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M5 12h14" />
  </svg>
);

export const UndoIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M3 7v6h6" />
    <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
  </svg>
);

export const RedoIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M21 7v6h-6" />
    <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
  </svg>
);

export const DownloadIcon = ({ ...props }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
