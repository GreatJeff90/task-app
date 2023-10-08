import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service'; // Change TaskService to CategoryService
import { CreateCategoryDto } from './dto/create-category.dto'; // Change CreateTaskDto to CreateCategoryDto
import { UpdateCategoryDto } from './dto/update-category.dto'; // Change UpdateTaskDto to UpdateCategoryDto
import { Category } from './entities/category.entity'; // Change Task to Category
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('category') // Change 'task' to 'category'
export class CategoryController { // Change TaskController to CategoryController
  constructor(private categoryService: CategoryService) { // Change TaskService to CategoryService
  }

  @Post()
  async createCategory( // Change createTask to createCategory
    @Res() response,
    @Body() body: CreateCategoryDto, // Change CreateTaskDto to CreateCategoryDto
    @GetUser() user: User,
  ): Promise<CreateCategoryDto> {
    const newCategory = await this.categoryService.createCategory(body, user); // Change createTask to createCategory
    return response.status(HttpStatus.CREATED).json({ newCategory }); // Change newTask to newCategory
  }

  @Get()
  getAllCategories(@GetUser() user: User): Promise<Category[]> { // Change Task to Category
    return this.categoryService.getAllCategories(user); // Change TaskService to CategoryService
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Category> { // Change Task to Category
    return this.categoryService.findOne(id, user); // Change TaskService to CategoryService
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto, // Change UpdateTaskDto to UpdateCategoryDto
    @GetUser() user: User,
  ) {
    return this.categoryService.update(id, updateCategoryDto, user); // Change TaskService to CategoryService
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.categoryService.remove(id, user); // Change TaskService to CategoryService
  }
}
