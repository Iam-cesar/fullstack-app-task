import { useCallback, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import {
  IInitialGlobalProps,
  TInitialGlobalContextKeys,
} from '../shared/types/IGlobalTypes';
import { initialGlobalState } from '../states/initialGlobalState';

interface IGlobalContextProviderProps {
  children: JSX.Element;
}
export const GlobalContextProvider = ({
  children,
}: IGlobalContextProviderProps) => {
  const [globalState, setGlobalState] =
    useState<IInitialGlobalProps>(initialGlobalState);

  const updateGlobalState = useCallback(
    (key: TInitialGlobalContextKeys, value: unknown) =>
      setGlobalState((prev) => ({ ...prev, [key]: value })),
    [setGlobalState],
  );

  return (
    <GlobalContext.Provider value={{ ...globalState, updateGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
