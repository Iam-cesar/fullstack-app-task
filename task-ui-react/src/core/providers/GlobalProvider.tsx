import { useCallback, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import {
  IGlobalContextProps,
  TGlobalContextKeys,
} from '../shared/types/IGlobalTypes';
import { initialGlobalState } from '../states/initialGlobalState';

interface IGlobalContextProviderProps {
  children: JSX.Element;
}
export const GlobalContextProvider = ({
  children,
}: IGlobalContextProviderProps) => {
  const [globalState, setGlobalState] =
    useState<IGlobalContextProps>(initialGlobalState);

  const updateGlobalState = useCallback(
    (key: TGlobalContextKeys, value: unknown) =>
      setGlobalState((prev) => ({ ...prev, [key]: value })),
    [setGlobalState],
  );

  return (
    <GlobalContext.Provider value={{ ...globalState, updateGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
