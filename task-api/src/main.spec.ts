import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

jest.mock('@nestjs/core', () => ({
  ...jest.requireActual('@nestjs/core'),
  NestFactory: { create: jest.fn() },
}));

describe('main', () => {
  it('should bootstrap the app with cors pointing at the ui and listen on the configured port', async () => {
    process.env.API_PORT = '4242';
    process.env.UI_URL = 'http://localhost:5173';

    const listen = jest.fn();
    (NestFactory.create as jest.Mock).mockResolvedValue({ listen });

    await import('./main');
    await new Promise(process.nextTick);

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule, {
      cors: {
        allowedHeaders: '*',
        origin: 'http://localhost:5173',
      },
    });
    expect(listen).toHaveBeenCalledWith('4242');
  });
});
