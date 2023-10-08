import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service'; // Changed from TaskService

describe('CategoryService', () => { // Changed from TaskService
  let service: CategoryService; // Changed from TaskService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService], // Changed from TaskService
    }).compile();

    service = module.get<CategoryService>(CategoryService); // Changed from TaskService
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
