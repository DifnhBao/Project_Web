"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import dynamic from "next/dynamic";
import Modal from "@/app/components/Modal";
import Profile from "@/app/components/Profile";

const SignInPage = dynamic(() => import("@/app/sign-in/page"));
const RegisterPage = dynamic(() => import("@/app/register/page"));

type ModalType = "profile" | "signin" | "register" | null;

interface ModalContextType {
  openModal: (type: Exclude<ModalType, null>) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalType>(null);

  const openModal = (type: Exclude<ModalType, null>) => {
    setModalContent(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case "profile":
        return <Profile />;
      case "signin":
        return <SignInPage />;
      case "register":
        return <RegisterPage />;
      default:
        return null;
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal isOpen={isOpen} onClose={closeModal}>
        {renderModalContent()}
      </Modal>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
