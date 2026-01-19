'use client';

import React, { useState, useRef, useEffect } from 'react';
import threeDotMenu from "@/src/assets/icons/threeDotMenu.svg"
import Image from 'next/image';

interface DropdownMenuProps {
  onDelete: () => void;
  onToggleFavourite: () => void;
  isFavourite?: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
  onDelete, 
  onToggleFavourite, 
  isFavourite = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  const handleToggleFavourite = () => {
    onToggleFavourite();
    setIsOpen(false);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="btn btn-secondary dropdown-toggle p-1 hover:bg-gray-200 rounded transition-colors duration-150"
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        data-bs-toggle="dropdown"
      >
        <Image src={threeDotMenu} alt="Three Dot Menu" width={3} height={8} />
      </button>
      
      <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`} style={{ 
        position: 'absolute',
        inset: '0px auto auto 0px',
        margin: '0px',
        transform: 'translate3d(0px, 34px, 0px)',
        zIndex: 9999
      }}>
        <li>
          <button 
            className="dropdown-item d-flex align-items-center gap-2"
            onClick={handleToggleFavourite}>
            Favourites
          </button>
        </li>
        <li>
          <button 
            className="dropdown-item d-flex align-items-center gap-2 text-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
