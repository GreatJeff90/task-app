import { Test, TestingModule } from '@nestjs/testing';
import { NftService } from './nft.service'; // Changed from TaskService to NftService

describe('NftService', () => { // Changed from TaskService to NftService
  let service: NftService; // Changed from TaskService to NftService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftService], // Changed from TaskService to NftService
    }).compile();

    service = module.get<NftService>(NftService); // Changed from TaskService to NftService
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
