// /components/MainContent.js
"use client"
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faShoppingCart, faCog, faPlus, faArrowLeft, faTint, faFire, faLeaf, faFlask } from '@fortawesome/free-solid-svg-icons';
import ProductAdd from './ProductAdd';

function MainContent() {
  const [isAdding, setIsAdding] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const vitamins = Array(7).fill({
    name: 'Витамин A',
    amount: '1 мг',
  });

  const products = Array(7).fill({
    name: 'Помидор',
    calories: '2424 ккал',
    proteins: '1 г',
    fats: '0.3 г',
    carbohydrates: '3.5 г',
  });

  if (isAdding) {
    return <ProductAdd goBack={() => setIsAdding(false)} />;
  }

  return (
    <main className="flex-1 p-2 ml-0 md:ml-28 mb-12 md:mb-0">
      <div className="bg-white p-2 rounded shadow-md">
        <div className="mb-6 flex relative">
          <input type="text" placeholder="Поиск" className="w-full p-2 border rounded pl-10" />
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-green-100 p-4 rounded-lg shadow-lg flex items-center justify-center duration-500 ease-in-out hover:scale-105 order-first md:order-last" onClick={() => setIsAdding(true)}>
            <FontAwesomeIcon icon={faPlus} size="3x" className="fa-beat" />
          </div>
          {products.map((product, index) => (
            <div key={index} className="bg-green-100 p-4 rounded-lg shadow-lg transform transition duration-500 ease-in-out hover:scale-105">
              <h3 className="text-xl font-bold mb-2 text-black">{product.name}</h3>
              <p className="text-sm mb-2 text-black">{product.calories}</p>
              <div className="flex justify-between items-center">
                <FontAwesomeIcon icon={faTint} className="text-blue-500" />
                <p className="text-sm text-black">Белки: {product.proteins}</p>
                <FontAwesomeIcon icon={faFire} className="text-red-500" />
                <p className="text-sm text-black">Жиры: {product.fats}</p>
                <FontAwesomeIcon icon={faLeaf} className="text-green-500" />
                <p className="text-sm text-black">Углеводы: {product.carbohydrates}</p>
                <FontAwesomeIcon icon={faFlask} className="text-purple-500" />
              </div>
              <button className={`mt-4 py-2 px-4 rounded-lg ${activeButton === index ? 'bg-green-700' : 'bg-green-500'} text-white`} onClick={() => {setActiveButton(index); setShowPopup(true);}}>Витамины</button>
            </div>
          ))}
        </div>
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2 text-black">Информация о витаминах</h2>
              <button className="mb-4 bg-red-500 text-white py-2 px-4 rounded-lg" onClick={() => setShowPopup(false)}>Закрыть</button>
              {vitamins.map((vitamin, index) => (
                <div key={index} className="mb-2">
                  <h3 className="text-lg font-bold text-black">{vitamin.name}</h3>
                  <p className="text-sm text-black">Количество: {vitamin.amount}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default MainContent;
