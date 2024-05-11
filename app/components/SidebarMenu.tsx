"use client"
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlateWheat, faBowlFood, faPerson, faCog } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation'; // Импортируйте новый хук

function SidebarMenu() {
  const pathname = usePathname(); // Получаем текущий путь

  // Функция для определения активного пункта меню
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside className="md:w-28 bg-white shadow fixed bottom-0 md:top-0 md:left-0 z-30 w-full md:h-screen h-16 md:shadow-none shadow-t">
      <nav className="flex md:flex-col flex-row justify-around md:justify-center items-center md:py-4 py-2">
        {[
          { href: "/", icon: faHome, label: "Главная" },
          { href: "/create-dish", icon: faPlateWheat, label: "Создать блюдо" },
          { href: "/create-rations", icon: faBowlFood, label: "Создать рацион" },
          { href: "/lk", icon: faPerson, label: "Личный кабинет" },
          { href: "/testGraph", icon: faCog, label: "Настройки" },
        ].map((item) => (
          <Link href={item.href} key={item.href}>
            <div className="group p-3 md:p-5 md:flex-grow w-full md:h-16 h-full hover:bg-gray-100 rounded relative">
              <FontAwesomeIcon icon={item.icon} size="2x" className={`text-2xl ${isActive(item.href) ? 'fa-beat text-green-700' : 'text-green-500'}`} />
              <span className="absolute md:left-5 left-1/2 transform md:-translate-y-1/2 -translate-x-1/2 whitespace-nowrap hidden group-hover:flex justify-center items-center bg-gray-200 text-black text-sm p-2 rounded-lg shadow-lg z-50 w-32 md:ml-14 md:top-0 top-[calc(-100%-4px)]">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default SidebarMenu;
