import { Repository } from 'typeorm'
import { Category } from './entities/category.entity'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { User } from 'src/auth/entities/user.entity'
import { NotFoundException } from '@nestjs/common'

export interface ICategoryRepository extends Repository<Category> {

}

export const CategoryRepository: Pick<ICategoryRepository, any> = {

  async createCategory(categoryDto: CreateCategoryDto, user: User): Promise<CreateCategoryDto> {
    categoryDto.user = user
    return this.save(categoryDto)
  },

  async findOne(id: number, user: User){
    const query = this.createQueryBuilder('category')
    query.where('category.id = :id', { id: id })
    query.andWhere('category.userId = :userId', { userId: user.id })
    return await query.getOne()
  }, 

  async findAll(user: User): Promise<Category[]>{
    const query = this.createQueryBuilder('category')
    query.where('category.userId = :userId', { userId: user.id })
    return await query.getMany()
  },

  async update(id: number, updateCategoryDto: UpdateCategoryDto, user: User): Promise<Category>{
    const result = await this
      .createQueryBuilder()
      .update(Category)
      .set(updateCategoryDto)
      .where('category.id = :id', { id })
      .andWhere('category.userId = :userId', { userId: user.id })
      .execute()
    
    if (!result.affected) {
      throw new NotFoundException(`Category with id ${id} not found for this user`);
    }

    return this.findOne(id, user)
  },

  async remove(id: number, user: User){
    const result = await this
      .createQueryBuilder()
      .delete()
      .from(Category)
      .where('id = :id', { id })
      .andWhere('userId = :userId', { userId: user.id })
      .execute();

    if (result.affected === 0) {
      throw  new NotFoundException(`Category with id ${id} not found for this user`)
    }
  }
}
