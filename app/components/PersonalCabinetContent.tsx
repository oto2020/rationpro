// components/PersonalCabinetContent.tsx
"use client"
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import PersonDetail from './PersonDetail';

interface Person {
  id: number;
  name: string;
  ration: string;
}

const PersonalCabinetContent = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const people: Person[] = Array(10).fill(null).map((_, index) => ({
    id: index,
    name: `Имя Фамилия ${index + 1}`,
    ration: `Название рациона ${index + 1}`,
  }));

  if (selectedPerson) {
    return <PersonDetail person={selectedPerson} onBack={() => setSelectedPerson(null)} />;
  }

  return (
    <div className="p-2 ml-0 md:ml-28 w-full ">
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {people.map((person) => (
          <div key={person.id} className="bg-white p-4 rounded-lg shadow-lg relative transform transition duration-500 ease-in-out hover:scale-105 cursor-pointer" onClick={() => setSelectedPerson(person)}>
            <div className="mb-4 relative h-32 w-full">
              {!imageLoaded && (
                <div className="absolute inset-0 flex justify-center items-center">
                  <FontAwesomeIcon icon={faCircleNotch} spin className="text-6xl text-green-500"/>
                </div>
              )}
              <Image
                src="/img/person-placeholder.jpg"
                alt="Person"
                layout="fill"
                objectFit="cover"
                className={`rounded-lg ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoadingComplete={() => setImageLoaded(true)}
              />
            </div>
            <h3 className="text-xl font-bold mt-2 mb-2 text-black">
              {person.name}
            </h3>
            <p className="text-sm mb-2 text-black">Рацион: {person.ration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalCabinetContent;