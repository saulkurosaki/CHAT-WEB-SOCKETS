import { v4 as uuidv4 } from 'uuid';

import { IChat } from '@/interfaces';

// Función para generar un array de 10 IChat
/**
 * Function to generate chats
 * @param numChats Number of chats to generate
 * @returns Array of IChat
 */
export const generateChats = (numChats: number): IChat[] => {
  const chatTypes = ["group", "private", "public"];
  const names = [
    "Juan Perez",
    "Maria Rodriguez",
    "Cristian Vazquez",
    "Ana Gomez",
    "Pedro Sanchez",
    "Luisa Vega",
    "Jorge Lopez",
    "Sofia Ramirez",
    "Carlos Mendez",
    "Valentina Gutierrez",
    "Roberto Jimenez",
    "Julian Ponce",
  ];
  const membersList = [
    ["user1", "user2", "user3"],
    ["user4", "user5"],
    ["user6", "user7", "user8", "user9"],
  ];
  const messages = [
    "Hello there!",
    "What's up?",
    "Meeting tomorrow at 10?",
    "Don't forget to submit the report",
    "Great job on the project!"
  ];

  const chats: IChat[] = [];

  for (let i = 0; i < numChats; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomType = chatTypes[Math.floor(Math.random() * chatTypes.length)];
    const randomMembers = membersList[Math.floor(Math.random() * membersList.length)];
    const randomImage = '/default-avatar.webp';
    const randomUnreadMessages = Math.floor(Math.random() * 100);
    const randomLastMessage = messages[Math.floor(Math.random() * messages.length)];

    const chat: IChat = {
      _id: uuidv4(),
      name: randomName,
      type: randomType,
      image: randomImage,
      members: randomMembers,
      unreadMessages: randomUnreadMessages,
      lastMessage: randomLastMessage,
    };

    chats.push(chat);
  }

  return chats;
};