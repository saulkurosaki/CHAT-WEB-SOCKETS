import NewPersonalDialog from "./NewPersonalDialog";
import NewGroupDialog from "./NewGroupDialog";

const Footer = () => {
  return (
    <div className="w-full flex justify-between p-4 bg-gray-100">
      <NewGroupDialog />
      <NewPersonalDialog />
    </div>
  );
};

export default Footer;
