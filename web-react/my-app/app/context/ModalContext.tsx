"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import Modal from "@/app/components/Modal";
import Profile from "@/app/components/Profile";
import dynamic from "next/dynamic";

// Dynamic import cho user
const SignInPage = dynamic(
  () => import("@/app/(Pages)/(main)/auth/sign-in/page")
);
const RegisterPage = dynamic(
  () => import("@/app/(Pages)/(main)/auth/register/page")
);

// Dynamic import cho admin
const SignInAdminPage = dynamic(
  () => import("@/app/(Pages)/administrator/authAdmin/sign-in/page")
);
const RegisterAdminPage = dynamic(
  () => import("@/app/(Pages)/administrator/authAdmin/register/page")
);

type ModalType =
  | "profile"
  | "signin"
  | "register"
  | "signin-admin"
  | "register-admin"
  | null;

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
      case "signin-admin":
        return <SignInAdminPage />;
      case "register-admin":
        return <RegisterAdminPage />;
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
    throw new Error("useModal phải được gọi trong ModalProvider");
  }
  return context;
}
