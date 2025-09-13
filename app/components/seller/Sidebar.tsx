import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaPlus, FaList, FaShoppingBag, FaStore, 
  FaChevronLeft, FaChevronRight, FaTimes,
  FaChartLine, FaUsers, FaCog, FaSignOutAlt 
} from 'react-icons/fa';

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const HeaderSlider = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black/50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className={`absolute top-0 left-0 h-full w-80 bg-gradient-to-b from-gray-900 to-gray-800 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <FaStore className="text-white text-xl" />
            </div>
            <h2 className="text-white text-xl font-bold">Seller Dashboard</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FaTimes />
          </button>
        </div>
        
        <div className="p-5">
          <div className="mb-8">
            <h3 className="text-gray-400 text-sm uppercase mb-3">Store Overview</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Products</p>
                <p className="text-white font-bold text-xl">42</p>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Orders</p>
                <p className="text-white font-bold text-xl">18</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-gray-400 text-sm uppercase mb-3">Account</h3>
            <button className="flex items-center gap-3 text-gray-300 hover:text-white w-full p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
              <FaCog />
              <span>Settings</span>
            </button>
            <button className="flex items-center gap-3 text-gray-300 hover:text-white w-full p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SideBar = () => {
  const pathname = usePathname();
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  
  const menuItems: MenuItem[] = [
    { name: 'Add Product', path: '/seller', icon: <FaPlus className="text-lg" /> },
    { name: 'Product List', path: '/seller/product-list', icon: <FaList className="text-lg" /> },
    { name: 'Orders', path: '/seller/orders', icon: <FaShoppingBag className="text-lg" /> },
    { name: 'Analytics', path: '/seller/analytics', icon: <FaChartLine className="text-lg" /> },
    { name: 'Customers', path: '/seller/customers', icon: <FaUsers className="text-lg" /> },
  ];

  // Close slider when route changes
  useEffect(() => {
    setIsSliderOpen(false);
  }, [pathname]);

  return (
    <>
      <div className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen py-6 flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
        {/* Header with toggle */}
        <div className="px-5 mb-8 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <FaStore className="text-white text-xl" />
              </div>
              <h1 className="text-xl font-bold">Seller Hub</h1>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link href={item.path} key={item.name} passHref>
                <div
                  className={
                    `flex items-center py-3 px-5 mx-3 gap-3 rounded-lg transition-all duration-200 mb-2 ${isActive
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    }`
                  }
                >
                  <div className="w-7 h-7 flex items-center justify-center">
                    {item.icon}
                  </div>
                  {!collapsed && <p className="text-center">{item.name}</p>}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Profile section at bottom */}
        <div className={`px-5 pt-5 border-t border-gray-700 ${collapsed ? 'flex justify-center' : ''}`}>
          <button 
            onClick={() => setIsSliderOpen(true)}
            className={`flex items-center gap-3 w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors ${collapsed ? 'justify-center' : ''}`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white">
              JS
            </div>
            {!collapsed && (
              <div className="flex-1 text-left">
                <p className="text-white font-medium">John Seller</p>
                <p className="text-gray-400 text-sm">Premium Account</p>
              </div>
            )}
          </button>
        </div>
      </div>

      <HeaderSlider isOpen={isSliderOpen} onClose={() => setIsSliderOpen(false)} />
    </>
  );
};

export default SideBar;