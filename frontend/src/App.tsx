import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import ChatRooms from "./components/pages/ChatRooms";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ChatRooms />} />
      </Routes>
    </Router>
  );
}

export default App;
