import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { AuctionService } from './auction.service'; // Updated import
import { CreateAuctionDto } from './dto/create-auction.dto'; // Updated import
import { UpdateAuctionDto } from './dto/update-auction.dto'; // Updated import
import { Auction } from './entities/auction.entity'; // Updated import
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('auction') // Updated route prefix
export class AuctionController { // Updated controller name
  constructor(private auctionService: AuctionService) {} // Updated service injection

  @Post()
  async createAuction( // Updated method name
    @Res() response,
    @Body() body: CreateAuctionDto, // Updated DTO
    @GetUser() user: User,
  ): Promise<CreateAuctionDto> {
    const newAuction = await this.auctionService.createAuction(body, user); // Updated service method
    return response.status(HttpStatus.CREATED).json({ newAuction });
  }

  @Get()
  getAllAuctions(@GetUser() user: User): Promise<Auction[]> { // Updated return type
    return this.auctionService.getAllAuctions(user); // Updated service method
  }

  @Get(':id')
  findOne( // Updated method name
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Auction> { // Updated return type
    return this.auctionService.findOne(id, user); // Updated service method
  }

  @Patch(':id')
  update( // Updated method name
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuctionDto: UpdateAuctionDto, // Updated DTO
    @GetUser() user: User,
  ) {
    return this.auctionService.update(id, updateAuctionDto, user); // Updated service method
  }

  @Delete(':id')
  remove( // Updated method name
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.auctionService.remove(id, user); // Updated service method
  }
}
