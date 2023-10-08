import { Test, TestingModule } from '@nestjs/testing';
import { AuctionController } from './auction.controller'; // Updated import
import { AuctionService } from './auction.service'; // Updated import

describe('AuctionController', () => { // Updated controller name
  let controller: AuctionController; // Updated controller type

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuctionController], // Updated controller
      providers: [AuctionService], // Updated service
    }).compile();

    controller = module.get<AuctionController>(AuctionController); // Updated controller type
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
