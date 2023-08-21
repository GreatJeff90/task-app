import { Task } from './entities/task.entity'; // Import the Task entity
import { CreateTaskDto } from './dto/create-task.dto'; // Import your task DTOs
import { UpdateTaskDto } from './dto/update-task.dto'; // Import your task DTOs
import { User } from 'src/auth/entities/user.entity';

export interface ITaskRepository {
  createTask(taskDto: CreateTaskDto, user: User): Promise<Task>;
  findOne(id: number, user: User): Promise<Task | undefined>;
  findAll(user: User): Promise<Task[]>;
  update(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task>;
  remove(id: number, user: User): Promise<void>;
}
