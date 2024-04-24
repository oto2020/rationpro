// components/CreateDishContent.tsx
"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';
import Image from 'next/image';

import {
  faSearch,
  faUpload,
  faTimes,
  faCheck,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

const CreateDishContent = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="p-2 ml-0 md:ml-28 w-full mb-12 md:mb-0">
      <div className="bg-white p-2 rounded shadow-md">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
            <div className="mb-6 flex relative">
              <input
                type="text"
                placeholder="Поиск"
                className="w-full p-2 border rounded pl-10"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2"
              />
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg relative">
              <div className="relative h-80 w-full">
                {/* Show the spinner while the image is loading */}
                {!imageLoaded && (
                  <div className="absolute inset-0 flex justify-center items-center">
                    <FontAwesomeIcon icon={faCircleNotch} spin className="text-6xl text-green-500"/>
                  </div>
                )}
                <Image
                  src="/img/salad.jpg"
                  alt="Salad"
                  layout="fill"
                  objectFit="cover"
                  className={`rounded-lg ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoadingComplete={() => setImageLoaded(true)}
                />
              </div>
              <h3 className="text-xl font-bold mt-2 mb-2 text-black">
                Салат с рукколой и помидорами
              </h3>
              <p className="text-sm mb-2 text-black">2424 ккал</p>
              <div className="flex flex-wrap -mx-2 mb-4">
  <div className="w-1/2 px-2 mb-4">
    <div className="bg-green-500 rounded-full px-4 py-1 text-center shadow text-white truncate">
      Сыр фета 30г
    </div>
  </div>
  <div className="w-1/2 px-2 mb-4">
    <div className="bg-green-500 rounded-full px-4 py-1 text-center shadow text-white truncate">
      Помидоры 150г
    </div>
  </div>
  <div className="w-1/2 px-2 mb-4">
    <div className="bg-green-500 rounded-full px-4 py-1 text-center shadow text-white truncate">
      Масло оливковое 100г
    </div>
  </div>
  <div className="w-1/2 px-2 mb-4">
    <div className="bg-green-500 rounded-full px-4 py-1 text-center shadow text-white truncate">
      Руккола 100г
    </div>
  </div>
</div>
{/* Icons and values */}
<div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
  {/* Example for clock icon */}
  <div className="flex items-center justify-center sm:justify-start">
    <FontAwesomeIcon icon={faTimes} className="text-gray-500 mr-2" />
    <span className="text-sm text-black truncate">15 мин.</span>
  </div>
  {/* Example for fire icon */}
  <div className="flex items-center justify-center sm:justify-start">
    <FontAwesomeIcon icon={faTimes} className="text-gray-500 mr-2" />
    <span className="text-sm text-black truncate">500 ккал</span>
  </div>
  {/* Example for leaf icon */}
  <div className="flex items-center justify-center sm:justify-start">
    <FontAwesomeIcon icon={faTimes} className="text-gray-500 mr-2" />
    <span className="text-sm text-black truncate">20 г белка</span>
  </div>
  {/* Example for vitamin icon */}
  <div className="flex items-center justify-center sm:justify-start">
    <FontAwesomeIcon icon={faTimes} className="text-gray-500 mr-2" />
    <span className="text-sm text-black truncate">Витамины A, C</span>
  </div>
</div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <div className="flex flex-col">
              <div className="flex items-center justify-center bg-gray-200 p-6 rounded-lg mb-6">
                <FontAwesomeIcon
                  icon={faUpload}
                  className="text-gray-500 text-4xl"
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Название"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-6">
                <textarea
                  placeholder="Описание"
                  className="w-full p-2 border rounded"
                  rows={4}
                />
              </div>
              <div className="flex justify-between mb-6">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Помидор"
                    className="p-2 border rounded mr-2 flex-1"
                  />
                  <button className="p-2 border rounded bg-green-500 text-white">
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button className="p-2 border rounded bg-red-500 text-white ml-2">
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
              <button className="p-2 border rounded bg-green-500 text-white w-full">
                Создать блюдо
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDishContent;
