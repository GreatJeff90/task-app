import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { NotificationService } from './notification.service'; // Updated import
import { CreateNotificationDto } from './dto/create-notification.dto'; // Updated import
import { Notification } from './entities/notification.entity'; // Updated import
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { UpdateNotificationDto } from './dto/update-notification';

@Controller('notification') // Updated route prefix
export class NotificationController { // Updated controller name
  constructor(private notificationService: NotificationService) {} // Updated service injection

  @Post()
  async createNotification( // Updated method name
    @Res() response,
    @Body() body: CreateNotificationDto, // Updated DTO
    @GetUser() user: User,
  ): Promise<CreateNotificationDto> {
    const newNotification = await this.notificationService.createNotification(body, user); // Updated service method
    return response.status(HttpStatus.CREATED).json({ newNotification });
  }

  @Get()
  getAllNotifications(@GetUser() user: User): Promise<Notification[]> { // Updated return type
    return this.notificationService.getAllNotifications(user); // Updated service method
  }

  @Get(':id')
  findOne( // Updated method name
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Notification> { // Updated return type
    return this.notificationService.findOne(id, user); // Updated service method
  }

  @Patch(':id')
  update( // Updated method name
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNotificationDto: UpdateNotificationDto, // Updated DTO
    @GetUser() user: User,
  ) {
    return this.notificationService.update(id, updateNotificationDto, user); // Updated service method
  }

  @Delete(':id')
  remove( // Updated method name
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.notificationService.remove(id, user); // Updated service method
  }
}
