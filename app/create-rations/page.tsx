// create-rations/page.tsx
import SidebarMenu from '../components/SidebarMenu';
import CreateRationContent from '../components/CreateRationContent';

const CreateRation = () => {
  return (
    <div className="flex min-h-screen bg-gray-200">
      <SidebarMenu />
      <CreateRationContent />
    </div>
  );
};

export default CreateRation;