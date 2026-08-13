import { AppModule } from './app.module';
import { TaskModule } from './task/task.module';

describe('AppModule', () => {
  it('should be defined', () => {
    expect(AppModule).toBeDefined();
  });

  it('should wire up the task module alongside config and typeorm', () => {
    const imports = Reflect.getMetadata('imports', AppModule) ?? [];

    expect(imports).toContain(TaskModule);
    expect(imports).toHaveLength(3);
  });
});
