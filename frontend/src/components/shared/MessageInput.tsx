import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MessageInput = ({ currentRoom, user }) => {
  const [message, setMessage] = useState("");

  const sendMessage = (e: any) => {
    e.preventDefault();
    // Lógica para enviar el mensaje
    setMessage("");
  };

  return (
    <form onSubmit={sendMessage} className="bg-white p-4 flex items-center">
      <Input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit">Send</Button>
    </form>
  );
};

export default MessageInput;
