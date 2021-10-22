import React, { useEffect } from "react";

const { electronOnly } = window;

const useIpcListener = <T,>({
  channel,
  listener,
}: {
  channel: string;
  listener: (e: Event, props: T) => void;
}) => {
  return useEffect(() => {
    electronOnly.addGenericIpcListener(channel, listener);

    return () => {
      electronOnly.removeGenericIpcListener(channel);
    };
  }, [channel, listener]);
};

export default useIpcListener;
