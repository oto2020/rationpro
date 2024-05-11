// components/DishList.tsx
"use client"
import React, { useState } from 'react';

interface Dish {
  id: number;
  name: string;
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
}

const initialDishes: Dish[] = Array(5).fill({
  id: 1,
  name: "Тестовое блюдо",
  protein: 20,
  fat: 10,
  carbs: 15,
  calories: 250
});

const DishList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dishes, setDishes] = useState(initialDishes);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredDishes = dishes.filter(dish => dish.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex-1 p-2 ml-0 md:ml-28 mb-12 md:mb-0">
      <input
        type="text"
        placeholder="Поиск блюд..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 border rounded mb-4 text-black"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDishes.map((dish, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-xl mb-2 text-black">{dish.name}</h3>
            <p className="text-black">Белки: {dish.protein}г</p>
            <p className="text-black">Жиры: {dish.fat}г</p>
            <p className="text-black">Углеводы: {dish.carbs}г</p>
            <p className="text-black">Калории: {dish.calories} ккал</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DishList;
