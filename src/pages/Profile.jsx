import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import api from "../api/axios";


function Profile() {
  const { userId } = useParams();
  const { token, user } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get(`/auth/user/${userId}`).then((res) => setProfileUser(res.data));
    api.get(`/posts/user/${userId}`).then((res) => setPosts(res.data));
  }, [userId]);

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Post deletion failed.");
    }
  };

  if (!profileUser) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold text-center">{profileUser.name}'s Profile</h2>
      <p className="text-center text-gray-600">Email: {profileUser.email}</p>
      
      <h3 className="text-2xl font-semibold mt-4">Posts</h3>
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-2xl shadow space-y-2"
            >
              <p className="text-gray-800">{post.content}</p>
              <div className="text-sm text-gray-500">— {profileUser.name}</div>
              <div className="text-sm flex items-center gap-3">
                <span>❤️ {post.likes}</span>
                {user && user._id === profileUser._id && (
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No posts yet.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
