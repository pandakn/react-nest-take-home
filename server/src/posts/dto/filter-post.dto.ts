import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

type SortByPostedAt = 'ASC' | 'DESC';

export class FilterPostDto {
  readonly searchKey?: string;

  readonly tag?: string;

  readonly sortByPostedAt?: SortByPostedAt = 'ASC';

  @IsInt()
  @Type(() => Number)
  @Min(1)
  readonly page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly limit?: number = 10;
}
