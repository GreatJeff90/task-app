import { Entity, PrimaryGeneratedColumn, Column ,OneToMany } from 'typeorm';
import { Category } from 'src/category/entities/category.entity'

@Entity()
export class Nft {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  solanaPrice: number;

  @Column()
  usdPrice: number;

  @Column()
  walletAddress: string;

  @OneToMany (() => Category, category => category.id)
  category: Category;
    static user: any;

  // Add other fields as needed
}

