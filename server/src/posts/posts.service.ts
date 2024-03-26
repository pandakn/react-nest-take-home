import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterPostDto } from './dto/filter-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async findAll(
    filter: FilterPostDto,
  ): Promise<{ data: Post[]; total: number }> {
    const query = this.buildFindAllQuery(filter);

    const [data, total] = await query.getManyAndCount();

    return { data, total };
  }

  private buildFindAllQuery(filter: FilterPostDto) {
    const query = this.postsRepository.createQueryBuilder('p');

    if (filter.searchKey) {
      query.where('p.title LIKE :searchKey', {
        searchKey: `%${filter.searchKey}%`,
      });
    }

    if (filter.tag) {
      query.andWhere(':tag = ANY(p.tags)', { tag: filter.tag });
    }

    query.orderBy('p.postedAt', filter.sortByPostedAt || 'ASC');
    query.skip(filter.limit * (filter.page - 1));
    query.take(filter.limit);

    return query;
  }

  async findById(id: number): Promise<Post | null> {
    const post = await this.postsRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }
}
