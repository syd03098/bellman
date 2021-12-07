import { IpcRenderer } from "electron";

declare global {
  interface Window {
    electronOnly: ElectronOnly;
  }
}

export interface ElectronOnly {
  openExternalCanvas: (restart?: boolean) => Promise<void>;

  openEditOptions: (args: any) => void;

  addGenericIpcListener: <T>(
    channel: string,
    listener: (e: Event, props: T) => void
  ) => IpcRenderer;
  removeGenericIpcListener: (channel: string) => IpcRenderer;
}
