// /components/ProductAdd.tsx
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface ProductAddProps {
  goBack: () => void;
}

function ProductAdd({ goBack }: ProductAddProps) {
  const [product, setProduct] = useState({
    name: '',
    calories: '',
    proteins: '',
    fats: '',
    carbohydrates: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your logic for adding the product here
  };

  return (
    <div className="flex-1 p-2 ml-0 md:ml-28 mb-12 md:mb-0">
              <div className="bg-white p-2 rounded shadow-md">
      <button onClick={goBack} className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4">
        <FontAwesomeIcon icon={faArrowLeft} /> Назад
      </button>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Название продукта"
          value={product.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-2"
        />
        <input
          type="text"
          name="calories"
          placeholder="Калории"
          value={product.calories}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-2"
        />
        <input
          type="text"
          name="proteins"
          placeholder="Белки"
          value={product.proteins}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-2"
        />
        <input
          type="text"
          name="fats"
          placeholder="Жиры"
          value={product.fats}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-2"
        />
        <input
          type="text"
          name="carbohydrates"
          placeholder="Углеводы"
          value={product.carbohydrates}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-2"
        />
        <button type="submit" className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg col-span-full md:col-span-1">
          <FontAwesomeIcon icon={faCheckCircle} /> Добавить продукт
        </button>
      </form>
    </div>
    </div>
  );
}

export default ProductAdd;
