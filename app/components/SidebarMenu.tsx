import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faShoppingCart, faCog, faPlusSquare, faPlateWheat, faBowlFood, faPerson } from '@fortawesome/free-solid-svg-icons';

function SidebarMenu() {
  return (
    <aside className="md:w-28 bg-white shadow fixed bottom-0 md:top-0 md:left-0 z-30 w-full md:h-screen h-16 md:shadow-none shadow-t">
      <nav className="flex md:flex-col flex-row justify-around md:justify-center items-center md:py-4 py-2">
        <Link href="/">
        <div className="group p-3 md:p-5 md:flex-grow w-full md:h-16 h-full hover:bg-gray-100 rounded relative">
            <FontAwesomeIcon icon={faHome} size="2x" className="text-xl fa-beat text-green-500" />
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 whitespace-nowrap hidden group-hover:flex justify-center items-center bg-gray-200 text-black text-sm p-2 rounded-lg shadow-lg z-50 w-32 ml-14">Главная</span>
          </div>
        </Link>
        <Link href="/create-dish">
        <div className="group p-3 md:p-5 md:flex-grow w-full md:h-16 h-full hover:bg-gray-100 rounded relative">
            <FontAwesomeIcon icon={faPlateWheat} size="2x" className="text-xl text-green-500" />
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 whitespace-nowrap hidden group-hover:flex justify-center items-center bg-gray-200 text-black text-sm p-2 rounded-lg shadow-lg z-50 w-32 ml-14">Создать блюдо</span>
          </div>
        </Link>
        <Link href="/create-rations">
        <div className="group p-3 md:p-5 md:flex-grow w-full md:h-16 h-full hover:bg-gray-100 rounded relative">
            <FontAwesomeIcon icon={faBowlFood} size="2x" className="text-xl text-green-500" />
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 whitespace-nowrap hidden group-hover:flex justify-center items-center bg-gray-200 text-black text-sm p-2 rounded-lg shadow-lg z-50 w-32 ml-14">Создать рацион</span>
          </div>
        </Link>
        <Link href="/lk">
        <div className="group p-3 md:p-5 md:flex-grow w-full md:h-16 h-full hover:bg-gray-100 rounded relative">
            <FontAwesomeIcon icon={faPerson} size="2x" className="text-xl text-green-500 fa-duotone" />
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 whitespace-nowrap hidden group-hover:flex justify-center items-center bg-gray-200 text-black text-sm p-2 rounded-lg shadow-lg z-50 w-32 ml-14">Личный кабинет</span>
          </div>
        </Link>
        <Link href="/settings">
        <div className="group p-3 md:p-5 md:flex-grow w-full md:h-16 h-full hover:bg-gray-100 rounded relative">
            <FontAwesomeIcon icon={faCog} size="2x" className="text-xl text-green-500" />
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 whitespace-nowrap hidden group-hover:flex justify-center items-center bg-gray-200 text-black text-sm p-2 rounded-lg shadow-lg z-50 w-32 ml-14">Настройки</span>
          </div>
        </Link>
      </nav>
    </aside>
  );
}

export default SidebarMenu;
