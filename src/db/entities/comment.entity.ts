import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { PostEntity } from "./post.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: 'comment' })
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  text: string;

  @Column({ type: 'varchar', name: 'post_id' })
  postId: string;

  @Column({ type: 'varchar', name: 'user_id' })
  userId: string;


  @ManyToOne(() => PostEntity, post => post.comments, { onDelete: 'CASCADE' })
  post?: PostEntity;

  @ManyToOne(() => UserEntity, user => user.comments, { onDelete: 'CASCADE' })
  user?: UserEntity;
}
