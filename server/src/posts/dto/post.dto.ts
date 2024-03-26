export class PostDto {
  readonly id: number;
  readonly title: string;
  readonly content: string;
  readonly postedBy: string;
  readonly postedAt: Date;
  readonly tags: string[];
}
