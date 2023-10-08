import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity'; // Updated import to Notification entity
import { CreateNotificationDto } from './dto/create-notification.dto'; // Updated import to CreateNotificationDto
import { UpdateNotificationDto } from './dto/update-notification'; // Updated import to UpdateNotificationDto
import { User } from 'src/auth/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

export interface INotificationRepository extends Repository<Notification> { // Updated interface name
}

export const NotificationRepository: Pick<INotificationRepository, any> = { // Updated repository name

  async createNotification(notificationDto: CreateNotificationDto, user): Promise<CreateNotificationDto> { // Updated DTO
    notificationDto.user = user
    return this.save(notificationDto)
  },

  async findOne(id: number, user: User){
    const query = this.createQueryBuilder('notification') // Updated to 'notification'
    query.where('notification.id = :id', { id: id }) // Updated to 'notification'
    query.andWhere('notification.userId = :userId', { userId: user.id }) // Updated to 'notification'
    return await query.getOne()
  }, 

  async findAll(user: User): Promise<Notification[]>{
    const query = this.createQueryBuilder('notification') // Updated to 'notification'
    query.where('notification.userId = :userId', { userId: user.id }) // Updated to 'notification'
    return await query.getMany()
  },

  async update(id: number, updateNotificationDto: UpdateNotificationDto, user: User): Promise<Notification>{ // Updated DTO
    const result = await this
      .createQueryBuilder()
      .update(Notification) // Updated to 'Notification'
      .set(updateNotificationDto)
      .where('notification.id = :id', { id }) // Updated to 'notification'
      .andWhere('notification.userId = :userId', { userId: user.id }) // Updated to 'notification'
      .execute()
    
    if (!result.affected) {
      throw new NotFoundException(`Notification with id ${id} not found for this user`);
    }

    return this.findOne(id, user)
  },

  async remove(id: number, user: User){
    const result = await this
      .createQueryBuilder()
      .delete()
      .from(Notification) // Updated to 'Notification'
      .where('id = :id', { id })
      .andWhere('userId = :userId', { userId: user.id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`Notification with id ${id} not found for this user`) // Updated to 'Notification'
    }
  }
}
