import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth, signInAnonymously } from "./firebase";

function PostForm() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInAnonymously(auth);
      await addDoc(collection(db, "posts"), {
        text: message,
        timestamp: serverTimestamp(),
      });
      setMessage("");
      alert("Posted anonymously!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Say something freely..."
        required
      />
      <button type="submit">Post Anonymously</button>
    </form>
  );
}

export default PostForm;