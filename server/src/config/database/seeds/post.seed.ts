import * as fs from 'fs';
import { Factory, Seeder } from 'typeorm-seeding';
import { Post } from '../../../posts/entities/post.entity';
import { Connection } from 'typeorm';
import { join } from 'path';
import { PostDto } from '../../../posts/dto/post.dto';

interface IPost extends PostDto {}

export class PostSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const postsData: IPost[] = JSON.parse(
      fs.readFileSync(join(__dirname, '../data/posts.json'), 'utf-8'),
    );

    await connection
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values(postsData)
      .execute();
  }
}
