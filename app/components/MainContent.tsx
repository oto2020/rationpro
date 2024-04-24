// /components/MainContent.js
"use client"
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faShoppingCart, faCog, faPlus, faArrowLeft, faTint, faFire, faLeaf, faFlask, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import ProductAdd from './ProductAdd';
import InfiniteScroll from 'react-infinite-scroll-component';

function MainContent() {
  const [isAdding, setIsAdding] = useState(false);
  const [activeButton, setActiveButton] = useState<null | number>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsCount, setItemsCount] = useState(3); // начальное значение

  useEffect(() => {
    // Обновляем itemsCount только после монтирования компонента
    if (window.innerWidth > 768) {
      setItemsCount(products.length);
    }
  }, []); // Пустой массив зависимостей означает, что эффект будет вызван только один раз после монтирования компонента
  const vitamins = Array(7).fill({
    name: 'Витамин A',
    amount: '1 мг',
  });

  const products = [
    { name: 'Помидор', calories: '2424 ккал', proteins: '1 г', fats: '0.3 г', carbohydrates: '3.5 г' },
    { name: 'Помидор', calories: '2424 ккал', proteins: '1 г', fats: '0.3 г', carbohydrates: '3.5 г' },
    { name: 'Долька апельсина', calories: '2424 ккал', proteins: '1 г', fats: '0.3 г', carbohydrates: '3.5 г' },
    { name: 'Долька банана', calories: '105 ккал', proteins: '1.3 г', fats: '0.3 г', carbohydrates: '27 г' },
    { name: 'Долька груши', calories: '57 ккал', proteins: '0.4 г', fats: '0.1 г', carbohydrates: '15.5 г' },
    { name: 'Долька арбуза', calories: '30 ккал', proteins: '0.6 г', fats: '0.1 г', carbohydrates: '7.6 г' },
    { name: 'Долька дыни', calories: '34 ккал', proteins: '0.8 г', fats: '0.1 г', carbohydrates: '8.2 г' },
    { name: 'Долька киви', calories: '41 ккал', proteins: '0.8 г', fats: '0.4 г', carbohydrates: '10.1 г' },
    { name: 'Долька манго', calories: '60 ккал', proteins: '0.8 г', fats: '0.4 г', carbohydrates: '15 г' },
    { name: 'Долька ананаса', calories: '50 ккал', proteins: '0.5 г', fats: '0.1 г', carbohydrates: '13.1 г' },
    { name: 'Долька граната', calories: '83 ккал', proteins: '1.7 г', fats: '1.2 г', carbohydrates: '18.7 г' },
  ];

  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const loadMore = () => {
    setTimeout(() => {
      setItemsCount(prevState => prevState + 3);
    }, 1500);
  };

  if (isAdding) {
    return <ProductAdd goBack={() => setIsAdding(false)} />;
  }

  return (
    <main className="flex-1 p-2 ml-0 md:ml-28 mb-12 md:mb-0">
      <div className="bg-white p-2 rounded shadow-md">
        <div className="mb-6 flex relative">
          <input type="text" placeholder="Поиск" className="w-full p-2 border rounded pl-10 text-black" onChange={e => setSearchTerm(e.target.value)} />
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
        </div>
        <InfiniteScroll
          dataLength={itemsCount}
          next={loadMore}
          hasMore={itemsCount < filteredProducts.length}
          loader={    <div className="bg-green-100 p-4 rounded-lg shadow-lg flex items-center justify-center">
          <FontAwesomeIcon icon={faCircleNotch} spin className="text-6xl text-green-500"/>
        </div>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-green-100 p-4 rounded-lg shadow-lg flex items-center justify-center duration-500 ease-in-out hover:scale-105 order-first md:order-last" onClick={() => setIsAdding(true)}>
              <FontAwesomeIcon icon={faPlus} size="3x" className="fa-beat text-green-500" />
            </div>
            {filteredProducts.slice(0, itemsCount).map((product, index) => (
  <div key={index} className="bg-green-100 p-4 rounded-lg shadow-lg transform transition duration-500 ease-in-out hover:scale-105">
    <h3 className="text-xl font-bold mb-2 text-black">{product.name}</h3>
    <p className="text-sm mb-2 text-black">{product.calories}</p>
    <div className="flex flex-col justify-between items-start">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faTint} className="text-blue-500" />
        <p className="text-sm text-black ml-2">Белки: {product.proteins}</p>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faFire} className="text-red-500" />
        <p className="text-sm text-black ml-2">Жиры: {product.fats}</p>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faLeaf} className="text-green-500" />
        <p className="text-sm text-black ml-2">Углеводы: {product.carbohydrates}</p>
      </div>
    </div>
    <div className="flex space-x-4 mt-4">
      <button className={`py-2 px-4 rounded-lg ${activeButton === index ? 'bg-green-700' : 'bg-green-500'} text-white`} onClick={() => {setActiveButton(index); setShowPopup(true);}}>Нутриенты</button>
      <button className="py-2 px-4 rounded-lg border border-gray-500 text-gray-500" onClick={() => {/* handle edit */}}>Редактировать</button>
    </div>
  </div>
))}


          </div>
        </InfiniteScroll>
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2 text-black">Информация о нутриентах</h2>
              {vitamins.map((vitamin, index) => (
                <div key={index} className="mb-2">
                  <h3 className="text-lg font-bold text-black">{vitamin.name}</h3>
                  <p className="text-sm text-black">Количество: {vitamin.amount}</p>
                </div>
              ))}
                            <button className="mb-4 bg-red-500 text-white py-2 px-4 rounded-lg" onClick={() => setShowPopup(false)}>Закрыть</button>

            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default MainContent;
