// page.tsx
import React from 'react';
import SidebarMenu from '../components/SidebarMenu';
import CreateDishContent from '../components/CreateDishContent';
import DishList from '../components/DishList'; // Импортируем новый компонент

const CreateDish = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-200">
      <SidebarMenu />
      <div className="flex-grow">
        <CreateDishContent />
        <DishList />
      </div>
    </div>
  );
};

export default CreateDish;
