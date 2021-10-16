declare global {
  interface Window {
    electronOnly: ElectronOnly;
  }
}

export interface ElectronOnly {
  github: () => Promise<void>;
}
