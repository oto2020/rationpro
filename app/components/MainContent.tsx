// /components/MainContent.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faShoppingCart, faCog, faPlus } from '@fortawesome/free-solid-svg-icons';

function MainContent() {
  const products = Array(10).fill({
    name: 'Помидор',
    calories: '2424 ккал',
    proteins: '1 г',
    fats: '0.3 г',
    carbohydrates: '3.5 г',
  });

  return (
    <main className="flex-1 p-2 ml-0 md:ml-28">
      <div className="bg-white p-2 rounded shadow-md">
        <div className="mb-6 flex relative">
          <input type="text" placeholder="Поиск" className="w-full p-2 border rounded pl-10" />
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div key={index} className="bg-green-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2 text-black">{product.name}</h3>
              <p className="text-sm mb-2 text-black">{product.calories}</p>
              <p className="text-sm mb-2 text-black">Белки: {product.proteins}</p>
              <p className="text-sm mb-2 text-black">Жиры: {product.fats}</p>
              <p className="text-sm mb-2 text-black">Углеводы: {product.carbohydrates}</p>
              <div className="flex justify-between items-center">
                <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                <FontAwesomeIcon icon={faShoppingCart} className="text-blue-500" />
                <FontAwesomeIcon icon={faCog} className="text-gray-500" />
                <FontAwesomeIcon icon={faPlus} className="text-green-500" />
              </div>
              <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg">Витамины</button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button className="border-2 border-green-500 text-green-500 py-2 px-4 rounded-full">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
