import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'posted_by' })
  postedBy: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'posted_at',
  })
  postedAt: Date;

  @Column({ array: true, name: 'tags', type: 'text' }) // Specify type as 'text'
  tags: string[];
}
