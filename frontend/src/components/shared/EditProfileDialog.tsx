import { useState } from "react";
import { Camera, Trash2, User, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const EditProfileDialog = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const updateProfile = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastname", lastname);
    formData.append("username", username);
    formData.append("phone", phoneNumber);
    if (profileImage) {
      formData.append("avatar", profileImage);
    }

    // Aquí deberías llamar a tu API para actualizar el perfil
    // await api.updateProfile(formData);

    setShowEditProfile(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="justify-start">
          <User className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="edit-lastname">Lastname</Label>
            <Input
              id="edit-lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="edit-username">Username</Label>
            <Input
              id="edit-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="edit-phone">Phone Number</Label>
            <Input
              id="edit-phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <Label
              htmlFor="edit-profile-image"
              className="cursor-pointer flex items-center justify-center p-2 border border-dashed border-gray-300 rounded-md"
            >
              <Camera className="mr-2 h-4 w-4" />
              <span>Change Profile Image</span>
              <Input
                id="edit-profile-image"
                type="file"
                className="hidden"
                onChange={(e) => setProfileImage(e.target.files[0])}
              />
            </Label>
            {profileImage && (
              <div className="mt-2 relative">
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile preview"
                  className="w-full h-32 object-cover rounded-md"
                />
                <Button
                  variant="ghost"
                  className="absolute top-0 right-0"
                  onClick={() => setProfileImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <Button onClick={updateProfile} className="w-full">
            Save Changes
          </Button>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteConfirmation(true)}
            className="w-full"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
