import { Request } from 'express';

export class BaseUrlFactory {
  public link: string;

  constructor(private readonly request: Request) {
    this.link = `${request?.protocol}://${request?.get('host')}${request?.baseUrl}`;
  }
}
