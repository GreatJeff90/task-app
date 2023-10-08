import { Auction } from './entities/auction.entity'; // Import the Auction entity
import { CreateAuctionDto } from './dto/create-auction.dto'; // Import your auction DTOs
import { UpdateAuctionDto } from './dto/update-auction.dto'; // Import your auction DTOs
import { User } from 'src/auth/entities/user.entity';

export interface IAuctionRepository {
  createAuction(auctionDto: CreateAuctionDto, user: User): Promise<Auction>;
  findOne(id: number, user: User): Promise<Auction | undefined>;
  findAll(user: User): Promise<Auction[]>;
  update(id: number, updateAuctionDto: UpdateAuctionDto, user: User): Promise<Auction>;
  remove(id: number, user: User): Promise<void>;
}
