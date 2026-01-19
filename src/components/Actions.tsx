"use client";

import React from 'react';
import { User } from 'lucide-react';
import NotificationsIcon from '@/src/assets/icons/Notifications.svg';
import Image from 'next/image';

interface ActionsProps {
  handleNotification: () => void;
  handleContact: () => void;
  handleProfile: () => void;
}

const Actions: React.FC<ActionsProps> = ({
  handleNotification,
  handleContact,
  handleProfile,
}) => {
  return (
    <div className="flex items-center space-x-2 ">
      <div onClick={handleContact} className="text-white font-poppins text-sm font-medium leading-[29px]">
        <div className="text-[var(--white)]">Contact Us</div>
      </div>
      <div onClick={handleNotification} className="p-2">
        <Image src={NotificationsIcon} alt="Notifications" width={30} height={30} />
      </div>
      <div onClick={handleProfile} className="p-2">
        <User size={25} color={`var(--white)`}/>
      </div>
    </div>
  );
};

export default Actions;