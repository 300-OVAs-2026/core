import type { VideoURLs } from "@shared/hooks";

export interface InterpreterSource extends VideoURLs {
  uid: string;
}

export interface PanelContextType {
  titles: string[];
  addSectionTitle: (title: string) => void;
  interpreter: InterpreterSource[];
  addNewVideoSource: (videoSources: InterpreterSource) => void;
}
