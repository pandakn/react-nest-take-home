import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth";
import { PostByTagPage, PostFeedPage, ViewPostPage } from "@/pages/post";
import { useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

const ProtectRoute = () => {
  const navigate = useNavigate();
  const { mutateAsync, error } = useLogout();

  const handleLogout = useCallback(async () => {
    await mutateAsync();
    if (!error) {
      navigate("/login");
    }
  }, [mutateAsync, error, navigate]);

  return (
    <div className="mx-auto my-10 max-w-7xl px-6">
      <div className="my-5 flex justify-end">
        <Button onClick={handleLogout} className="hover:cursor-pointer">
          Logout
        </Button>
      </div>
      <Routes>
        {/* Post page */}
        <Route path="/" element={<PostFeedPage />} />
        <Route path="/post/:slug" element={<ViewPostPage />} />
        <Route path="/posts/tag/:tag" element={<PostByTagPage />} />
      </Routes>
    </div>
  );
};

export default ProtectRoute;
