import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { FilterPosts, IMultiplePostResponse, IPost } from "./interface";

const LIMIT = 10;

export const usePosts = (filter?: FilterPosts) => {
  return useInfiniteQuery({
    queryKey: ["posts", filter],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get(`/api/v1/posts`, {
        params: {
          page: pageParam,
          limit: LIMIT,
          ...filter,
        },
      });
      return data as IMultiplePostResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.posts.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
};

export const usePostBySlug = (slug?: string) => {
  return useQuery({
    queryKey: ["postById", slug],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/posts/${slug}`);
      return data as IPost;
    },
  });
};
