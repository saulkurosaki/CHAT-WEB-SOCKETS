import { Dialog } from "@/components/ui/dialog";

const NewGroupDialog = ({ showNewGroupDialog, setShowNewGroupDialog }) => {
  return (
    <Dialog open={showNewGroupDialog} onOpenChange={setShowNewGroupDialog}>
      {/* Contenido del diálogo para crear un nuevo grupo */}
    </Dialog>
  );
};

export default NewGroupDialog;
