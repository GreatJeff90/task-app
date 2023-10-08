import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNftDto } from './dto/create-nft.dto'; // Updated DTO import
import { UpdateNftDto } from './dto/update-nft.dto'; // Updated DTO import

import { InjectRepository } from '@nestjs/typeorm';
import { NftRepository } from './nft.repository'; // Updated repository import
import { Nft } from './entities/nft.entity'; // Updated entity import
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class NftService { // Updated service name

  constructor(
    @InjectRepository(Nft) // Updated entity
    private nftsRepository: typeof NftRepository // Updated repository
  ) {} 

  createNft( // Updated method name and DTO type
    nft: CreateNftDto, // Updated DTO type
    user: User
  ): Promise<Nft> { // Updated return type
    return this.nftsRepository.createNft(nft, user); // Updated method call
  }

  async getAllNfts(user: User): Promise<Nft[]> { // Updated method name and return type
    return this.nftsRepository.find({
      where: { user },
    });
  }

   async findOne(id: number, user: User): Promise<Nft> { // Updated method name and return type
    const found = await this.nftsRepository.findOne({ id, user }); // Updated method call

    if (!found) {
      throw new NotFoundException(`${id} not found`);
    }
    
    return found;
  }

  async update(id: number, nft: UpdateNftDto, user: User) { // Updated method name and DTO type
    this.nftsRepository.update(id, nft, user); // Updated method call
  }

  async remove(id: number, user: User) { // Updated method name
    this.nftsRepository.remove(id, user); // Updated method call
  }
}
