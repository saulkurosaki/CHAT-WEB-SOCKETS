import { Dialog } from "@/components/ui/dialog";

const ProfileDialog = ({ showEditProfile, setShowEditProfile }) => {
  return (
    <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
      {/* Contenido del diálogo para editar el perfil */}
    </Dialog>
  );
};

export default ProfileDialog;
