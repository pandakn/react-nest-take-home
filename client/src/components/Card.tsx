import { formatDate } from "@/lib/formatDate";
import { Link } from "react-router-dom";
import { IPost } from "../hooks/post/interface";

type CardProps = {
  post: IPost;
};

const Card = ({ post }: CardProps) => {
  const cleanBody = post.content.replace(/<[^>]*>/g, "");

  return (
    <div
      className="overflow-hidden rounded-xl bg-white shadow-md"
      style={{ border: "2px solid #333" }}
    >
      <div className=" p-8">
        <div className="text-lg font-semibold tracking-wide text-gray-600">
          {post.postedBy}
          <span className="mx-2 ">·</span>
          <span className="font-medium text-gray-400 ">
            {formatDate(post.postedAt.toString())}
          </span>
        </div>
        <Link
          to={`/post/${post.id}`}
          onClick={() => window.scrollTo(0, 0)}
          className="mt-1 block text-2xl font-medium leading-tight text-black no-underline hover:underline"
        >
          {post.title}
        </Link>
        <p
          dangerouslySetInnerHTML={{ __html: cleanBody }}
          className="line-clamp mt-4 tracking-wide text-gray-500"
        />
        <section className="mt-2 flex flex-wrap gap-2">
          {post.tags?.map((t, idx) => (
            <Link
              to={`/posts/tag/${t}`}
              key={idx}
              onClick={() => window.scrollTo(0, 0)}
              className="rounded bg-gray-50 px-2 py-1 text-gray-500 hover:cursor-pointer hover:opacity-70"
            >
              #{t}
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Card;
