import { useState, useEffect } from "react";

export function useStatePersistance<T>(entity: string, initState: T) {
  // set the initial value from the local storage (if available) otherwise initState
  const [state, setState] = useState<T>(() => {
    const localStorageItem = localStorage.getItem(entity);
    if (!!localStorageItem) {
      return JSON.parse(localStorageItem);
    }
    return initState;
  });

  //update the local storage based on changes in the state
  useEffect(() => {
    if (!state) {
      window.localStorage.setItem(entity, JSON.stringify(""));
    } else {
      window.localStorage.setItem(entity, JSON.stringify(state));
    }
  }, [state, entity]);

  return { state, setState };
}
