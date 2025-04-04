import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import api from "../api/axios";

function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [showComments, setShowComments] = useState({});
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;
  const loader = useRef(null);
  const { token, user } = useAuth();

  //Fetch Posts
  const fetchPosts = async () => {
    if (!hasMore) return;
    try {
      const res = await api.get(
        `/posts?skip=${skip}&limit=${limit}`
      );
      if (res.data.length === 0) setHasMore(false);
      setPosts((prev) => [...prev, ...res.data]);
      setSkip((prev) => prev + limit);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  //Fetch Comments for a Post
  const fetchComments = async (postId) => {
    try {
      const res = await api.get(
        `/posts/${postId}/comments`
      );
      setComments((prev) => ({ ...prev, [postId]: res.data }));
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  //Add Comment
  const handleAddComment = async (postId) => {
    const text = newComment[postId]?.trim();
    if (!text) {
      console.error("Error: Comment is empty!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await api.post(
        `/posts/${postId}/comments`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      //Update comments immediately
      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), response.data],
      }));

      setNewComment({ ...newComment, [postId]: "" });
    } catch (error) {
      console.error("Comment creation failed:", error.response?.data || error);
    }
  };

  //Toggle Comments
  const toggleComments = (postId) => {
    if (!showComments[postId]) fetchComments(postId);
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  //Like Post
  const handleLike = async (postId) => {
    try {
      await api.post(
        `/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p
        )
      );
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  //Create Post (Placeholder)
  const handleCreatePost = async () => {
    if (!content.trim()) return;
    try {
      const res = await api.post(
        "/posts",
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts([res.data, ...posts]);
      setContent("");
    } catch (err) {
      console.error("Post creation failed:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchPosts();
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => loader.current && observer.unobserve(loader.current);
  }, [loader]);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold text-center">Posts</h2>
      {user && (
        <p className="text-center">
          Welcome, <b>{user.name}</b>
        </p>
      )}

      {/* New Post Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreatePost();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          className="flex-grow border rounded-xl px-4 py-2"
          placeholder="Write a post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Post
        </button>
      </form>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-2xl shadow space-y-1"
          >
            <p className="text-gray-800">{post.content}</p>
            <div className="text-sm text-gray-500">— {post.user.name}</div>
            <div className="text-sm flex items-center gap-3">
              <span>❤️ {post.likes || 0}</span>
              {token && (
                <button
                  onClick={() => handleLike(post._id)}
                  className="text-blue-500 hover:underline"
                >
                  Like
                </button>
              )}
            </div>

            {/* Show Comments Button */}
            <button
              onClick={() => toggleComments(post._id)}
              className="text-blue-600 hover:underline mt-2"
            >
              {showComments[post._id] ? "Hide Comments" : "Show Comments"}
            </button>

            {/* Comments Section */}
            {showComments[post._id] && (
              <div className="mt-2 space-y-2">
                {(comments[post._id] || []).map((comment) => (
                  <p key={comment._id} className="text-gray-700">
                    {comment.text}
                  </p>
                ))}
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    className="flex-grow border px-2 py-1 rounded-md"
                    placeholder="Add a comment..."
                    value={newComment[post._id] || ""}
                    onChange={(e) =>
                      setNewComment({
                        ...newComment,
                        [post._id]: e.target.value,
                      })
                    }
                  />
                  <button
                    onClick={() => handleAddComment(post._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  >
                    Comment
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
        <div ref={loader} className="text-center text-gray-400 py-4">
          {hasMore ? "Loading more..." : "No more posts"}
        </div>
      </div>
    </div>
  );
}

export default Home;
