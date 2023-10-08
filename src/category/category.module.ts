import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity'; // Assuming you have a Category entity
import { CategoryService } from './category.service'; // Assuming you have a CategoryService
import { CategoryController } from './category.controller'; // Assuming you have a CategoryController

@Module({
  imports: [TypeOrmModule.forFeature([Category])], // Use the Category entity here
  controllers: [CategoryController], // Use the CategoryController here
  providers: [CategoryService], // Use the CategoryService here
})
export class CategoryModule {}
