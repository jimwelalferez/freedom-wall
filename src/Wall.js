import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase";

function Wall() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(50));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map(doc => doc.data());
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  const getRandomPost = () => {
    if (posts.length === 0) return "No posts yet. Be the first!";
    const randomIndex = Math.floor(Math.random() * posts.length);
    return posts[randomIndex].text;
  };

  return (
    <div>
      <h2>Freedom Wall</h2>
      <div className="random-post">
        <p>{getRandomPost()}</p>
      </div>
    </div>
  );
}

export default Wall;