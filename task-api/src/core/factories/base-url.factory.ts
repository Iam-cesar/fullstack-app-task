import { Request } from 'express';

export class BaseUrlFactory {
  public link: string;

  constructor(private readonly r: Request) {
    this.link = `${r?.protocol}://${r?.get('host')}${r?.path}${r?.baseUrl}`;
  }
}
