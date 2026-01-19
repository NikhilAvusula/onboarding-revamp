"use client";

import React from 'react';
import { Bell, Phone, User, X } from 'lucide-react';
import NotificationsIcon from '@/src/assets/icons/Notifications.svg';
import Image from 'next/image';

interface ActionsMenuProps {
  isMobileMenuOpen: boolean;
  handleNotification: () => void;
  handleContact: () => void;
  handleProfile: () => void;
  handleMobileMenuToggle: () => void;
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({
  isMobileMenuOpen,
  handleNotification,
  handleContact,
  handleProfile,
  handleMobileMenuToggle,
}) => {
  if (!isMobileMenuOpen) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50">
      <div className="flex items-center justify-between p-4 border-b">
        <div></div>
        <button onClick={handleMobileMenuToggle} className="cursor-pointer">
          <X size={20} />
        </button>
      </div>
      <div className="p-4 space-y-4">
        <button onClick={handleContact} className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded">
          <Phone size={20} />
          <span>Contact Us</span>
        </button>
        <button onClick={handleNotification} className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded">
          <Image src={NotificationsIcon} alt="Notifications" width={20} height={20} color={"black"}/>
          <span>Notifications</span>
        </button>
        <button onClick={handleProfile} className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded">
          <User size={20} />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
};

export default ActionsMenu;