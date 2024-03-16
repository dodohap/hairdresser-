import { createContext, useContext, useState, ReactNode, FC } from "react";
import { ModalStateEnum } from "../types/AuthModal";

type AuthModalContextType = {
  showModal: boolean;
  modalState: ModalStateEnum;
  openModal: (state: ModalStateEnum) => void;
  closeModal: () => void;
};

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalState, setModalState] = useState<ModalStateEnum>(ModalStateEnum.OFF);

  const openModal = (state: ModalStateEnum) => {
    setModalState(state);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalState(ModalStateEnum.OFF);
  };

  return <AuthModalContext.Provider value={{ showModal, modalState, openModal, closeModal }}>{children}</AuthModalContext.Provider>;
};

export const useAuthModal = (): AuthModalContextType => {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
};
