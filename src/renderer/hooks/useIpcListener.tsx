import React, { useEffect } from "react";

const { electronOnly } = window;

const useIpcListener = <T,>({
  channel,
  handler,
}: {
  channel: string;
  handler: (props: T) => void;
}) => {
  return useEffect(() => {
    const listener = (e: Event, props: T): void => {
      handler(props);
    };
    electronOnly.addGenericIpcListener(channel, listener);

    return () => {
      electronOnly.removeGenericIpcListener(channel);
    };
  }, [channel, handler]);
};

export default useIpcListener;
