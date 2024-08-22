import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { AuthorEntity } from "./author.entity";
import { CommentEntity } from "./comment.entity";

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;


  @Column({ type: 'varchar', name: 'author_id' })
  authorId: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  text: string;


  @ManyToOne(() => AuthorEntity, author => author.posts, { onDelete: 'CASCADE' })
  author?: AuthorEntity;

  @OneToMany(() => CommentEntity, comment => comment.post, { cascade: true })
  comments?: CommentEntity[];
}
