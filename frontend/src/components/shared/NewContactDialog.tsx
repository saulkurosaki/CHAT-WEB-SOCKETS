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

const NewContactDialog = () => {
  const [newContactInfo, setNewContactInfo] = useState("");

  const addNewContact = () => {};

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
