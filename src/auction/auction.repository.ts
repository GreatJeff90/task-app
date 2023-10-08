import { Repository } from 'typeorm'
import { Auction } from './entities/auction.entity'
import { CreateAuctionDto } from './dto/create-auction.dto'
import { UpdateAuctionDto } from './dto/update-auction.dto'
import { User } from 'src/auth/entities/user.entity'
import { NotFoundException } from '@nestjs/common'

export interface IAuctionRepository extends Repository<Auction> {

}

export const AuctionRepository: Pick<IAuctionRepository, any> = {

  async createAuction(auctionDto: CreateAuctionDto, user): Promise<CreateAuctionDto> {
    auctionDto.user = user
    return this.save(auctionDto)
  },

  async findOne(id: number, user: User){
    const query = this.createQueryBuilder('auction')
    query.where('auction.id = :id', { id: id })
    query.andWhere('auction.userId = :userId', { userId: user.id })
    return await query.getOne()
  }, 

  async findAll(user: User): Promise<Auction[]>{
    const query = this.createQueryBuilder('auction')
    query.where('auction.userId = :userId', { userId: user.id })
    return await query.getMany()
  },

  async update(id: number, updateAuctionDto: UpdateAuctionDto, user: User): Promise<Auction>{
    const result = await this
      .createQueryBuilder()
      .update(Auction)
      .set(updateAuctionDto)
      .where('auction.id = :id', { id })
      .andWhere('auction.userId = :userId', { userId: user.id })
      .execute()
    
    if (!result.affected) {
      throw new NotFoundException(`Auction with id ${id} not found for this user`);
    }

    return this.findOne(id, user)
  },

  async remove(id: number, user: User){
    const result = await this
      .createQueryBuilder()
      .delete()
      .from(Auction)
      .where('id = :id', { id })
      .andWhere('userId = :userId', { userId: user.id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`Auction with id ${id} not found for this user`)
    }
  }
}
