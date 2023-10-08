import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Auction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nftAddress: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  Likes: number;
  static user: any;
}

