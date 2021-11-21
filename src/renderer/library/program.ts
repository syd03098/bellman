export enum ProgramStatus {
  Running = "running",
  Stopped = "stopped",
  Suspended = "suspended",
  StartNow = "startNow",
}

export const isProgramLostFocus: Readonly<Record<ProgramStatus, boolean>> = {
  [ProgramStatus.Stopped]: false,
  [ProgramStatus.Running]: false,
  [ProgramStatus.Suspended]: true,
  [ProgramStatus.StartNow]: true,
};
