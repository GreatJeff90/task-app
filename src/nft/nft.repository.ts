import { Repository } from 'typeorm'
import { Nft } from './entities/nft.entity' // Changed from Task to Nft
import { CreateNftDto } from './dto/create-nft.dto' // Changed from CreateTaskDto to CreateNftDto
import { UpdateNftDto } from './dto/update-nft.dto' // Changed from UpdateTaskDto to UpdateNftDto
import { User } from 'src/auth/entities/user.entity'
import { NotFoundException } from '@nestjs/common'

export interface INftRepository { // Changed from ITaskRepository to INftRepository
  createNft(nftDto: CreateNftDto, user): Promise<CreateNftDto> // Changed from createTask to createNft
  findOne(id: number, user: User): Promise<Nft | undefined> // Changed from findOne to findNft
  findAll(user: User): Promise<Nft[]> // Changed from findAll to findNfts
  update(id: number, updateNftDto: UpdateNftDto, user: User): Promise<Nft> // Changed from updateTaskDto to updateNftDto
  remove(id: number, user: User): Promise<void> // Changed from remove to removeNft
}

export const NftRepository: Pick<INftRepository, any> = { // Changed from TaskRepository to NftRepository
  async createNft(nftDto: CreateNftDto, user): Promise<CreateNftDto> { // Changed from createTask to createNft
    nftDto.user = user
    return this.save(nftDto)
  },

  async findOne(id: number, user: User) {
    const query = this.createQueryBuilder('nft') // Changed from 'task' to 'nft'
    query.where('nft.id = :id', { id: id }) // Changed from 'task.id' to 'nft.id'
    query.andWhere('nft.userId = :userId', { userId: user.id }) // Changed from 'task.userId' to 'nft.userId'
    return await query.getOne()
  }, 

  async findAll(user: User): Promise<Nft[]> {
    const query = this.createQueryBuilder('nft') // Changed from 'task' to 'nft'
    query.where('nft.userId = :userId', { userId: user.id }) // Changed from 'task.userId' to 'nft.userId'
    return await query.getMany()
  },

  async update(id: number, updateNftDto: UpdateNftDto, user: User): Promise<Nft> { // Changed from updateTaskDto to updateNftDto
    const result = await this
      .createQueryBuilder()
      .update(Nft) // Changed from 'Task' to 'Nft'
      .set(updateNftDto) // Changed from updateTaskDto to updateNftDto
      .where('nft.id = :id', { id }) // Changed from 'task.id' to 'nft.id'
      .andWhere('nft.userId = :userId', { userId: user.id }) // Changed from 'task.userId' to 'nft.userId'
      .execute()
    
    if (!result.affected) {
      throw new NotFoundException(`Nft with id ${id} not found for this user`); // Changed from Task to Nft
    }

    return this.findOne(id, user)
  },

  async remove(id: number, user: User) {
    const result = await this
      .createQueryBuilder()
      .delete()
      .from(Nft) // Changed from 'Task' to 'Nft'
      .where('id = :id', { id }) // Changed from 'task.id' to 'id'
      .andWhere('userId = :userId', { userId: user.id }) // Changed from 'task.userId' to 'userId'
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`Nft with id ${id} not found for this user`); // Changed from Task to Nft
    }
  }
}
