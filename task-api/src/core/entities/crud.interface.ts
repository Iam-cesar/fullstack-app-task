import { IRead } from './read.interface';
import { IWrite } from './write.interface';

export interface CRUD<T> extends IRead<T>, IWrite<T> {}
