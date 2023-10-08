import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Nft } from "src/nft/entities/nft.entity"
import { Auction } from "src/auction/entities/auction.entity"

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  walletAddress: string;

  @Column({ nullable: true })
  preferredWallet: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @OneToMany(() => Nft, nft => nft.id, { eager: true })
  nft: Nft[];

  @OneToMany(() => Auction, auction => auction.id, { eager: true })
  auction: Auction[];
}
