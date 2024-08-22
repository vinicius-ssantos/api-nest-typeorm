import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
