// components/MainContent.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleAlt, faBreadSlice, faCheese, faFire, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import ProductAdd from "./ProductAdd";
import {
  useGetProductsSkipTakeBguQuery,
  useFindProductByNameBguQuery,
} from "../../src/graphql";

interface MainContentProps {
  searchTerm: string;
  searchTriggered: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ searchTerm, searchTriggered }) => {
  const [isAdding, setIsAdding] = React.useState<boolean>(false);
  const [activeButton, setActiveButton] = React.useState<string | null>(null);

  const { data, loading } = useGetProductsSkipTakeBguQuery({
    variables: { skip: 0, take: 100 },
  });

  const { data: searchData, loading: searchLoading } = useFindProductByNameBguQuery({
    variables: { term: searchTerm },
    skip: !searchTriggered,
  });

  const calculateCalories = React.useCallback((protein: number, fat: number, carbs: number) => {
    return protein * 4 + fat * 9 + carbs * 4;
  }, []);

  if (isAdding) {
    return <ProductAdd goBack={() => setIsAdding(false)} />;
  }

  if (loading || searchLoading) return <div className="text-center"><FontAwesomeIcon icon={faCircleNotch} spin className="text-6xl text-green-500"/></div>;

  const productList = searchTriggered ? searchData?.products : data?.products;

  return (
    <main className="flex-1 p-2 ml-0 md:ml-28 mb-12 md:mb-0">
      <div className="bg-white p-2 rounded shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {productList?.map((product) => {
            let protein = 0,
                fat = 0,
                carbs = 0;
            product.productNutrients.forEach((nutrient) => {
              if (nutrient.valueString) {
                if (nutrient.nutrient.name === "Белки") protein = parseFloat(nutrient.valueString);
                else if (nutrient.nutrient.name === "Жиры") fat = parseFloat(nutrient.valueString);
                else if (nutrient.nutrient.name === "Углеводы") carbs = parseFloat(nutrient.valueString);
              }
            });
            const calories = calculateCalories(protein, fat, carbs);
            return (
              <div
                key={product.id}
                className="bg-green-100 p-4 rounded-lg shadow-lg transform transition duration-500 ease-in-out hover:scale-105"
              >
                <h3 className="text-xl font-bold mb-2 text-black">{product.name}</h3>
                <div className="flex flex-col justify-between items-start">
                  <div className="flex items-center mb-1">
                    <FontAwesomeIcon icon={faAppleAlt} className="mr-1 text-green-500" />
                    <p className="text-sm text-black">Белки: {protein} г</p>
                  </div>
                  <div className="flex items-center mb-1">
                    <FontAwesomeIcon icon={faCheese} className="mr-1 text-green-500" />
                    <p className="text-sm text-black">Жиры: {fat} г</p>
                  </div>
                  <div className="flex items-center mb-1">
                    <FontAwesomeIcon icon={faBreadSlice} className="mr-1 text-green-500" />
                    <p className="text-sm text-black">Углеводы: {carbs} г</p>
                  </div>
                  <div className="flex items-center mb-1">
                    <FontAwesomeIcon icon={faFire} className="mr-1 text-green-500" />
                    <p className="text-sm text-black">Калории: {calories} ккал</p>
                  </div>
                </div>
                <div className="flex space-x-4 mt-4">
                  <button
                    className={`text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${activeButton === product.id.toString() ? "bg-green-700" : "bg-green-500"} text-white`}
                    onClick={() => setActiveButton(product.id.toString())}
                  >
                    Нутриенты
                  </button>
                  <button
                    className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
};

export default MainContent;
