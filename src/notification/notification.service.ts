import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto'; // Updated import
import { UpdateNotificationDto } from './dto/update-notification'; // Updated import

import { InjectRepository } from '@nestjs/typeorm';
import { NotificationRepository } from './notification.repository'; // Updated repository import
import { Notification } from './entities/notification.entity'; // Updated entity import
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class NotificationService { // Updated service name

  constructor(
    @InjectRepository(Notification) // Updated entity
    private notificationsRepository: typeof NotificationRepository // Updated repository
  ) {} 

  createNotification( // Updated method name and DTO
    notification: CreateNotificationDto, // Updated DTO
    user: User
  ): Promise<Notification> { // Updated return type
    return this.notificationsRepository.createNotification(notification, user); // Updated method call
  }

  async getAllNotifications(user: User): Promise<Notification[]> { // Updated method name and return type
    return this.notificationsRepository.find({
      where: { user },
    });
  }

  async findOne(id: number, user: User): Promise<Notification> { // Updated method name
    const found = await this.notificationsRepository.findOne({ id, user });

    if (!found) {
      throw new NotFoundException(`${id} not found`);
    }
    
    return found;
  }

  async update(id: number, notification: UpdateNotificationDto, user: User) { // Updated method name and DTO
    this.notificationsRepository.update(id, notification, user); // Updated method call
  }

  async remove(id: number, user: User) { // Updated method name
    this.notificationsRepository.remove(id, user); // Updated method call
  }
}
