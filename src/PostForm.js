// PostForm.js
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth, signInAnonymously } from "./firebase";
import './PostForm.css'; // Create this new CSS file

function PostForm() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setIsSubmitting(true);
    try {
      await signInAnonymously(auth);
      await addDoc(collection(db, "posts"), {
        text: message,
        timestamp: serverTimestamp(),
      });
      setMessage("");
      alert("Your message has been posted anonymously! 🎉");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      console.error(err);
      alert("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Write Your Anonymous Message</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind? Share anything freely..."
          required
          maxLength={500}
        />
        <div className="form-footer">
          <span className="char-count">{message.length}/500</span>
          <button 
            type="submit" 
            disabled={isSubmitting || !message.trim()}
            className={isSubmitting ? 'submitting' : ''}
          >
            {isSubmitting ? 'Posting...' : 'Post Anonymously'}
          </button>
        </div>
      </form>
      <a href="/" className="back-link">← Back to Freedom Wall</a>
    </div>
  );
}

export default PostForm;