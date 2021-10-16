import React, { EffectCallback, useEffect } from "react";

const useEffectOnce = (callback: EffectCallback): void => {
  return useEffect(() => {
    if (!callback) {
      return;
    }
    callback();
  }, []);
};

export default useEffectOnce;
