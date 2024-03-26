import { Link, useParams } from "react-router-dom";
import { PostFeedPage } from "./PostFeedPage";

export const PostByTagPage = () => {
  const { tag } = useParams();

  return (
    <div className="container mx-auto px-5">
      <Link to={"/"}>
        <button className="text-neutarl-700 mb-6 rounded-md border border-black bg-white px-4 py-2 text-sm transition duration-200 hover:cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
          Back to Home
        </button>
      </Link>
      <div className="my-10 border-b-2 bg-white py-8">
        <h3 className="text-center text-6xl tracking-wide">#{tag}</h3>
      </div>
      <PostFeedPage initialFilter={{ tag }} />
    </div>
  );
};
