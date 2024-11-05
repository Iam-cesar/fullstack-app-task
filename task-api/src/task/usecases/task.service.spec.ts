import { Test, TestingModule } from '@nestjs/testing';
import { TaskServiceImpl } from './task.service';
import { TaskService } from './task.service.interface';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskServiceImpl],
    }).compile();

    service = module.get<TaskService>(TaskServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
