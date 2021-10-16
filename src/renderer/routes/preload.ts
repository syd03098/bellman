import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronOnly", {
  github: async (): Promise<void> => ipcRenderer.invoke("github"),
});
