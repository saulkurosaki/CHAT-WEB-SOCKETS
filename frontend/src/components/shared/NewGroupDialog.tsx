import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Camera, Plus, X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";
import { IUser } from "@/interfaces";
import { Spinner } from "./Spinner";
import { uploadImage } from "@/services/cloudinaryService";
import { listContacts } from "@/services/private"; // Importa la función listContacts
import { useUserStore } from "@/store"; // Importa el store para obtener el usuario

interface IFormGroup {
  name: string;
  description: string;
  chatRoomType: string;
  members: {
    [key: string]: string;
  }[];
}

interface INewGroupChat extends IFormGroup {
  image?: string | null;
}

const INITIAL_VALUES = {
  name: "",
  description: "",
  chatRoomType: "public",
  members: [],
};

const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const NewGroupDialog = () => {
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupImage, setNewGroupImage] = useState<File | null>(null);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState<IUser[]>([]);
  const [contacts, setContacts] = useState<IUser[]>([]); // Estado para los contactos
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useUserStore(); // Obtén el usuario en sesión

  const formik = useFormik<IFormGroup>({
    initialValues: INITIAL_VALUES,
    validationSchema: Yup.object({
      name: Yup.string().required("Group name is required"),
      description: Yup.string().required("Group description is required"),
      chatRoomType: Yup.string().required("Group type is required"),
      members: Yup.array().optional(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const body: INewGroupChat = { ...values };

      if (selectedGroupMembers.length === 0) {
        toast.error("You must select at least one contact");
        return;
      } else {
        body.members = selectedGroupMembers.map((user) => ({
          _id: user._id,
        }));
      }

      if (newGroupImage) {
        try {
          const avatarUrl = await uploadImage(newGroupImage);
          body.image = avatarUrl;
        } catch (error) {
          toast.error("Error uploading the profile image");
          return;
        }
      }

      // Crear el grupo
      console.log(body);
    },
  });

  const createGroupChat = () => {
    if (newGroupName && selectedGroupMembers.length > 0) {
      // Lógica para crear el grupo
      setNewGroupName("");
      setNewGroupImage(null);
      setSelectedGroupMembers([]);
    }
  };

  useEffect(() => {
    const fetchContacts = async () => {
      if (user?.email) {
        const response = await listContacts(user.email);
        if (response.ok) {
          setContacts(response.data); // Asigna los contactos obtenidos
        } else {
          console.error(response.error);
        }
      }
    };

    fetchContacts();
  }, [user]);

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (!VALID_IMAGE_TYPES.includes(file.type)) {
        toast.error("Invalid image format. Only allowed JPEG, PNG y GIF.");
        return;
      }

      setNewGroupImage(file);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[48%]">
          <Plus className="mr-2 h-4 w-4" /> New Group Chat
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Group Chat</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="name"
            name="name"
            placeholder="Group Name"
            value={formik.values.name}
            error={formik.errors.name}
            touched={formik.touched.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Input
            type="description"
            name="description"
            placeholder="Group Description"
            value={formik.values.description}
            error={formik.errors.description}
            touched={formik.touched.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <div>
            <Label
              htmlFor="new-group-image"
              className="cursor-pointer flex items-center justify-center p-2 border border-dashed border-gray-300 rounded-md"
            >
              <Camera className="mr-2 h-4 w-4" />
              <span>Upload Group Image (Optional)</span>
              <Input
                id="new-group-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUploadImage}
              />
            </Label>
            {newGroupImage && (
              <div className="mt-2 relative">
                <img
                  src={URL.createObjectURL(newGroupImage)}
                  alt="Group preview"
                  className="w-full h-32 object-cover rounded-md"
                />
                <Button
                  variant="ghost"
                  className="absolute top-0 right-0"
                  onClick={() => setNewGroupImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div>
            <Label>Select Group Members</Label>
            <ScrollArea className="h-[200px] mt-2">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Spinner size="size-6" />
                </div>
              ) : !isLoading && error ? (
                <div className="flex items-center justify-center h-full">
                  <p>{error}</p>
                </div>
              ) : (
                contacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <Checkbox
                      id={`contact-${contact._id}`}
                      checked={selectedGroupMembers.includes(contact)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedGroupMembers((prev) => [...prev, contact]);
                        } else {
                          setSelectedGroupMembers((prev) =>
                            prev.filter((member) => member !== contact)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`contact-${contact._id}`}>
                      {contact.name} {contact.lastname}
                    </Label>
                  </div>
                ))
              )}
            </ScrollArea>
          </div>

          <Button onClick={createGroupChat} className="w-full">
            Create Group
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewGroupDialog;
