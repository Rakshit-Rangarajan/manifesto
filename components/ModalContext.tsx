"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ModalContextType {
  isAnyModalOpen: boolean;
  setIsAnyModalOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType>({
  isAnyModalOpen: false,
  setIsAnyModalOpen: () => {},
});

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);

  useEffect(() => {
    if (isAnyModalOpen) {
      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Store current styles to restore them later
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      // Lock scroll 
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      // Stop Lenis smooth scrolling if active
      // @ts-ignore
      if (typeof window !== 'undefined' && window.lenis) {
        // @ts-ignore
        window.lenis.stop();
      }
      
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        
        // Resume Lenis smooth scrolling
        // @ts-ignore
        if (typeof window !== 'undefined' && window.lenis) {
          // @ts-ignore
          window.lenis.start();
        }
      };
    }
  }, [isAnyModalOpen]);

  return (
    <ModalContext.Provider value={{ isAnyModalOpen, setIsAnyModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};