import { Notification } from './entities/notification.entity'; // Updated import to Notification entity
import { CreateNotificationDto } from './dto/create-notification.dto'; // Updated import to CreateNotificationDto
import { UpdateNotificationDto } from './dto/update-notification'; // Updated import to UpdateNotificationDto
import { User } from 'src/auth/entities/user.entity';

export interface INotificationRepository { // Updated interface name
  createNotification(notificationDto: CreateNotificationDto, user: User): Promise<Notification>; // Updated method name and return type
  findOne(id: number, user: User): Promise<Notification | undefined>; // Updated method name and return type
  findAll(user: User): Promise<Notification[]>; // Updated method name and return type
  update(id: number, updateNotificationDto: UpdateNotificationDto, user: User): Promise<Notification>; // Updated method name and return type
  remove(id: number, user: User): Promise<void>; // Updated method name
}
