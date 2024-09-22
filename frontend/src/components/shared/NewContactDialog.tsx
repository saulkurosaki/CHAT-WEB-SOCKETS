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
import { addContactByEmail } from "@/services/private";

const NewContactDialog = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const addNewContact = async () => {
    const response = await addContactByEmail(email);
    if (response.ok) {
      console.log("Contacto agregado:", response.data);
      setEmail("");
      setError("");
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
              placeholder="friends@email.com"
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
