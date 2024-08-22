import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import { AuthorEntity } from "./author.entity";
import { CommentEntity } from "./comment.entity";


@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  name: string;


  @Column({ type: 'varchar' })
  email: string;


  @OneToMany(() => AuthorEntity, author => author.user, { cascade: true })
  authors?: AuthorEntity[];

  @OneToMany(() => CommentEntity, comment => comment.user, { cascade: true })
  comments?: CommentEntity[];
}
