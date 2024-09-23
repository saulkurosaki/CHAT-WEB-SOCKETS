import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { findContactByEmail, saveContact } from "@/services/private";

const NewContactDialog = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const addNewContact = async () => {
    const response = await findContactByEmail(email);
    if (response.ok) {
      const userData = response.data; // Información del usuario encontrado
      const saveResponse = await saveContact(userData); // Guardar el contacto

      if (saveResponse.ok) {
        console.log("Contacto guardado:", saveResponse.data);
        setEmail(""); // Limpiar el input
        setError(""); // Limpiar el error
      } else {
        setError(saveResponse.error || "Error al guardar el contacto");
      }
    } else {
      setError(response.error || "Error al agregar contacto");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4">Add New Contact</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="new-contact-email">Email</Label>
            <Input
              id="new-contact-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <Button onClick={addNewContact} className="w-full">
            Add Contact
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewContactDialog;
