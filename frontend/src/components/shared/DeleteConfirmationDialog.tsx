import { Dialog } from "@/components/ui/dialog";

const DeleteConfirmationDialog = ({
  showDeleteConfirmation,
  setShowDeleteConfirmation,
}) => {
  return (
    <Dialog
      open={showDeleteConfirmation}
      onOpenChange={setShowDeleteConfirmation}
    >
      {/* Contenido del diálogo para confirmar la eliminación */}
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
