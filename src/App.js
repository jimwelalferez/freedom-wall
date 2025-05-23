import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostForm from "./PostForm";
import Wall from "./Wall";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wall />} />
        <Route path="/post" element={<PostForm />} />
      </Routes>
    </Router>
  );
}

export default App;