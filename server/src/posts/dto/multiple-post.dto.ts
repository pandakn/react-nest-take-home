import { PostDto } from './post.dto';

export class MultiplePostDto {
  readonly posts: PostDto[];
  readonly total: number;
  readonly totalPages: number;
}
