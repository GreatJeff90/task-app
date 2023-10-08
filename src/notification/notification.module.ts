import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity'; // Updated import
import { NotificationService } from './notification.service'; // Updated import
import { NotificationController } from './notification.controller'; // Updated import

@Module({
  imports: [TypeOrmModule.forFeature([Notification])], // Updated entity
  controllers: [NotificationController], // Updated controller
  providers: [NotificationService], // Updated service
})
export class NotificationModule {} // Updated module name

