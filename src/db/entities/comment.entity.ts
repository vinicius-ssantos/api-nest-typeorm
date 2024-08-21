import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'comment' })
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  text: string;

  @Column({ type: 'varchar', name: 'post_id' })
  postId: string;

  @Column({ type: 'varchar', name: 'user_id' })
  userId: string;
}
