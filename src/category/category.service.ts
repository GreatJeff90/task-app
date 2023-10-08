import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

import { InjectRepository } from '@nestjs/typeorm'
import { CategoryRepository } from './category.repository' // Changed from TaskRepository
import { Category } from './entities/category.entity' // Changed from Task
import { User } from 'src/auth/entities/user.entity'

@Injectable()
export class CategoryService { // Changed from TaskService

  constructor(
    @InjectRepository(Category) // Changed from Task
    private categoriesRepository: typeof CategoryRepository // Changed from TaskRepository
  ) {} 

  createCategory( // Changed from createTask
    category: CreateCategoryDto, // Changed from CreateTaskDto
    user: User
  ): Promise<Category> { // Changed from Task
    return this.categoriesRepository.createCategory(category, user)
  }

  async getAllCategories(user: User): Promise<Category[]> { // Changed from getAllTasks
    return this.categoriesRepository.find({
      where: { user },
    });
  }

   async findOne(id: number, user: User): Promise<Category> { // Changed from Task
    const found = await this.categoriesRepository.findOne({ id, user });

    if (!found) {
      throw new NotFoundException(`${id} not found`);
    }
    
    return found;
  }

  async update(id: number, category: UpdateCategoryDto, user: User) { // Changed from update
    this.categoriesRepository.update(id, category, user)
  }

  async remove(id: number, user: User) { // Changed from remove
    this.categoriesRepository.remove(id, user)
  }
}
