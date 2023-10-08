import { Entity, PrimaryGeneratedColumn, Column,  ManyToOne } from 'typeorm';
import { Nft } from "src/nft/entities/nft.entity"

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @ManyToOne(()  => Nft, nft => nft.category)
  nfts: Nft[];
  category: Category;
    static user: any;

  // Add other fields as needed
}

