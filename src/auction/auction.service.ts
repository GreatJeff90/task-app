import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateAuctionDto } from './dto/create-auction.dto'
import { UpdateAuctionDto } from './dto/update-auction.dto'

import { InjectRepository } from '@nestjs/typeorm'
import { AuctionRepository } from './auction.repository'
import { Auction } from './entities/auction.entity'
import { User } from 'src/auth/entities/user.entity'

@Injectable()
export class AuctionService {

  constructor(
    @InjectRepository(Auction)
    private auctionsRepository: typeof AuctionRepository
  ) {} 

  createAuction(
    auction: CreateAuctionDto,
    user: User
  ): Promise<Auction> {
    return this.auctionsRepository.createAuction(auction, user)
  }

  async getAllAuctions(user: User): Promise<Auction[]> {
    return this.auctionsRepository.find({
      where: { user },
    });
  }

   async findOne(id: number, user: User): Promise<Auction> {
    const found = await this.auctionsRepository.findOne({ id, user });

    if (!found) {
      throw new NotFoundException(`${id} not found`);
    }
    
    return found;
  }

  async update(id: number, auction: UpdateAuctionDto, user: User) {
    this.auctionsRepository.update(id, auction, user)
  }

  async remove(id: number, user: User) {
    this.auctionsRepository.remove(id, user)
  }
}
