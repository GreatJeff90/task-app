import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Notification{
  static delete(arg0: { id: number; user: import("../../auth/entities/user.entity").User; }) {
    throw new Error('Method not implemented.');
  }
  static findOne(arg0: { id: number; user: import("../../auth/entities/user.entity").User; }) {
    throw new Error('Method not implemented.');
  }
  save(): Notification | PromiseLike<Notification> {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;
    static user: any;
  property1: any;

}

