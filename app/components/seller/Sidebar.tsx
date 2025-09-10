import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaPlus, FaList, FaShoppingBag } from 'react-icons/fa';

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const SideBar = () => {
  const pathname = usePathname();
  
  const menuItems: MenuItem[] = [
    { name: 'Add Product', path: '/seller', icon: <FaPlus size={20} /> },
    { name: 'Product List', path: '/seller/product-list', icon: <FaList size={20} /> },
    { name: 'Orders', path: '/seller/orders', icon: <FaShoppingBag size={20} /> },
  ];

  return (
    <div className='md:w-64 w-16 border-r min-h-screen text-base border-gray-300 py-2 flex flex-col'>
      {menuItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link href={item.path} key={item.name} passHref>
            <div
              className={
                `flex items-center py-3 px-4 gap-3 ${isActive
                  ? "border-r-4 md:border-r-[6px] bg-orange-600/10 border-orange-500/90"
                  : "hover:bg-gray-100/90 border-white"
                }`
              }
            >
              <div className="w-7 h-7 flex items-center justify-center">
                {item.icon}
              </div>
              <p className='md:block hidden text-center'>{item.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SideBar;