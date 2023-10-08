import { Test, TestingModule } from '@nestjs/testing';
import { AuctionService } from './auction.service'; // Update the import statement

describe('AuctionService', () => { // Update the describe block
  let service: AuctionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuctionService], // Update the service provider
    }).compile();

    service = module.get<AuctionService>(AuctionService); // Update the service instance
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
