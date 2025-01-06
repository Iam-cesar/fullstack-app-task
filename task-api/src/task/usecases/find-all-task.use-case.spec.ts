import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PageDto } from '../../core/dto/Page.dto';
import { PageMetaDto } from '../../core/dto/PageMeta.dto';
import { PageOptionsDto } from '../../core/dto/PageOptions.dto';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../persistence/task.repository';
import { FindAllTaskUseCase } from './find-all-task.use-case';

describe('FindAllTaskUseCase', () => {
  let findAllTaskUseCase: FindAllTaskUseCase;
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllTaskUseCase,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            findAndCount: jest.fn(),
          },
        },
      ],
    }).compile();

    findAllTaskUseCase = module.get<FindAllTaskUseCase>(FindAllTaskUseCase);
    taskRepository = module.get<TaskRepository>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(findAllTaskUseCase).toBeDefined();
  });

  it('should return a PageDto with tasks and meta data', async () => {
    const tasks = [new Task(), new Task()];
    const totalItems = 2;
    const params = {};
    const pageOptionsDto = new PageOptionsDto<Task>(params);
    const pageMetaDto = new PageMetaDto({
      items_count: totalItems,
      pageOptions: params,
    });

    jest
      .spyOn(taskRepository, 'findAndCount')
      .mockResolvedValue([tasks, totalItems]);

    const result = await findAllTaskUseCase.execute(params);

    expect(taskRepository.findAndCount).toHaveBeenCalledWith({
      ...pageOptionsDto,
    });
    expect(result).toEqual(new PageDto(tasks, pageMetaDto));
  });
});
