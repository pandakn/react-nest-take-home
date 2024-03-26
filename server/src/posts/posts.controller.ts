import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilterPostDto } from './dto/filter-post.dto';
import { PostsService } from './posts.service';
import { MultiplePostDto } from './dto/multiple-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(@Query() filter: FilterPostDto): Promise<MultiplePostDto> {
    const { data, total } = await this.postsService.findAll(filter);

    return {
      posts: data,
      total,
      totalPages: Math.ceil(total / (filter.limit || 10)),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findById(+id);
  }
}
