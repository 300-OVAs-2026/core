export type URLs = {
  accesibilityURL?: string;
  contentURL?: string;
};

export interface InterpreterProps {
  className?: string;
}

export interface InterpreterVideoProps {
  URLs: URLs;
  show: boolean;
  onClose: () => void;
}

export interface InterpreterVideoPlayerProps {
  displayVideo: string | null;
  URLs: URLs;
}

export interface TooglePlayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPlaying: boolean;
  onPlay: () => void;
}
