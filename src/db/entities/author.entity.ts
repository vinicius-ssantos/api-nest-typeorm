import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { PostEntity } from "./post.entity";

@Entity({ name: 'author' })
export class AuthorEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;


  @Column({ type: 'varchar', name: 'user_id' })
  userId: string;

  @Column({ type: 'varchar' })
  tags: string;

  @Column({ type: 'varchar' })
  surname: string;

  @Column({ type: 'varchar', name: 'complete_name' })
  completeName: string;


  @ManyToOne(() => UserEntity, user => user.authors, { onDelete: 'CASCADE' })
  user?: UserEntity;

  @OneToMany(() => PostEntity, post => post.author, { cascade: true })
  posts?: PostEntity[];
}
