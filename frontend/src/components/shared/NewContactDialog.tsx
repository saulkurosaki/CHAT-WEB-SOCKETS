import { Dialog } from "@/components/ui/dialog";

const NewContactDialog = ({
  showNewContactDialog,
  setShowNewContactDialog,
}) => {
  return (
    <Dialog open={showNewContactDialog} onOpenChange={setShowNewContactDialog}>
      {/* Contenido del diálogo para agregar un nuevo contacto */}
    </Dialog>
  );
};

export default NewContactDialog;
