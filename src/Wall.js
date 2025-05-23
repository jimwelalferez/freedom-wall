// Wall.js
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase";
import './Wall.css'; // Create this new CSS file

function Wall() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(50));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(fetchedPosts);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  const getRandomPost = () => {
    if (posts.length === 0) return {
      text: "No posts yet. Be the first!",
      isPlaceholder: true
    };
    const randomIndex = Math.floor(Math.random() * posts.length);
    return posts[randomIndex];
  };

  const currentPost = getRandomPost();

  return (
    <div className="wall-container">
      <header className="wall-header">
        <h1>🎉 Freedom Wall 🎉</h1>
        <p>Share your thoughts anonymously</p>
      </header>
      
      <main className="wall-main">
        <div className={`post-card ${currentPost.isPlaceholder ? 'placeholder' : ''}`}>
          <div className="post-content">
            {currentPost.text}
          </div>
          <div className="post-footer">
            {!currentPost.isPlaceholder && (
              <span className="post-time">
                {new Date(currentPost.timestamp?.toDate()).toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="wall-actions">
          <a href="/post" className="post-button">
            ✏️ Write Something
          </a>
          <button 
            onClick={() => window.location.reload()} 
            className="refresh-button"
          >
            🔄 Get New Post
          </button>
        </div>
      </main>

      <footer className="wall-footer">
        <p>All posts are anonymous • Refresh for new messages</p>
      </footer>
    </div>
  );
}

export default Wall;