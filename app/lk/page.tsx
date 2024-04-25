// lk/page.tsx
import SidebarMenu from '../components/SidebarMenu';
import PersonalCabinetContent from '../components/PersonalCabinetContent';

const PersonalCabinet = () => {
  return (
    <div className="flex min-h-screen bg-gray-200">
      <SidebarMenu />
      <PersonalCabinetContent />
    </div>
  );
};

export default PersonalCabinet;