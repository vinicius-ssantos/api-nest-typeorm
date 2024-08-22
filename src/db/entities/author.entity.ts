import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

}
