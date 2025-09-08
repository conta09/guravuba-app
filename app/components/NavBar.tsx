"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { VscAccount } from "react-icons/vsc";
import Auth from "./Auth";

interface NavbarProps {
  isSeller?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isSeller = false }) => {
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setUser(null); // clear logged-in user
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 relative">
        <Image
          className="cursor-pointer w-28 md:w-36"
          onClick={() => router.push("/")}
          src="/logo.svg"
          alt="logo"
          width={144}
          height={40}
        />

        <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
          <Link href="/" className="hover:text-gray-900 transition">
            Home
          </Link>
          <Link href="/all-products" className="hover:text-gray-900 transition">
            Shop
          </Link>
          <Link href="/" className="hover:text-gray-900 transition">
            About Us
          </Link>
          <Link href="/" className="hover:text-gray-900 transition">
            Contact
          </Link>

          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs border px-4 py-1.5 rounded-full"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {/* Desktop Account */}
        <ul className="hidden md:flex items-center gap-4 relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:text-gray-900 transition"
              >
                <VscAccount /> Hi, {user.name}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="flex items-center gap-2 hover:text-gray-900 transition"
            >
              <VscAccount />
              Account
            </button>
          )}
        </ul>

        {/* Mobile view */}
        <div className="flex items-center md:hidden gap-3 relative">
          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs border px-4 py-1.5 rounded-full"
            >
              Seller Dashboard
            </button>
          )}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:text-gray-900 transition"
              >
                <VscAccount /> Hi, {user.name}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="flex items-center gap-2 hover:text-gray-900 transition"
            >
              <VscAccount />
              Account
            </button>
          )}
        </div>
      </nav>

      {/* Show Auth Modal */}
      {showAuth && (
        <Auth
          onLoginSuccess={(loggedInUser) => {
            setUser(loggedInUser);
            setShowAuth(false); // close modal
          }}
        />
      )}
    </>
  );
};

export default Navbar;
