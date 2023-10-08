import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller'; // Updated controller import
import { CategoryService } from './category.service'; // Updated service import

describe('CategoryController', () => { // Updated test description
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController], // Updated controller reference
      providers: [CategoryService], // Updated service reference
    }).compile();

    controller = module.get<CategoryController>(CategoryController); // Updated controller type
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
