// components/PersonDetail.tsx
"use client"
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

interface Person {
  id: number;
  name: string;
  ration: string;
}

interface PersonDetailProps {
  person: Person;
  onBack: () => void;
}

const PersonDetail: React.FC<PersonDetailProps> = ({ person, onBack }) => {
  const [ration, setRation] = useState('');

  return (
    <div className="p-2 ml-0 md:ml-28 w-full ">
      <button onClick={onBack} className="mb-4 flex items-center text-blue-500">
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Назад
      </button>
      <div className="bg-white p-4 rounded-lg shadow-lg relative">
        <h3 className="text-xl font-bold mt-2 mb-2 text-black">
          {person.name}
        </h3>
        <p className="text-sm mb-2 text-black">Рацион: {person.ration}</p>
        <div className="mb-4">
          <label className="block text-sm mb-2 text-black">Присвоить рацион:</label>
          <input
            type="text"
            placeholder="Название рациона"
            className="w-full p-2 border rounded"
            value={ration}
            onChange={(e) => setRation(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <button className="p-2 border rounded bg-green-500 text-white w-full">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            На сегодня
          </button>
          <button className="p-2 border rounded bg-green-500 text-white w-full">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            На завтра
          </button>
          <button className="p-2 border rounded bg-green-500 text-white w-full">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            На неделю
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;