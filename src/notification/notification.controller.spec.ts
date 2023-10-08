import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller'; // Updated import
import { NotificationService } from './notification.service'; // Updated import

describe('NotificationController', () => { // Updated controller name
  let controller: NotificationController; // Updated controller type

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController], // Updated controller
      providers: [NotificationService], // Updated service
    }).compile();

    controller = module.get<NotificationController>(NotificationController); // Updated controller type
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
