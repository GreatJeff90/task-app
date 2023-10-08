import { Test, TestingModule } from '@nestjs/testing';
import { NftController } from './nft.controller'; // Changed from TaskController to NftController
import { NftService } from './nft.service'; // Changed from TaskService to NftService

describe('NftController', () => { // Changed from TaskController to NftController
  let controller: NftController; // Changed from TaskController to NftController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftController], // Changed from TaskController to NftController
      providers: [NftService], // Changed from TaskService to NftService
    }).compile();

    controller = module.get<NftController>(NftController); // Changed from TaskController to NftController
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
