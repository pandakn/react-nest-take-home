import Search from "@/components/Search";
import SortButton from "@/components/SortButton";
import { FilterPosts, FilterPostsSchema, IPost } from "@/hooks/post/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import Card from "../../components/Card";
import { usePosts } from "../../hooks/post";
import { Button } from "@/components/ui/button";

type PostFeedPageProps = {
  initialFilter?: FilterPosts;
};

export const PostFeedPage = ({ initialFilter }: PostFeedPageProps) => {
  const [filter, setFilter] = useState<FilterPosts>(initialFilter || {});

  const { data, fetchNextPage, isFetchingNextPage } = usePosts(filter);
  const { ref, inView } = useInView();

  const form = useForm<FilterPosts>({
    resolver: zodResolver(FilterPostsSchema),
    defaultValues: filter,
  });

  const onSubmit = async (data: FilterPosts) => {
    setFilter(data);
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const sortByPostedAt = useWatch({
    control: form.control,
    name: "sortByPostedAt",
  });

  useEffect(() => {
    setFilter((prev) => ({ ...prev, sortByPostedAt }));
  }, [sortByPostedAt]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <Search form={form} onSubmit={onSubmit} />
          <Button
            onClick={() => window.location.reload()}
            variant={"outline"}
            className="hover:cursor-pointer"
          >
            Reset
          </Button>
        </div>
        <SortButton form={form} />
      </div>
      <div className="my-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.pages.flatMap((page) =>
          page.posts.map((post: IPost) => <Card key={post.id} post={post} />),
        )}
      </div>
      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
    </div>
  );
};
