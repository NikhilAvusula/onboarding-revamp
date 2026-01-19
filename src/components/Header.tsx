"use client";

import React, { useState,useEffect } from 'react';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import Actions from './Actions';
import ActionsMenu from './ActionsMenu';
import LutLogo from "@/src/assets/icons/LutLogo.svg";


const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNotification = () => {
    console.log('Notification clicked');
  };

  const handleContact = () => {
    console.log('Contact clicked');
  };

  const handleProfile = () => {
    console.log('Profile clicked');
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="flex items-center justify-between py-1 px-4 h-[50px] bg-[var(--headerbg)]">
        <Image src={LutLogo} alt="Lut Logo" width={40} height={30} />
        <div className="lg:hidden">
          <button onClick={handleMobileMenuToggle} className="p-2 rounded cursor-pointer">
            <Menu size={20} color={`var(--white)`}/>
          </button>
        </div>
        <div className="hidden lg:block">
          <Actions
            handleNotification={handleNotification}
            handleContact={handleContact}
            handleProfile={handleProfile}
          />
        </div>
      </header>
      <ActionsMenu
        isMobileMenuOpen={isMobileMenuOpen}
        handleNotification={handleNotification}
        handleContact={handleContact}
        handleProfile={handleProfile}
        handleMobileMenuToggle={handleMobileMenuToggle}
      />
    </>
  );
};

export default Header;