import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

const ChatRoom = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/chat-rooms/Tech Discussion Room 7`
        );
        if (!response.ok) {
          throw new Error("Error al obtener la sala de chat");
        }
        const room = await response.json();
        setCurrentRoom(room);
        setMessages(room.messages || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const sendMessage = () => {};

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentRoom) {
    return <div>No se encontró la sala de chat.</div>;
  }

  return (
    <>
      <ScrollArea
        className="w-full flex-grow p-4"
        style={{ height: "calc(100vh - 100px)" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              msg.sender === user?.name ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg p-2 max-w-xs ${
                msg.sender === user?.name
                  ? "bg-teal-500 text-white"
                  : "bg-white"
              }`}
            >
              <p className="font-semibold text-xs mb-1">{msg.sender}</p>
              <p>{msg.text}</p>
              <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
      <form
        onSubmit={sendMessage}
        className="bg-white w-full p-4 flex items-center"
      >
        <Input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow mr-2"
        />
        <Button type="submit">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </>
  );
};

export default ChatRoom;
