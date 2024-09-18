import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

const NewContactDialog = ({
  showNewContactDialog,
  setShowNewContactDialog,
}) => {
  const [newContactInfo, setNewContactInfo] = useState("");

  const addNewContact = () => {
    // Lógica para agregar el nuevo contacto
    setShowNewContactDialog(false);
  };

  return (
    <Dialog open={showNewContactDialog} onOpenChange={setShowNewContactDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="new-contact-info">Email or Phone Number</Label>
            <Input
              id="new-contact-info"
              value={newContactInfo}
              onChange={(e) => setNewContactInfo(e.target.value)}
              placeholder="Enter email or phone number"
            />
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
