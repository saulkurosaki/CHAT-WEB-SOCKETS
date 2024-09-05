import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import ChatRooms from "./components/pages/ChatRooms";
import ChatApp from "./components/ChatApp";

function App() {
  return <ChatApp />;
}

export default App;
