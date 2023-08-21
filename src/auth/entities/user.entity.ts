import { Task } from 'src/task/entities/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    first_name: string;
  
    @Column()
    last_name: string;
  
    @Column()
    @Unique(['string'])
    username: string;
  
    @Column()
    email: string;
  
    @Column()
    salt: string;
  
    @Column()
    password: string;
  
    @OneToMany(type => Task, product => Task.user, { eager: true })
    products: Task[]
}

{}