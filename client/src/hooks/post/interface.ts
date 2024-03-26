import { z } from "zod";

export interface IPost {
  id: number;
  title: string;
  content: string;
  postedBy: string;
  postedAt: Date;
  tags?: string[];
}

export interface IMultiplePostResponse {
  posts: IPost[];
  total: number;
  totalPages: number;
}

export const FilterPostsSchema = z.object({
  tag: z.string().optional(),
  searchKey: z.string().optional(),
  sortByPostedAt: z.literal("ASC").optional().or(z.literal("DESC").optional()),
  // .default("ASC"),
});

export type FilterPosts = z.infer<typeof FilterPostsSchema>;
