// components/DishList.tsx
"use client"
import React, { useState } from 'react';
import {
  useGetAllDishProductsQuery,
  useGetProductsSkipTakeBguQuery,
  useFindProductByNameBguQuery,
  Dish
} from "../../src/graphql";

const DishList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error } = useGetAllDishProductsQuery();
  const { data: productsData, loading: productsLoading } = useGetProductsSkipTakeBguQuery({ variables: { skip: 0, take: 10 } });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Функция для расчета КБЖУ продуктов в блюде
  const calculateNutrients = (dishProducts: Dish['dishProducts']) => {
    return dishProducts.reduce((acc, { product, cookCoeff, quantity }) => {
      product.productNutrients?.forEach(nutrient => {
        if (nutrient.valueString) {
          const nutrientValue = parseFloat(nutrient.valueString);  // Предполагаем, что значения питательных веществ хранятся в строковом формате
          const factor = cookCoeff * quantity / 100;
          switch (nutrient.nutrient.name) {
            case 'Белки':
              acc.protein += nutrientValue * factor;
              break;
            case 'Жиры':
              acc.fat += nutrientValue * factor;
              break;
            case 'Углеводы':
              acc.carbs += nutrientValue * factor;
              break;
          }
        }
      });
      acc.calories += (acc.protein * 4 + acc.fat * 9 + acc.carbs * 4); // Упрощённый расчёт калорий
      return acc;
    }, { protein: 0, fat: 0, carbs: 0, calories: 0 });
  };

  if (loading || productsLoading) return <p>Loading dishes or products...</p>;
  if (error) return <p>Error loading dishes: {error.message}</p>;

  const filteredDishes = data?.dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
        {filteredDishes.map((dish) => {
          const nutrients = calculateNutrients(dish.dishProducts);
          return (
            <div key={dish.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2 text-black">{dish.name}</h3>
              <ul className="mb-4">
                {dish.dishProducts.map((dp) => (
                  <li key={dp.productId} className='text-black'>
                    {dp.product.name} - {dp.quantity}г (Cooking factor: {dp.cookCoeff})
                  </li>
                ))}
              </ul>
              <p className="text-black">Белки: {nutrients.protein.toFixed(2)}г</p>
              <p className="text-black">Жиры: {nutrients.fat.toFixed(2)}г</p>
              <p className="text-black">Углеводы: {nutrients.carbs.toFixed(2)}г</p>
              <p className="text-black">Калории: {nutrients.calories.toFixed(2)} ккал</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DishList;
