import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service'; // Updated import

describe('NotificationService', () => { // Updated service name
  let service: NotificationService; // Updated service type

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationService], // Updated service
    }).compile();

    service = module.get<NotificationService>(NotificationService); // Updated service type
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
