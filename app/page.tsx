// pages.tsx
import SidebarMenu from './components/SidebarMenu';
import MainContent from './components/MainContent';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-200">
      <SidebarMenu />
      <MainContent />
    </div>
  );
}
