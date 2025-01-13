import { createContext } from 'react';
import { IGlobalContextProps } from '../shared/types/IGlobalTypes';

export const GlobalContext = createContext({} as IGlobalContextProps);
