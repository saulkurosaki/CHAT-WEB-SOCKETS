import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useChatRoomsStore } from "@/store/chatrooms.store"; // Importa el store
import { sendMessageWS } from '@/test_ws/socket';

const ChatRoom = () => {
  const { id } = useParams(); // Obtiene el chatRoomId de los parámetros de la URL
  const { currentRoom, setCurrentRoom, chats } = useChatRoomsStore(); // Obtiene currentRoom y setCurrentRoom del store
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCurrentRoom = () => {
      setCurrentRoom(id!); // Establece el currentRoom basado en el id
    };

    loadCurrentRoom();
  }, [id, setCurrentRoom]);

  useEffect(() => {
    if (currentRoom) {
      setMessages(currentRoom.messages || []); // Asigna los mensajes del currentRoom
      setLoading(false); // Finaliza el loader
    } else {
      setLoading(true); // Si no hay currentRoom, mantén el loader
    }
  }, [currentRoom]);

  // FIXME:
  const sendMessage = (e: Event) => {

    e.preventDefault()
    // console.log({ e })
    // console.log({ message })
    sendMessageWS({
      chatRoom: '67041b4bec892e73b2609fe1', // id del chatroom
      content: message,
    })
  };

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
            className={`flex mb-4 ${msg.sender === currentRoom.name ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`rounded-lg p-2 max-w-xs ${msg.sender === currentRoom.name
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

        {/* FIXME:*/}
        <Button type="submit">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </>
  );
};

export default ChatRoom;
