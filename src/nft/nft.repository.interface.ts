import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nft } from './entities/nft.entity'; // Changed from Task to Nft
import { NftService } from './nft.service'; // Changed from TaskService to NftService
import { NftController } from './nft.controller'; // Changed from TaskController to NftController

@Module({
  imports: [TypeOrmModule.forFeature([Nft])], // Changed from Task to Nft
  controllers: [NftController], // Changed from TaskController to NftController
  providers: [NftService], // Changed from TaskService to NftService
})
export class NftModule {} // Changed from TaskModule to NftModule
