// page.tsx
import SidebarMenu from '../components/SidebarMenu';
import CreateDishContent from '../components/CreateDishContent';

const CreateDish = () => {
  return (
    <div className="flex min-h-screen bg-gray-200">
      <SidebarMenu />
      <CreateDishContent />
    </div>
  );
};

export default CreateDish;
