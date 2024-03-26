import { usePostBySlug } from "@/hooks/post";
import { formatDate } from "@/lib/formatDate";
import { Link, useParams } from "react-router-dom";

const Post = () => {
  const { slug } = useParams();
  const { data: post } = usePostBySlug(slug);

  return (
    <div>
      <Link to={"/"}>
        <button className="text-neutarl-700 mb-6 rounded-md border border-black bg-white px-4 py-2 text-sm transition duration-200 hover:cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
          Back to Home
        </button>
      </Link>
      <div className="break-words">
        <header className="text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{post?.title}</h1>
          <h2 className="mb-2 text-2xl">@{post?.postedBy}</h2>
          <p className="text-gray-500">
            Published on {formatDate(post?.postedAt?.toString())}
          </p>
        </header>
        <div className="mt-8">
          {post?.content && (
            <div
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post?.content }}
            />
          )}
        </div>
        <section className="mb-10 mt-8 flex justify-start gap-2">
          {post?.tags?.map((t, idx) => (
            <Link
              to={`/posts/tag/${t}`}
              key={idx}
              className="rounded bg-gray-50 px-2 py-1 text-gray-500"
            >
              #{t}
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Post;
