import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";

const DeleteProfileConfirmationDialog = () => {
  const [deletePassword, setDeletePassword] = useState();

  const deleteProfile = () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Profile Deletion</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Please enter your password to confirm profile deletion:</p>
          <Input
            type="password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            placeholder="Enter your password"
          />
          <Button
            variant="destructive"
            onClick={deleteProfile}
            className="w-full"
          >
            Confirm Deletion
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProfileConfirmationDialog;
