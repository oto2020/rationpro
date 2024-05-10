"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faWindowClose,
  faTimes,
  faCheck,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { useFindProductByNameBguQuery, Product } from "../../src/graphql";

interface NutrientInfo {
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
}

interface SelectedProduct extends Product {
  grams: number;
}

type CookingMethods = "Ничего" | "Ужарка" | "Уварка" | "Запекать";

const COOKING_METHODS: Record<CookingMethods, number> = {
  Ничего: 1.0,
  Ужарка: 1.2,
  Уварка: 0.9,
  Запекать: 1.1,
};

const CreateDishContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayResults, setDisplayResults] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );
  const [cookingMethod, setCookingMethod] = useState<CookingMethods>("Ничего");

  const { data, loading } = useFindProductByNameBguQuery({
    variables: { term: searchTerm },
    skip: searchTerm.length < 1,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDisplayResults(searchTerm.length > 0);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const calculateTotalNutrients = (): NutrientInfo => {
    let totalProtein = 0,
      totalFat = 0,
      totalCarbs = 0,
      totalCalories = 0;
    selectedProducts.forEach((product) => {
      const nutrients = calculateNutrients(product);
      totalProtein += nutrients.protein;
      totalFat += nutrients.fat;
      totalCarbs += nutrients.carbs;
      totalCalories += nutrients.calories;
    });
    return {
      protein: totalProtein,
      fat: totalFat,
      carbs: totalCarbs,
      calories: totalCalories,
    };
  };

  const toggleProductSelection = (product: Product) => {
    setSelectedProducts((prev) => {
      const isAlreadySelected = prev.find((p) => p.id === product.id);
      return isAlreadySelected
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, { ...product, grams: 100 }];
    });
    setDisplayResults(false);
  };

  const handleCloseResults = () => {
    setDisplayResults(false);
  };

  const handleGramsChange = (id: string, grams: number) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.id.toString() === id ? { ...product, grams } : product
      )
    );
  };

  const calculateNutrients = (product: SelectedProduct): NutrientInfo => {
    let protein = 0,
      fat = 0,
      carbs = 0;
    product.productNutrients.forEach((nutrient) => {
      switch (nutrient.nutrient.name) {
        case "Белки":
          protein += parseFloat(nutrient.valueString || "0");
          break;
        case "Жиры":
          fat += parseFloat(nutrient.valueString || "0");
          break;
        case "Углеводы":
          carbs += parseFloat(nutrient.valueString || "0");
          break;
      }
    });
    const gramsFactor = product.grams / 100;
    const cookingFactor = COOKING_METHODS[cookingMethod];
    return {
      protein: protein * gramsFactor * cookingFactor,
      fat: fat * gramsFactor * cookingFactor,
      carbs: carbs * gramsFactor * cookingFactor,
      calories:
        (protein * 4 + fat * 9 + carbs * 4) * gramsFactor * cookingFactor,
    };
  };

  return (
    <div className="p-2 ml-0 md:ml-28 w-full">
      <div className="bg-white p-2 rounded shadow-md">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
            <div className="mb-6 flex relative">
              <input
                type="text"
                placeholder="Поиск"
                className="w-full p-2 border rounded pl-10 text-black"
                value={searchTerm}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2"
              />
              {displayResults && (
                <div className="absolute bg-white w-full border rounded mt-10 max-h-60 overflow-auto">
                  {loading ? (
                    <FontAwesomeIcon
                      icon={faCircleNotch}
                      spin
                      className="text-6xl text-green-500"
                    />
                  ) : (
                    <>
                      <button
                        className="p-2 w-full text-left text-red-500"
                        onClick={handleCloseResults}
                      >
                        <FontAwesomeIcon icon={faWindowClose} /> Закрыть
                      </button>
                      {data?.products.slice(0, 30).map((product) => (
                        <div
                          key={product.id}
                          onClick={() =>
                            toggleProductSelection(product as Product)
                          }
                          className="p-2 hover:bg-gray-100 flex justify-between items-center text-black"
                        >
                          <span>{product.name}</span>
                          <FontAwesomeIcon
                            icon={
                              selectedProducts.find((p) => p.id === product.id)
                                ? faTimes
                                : faCheck
                            }
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <div className="p-2 rounded-lg shadow bg-green-100">
              <h3 className="text-lg font-bold mb-4 text-black">
                Выбранные продукты:
              </h3>
              <div className="overflow-auto max-h-96 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300">
              {selectedProducts.map((product) => (
  <div
    key={product.id}
    className="p-3 bg-white mb-2 rounded-lg shadow flex flex-col md:flex-row justify-between items-center text-black"
  >
    <span className="w-full md:w-auto md:max-w-[60%]">{product.name}</span>
    <div className="w-full md:w-auto flex items-center justify-between mt-2 md:mt-0">
      <input
        type="number"
        value={product.grams}
        onChange={(e) =>
          handleGramsChange(
            product.id.toString(),
            Number(e.target.value)
          )
        }
        className="w-20 border rounded text-black p-1 text-center"
      />
      <span className="text-sm">
        Белки: {calculateNutrients(product).protein.toFixed(2)}г,
        Жиры: {calculateNutrients(product).fat.toFixed(2)}г,
        Углеводы: {calculateNutrients(product).carbs.toFixed(2)}г,
        ккал: {calculateNutrients(product).calories.toFixed(2)}
      </span>
      <button
        onClick={() => toggleProductSelection(product)}
        className="ml-2"
      >
        <FontAwesomeIcon
          icon={faTimes}
          className="text-red-500"
        />
      </button>
    </div>
  </div>
))}

              </div>
              <div className="flex space-x-2 mb-4">
                {Object.keys(COOKING_METHODS).map((method) => {
                  const cookingMethodKey = method as CookingMethods;
                  return (
                    <button
                      key={cookingMethodKey}
                      className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group ${
                        cookingMethod === cookingMethodKey
                          ? "bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white"
                          : "text-gray-900 bg-white"
                      } focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800`}
                      onClick={() => setCookingMethod(cookingMethodKey)}
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        {cookingMethodKey}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="p-2 bg-white mt-2 rounded-lg shadow flex justify-between items-center text-black">
                <span>Всего:</span>
                <span className="ml-auto text-sm">
                  Белки: {calculateTotalNutrients().protein.toFixed(2)}г, Жиры:{" "}
                  {calculateTotalNutrients().fat.toFixed(2)}г, Углеводы:{" "}
                  {calculateTotalNutrients().carbs.toFixed(2)}г, ккал:{" "}
                  {calculateTotalNutrients().calories.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDishContent;
