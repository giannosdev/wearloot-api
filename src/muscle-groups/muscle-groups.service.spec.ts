import { Test, TestingModule } from '@nestjs/testing';
import { MuscleGroupsService } from './muscle-groups.service';

describe('MuscleGroupsService', () => {
  let service: MuscleGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MuscleGroupsService],
    }).compile();

    service = module.get<MuscleGroupsService>(MuscleGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
