import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

import { InjectRepository } from '@nestjs/typeorm'
import { TaskRepository } from './task.repository'
import { Task } from './entities/task.entity'
import { User } from 'src/auth/entities/user.entity'

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private tasksRepository: typeof TaskRepository
  ) {} 

  createTask(
    task: CreateTaskDto,
    user: User
  ): Promise<Task> {
    return this.tasksRepository.createTask(task, user)
  }

  async getAllTasks(user: User): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { user },
    });
  }

   async findOne(id: number, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ id, user });

    if (!found) {
      throw new NotFoundException(`${id} not found`);
    }
    
    return found;
  }

  async update(id: number, task: UpdateTaskDto, user: User) {
    this.tasksRepository.update(id, task, user)
  }

  async remove(id: number, user: User) {
    this.tasksRepository.remove(id, user)
  }
}
