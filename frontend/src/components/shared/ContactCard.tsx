import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

interface ContactCardProps {
  contact: {
    _id: string;
    name: string;
    lastname: string; // Agrega el apellido aquí
  };
  onDelete: (contactId: string) => void;
  onClick: () => void;
}

const ContactCard = ({ contact, onDelete, onClick }: ContactCardProps) => {
  const getInitials = (name: string, lastname: string) => {
    return (name.charAt(0) + lastname.charAt(0)).toUpperCase(); // Cambia para incluir las iniciales del apellido
  };

  return (
    <div
      key={contact._id}
      className="flex items-center p-2 cursor-pointer hover:bg-gray-100 justify-between"
      onClick={onClick}
    >
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarFallback>
            {getInitials(contact.name, contact.lastname)}
          </AvatarFallback>
        </Avatar>
        <span>
          {contact.name} {contact.lastname}
        </span>{" "}
        {/* Muestra el nombre y el apellido */}
      </div>
      <Button
        onClick={(e) => {
          e.stopPropagation(); // Evita que se active el evento de clic en el contacto
          onDelete(contact._id);
        }}
        className="w-7 h-auto ml-2 text-gray-500 bg-transparent rounded-full p-1 hover:text-red-500"
      >
        X
      </Button>
    </div>
  );
};

export default ContactCard;
