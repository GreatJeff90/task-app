import { Category } from './entities/category.entity'; // Import the Category entity
import { CreateCategoryDto } from './dto/create-category.dto'; // Import your category DTOs
import { UpdateCategoryDto } from './dto/update-category.dto'; // Import your category DTOs
import { User } from 'src/auth/entities/user.entity';

export interface ICategoryRepository {
  createCategory(categoryDto: CreateCategoryDto, user: User): Promise<Category>;
  findOne(id: number, user: User): Promise<Category | undefined>;
  findAll(user: User): Promise<Category[]>;
  update(id: number, updateCategoryDto: UpdateCategoryDto, user: User): Promise<Category>;
  remove(id: number, user: User): Promise<void>;
}
