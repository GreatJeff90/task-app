import { Repository } from 'typeorm';
import { Task } from './entities/task.entity'; // Import the Task entity
import { CreateTaskDto } from './dto/create-task.dto'; // Import your task DTOs
import { UpdateTaskDto } from './dto/update-task.dto'; // Import your task DTOs
import { User } from 'src/auth/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

export interface ITaskRepository extends Repository<Task> {
  async createTask(taskDto: CreateTaskDto, user: User): Promise<Task>;

  async findOne(id: number, user: User): Promise<Task | undefined>;

  async findAll(user: User): Promise<Task[]>;

  async update(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task>;

  async remove(id: number, user: User): Promise<void>;
}

export const TaskRepository: Pick<ITaskRepository, any> = {
  async createTask(taskDto: CreateTaskDto, user: User): Promise<Task> {
    taskDto.user = user;
    return this.save(taskDto);
  },

  async findOne(id: number, user: User): Promise<Task | undefined> {
    const query = this.createQueryBuilder('task');
    query.where('task.id = :id', { id });
    query.andWhere('task.userId = :userId', { userId: user.id });
    return await query.getOne();
  },

  async findAll(user: User): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id });
    return await query.getMany();
  },

  async update(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    const result = await this
      .createQueryBuilder()
      .update(Task)
      .set(updateTaskDto)
      .where('task.id = :id', { id })
      .andWhere('task.userId = :userId', { userId: user.id })
      .execute();

    if (!result.affected) {
      throw new NotFoundException(`Task with id ${id} not found for this user`);
    }

    return this.findOne(id, user);
  },

  async remove(id: number, user: User): Promise<void> {
    const result = await this
      .createQueryBuilder()
      .delete()
      .from(Task)
      .where('id = :id', { id })
      .andWhere('userId = :userId', { userId: user.id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found for this user`);
    }
  },
};
