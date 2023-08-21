import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async createTask(
    @Res() response,
    @Body() body: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<CreateTaskDto> {
    const newTask = await this.taskService.createTask(body, user);
    return response.status(HttpStatus.CREATED).json({ newTask });
  }

  @Get()
  getAllTasks(@GetUser() user: User): Promise<Task[]> {
    return this.taskService.getAllTasks(user);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto, // Use your DTO
    @GetUser() user: User, // Make sure to provide the user
  ) {
    return this.taskService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User, // Make sure to provide the user
  ) {
    return this.taskService.remove(id, user);
  }
}
