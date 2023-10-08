import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity'; // Updated import
import { AuctionService } from './auction.service'; // Updated import
import { AuctionController } from './auction.controller'; // Updated import

@Module({
  imports: [TypeOrmModule.forFeature([Auction])], // Updated entity
  controllers: [AuctionController], // Updated controller
  providers: [AuctionService], // Updated service
})
export class AuctionModule {} // Updated module name
