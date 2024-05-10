"use client";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faAppleAlt, faBreadSlice, faCheese, faFire } from "@fortawesome/free-solid-svg-icons";
import ProductAdd from "./ProductAdd";
import {
  useGetProductsSkipTakeBguQuery,
  useFindProductByNameBguQuery,
} from "../../src/graphql";

function MainContent() {
  const [isAdding, setIsAdding] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  const { data, loading } = useGetProductsSkipTakeBguQuery({
    variables: { skip: 0, take: 100 },
  });

  const { data: searchData, loading: searchLoading } =
    useFindProductByNameBguQuery({
      variables: { term: searchTerm },
      skip: !searchTriggered,
    });

  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        setSearchTriggered(true);
      }, 1500);
    } else {
      setSearchTriggered(false);
    }
  }, [searchTerm]);

  const calculateCalories = (protein: number, fat: number, carbs: number) => {
    return protein * 4 + fat * 9 + carbs * 4;
  };

  if (isAdding) {
    return <ProductAdd goBack={() => setIsAdding(false)} />;
  }

  if (loading || searchLoading) return <p>Loading...</p>;

  const productList = searchTriggered ? searchData?.products : data?.products;

  return (
    <main className="flex-1 p-2 ml-0 md:ml-28 mb-12 md:mb-0">
      <div className="bg-white p-2 rounded shadow-md">
        <div className="mb-6 flex relative">
          <input
            type="text"
            placeholder="Поиск"
            className="w-full p-2 border rounded pl-10 text-black"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          {searchTerm.length >= 2 && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setSearchTriggered(true)}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {productList?.map((product) => {
            let protein = 0,
              fat = 0,
              carbs = 0;
            product.productNutrients.forEach((nutrient) => {
              if (nutrient.valueString) {
                // Добавлено условие
                if (nutrient.nutrient.name === "Белки")
                  protein = parseFloat(nutrient.valueString);
                else if (nutrient.nutrient.name === "Жиры")
                  fat = parseFloat(nutrient.valueString);
                else if (nutrient.nutrient.name === "Углеводы")
                  carbs = parseFloat(nutrient.valueString);
              }
            });
            const calories = calculateCalories(protein, fat, carbs);
            return (
              <div
                key={product.id}
                className="bg-green-100 p-4 rounded-lg shadow-lg transform transition duration-500 ease-in-out hover:scale-105"
              >
                <h3 className="text-xl font-bold mb-2 text-black">
                  {product.name}
                </h3>
                <div className="flex flex-col justify-between items-start">
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon icon={faAppleAlt} className="mr-1 text-green-500" /> {/* Иконка для белков */}
                  <p className="text-sm text-black">Белки: {protein} г</p>
                </div>
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon icon={faCheese} className="mr-1 text-green-500" /> {/* Иконка для жиров */}
                  <p className="text-sm text-black">Жиры: {fat} г</p>
                </div>
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon icon={faBreadSlice} className="mr-1 text-green-500"/> {/* Иконка для углеводов */}
                  <p className="text-sm text-black">Углеводы: {carbs} г</p>
                </div>
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon icon={faFire} className="mr-1 text-green-500" /> {/* Иконка для калорий */}
                  <p className="text-sm text-black">
                    Калории: {calories} ккал
                  </p>
                </div>
                </div>
                <div className="flex space-x-4 mt-4">
                  <button
                    className={`py-2 px-4 rounded-lg ${
                      activeButton === product.id.toString()
                        ? "bg-green-700"
                        : "bg-green-500"
                    } text-white`}
                    onClick={() => {
                      setActiveButton(product.id.toString());
                    }}
                  >
                    Нутриенты
                  </button>
                  <button
                    className="py-2 px-4 rounded-lg border border-gray-500 text-gray-500"
                    onClick={() => {
                      /* handle edit */
                    }}
                  >
                    Редактировать
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default MainContent;
