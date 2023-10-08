import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { NftService } from './nft.service'; // Updated service name
import { CreateNftDto } from './dto/create-nft.dto'; // Updated DTO import
import { UpdateNftDto } from './dto/update-nft.dto'; // Updated DTO import
import { Nft } from './entities/nft.entity'; // Updated entity import
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('nft') // Updated route prefix
export class NftController { // Updated controller name
  constructor(private nftService: NftService) {} // Updated service name

  @Post()
  async createNft( // Updated method name and DTO type
    @Res() response,
    @Body() body: CreateNftDto, // Updated DTO type
    @GetUser() user: User,
  ): Promise<CreateNftDto> { // Updated DTO type
    const newNft = await this.nftService.createNft(body, user); // Updated method call
    return response.status(HttpStatus.CREATED).json({ newNft }); // Updated variable name
  }

  @Get()
  getAllNfts(@GetUser() user: User): Promise<Nft[]> { // Updated method name and return type
    return this.nftService.getAllNfts(user); // Updated method call
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Nft> { // Updated return type
    return this.nftService.findOne(id, user); // Updated method call
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNftDto: UpdateNftDto, // Updated DTO type
    @GetUser() user: User,
  ) {
    return this.nftService.update(id, updateNftDto, user); // Updated method call
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.nftService.remove(id, user); // Updated method call
  }
}
